import { connect } from 'react-redux';
import ExploreDetail from 'components/pages/ExploreDetail';
import { getDataset, resetDataset, getSimilarDatasets } from 'redactions/exploreDetail';

const mapStateToProps = state => ({
  exploreDetail: state.exploreDetail
});

export default connect(mapStateToProps, { getDataset, resetDataset, getSimilarDatasets })(ExploreDetail);
