import { connect } from 'react-redux';
import DatasetWidget from 'components/explore/DatasetWidget';
import { toggleDatasetActive, setUrlParams } from 'redactions/explore';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  toggleDatasetActive: (id) => {
    dispatch(toggleDatasetActive(id));
    dispatch(setUrlParams());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetWidget);
