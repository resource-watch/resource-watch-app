import { connect } from 'react-redux';
import Map from 'components/vis/Map';

const mapStateToProps = state => ({
  sidebarOpen: state.explore.sidebarOpen
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Map);
