import { connect } from 'react-redux';
import DatasetWidget from 'components/explore/DatasetWidget';
import { toggleDatasetActive } from 'redactions/explore';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  toggleDatasetActive: (id) => {
    dispatch(toggleDatasetActive(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetWidget);
