import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

// Components
import App from './App';
import Home from './containers/pages/Home';
import Explore from './containers/pages/Explore';
import Pulse from './containers/pages/Pulse';

function Routes(props) {
  return (
    <Router history={props.history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="explore">
          <IndexRoute component={Explore} />
        </Route>

        <Route path="planet-pulse">
          <IndexRoute component={Pulse} />
        </Route>
      </Route>
    </Router>
  );
}

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
};

export default connect()(Routes);
