/* global config */
import 'whatwg-fetch';
import find from 'lodash/find';
import { replace } from 'react-router-redux';

/**
 * CONSTANTS
*/
const GET_DATASETS_SUCCESS = 'explore/GET_DATASETS_SUCCESS';
const GET_DATASETS_ERROR = 'explore/GET_DATASETS_ERROR';
const GET_DATASETS_LOADING = 'explore/GET_DATASETS_LOADING';

const SET_DATASETS_ACTIVE = 'explore/SET_DATASETS_ACTIVE';
const SET_DATASETS_PAGE = 'explore/SET_DATASETS_PAGE';
const SET_DATASETS_FILTERS = 'explore/SET_DATASETS_FILTERS';
const SET_DATASETS_MODE = 'explore/SET_DATASETS_MODE';

const SET_SIDEBAR = 'explore/SET_SIDEBAR';

/**
 * REDUCER
*/
const initialState = {
  datasets: {
    list: [],
    loading: false,
    error: false,
    active: [],
    page: 1,
    limit: 9,
    mode: 'grid' // 'grid' or 'list'
  },
  filters: [],
  sidebar: {
    open: true,
    width: 0
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATASETS_SUCCESS: {
      const datasets = Object.assign({}, state.datasets, {
        list: action.payload,
        loading: false,
        error: false
      });
      return Object.assign({}, state, { datasets });
    }

    case GET_DATASETS_ERROR: {
      const datasets = Object.assign({}, state.datasets, {
        loading: false,
        error: true
      });
      return Object.assign({}, state, { datasets });
    }

    case GET_DATASETS_LOADING: {
      const datasets = Object.assign({}, state.datasets, {
        loading: true,
        error: false
      });
      return Object.assign({}, state, { datasets });
    }

    case SET_DATASETS_ACTIVE: {
      const datasets = Object.assign({}, state.datasets, {
        active: action.payload
      });

      return Object.assign({}, state, { datasets });
    }

    case SET_DATASETS_PAGE: {
      const datasets = Object.assign({}, state.datasets, {
        page: action.payload
      });
      return Object.assign({}, state, { datasets });
    }

    case SET_DATASETS_MODE: {
      const datasets = Object.assign({}, state.datasets, {
        mode: action.payload
      });
      return Object.assign({}, state, { datasets });
    }

    case SET_DATASETS_FILTERS: {
      return Object.assign({}, state, { filters: action.payload });
    }

    case SET_SIDEBAR: {
      return Object.assign({}, state, {
        sidebar: action.payload
      });
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 * - getDatasets
 * - setDatasetsPage
 * - toggleDatasetActive
*/
export function getDatasets() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_DATASETS_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.API_URL}/dataset?app=rw&includes=widget,layer&page[size]=${Date.now() / 100000}`))
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((response) => {
        // TODO: We should check which app do we want here
        // Filtering datasets that have widget or layer
        // and only belong to RW app
        const datasets = response.data.filter((dataset) => {
          const isRwApp = (dataset.attributes.application.length === 1);
          const hasWidgetDefault = dataset.attributes.widget.length &&
                                   !!find(dataset.attributes.widget, {
                                     attributes: { default: true }
                                   });
          const hasLayerDefault = dataset.attributes.layer.length &&
                                  !!find(dataset.attributes.layer, {
                                    attributes: { default: true }
                                  });
          return isRwApp && (hasWidgetDefault || hasLayerDefault);
        });

        dispatch({
          type: GET_DATASETS_SUCCESS,
          payload: datasets
        });
      })
      .catch((err) => {
        // Fetch from server ko -> Dispatch error
        dispatch({
          type: GET_DATASETS_ERROR,
          payload: err.message
        });
      });
  };
}

export function setDatasetsPage(page) {
  return {
    type: SET_DATASETS_PAGE,
    payload: page
  };
}

export function setDatasetsActive(active) {
  return {
    type: SET_DATASETS_ACTIVE,
    payload: active
  };
}


export function toggleDatasetActive(id) {
  return (dispatch, state) => {
    const { explore } = state();
    const active = explore.datasets.active.slice();
    const index = active.indexOf(id);

    // Toggle the active dataset
    if (index !== -1) {
      active.splice(index, 1);
    } else {
      active.push(id);
    }

    dispatch({
      type: SET_DATASETS_ACTIVE,
      payload: active
    });
  };
}

// Let's use {replace} instead of {push}, that's how we will allow users to
// go away from the current page
export function setUrlParams() {
  return (dispatch, state) => {
    const { explore } = state();
    const { active, page } = explore.datasets;
    const locationDescriptor = {
      pathname: '/explore',
      query: {
        active: active.length ? active.join(',') : undefined,
        page
      }
    };
    dispatch(replace(locationDescriptor));
  };
}

export function setSidebar(options) {
  return {
    type: SET_SIDEBAR,
    payload: options
  };
}

export function setDatasetsFilters(filters) {
  return {
    type: SET_DATASETS_FILTERS,
    payload: filters
  };
}

export function setDatasetsMode(mode) {
  return {
    type: SET_DATASETS_MODE,
    payload: mode
  };
}
