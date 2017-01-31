import { connect } from 'react-redux';
import LayerNavDropdown from 'components/layout/LayerNavDropdown';
import { toggleActiveLayer } from 'redactions/pulse';

const mapStateToProps = state => ({
  layerActive: state.pulse.layerActive,
});

const mapDispatchToProps = dispatch => ({
  toggleActiveLayer: (id) => {
    dispatch(toggleActiveLayer(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LayerNavDropdown);
