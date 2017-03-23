import { connect } from 'react-redux';
import PartnerDetail from 'components/pages/PartnerDetail';
import { getPartnerData } from 'redactions/partnerDetail';
import getPartnerId from 'selectors/partners/partner';

const mapStateToProps = state => ({
  data: state.partnerDetail.data,
  id: getPartnerId(state)
});

const mapDispatchToProps = dispatch => ({
  getPartnerData: (id) => { dispatch(getPartnerData(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerDetail);
