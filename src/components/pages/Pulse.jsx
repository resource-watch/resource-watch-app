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

import earthImage from '../../../public/images/components/vis/earth-min.jpg';
import earthBumpImage from '../../../public/images/components/vis/earth-bump.jpg';
import cloudsImage from '../../../public/images/components/vis/clouds-min.png';

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
    this.handleMarkerSelected = this.handleMarkerSelected.bind(this);
    this.handleEarthClicked = this.handleEarthClicked.bind(this);
  }

  componentWillMount() {
    // This is not sending anything, for the moment
    this.props.getLayers();
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

  handleMarkerSelected(marker) {
    console.info('handleMarkerSelected', marker);
    this.setState({ selectedMarker: JSON.stringify(marker) });
  }

  handleEarthClicked(latLon) {
    console.info('handleEarthClicked', latLon);
    console.info(this.props);
    const currentLayer = this.props.pulse.layers.find(
      val => val.id === this.props.pulse.layerActive);
    const datasetId = currentLayer.dataset;
    const tableName = currentLayer.layerConfig.body.layers[0].options.sql.split('FROM')[1];
    const geoJSON = JSON.stringify({
      type: 'Point',
      coordinates: [latLon.longitude, latLon.latitude]
    });
    const requestURL = `${config.API_URL}/query/${datasetId}?sql=SELECT * FROM ${tableName} WHERE st_intersects(the_geom,st_buffer(ST_SetSRID(st_geomfromgeojson('${geoJSON}'),4326),1))`;
    console.info('requestURL', requestURL);
    fetch(new Request(requestURL))
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      }).then((response) => {
        console.info('response.data', response.data);
      });
  }

  render() {
    return (
      <div className="c-page -dark">
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
          globeClickedAt={this.handleGlobeClickedAt}
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
  getLayers: React.PropTypes.func
};


export default Pulse;
