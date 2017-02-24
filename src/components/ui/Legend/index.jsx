import React from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import LegendType from 'components/pulse/LegendType';

import './style.scss';

const SortableItem = SortableElement(({value}) => value);

const DragHandle = SortableHandle(() => <span className="handler"><svg width="6" height="18" viewBox="0 0 6 18"><title>Drag and drop</title><path d="M1 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fillRule="evenodd"/></svg></span>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="c-legend-list">
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
  }

  onSortEnd({oldIndex, newIndex}) {
    const newLayersOrder = arrayMove(this.props.layersActive, oldIndex, newIndex);
    const newLayersActive = newLayersOrder.map(l => l.dataset);
    this.props.setDatasetsActive(newLayersActive.reverse());
  };

  getLegendItems() {
    return this.props.layersActive.reverse().map((layer, i) => (
      <li key={i} className="c-legend-item">
        <DragHandle />
        <div>
          <header className="legend-item-header">
            <h3 className={this.props.className.color}>
              <span className="name">{layer.name}</span>
            </h3>
          </header>
          <LegendType config={layer.legendConfig} className={this.props.className} />
        </div>
      </li>
    ));
  }

  render() {
    return (
      <div className="c-legend-map">
        <h5 className="title">Legend</h5>
        <SortableList
          items={this.getLegendItems()}
          onSortEnd={this.onSortEnd}
          useDragHandle
        />
      </div>
    );
  }
}

Legend.propTypes = {
  layerActive: React.PropTypes.array,
  className: React.PropTypes.object
};

export default Legend;

