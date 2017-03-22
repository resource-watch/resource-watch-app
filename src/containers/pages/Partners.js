import { connect } from 'react-redux';
import Partners from 'components/pages/Partners';
import { getPartners, setPartnerId } from 'redactions/partners';

const mapStateToProps = state => {
	debugger;
	return {
  list: state.partners.list
};};

const mapDispatchToProps = dispatch => ({
  getPartners: () => { dispatch(getPartners()); },
  setPartnerId: (id) => { dispatch(setPartnerId(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
