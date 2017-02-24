import { connect } from 'react-redux';
import DatasetListHeader from 'components/explore/DatasetListHeader';
import { setDatasetsMode } from 'redactions/explore';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  setDatasetsMode: (mode) => {
    dispatch(setDatasetsMode(mode));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetListHeader);
