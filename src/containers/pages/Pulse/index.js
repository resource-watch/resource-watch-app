import { connect } from 'react-redux';
import Pulse from 'components/pages/Pulse';
import { getDatasets } from 'redactions/pulse';
import getLayersGroupPulse from 'selectors/layersGroupPulse';

const mapStateToProps = state => ({
  pulse: state.pulse,
  layersGroup: getLayersGroupPulse(state)
});

const mapDispatchToProps = dispatch => ({
  getDatasets: () => {
    dispatch(getDatasets());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pulse);
