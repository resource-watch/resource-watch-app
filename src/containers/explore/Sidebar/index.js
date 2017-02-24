import { connect } from 'react-redux';
import Sidebar from 'components/layout/Sidebar';
import { setSidebar } from 'redactions/explore';

const mapStateToProps = state => ({
  sidebar: state.explore.sidebar
});

const mapDispatchToProps = dispatch => ({
  setSidebar: (open, width) => { dispatch(setSidebar(open, width)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
