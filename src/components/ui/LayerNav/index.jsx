import React from 'react';
import map from 'lodash/map';

import LayerNavDropdown from 'components/ui/LayerNavDropdown';

import './style.scss';

class LayerNav extends React.Component {

  render() {
    return (
      <div className="c-layer-nav">
        <ul>
          {map(this.props.layersGroup, (layers, key) => {
            return (
              <li key={key}>
                <div>{key}</div>
                <LayerNavDropdown layers={layers} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

LayerNav.propTypes = {
  layersGroup: React.PropTypes.object
};

LayerNav.defaultProps = {
  layersGroup: {}
};

export default LayerNav;
