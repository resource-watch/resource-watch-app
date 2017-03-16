import React from 'react';

// Components
import Title from 'components/ui/Title';
import Sidebar from 'containers/explore/Sidebar';
import DatasetListHeader from 'containers/explore/DatasetListHeader';
import DatasetList from 'components/explore/DatasetList';
import Paginator from 'components/ui/Paginator';
import Map from 'containers/explore/Map';
import Legend from 'components/ui/Legend';
import LayerManager from 'utils/layers/LayerManager';
import Breadcrumbs from 'components/ui/Breadcrumbs';
import Spinner from 'components/ui/Spinner';

const mapConfig = {
  zoom: 3,
  latLng: {
    lat: 0,
    lng: 0
  }
};

const breadcrumbs = [
  { name: 'Home', url: '/' }
];

class Explore extends React.Component {

  componentWillMount() {
    this.props.getDatasets();
  }

  render() {
    const { explore, paginatedDatasets } = this.props;

    return (
      <div className="c-page -dark">
        <Sidebar>
          <Breadcrumbs items={breadcrumbs} />
          <Title className="-primary -huge">
            Explore
          </Title>
          <DatasetListHeader
            list={explore.datasets.list}
            mode={explore.datasets.mode}
          />
          <Spinner
            isLoading={explore.datasets.loading}
            className="-light"
          />
          <DatasetList
            active={explore.datasets.active}
            list={paginatedDatasets}
            mode={explore.datasets.mode}
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

        {this.props.layersActive && this.props.layersActive.length &&
          <Legend
            layersActive={this.props.layersActive}
            className={{ color: '-dark' }}
            setDatasetsActive={this.props.setDatasetsActive}
          />
        }
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
  setDatasetsPage: React.PropTypes.func,
  setDatasetsActive: React.PropTypes.func
};


export default Explore;
