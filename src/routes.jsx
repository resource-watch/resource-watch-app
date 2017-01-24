/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

// Components
import App from './App';
import Home from './components/pages/Home';
import Pulse from './components/pages/Pulse';

function Routes(props) {
  return (
    <Router history={props.history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="pulse">
          <IndexRoute component={Pulse} />
        </Route>
      </Route>
    </Router>
  );
}

Routes.propTypes = {
  history: React.PropTypes.object.isRequired,
};

export default connect()(Routes);
