import { connect } from 'react-redux';
import LayerNavDropdown from 'components/pulse/LayerNavDropdown';
import { toggleActiveLayer, getLayerPoints } from 'redactions/pulse';

const mapStateToProps = state => ({
  layerActive: state.pulse.layerActive
});

const mapDispatchToProps = dispatch => ({
  toggleActiveLayer: (id, threedimensional) => {
    dispatch(toggleActiveLayer(id, threedimensional));
  },
  getLayerPoints: (id, tableName) => {
    dispatch(getLayerPoints(id, tableName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LayerNavDropdown);
