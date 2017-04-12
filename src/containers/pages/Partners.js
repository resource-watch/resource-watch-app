import { connect } from 'react-redux';
import Partners from 'components/pages/Partners';
import { getPartners } from 'redactions/partners';
import { getFeaturedPartners } from 'utils/partners/getRequiredPartners';

const mapStateToProps = state => ({
  featured: getFeaturedPartners(state.partners.list, true),
  nonFeatured: getFeaturedPartners(state.partners.list, false)
});

const mapDispatchToProps = dispatch => ({
  getPartners: () => { dispatch(getPartners()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
