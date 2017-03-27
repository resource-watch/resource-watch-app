/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Switch from 'components/ui/Switch';

class LayerNavDropdown extends React.Component {

  constructor(props) {
    super(props);

    this.triggerClick = this.triggerClick.bind(this);
  }

  triggerClick(e) {
    this.props.toggleActiveLayer(e.currentTarget.dataset.id);
    this.props.getLayerPoints(e.currentTarget.dataset.datasetid, e.currentTarget.dataset.tablename);
  }

  render() {
    return (
      <div className="c-layer-nav-dropdown dropdown">
        <ul>
          {this.props.layers.map((layer) => {
            const tableName = layer.layerConfig.body.layers[0].options.sql.split('FROM')[1];
            return (
              <li
                data-id={layer.id}
                data-tableName={tableName}
                data-datasetid={layer.dataset}
                key={layer.id}
                onClick={this.triggerClick}
              >
                <Switch active={(this.props.layerActive === layer.id)} />
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
  layerActive: React.PropTypes.string,
  toggleActiveLayer: React.PropTypes.func,
  getLayerPoints: React.PropTypes.func
};

export default LayerNavDropdown;
