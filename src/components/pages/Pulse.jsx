import React from 'react';
import { Autobind } from 'es-decorators';

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
  }

  /**
   * COMPONENT LIFECYCLE
   * - componentWillMount
   * - componentWillReceiveProps
   * - componentWillUnmount
  */
  componentWillMount() {
    // This is not sending anything, for the moment
    this.props.getLayers();
    document.addEventListener('click', this.triggerMouseDown);
  }
  componentWillReceiveProps(nextProps) {
    const { layerActive } = this.props.pulse;
    const nextLayerActive = nextProps.pulse.layerActive;
    const lastId = (layerActive) ? layerActive.id : null;
    const newId = (nextLayerActive) ? nextLayerActive.id : null;
    if (lastId !== newId) {
      if (nextLayerActive) {
        this.setState({
          loading: true
        });
        this.layerGlobeManager.addLayer(nextLayerActive.attributes, {
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
  componentWillUnmount() {
    document.removeEventListener('click', this.triggerMouseDown);
  }

  /**
  * UI EVENTS
  * - triggerZoomIn
  * - triggerZoomOut
  * - triggerMouseDown
  * - handleMarkerSelected
  * - handleEarthClicked
  */
  @Autobind
  triggerZoomIn() {
    this.globe.camera.translateZ(-5);
  }
  @Autobind
  triggerZoomOut() {
    this.globe.camera.translateZ(5);
  }
  @Autobind
  triggerMouseDown() {
    this.props.toggleTooltip(false);
  }
  @Autobind
  handleMarkerSelected(marker) {
    console.info('handleMarkerSelected', marker);
    this.setState({ selectedMarker: JSON.stringify(marker) });
  }
  @Autobind
  handleEarthClicked(latLon, clientX, clientY) {
    this.props.toggleTooltip(false);

    const currentLayer = this.props.pulse.layerActive.attributes;
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
        requestURL = `${config.API_URL}/query/${datasetId}?sql=SELECT ST_Value(st_transform(${geomColumn},4326), st_setsrid(st_geomfromgeojson('${geoJSON}'),4326), true) FROM ${tableName} WHERE st_intersects(${geomColumn},st_setsrid(st_geomfromgeojson('${geoJSON}'),4326))`;
      } else {
        requestURL = `${config.API_URL}/query/${datasetId}?sql=SELECT * FROM ${tableName} WHERE st_intersects(the_geom,st_buffer(ST_SetSRID(st_geomfromgeojson('${geoJSON}'),4326),1))`;
      }
      this.setTooltipValue(requestURL, clientX, clientY);
    }
  }

  /**
  * HELPER FUNCTIONS
  * - setTooltipValue
  */
  @Autobind
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
          ref={globe => (this.globe = globe)}
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
          ref={zoomControl => (this.zoomControl = zoomControl)}
          onZoomIn={this.triggerZoomIn}
          onZoomOut={this.triggerZoomOut}
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
