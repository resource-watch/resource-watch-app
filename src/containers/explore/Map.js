import { connect } from 'react-redux';
import Map from 'components/vis/Map';

const mapStateToProps = state => ({
  sidebar: state.explore.sidebar
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Map);
