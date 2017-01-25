import React from 'react';
import './style.scss';

class LayerNavDropdown extends React.Component {

  constructor(props) {
    super(props);

    this.triggerClick = this.triggerClick.bind(this);
  }

  triggerClick(e) {
    console.info(e.currentTarget.dataset.id);
  }

  render() {
    return (
      <div className="c-layer-nav-dopdown">
        <ul>
          {this.props.layers.map((layer) => {
            return (
              <li
                data-id={layer.id}
                key={layer.id}
                onClick={this.triggerClick}
              >
                <span>{layer.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

LayerNavDropdown.propTypes = {
  layers: React.PropTypes.array
};

LayerNavDropdown.defaultProps = {
  layers: {}
};

export default LayerNavDropdown;
