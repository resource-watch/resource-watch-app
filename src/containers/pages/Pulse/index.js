import { connect } from 'react-redux';
import Pulse from 'components/pages/Pulse';
import { getLayers } from 'redactions/pulse';
import getLayersGroupPulse from 'selectors/layersGroupPulse';
import getActiveLayersPulse from 'selectors/layersActivePulse';

const mapStateToProps = state => ({
  pulse: state.pulse,
  layersGroup: getLayersGroupPulse(state),
  layerActive: getActiveLayersPulse(state),
});

const mapDispatchToProps = dispatch => ({
  getLayers: () => {
    dispatch(getLayers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pulse);
