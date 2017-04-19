import { connect } from 'react-redux';
import DatasetWidget from 'components/explore/DatasetWidget';
import { toggleDatasetActive, setUrlParams, setDatasetsHidden } from 'redactions/explore';

const mapStateToProps = state => ({
  layersHidden: state.explore.datasets.hidden
});

const mapDispatchToProps = dispatch => ({
  toggleDatasetActive: (id) => {
    dispatch(toggleDatasetActive(id));
    dispatch(setUrlParams());
  },
  setDatasetsHidden: (id) => { dispatch(setDatasetsHidden(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetWidget);
