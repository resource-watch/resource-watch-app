import React from 'react';
import L from 'leaflet/dist/leaflet';
import 'leaflet/dist/leaflet.css';
import isEqual from 'lodash/isEqual';
import Spinner from 'components/ui/Spinner';
import './style.scss';

const MAP_CONFIG = {
  zoom: 2,
  minZoom: 2,
  latLng: {
    lat: 30,
    lng: -120
  },
  zoomControl: true
};

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sidebarOpen: true
    };
  }

  componentDidMount() {
    this._mounted = true;
    const mapOptions = {
      minZoom: MAP_CONFIG.minZoom,
      zoom: isNaN(this.props.mapConfig) ? MAP_CONFIG.zoom : this.props.mapConfig.zoom,
      zoomControl: isNaN(this.props.mapConfig) ? MAP_CONFIG.zoomControl : this.props.mapConfig.zoomControl,
      center: isNaN(this.props.mapConfig) ? [MAP_CONFIG.latLng.lat, MAP_CONFIG.latLng.lng] : [this.props.mapConfig.latLng.lat, this.props.mapConfig.latLng.lng],
      detectRetina: true,
      scrollWheelZoom: isNaN(this.props.mapConfig) ? false : !!this.props.mapConfig.scrollWheelZoom
    };

    this.map = L.map(this.mapNode, mapOptions);

    if (this.props.mapConfig && this.props.mapConfig.bounds) {
      this.fitBounds(this.props.mapConfig.bounds.geometry);
    }

    // SETTERS
    this.setAttribution();
    this.setZoomControl();
    this.setBasemap();
    this.setMapEventListeners();

    // Add layers
    this.setLayerManager();
    this.addLayers(this.props.layersActive, this.props.filters);
  }

  componentWillReceiveProps(nextProps) {
    const filtersChanged = !isEqual(nextProps.filters, this.props.filters);
    const layersActiveChanged = !isEqual(nextProps.layersActive, this.props.layersActive);

    if (filtersChanged || layersActiveChanged) {
      if (this.props.layersActive.length && nextProps.layersActive.length) {
        let layer;
        const datasetId = nextProps.toggledDataset;

        if (this.props.layersActive.length < nextProps.layersActive.length) {
          layer = nextProps.layersActive.filter((l) => l.dataset === datasetId)[0];
          this.addLayer(layer);
        } else if (this.props.layersActive.length > nextProps.layersActive.length) {
          layer = this.props.layersActive.filter((l) => l.dataset === datasetId)[0];
          this.removeLayer(layer);
        } else {
          Object.keys(this.layerManager._mapLayers).forEach(key => {
            const order = nextProps.layersActive.filter(l => l.id === key)[0].order;
            this.layerManager._mapLayers[key].setZIndex(order);
          });
        }
      } else {
        this.addLayers(nextProps.layersActive);
      }
    }

    if (this.props.sidebarOpen !== nextProps.sidebarOpen) {
      this.setState({ sidebarOpen: nextProps.sidebarOpen });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const loadingChanged = this.state.loading !== nextState.loading;
    const sidebarWidthChanged = this.props.sidebarOpen !== nextProps.sidebarOpen;
    return loadingChanged || sidebarWidthChanged;
  }

  componentWillUnmount() {
    this._mounted = false;
    // Remember to remove the listeners before removing the map
    // or they will stay in memory
    this.props.setMapParams && this.removeMapEventListeners();
    this.map.remove();
  }


  // SETTERS
  setLayerManager() {
    const stopLoading = () => {
      // Don't execute callback if component has been unmounted
      this._mounted && this.setState({
        loading: false
      });
    };

    this.layerManager = new this.props.LayerManager(this.map, {
      onLayerAddedSuccess: stopLoading,
      onLayerAddedError: stopLoading
    });
  }

  setAttribution() {
    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>');
  }

  setZoomControl() {
    this.map.zoomControl && this.map.zoomControl.setPosition('topright');
  }

  setBasemap() {
    this.tileLayer = L.tileLayer(config.BASEMAP_TILE_URL, {})
                      .addTo(this.map)
                      .setZIndex(0);
  }

  // GETTERS
  getMapParams() {
    const params = {
      zoom: this.getZoom(),
      latLng: this.getCenter()
    };
    return params;
  }

  // MAP FUNCTIONS
  getCenter() { return this.map.getCenter(); }

  getZoom() { return this.map.getZoom(); }

  fitBounds(geoJson, sidebarWidth) {
    const geojsonLayer = L.geoJson(geoJson);
    this.map.fitBounds(geojsonLayer.getBounds(), {
      paddingTopLeft: [sidebarWidth || 0, 0],
      paddingBottomRight: [0, 0]
    });
  }


  // MAP LISTENERS
  setMapEventListeners() {
    function mapChangeHandler() {
      // Dispatch the action to set the params
      this.props.setMapParams(this.getMapParams());
    }

    if (this.props.setMapParams) {
      this.map.on('zoomend', mapChangeHandler.bind(this));
      this.map.on('dragend', mapChangeHandler.bind(this));
    }
  }

  removeMapEventListeners() {
    this.map.off('zoomend');
    this.map.off('dragend');
  }

  // LAYER METHODS
  addLayer(layer, filters) {
    this.setState({
      loading: true
    });
    this.layerManager.addLayer(layer, filters || this.props.filters);
  }

  addLayers(layers, filters) {
    if (!layers) return;
    layers.forEach((layer) => {
      this.addLayer(layer, filters);
    });
  }

  removeLayer(layer) {
    this.layerManager.removeLayer(layer.id);
  }

  removeLayers() {
    this.layerManager.removeLayers();
  }

  fitCenter() {
    this.state.sidebarOpen ?
      this.map.setView(new L.LatLng(MAP_CONFIG.latLng.lat, MAP_CONFIG.latLng.lng), MAP_CONFIG.zoom) :
      this.map.setView(new L.LatLng(MAP_CONFIG.latLng.lat, -39.4201), MAP_CONFIG.zoom);
  }

  // RENDER
  render() {
    const spinnerStyles = { marginLeft: this.state.sidebarOpen ? (window.innerWidth / 4) : (window.innerWidth / 2) };
    const mapClass = !this.state.sidebarOpen ? '-fullWidth' : '';

    return (
      <div className={`c-map ${mapClass}`}>
        {this.state.loading && <Spinner isLoading style={spinnerStyles} />}
        <div ref={(node) => { this.mapNode = node; }} className="map-leaflet" />
      </div>
    );
  }
}

Map.propTypes = {
  // STORE
  mapConfig: React.PropTypes.object,
  filters: React.PropTypes.object,
  sidebar: React.PropTypes.object,
  sidebarOpen: React.PropTypes.bool,
  LayerManager: React.PropTypes.func,
  layersActive: React.PropTypes.array,
  // ACTIONS
  setMapParams: React.PropTypes.func
};

export default Map;
