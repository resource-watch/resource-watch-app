import { connect } from 'react-redux';
import Explore from 'components/pages/Explore';
import { getDatasets, setDatasetsPage } from 'redactions/explore';
import getpaginatedDatasets from 'selectors/explore/datasetsPaginatedExplore';

const mapStateToProps = state => ({
  explore: state.explore,
  paginatedDatasets: getpaginatedDatasets(state)
});

const mapDispatchToProps = dispatch => ({
  getDatasets: () => {
    dispatch(getDatasets());
  },
  setDatasetsPage: (page) => {
    dispatch(setDatasetsPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
