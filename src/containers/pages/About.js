import { connect } from 'react-redux';
import About from 'components/pages/About';
import { getStaticData } from 'redactions/static_pages';

const mapStateToProps = state => ({
  data: state.staticPages.about
});

const mapDispatchToProps = dispatch => ({
  getStaticData: (page) => {
    dispatch(getStaticData(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
