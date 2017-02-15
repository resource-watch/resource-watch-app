import React from 'react';

// Helpers
import LayerGlobeManager from 'utils/layers/LayerGlobeManager';

// Components
import Globe from 'components/vis/Globe';
import LayerNav from 'components/pulse/LayerNav';
import Legend from 'components/pulse/Legend';
import LayerDescription from 'components/pulse/LayerDescription';
import Spinner from 'components/ui/Spinner';

// Styles
import './style.scss';

class Pulse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.layerGlobeManager = new LayerGlobeManager();
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
  }

  render() {
    return (
      <div className="c-page">
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
          width={window.innerWidth}
          height={window.innerHeight - 130} // TODO: 130 is the header height
          pointLightColor={0xcccccc}
          ambientLightColor={0x444444}
          enableZoom
          lightPosition={'right'}
          texture={this.state.texture}
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
