import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';
import { onEnterExploreUrlParams, onChangeExploreUrlParams } from 'redactions/routes';

// Components
import App from './App';
import Home from './containers/pages/Home';
import Explore from './containers/pages/Explore';
import Pulse from './containers/pages/Pulse';
import About from './components/pages/About';
import Partners from './containers/pages/Partners';
import PartnerDetail from './containers/pages/Partners/PartnerDetail';

function Routes(props) {
  return (
    <Router history={props.history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="explore">
          <IndexRoute component={Explore} onEnter={onEnterExploreUrlParams} onChange={onChangeExploreUrlParams} />
        </Route>

        <Route path="planet-pulse">
          <IndexRoute component={Pulse} />
        </Route>

        <Route path="about">
          <IndexRoute component={About} />

          <Route path="partners">
            <IndexRoute component={Partners} />

            <Route path=":partner">
              <IndexRoute component={PartnerDetail} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Router>
  );
}

Routes.propTypes = {
  history: React.PropTypes.object.isRequired
};

export default connect()(Routes);
