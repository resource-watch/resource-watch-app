import React from 'react';
import Header from './components/layout/Header';
import './styles/app.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        { this.props.children }
      </div>
    );
  }

}

export default App;
