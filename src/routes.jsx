import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route, applyRouterMiddleware } from 'react-router';
import useScroll from 'react-router-scroll/lib/useScroll'; // https://github.com/taion/react-router-scroll#minimizing-bundle-size
import { onEnterExploreUrlParams, onChangeExploreUrlParams, shouldUpdateScroll, trackPageView } from 'redactions/routes';


// Components
import App from './App';
import Home from './containers/pages/Home';
import Explore from './containers/pages/Explore';
import ExploreDetail from './containers/pages/ExploreDetail';
import Pulse from './containers/pages/Pulse';
import GetInvolved from './components/pages/GetInvolved';
import SubmitInsight from './components/pages/SubmitInsight';
import ContributeData from './components/pages/ContributeData';
import JoinCommunity from './components/pages/JoinCommunity';
import DevelopApp from './components/pages/DevelopApp';
import About from './components/pages/About';
import Apps from './containers/pages/Apps';
import AppDetail from './containers/pages/AppDetail';
import Partners from './containers/pages/Partners';
import PartnerDetail from './containers/pages/PartnerDetail';

function Routes(props) {
  return (
    <Router
      history={props.history}
      render={applyRouterMiddleware(useScroll(shouldUpdateScroll))}
      onUpdate={trackPageView}
    >
      <Route path="/" component={App}>
        <IndexRoute component={Home} />

        <Route path="explore">
          <IndexRoute component={Explore} onEnter={onEnterExploreUrlParams}
            onChange={onChangeExploreUrlParams} />

          <Route path=":id">
            <IndexRoute component={ExploreDetail} />
          </Route>
        </Route>

        <Route path="planet-pulse">
          <IndexRoute component={Pulse} />
        </Route>

        <Route path="about">
          <IndexRoute component={About} />

          <Route path="partners">
            <IndexRoute component={Partners} />

            <Route path=":id">
              <IndexRoute component={PartnerDetail} />
            </Route>
          </Route>
        </Route>

        <Route path="get-involved">
          <IndexRoute component={GetInvolved} />

          <Route path="submit-insight">
            <IndexRoute component={SubmitInsight} />
          </Route>

          <Route path="contribute-data">
            <IndexRoute component={ContributeData} />
          </Route>

          <Route path="join-community">
            <IndexRoute component={JoinCommunity} />
          </Route>

          <Route path="develop-app">
            <IndexRoute component={DevelopApp} />
          </Route>

          <Route path="apps">
            <IndexRoute component={Apps} />

            <Route path=":id">
              <IndexRoute component={AppDetail} />
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
