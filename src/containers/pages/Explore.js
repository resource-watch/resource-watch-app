import { connect } from 'react-redux';
import Explore from 'components/pages/Explore';
import { getDatasets, setDatasetsPage, setUrlParams, setDatasetsActive, filterDatasets } from 'redactions/explore';
import { redirectTo } from 'redactions/common';
import getpaginatedDatasets from 'selectors/explore/datasetsPaginatedExplore';
import getActiveLayers from 'selectors/explore/layersActive';

const mapStateToProps = state => ({
  explore: state.explore,
  paginatedDatasets: getpaginatedDatasets(state),
  allDatasets: state.explore.datasets.list,
  layersActive: getActiveLayers(state)
});

const mapDispatchToProps = dispatch => ({
  getDatasets: () => { dispatch(getDatasets()); },
  setDatasetsActive: (active) => { dispatch(setDatasetsActive(active)); },
  redirectTo: (url) => { dispatch(redirectTo(url)); },
  filterDatasets: (value) => { dispatch(filterDatasets(value)); },
  setDatasetsPage: (page) => {
    dispatch(setDatasetsPage(page));
    dispatch(setUrlParams());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
