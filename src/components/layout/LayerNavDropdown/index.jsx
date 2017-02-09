/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Switch from 'components/ui/Switch';
import './style.scss';

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
      <div className="c-layer-nav-dropdown dropdown">
        <ul>
          {this.props.layers.map(layer => (
            <li
              data-id={layer.id}
              key={layer.id}
              onClick={this.triggerClick}
            >
              <Switch active={(this.props.layerActive === layer.id)} />
              <span className="name">
                {layer.name}
              </span>
            </li>
            ))}
        </ul>
      </div>
    );
  }

}

LayerNavDropdown.propTypes = {
  layers: React.PropTypes.array,
  layerActive: React.PropTypes.string,
  toggleActiveLayer: React.PropTypes.func
};

export default LayerNavDropdown;
