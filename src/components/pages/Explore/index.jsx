import React from 'react';

// Components
import Title from 'components/ui/Title';
import Sidebar from 'containers/explore/Sidebar';
import DatasetList from 'components/explore/DatasetList';
import Paginator from 'components/ui/Paginator';
import Map from 'containers/explore/Map';
import Legend from 'components/ui/Legend';
import LayerManager from 'utils/layers/LayerManager';

// Styles
import './style.scss';

const mapConfig = {
  zoom: 3,
  latLng: {
    lat: 0,
    lng: 0
  }
};

class Explore extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      layersActive: this.props.layersActive
    }
  }

  componentWillMount() {
    this.props.getDatasets();
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

      <Legend
        layersActive={this.props.layersActive}
        className={{ color: '-dark' }}
        setDatasetsActive={this.props.setDatasetsActive}
      />
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
