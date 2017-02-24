import React from 'react';

// Helpers

// Components
import Title from 'components/ui/Title';
import Sidebar from 'containers/explore/Sidebar';
import DatasetList from 'components/explore/DatasetList';
import Paginator from 'components/ui/Paginator';
import Map from 'containers/explore/Map';
import Legend from 'components/pulse/Legend';
import LayerManager from 'utils/layers/LayerManager';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

// Styles
import './style.scss';

const mapConfig = {
  zoom: 11,
  latLng: {
    lat: 0,
    lng: 0
  }
};

const SortableItem = SortableElement(({value}) => <li><DragHandle />{value}</li>);

const DragHandle = SortableHandle(() => <span className="handler"><svg width="6" height="18" viewBox="0 0 6 18"><title>Drag and drop</title><path d="M1 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm4 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fillRule="evenodd"/></svg></span>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) =>
        <SortableItem key={`item-${index}`} index={index} value={value} />
      )}
    </ul>
  );
});

class Explore extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      layersActive: this.props.layersActive
    }

    // BINDINGS
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentWillMount() {
    this.props.getDatasets();
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     layersActive: nextProps.layersActive
  //   });
  // }

  onSortEnd({oldIndex, newIndex}) {
    // this.setState({
    //   layersActive: arrayMove(this.state.layersActive, oldIndex, newIndex)
    // });
    const newLayersOrder = arrayMove(this.props.layersActive, oldIndex, newIndex);
    const newLayersActive = newLayersOrder.map(l => l.dataset);
    this.props.setDatasetsActive(newLayersActive.reverse());
  };

  getLegendItems() {
    return this.props.layersActive.reverse().map((layer, i) => (
      <Legend key={i} layerActive={layer} className={{ color: '-dark' }} />
    ));
  }

  render() {
    const { explore, paginatedDatasets } = this.props;

    return (
      <div className="c-page">
        <Sidebar>
          <Title className="-primary -huge">
            Explore
          </Title>
          <DatasetList
            active={explore.datasets.active}
            list={paginatedDatasets}
          />

          <Paginator
            options={{
              page: explore.datasets.page,
              limit: explore.datasets.limit,
              size: explore.datasets.list.length
            }}
            onChange={page => this.props.setDatasetsPage(page)}
          />
        </Sidebar>
        <Map
          LayerManager={LayerManager}
          mapConfig={mapConfig}
          layersActive={this.props.layersActive}
          toggledDataset={this.props.toggledDataset}
        />

        <div className="legend-container">
          <h5 className="title">Legend</h5>
          <div className="legend-collection">
            <SortableList
              items={this.getLegendItems()}
              onSortEnd={this.onSortEnd}
              useDragHandle
            />
          </div>
        </div>
      </div>
    );
  }
}

Explore.propTypes = {
  // STORE
  explore: React.PropTypes.object,
  paginatedDatasets: React.PropTypes.array,
  layersActive: React.PropTypes.array,
  toggledDataset: React.PropTypes.string,

  // ACTIONS
  getDatasets: React.PropTypes.func,
  setDatasetsPage: React.PropTypes.func
};


export default Explore;
