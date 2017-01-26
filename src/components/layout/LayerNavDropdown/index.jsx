import React from 'react';
import './style.scss';

import Switch from 'components/ui/Switch';

class LayerNavDropdown extends React.Component {

  constructor(props) {
    super(props);

    this.triggerClick = this.triggerClick.bind(this);
  }

  triggerClick(e) {
    this.props.toggleActiveLayer(e.currentTarget.dataset.id);
  }

  render() {
    return (
      <div className="c-layer-nav-dropdown">
        <ul>
          {this.props.layers.map((layer) => {
            return (
              <li
                data-id={layer.id}
                key={layer.id}
                onClick={this.triggerClick}
              >
                <Switch active={layer.active} />
                <span className="name">
                  {layer.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

LayerNavDropdown.propTypes = {
  layers: React.PropTypes.array,
  toggleActiveLayer: React.PropTypes.func
};

export default LayerNavDropdown;
