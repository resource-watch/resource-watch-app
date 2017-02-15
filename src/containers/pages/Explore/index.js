import { connect } from 'react-redux';
import Explore from 'components/pages/Explore';
import { getDatasets } from 'redactions/explore';
import getpaginatedDatasets from 'selectors/explore/datasetsPaginatedExplore';

const mapStateToProps = state => ({
  explore: state.explore,
  paginatedDatasets: getpaginatedDatasets(state)
});

const mapDispatchToProps = dispatch => ({
  getDatasets: () => {
    dispatch(getDatasets());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
