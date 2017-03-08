import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './styles/app.scss';

const fullScreen = [
  '/explore',
  '/planet-pulse',
];

function App(props) {
  const fullscreen = fullScreen.indexOf(props.location.pathname) !== -1;

  return (
    <div>
      <Header fullWidth={fullscreen} />
      { props.children }
      {!fullscreen && <Footer />}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
