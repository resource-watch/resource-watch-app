import React from 'react';

import LayerNavDropdown from 'containers/layout/LayerNavDropdown';

import './style.scss';

class LayerNav extends React.Component {

  render() {
    return (
      <div className="c-layer-nav">
        <ul>
          {this.props.layersGroup.map((group, i) =>
            <li key={i}>
              <span className="name">
                {group.name}
              </span>
              <LayerNavDropdown layers={group.layers} />
            </li>
          )}
        </ul>
      </div>
    );
  }

}

LayerNav.propTypes = {
  layersGroup: React.PropTypes.array
};

LayerNav.defaultProps = {
  layersGroup: []
};

export default LayerNav;
