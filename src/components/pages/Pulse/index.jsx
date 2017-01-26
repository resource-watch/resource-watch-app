import React from 'react';
import Globe from 'components/vis/Globe';
import LayerNav from 'components/layout/LayerNav';

import './style.scss';

class Pulse extends React.Component {

  componentWillMount() {
    // This is not sending anything, for the moment
    this.props.getDatasets();
  }

  render() {
    console.log(this.props.activeLayer);
    return (
      <div className="c-page">
        <div className="l-container">
          <LayerNav
            layersGroup={this.props.layersGroup}
          />
        </div>
        <Globe radius={294} />
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
