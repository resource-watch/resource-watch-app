import React from 'react';

// Helpers

// Components
import Title from 'components/ui/Title';
import Sidebar from 'containers/explore/Sidebar';
import DatasetList from 'components/explore/DatasetList';
import Paginator from 'components/ui/Paginator';
import Map from 'containers/explore/Map';

// Styles
import './style.scss';

class Explore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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

        <Map />
      </div>
    );
  }
}

Explore.propTypes = {
  // STORE
  explore: React.PropTypes.object,
  paginatedDatasets: React.PropTypes.array,

  // ACTIONS
  getDatasets: React.PropTypes.func,
  setDatasetsPage: React.PropTypes.func
};


export default Explore;
