import React from 'react';

import LayerNavDropdown from 'containers/layout/LayerNavDropdown';

import './style.scss';

class LayerNav extends React.Component {
  render() {
    return (
      <div className="c-layer-nav">
        <ul>
          {this.props.layersGroup.map((group, i) => {
            const activeGroup = (this.props.layerActive && this.props.layerActive.group === group.name) ? '-active' : '';
            return (
              <li key={i} className={activeGroup}>
                <span className="name">
                  {group.name}
                </span>
                <LayerNavDropdown layers={group.layers} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

LayerNav.propTypes = {
  layersGroup: React.PropTypes.array,
  layerActive: React.PropTypes.object,
};

LayerNav.defaultProps = {
  layersGroup: [],
  layerActive: null,
};

export default LayerNav;
