import { connect } from 'react-redux';
import Footer from 'components/layout/Footer';
import { getPartners } from 'redactions/partners';

const mapStateToProps = state => ({
  list: state.partners.list
});

const mapDispatchToProps = dispatch => ({
  getPartners: () => { dispatch(getPartners()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
