import { connect } from 'react-redux';
import Pulse from 'components/pages/Pulse';
import { getDatasets } from 'redactions/pulse';

const mapStateToProps = state => ({
  pulse: state.pulse
});

const mapDispatchToProps = dispatch => ({
  getDatasets: () => {
    dispatch(getDatasets());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Pulse);
