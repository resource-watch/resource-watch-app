import React from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import LegendType from 'components/pulse/LegendType';

import './style.scss';

const SortableItem = SortableElement(({value}) => value);

const DragHandle = SortableHandle(() => (
  <span className="handler">
    <svg className="c-icon -small icon-Row-Dragger">
      <use xlinkHref="#icon-Row-Dragger"></use>
    </svg>
  </span>
));

const SortableList = SortableContainer(({items}) => {
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

  onSortEnd({oldIndex, newIndex}) {
    const newLayersOrder = arrayMove(this.props.layersActive, oldIndex, newIndex);
    const newLayersActive = newLayersOrder.map(l => l.dataset);
    this.props.setDatasetsActive(newLayersActive.reverse());
  };

  onSortStart(opts) {
    const node = opts.node;
  }

  onSortMove(ev) {
  }

  getLegendItems() {
    return this.props.layersActive.reverse().map((layer, i) => (
      <li key={i} className="legend-item">
        <div className="legend-info">
          <header className="legend-item-header">
            <h3 className={this.props.className.color}>
              <span className="name">{layer.name}</span>
            </h3>
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
          helperClass="-sortable"
          onSortEnd={this.onSortEnd}
          onSortStart={this.onSortStart}
          onSortMove={this.onSortMove}
          axis="y"
          lockAxis="y"
          lockToContainerEdges
          lockOffset="50%"
          hideSortableGhost={false}
          useDragHandle
        />
      </div>
    );
  }
}

Legend.propTypes = {
  layersActive: React.PropTypes.array,
  className: React.PropTypes.object
};

export default Legend;

