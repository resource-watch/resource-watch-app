import { dispatch } from 'main';
import { setDatasetsPage, setDatasetsActive } from 'redactions/explore';

export function onEnterExploreUrlParams(nextState, replace, done) {
  const nextLocation = nextState.location;
  if (nextLocation.query.page) {
    dispatch(setDatasetsPage(+nextLocation.query.page));
  }

  if (nextLocation.query.active) {
    const active = nextLocation.query.active.split(',');
    dispatch(setDatasetsActive(active));
  }

  done();
}

export function onChangeExploreUrlParams(prevState, nextState, replace, done) {
  const prevLocation = prevState.location;
  const nextLocation = nextState.location;
  /* PAGE */
  if (prevLocation.query.page !== nextLocation.query.page) {
    dispatch(setDatasetsPage(+nextLocation.query.page));
  }

  if (nextLocation.query.active) {
    const active = nextLocation.query.active.split(',');
    dispatch(setDatasetsActive(active));
  }

  done();
}
