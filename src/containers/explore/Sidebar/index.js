import { connect } from 'react-redux';
import Sidebar from 'components/layout/Sidebar';
import { setSidebar } from 'redactions/explore';

const mapStateToProps = state => ({
  sidebarOpen: state.explore.sidebarOpen
});

const mapDispatchToProps = dispatch => ({
  setSidebar: (isOpen) => { dispatch(setSidebar(isOpen)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
