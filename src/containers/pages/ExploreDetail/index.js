import { connect } from 'react-redux';
import ExploreDetail from 'components/pages/ExploreDetail';
import { getDataset } from 'redactions/exploreDetail';

const mapStateToProps = state => ({
  exploreDetail: state.exploreDetail
});

export default connect(mapStateToProps, { getDataset })(ExploreDetail);
