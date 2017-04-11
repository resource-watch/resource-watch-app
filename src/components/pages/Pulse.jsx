import React from 'react';

// Helpers
import LayerGlobeManager from 'utils/layers/LayerGlobeManager';

// Components
import Globe from 'components/vis/Globe';
import LayerNav from 'components/pulse/LayerNav';
import Legend from 'components/pulse/Legend';
import LayerDescription from 'components/pulse/LayerDescription';
import Spinner from 'components/ui/Spinner';
import ZoomControl from 'components/ui/ZoomControl';
import GlobeTooltip from 'components/pulse/GlobeTooltip';

import earthImage from '../../images/components/vis/earth-min.jpg';
import earthBumpImage from '../../images/components/vis/earth-bump.jpg';
import cloudsImage from '../../images/components/vis/clouds-min.png';

class Pulse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      texture: null,
      loading: false,
      layerPoints: [],
      selectedMarker: null
    };
    this.layerGlobeManager = new LayerGlobeManager();

    // Bindings
    this.onZoomIn = this.onZoomIn.bind(this);
    this.onZoomOut = this.onZoomOut.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.setTooltipValue = this.setTooltipValue.bind(this);
    this.handleMarkerSelected = this.handleMarkerSelected.bind(this);
    this.handleEarthClicked = this.handleEarthClicked.bind(this);
  }

  componentWillMount() {
    // This is not sending anything, for the moment
    this.props.getLayers();
    document.addEventListener('click', this.onMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onMouseDown);
  }

  componentWillReceiveProps(nextProps) {
    const lastId = (this.props.layerActive) ? this.props.layerActive.id : null;
    const newId = (nextProps.layerActive) ? nextProps.layerActive.id : null;
    if (lastId !== newId) {
      if (nextProps.layerActive) {
        this.setState({
          loading: true
        });
        this.layerGlobeManager.addLayer(nextProps.layerActive, {
          onLayerAddedSuccess: function success(texture) {
            console.info(texture);
            this.setState({
              texture,
              loading: false
            });
          }.bind(this),
          onLayerAddedError: function error(err) {
            console.error(err);
            this.setState({
              texture: null,
              loading: false
            });
          }.bind(this)
        });
      } else {
        this.layerGlobeManager.abortRequest();
        this.setState({ texture: null });
      }
    }

    // if (nextProps.pulse.layerPoints) {
    //   this.setState({ layerPoints: nextProps.pulse.layerPoints });
    // }
  }

  onZoomIn() {
    this.globe.camera.translateZ(-5);
  }

  onZoomOut() {
    this.globe.camera.translateZ(5);
  }

  onMouseDown() {
    this.props.toggleTooltip(false);
  }

  handleMarkerSelected(marker) {
    console.info('handleMarkerSelected', marker);
    this.setState({ selectedMarker: JSON.stringify(marker) });
  }

  handleEarthClicked(latLon, clientX, clientY) {
    this.props.toggleTooltip(false);

    const currentLayer = this.props.pulse.layers.find(
      val => val.id === this.props.pulse.layerActive);
    if (currentLayer) {
      const datasetId = currentLayer.dataset;
      const options = currentLayer.layerConfig.body.layers[0].options;
      const geomColumn = options.geom_column;
      const tableName = options.sql.toUpperCase().split('FROM')[1];
      const geoJSON = JSON.stringify({
        type: 'Point',
        coordinates: [latLon.longitude, latLon.latitude]
      });
      let requestURL;
      if (geomColumn) {
        requestURL = `${config.API_URL}/query/${datasetId}?sql=SELECT ST_Value(st_transform(${geomColumn},4326), st_setsrid(st_geomfromgeojson(${geoJSON}),4326), true) FROM ${tableName} WHERE st_intersects(${geomColumn},st_setsrid(st_geomfromgeojson(${geoJSON}),4326))`;
      } else {
        requestURL = `${config.API_URL}/query/${datasetId}?sql=SELECT * FROM ${tableName} WHERE st_intersects(the_geom,st_buffer(ST_SetSRID(st_geomfromgeojson('${geoJSON}'),4326),1))`;
      }
      this.setTooltipValue(requestURL, clientX, clientY);
    }
  }

  setTooltipValue(requestURL, tooltipX, tooltipY) {
    fetch(new Request(requestURL))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      }).then((response) => {
        if (response.data.length > 0) {
          const obj = response.data[0];
          delete obj.the_geom;
          delete obj.the_geom_webmercator;
          delete obj.cartodb_id;
          this.props.toggleTooltip(true, {
            follow: false,
            children: GlobeTooltip,
            childrenProps: { value: obj },
            position: { x: tooltipX, y: tooltipY }
          });
        }
      });
  }

  render() {
    return (
      <div
        className="c-page -dark"
      >
        <LayerNav
          layerActive={this.props.layerActive}
          layersGroup={this.props.layersGroup}
        />
        <Legend
          layerActive={this.props.layerActive}
        />
        <LayerDescription
          layerActive={this.props.layerActive}
        />
        <Spinner
          isLoading={this.state.loading}
        />
        <Globe
          ref={globe => this.globe = globe}
          width={window.innerWidth}
          height={window.innerHeight - 130} // TODO: 130 is the header height
          pointLightColor={0xcccccc}
          ambientLightColor={0x444444}
          enableZoom
          lightPosition={'right'}
          texture={this.state.texture}
          layerPoints={this.state.layerPoints}
          earthImagePath={earthImage}
          earthBumpImagePath={earthBumpImage}
          defaultLayerImagePath={cloudsImage}
          segments={64}
          rings={64}
          useHalo
          useDefaultLayer
          onMarkerSelected={this.handleMarkerSelected}
          onEarthClicked={this.handleEarthClicked}
        />
        <ZoomControl
          ref={zoomControl => this.zoomControl = zoomControl}
          onZoomIn={this.onZoomIn}
          onZoomOut={this.onZoomOut}
        />
      </div>
    );
  }
}

Pulse.propTypes = {
  layersGroup: React.PropTypes.array,
  layerActive: React.PropTypes.object,
  getLayers: React.PropTypes.func,
  toggleTooltip: React.PropTypes.func
};


export default Pulse;
