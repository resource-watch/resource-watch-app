import React from 'react';
import Header from './components/layout/Header';
import './styles/app.scss';

function App(props) {
  return (
    <div>
      <Header />
      { props.children }
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default App;
