import { connect } from 'react-redux';
import PartnerDetail from 'components/pages/PartnerDetail';
import getPartnerData from 'selectors/partners/partner';

const mapStateToProps = state => ({
  data: getPartnerData(state)
});

//
// const mapDispatchToProps = dispatch => ({
//   getLayers: () => {
//     dispatch(getLayers());
//   },
// });

export default connect(mapStateToProps, null)(PartnerDetail);
