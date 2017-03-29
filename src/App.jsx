import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Tooltip from './containers/ui/Tooltip';
import './styles/app.scss';

const fullScreenPages = [
  '/explore',
  '/planet-pulse'
];

function App(props) {
  const fullScreen = fullScreenPages.indexOf(props.location.pathname) !== -1;

  return (
    <div>
      <Header fullScreen={fullScreen} />
      { props.children }
      {!fullScreen && <Footer />}

      <Tooltip />
    </div>
  );
}

App.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element.isRequired
};

export default App;
