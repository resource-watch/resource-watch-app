import React from 'react';
import { Modal } from 'rw-components';
import Header from './components/layout/Header';
import Footer from './containers/layout/Footer';
import Tooltip from './containers/ui/Tooltip';
import './styles/app.scss';

const fullScreenPages = [
  '/explore',
  '/planet-pulse'
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: props.modal.open || false
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.state.modalOpen !== newProps.modal.open) {
      this.setState({ modalOpen: newProps.modal.open });
    }
  }
  render() {
    const { modal } = this.props;
    const fullScreen = fullScreenPages.indexOf(this.props.location.pathname) !== -1;

    return (
      <div>
        <Header fullScreen={fullScreen} />
        { this.props.children }
        {!fullScreen && <Footer />}

        <Tooltip />
        <Modal
          open={this.state.modalOpen}
          options={modal.options}
          loading={modal.loading}
          toggleModal={this.props.toggleModal}
          setModalOptions={this.props.setModalOptions}
        />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  location: React.PropTypes.object,
  modal: React.PropTypes.object,
  toggleModal: React.PropTypes.func,
  setModalOptions: React.PropTypes.func
};

export default App;
