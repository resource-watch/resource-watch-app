import React from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import LegendType from 'components/pulse/LegendType';
import Icon from 'components/ui/Icon';

const SortableItem = SortableElement(({ value }) => value);

const DragHandle = SortableHandle(() => (
  <span className="handler">
    <Icon name="icon-drag-dots" className="-small" />
  </span>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul className="legend-list">
      {items.map((value, index) =>
        <SortableItem key={`item-${index}`} index={index} value={value} />
      )}
    </ul>
  );
});

class Legend extends React.Component {
  constructor(props) {
    super(props);

    // BINDINGS
    this.onSortEnd = this.onSortEnd.bind(this);
    this.onSortStart = this.onSortStart.bind(this);
    this.onSortMove = this.onSortMove.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    const reversed = this.props.layersActive.reverse();
    const newLayersOrder = arrayMove(reversed, oldIndex, newIndex);
    // Unreverse layers to set them in their real order
    const newLayersActive = newLayersOrder.map(l => l.dataset).reverse();

    this.props.setDatasetsActive(newLayersActive);
  }

  onSortStart(opts) {
    // const node = opts.node;
  }

  onSortMove(ev) {
  }

  getItemsActions(layer) {
    return (
      <div className="item-actions">
        <button onClick={() => this.props.toggleDatasetActive(layer.dataset)}>
          <Icon name="icon-cross" className="-smaller" />
        </button>
      </div>
    );
  }

  getLegendItems() {
    // Reverse layers to show first the last one added
    const layersActiveReversed = this.props.layersActive.slice().reverse();
    return layersActiveReversed.map((layer, i) => (
      <li key={i} className="c-legend-unit">
        <div className="legend-info">
          <header className="legend-item-header">
            <h3 className={this.props.className.color}>
              <span className="name">{layer.name}</span>
            </h3>
            {this.getItemsActions(layer)}
          </header>
          <LegendType config={layer.legendConfig} className={this.props.className} />
        </div>
        <DragHandle />
      </li>
    ));
  }

  render() {
    return (
      <div className="c-legend-map">
        <h5 className="title">Legend</h5>
        <SortableList
          items={this.getLegendItems()}
          helperClass="c-legend-unit -sort"
          onSortEnd={this.onSortEnd}
          onSortStart={this.onSortStart}
          onSortMove={this.onSortMove}
          axis="y"
          lockAxis="y"
          lockToContainerEdges
          lockOffset="50%"
          useDragHandle
        />
      </div>
    );
  }
}

Legend.propTypes = {
  layersActive: React.PropTypes.array,
  className: React.PropTypes.object,
  // Functions
  toggleDatasetActive: React.PropTypes.func,
  setDatasetsActive: React.PropTypes.func
};

export default Legend;
