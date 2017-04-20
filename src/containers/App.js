import { connect } from 'react-redux';
import App from 'App';
import { toggleModal, setModalOptions } from 'rw-components';

const mapStateToProps = state => ({
  modal: state.modal
});

const mapDispatchToProps = dispatch => ({
  toggleModal: () => {
    dispatch(toggleModal());
  },
  setModalOptions: () => {
    dispatch(setModalOptions());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
