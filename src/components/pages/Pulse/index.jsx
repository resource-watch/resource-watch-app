import React from 'react';
import LayerGlobeManager from 'utils/layers/LayerGlobeManager';
import Globe from 'components/vis/Globe';
import LayerNav from 'components/layout/LayerNav';

import './style.scss';

class Pulse extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.layerGlobeManager = new LayerGlobeManager();
  }

  componentWillMount() {
    // This is not sending anything, for the moment
    this.props.getDatasets();
  }

  componentWillReceiveProps(nextProps) {
    const lastId = (this.props.activeLayer) ? this.props.activeLayer.id : null;
    const newId = (nextProps.activeLayer) ? nextProps.activeLayer.id : null;
    if (lastId !== newId) {
      if (nextProps.activeLayer) {
        this.layerGlobeManager.addLayer(nextProps.activeLayer, {
          onLayerAddedSuccess: function success(texture) {
            this.setState({ texture });
          }.bind(this),
          onLayerAddedError: function error(err) {
            console.error(err);
          }.bind(this)
        });
      } else {
        this.setState({ texture: null });
      }
    }
  }

  render() {
    console.log(this.state.texture);
    return (
      <div className="c-page">
        <div className="l-container">
          <LayerNav
            layersGroup={this.props.layersGroup}
          />
        </div>
        <Globe
          pointLightColor={0xcccccc}
          ambientLightColor={0x444444}
          enableZoom={true}
          lightPosition={'right'}
          texture={this.state.texture}
        />
      </div>
    );
  }
}

Pulse.propTypes = {
  pulse: React.PropTypes.object,
  layersGroup: React.PropTypes.array,
  activeLayer: React.PropTypes.object,
  getDatasets: React.PropTypes.func
};


export default Pulse;
