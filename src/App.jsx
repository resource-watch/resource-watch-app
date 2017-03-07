import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './styles/app.scss';

const nonFooter = [
  '/explore',
  '/planet-pulse',
];

function App(props) {
  return (
    <div>
      <Header />
      { props.children }
      {nonFooter.indexOf(props.location.pathname) === -1 && <Footer />}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
