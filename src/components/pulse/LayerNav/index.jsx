import React from 'react';
import LayerNavDropdown from 'containers/pulse/LayerNavDropdown';
import './style.scss';

const LayerNav = ({ layerActive, layersGroup }) => {
  function createItemGroup(group) {
    const activeGroup = layerActive && layerActive.group === group.name ? '-active' : '';
    return (
      <li key={`item-group-${group.name}`} className={activeGroup}>
        <span className="name">
          {group.name}
        </span>
        <LayerNavDropdown layers={group.layers} />
      </li>
    );
  }
  return (
    <div className="c-layer-nav">
      <div className="l-container">
        <ul className="layer-nav-list">
          {layersGroup.map(createItemGroup)}
        </ul>
      </div>
    </div>
  );
};

LayerNav.propTypes = {
  layersGroup: React.PropTypes.array,
  layerActive: React.PropTypes.any
};

LayerNav.defaultProps = {
  layersGroup: [],
  layerActive: null
};

export default LayerNav;
