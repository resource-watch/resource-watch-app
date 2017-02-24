/* global config */
import 'whatwg-fetch';
import find from 'lodash/find';

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
    limit: 6,
    mode: 'grid' // 'grid' or 'list'
  },
  filters: {} // ?
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
      const active = state.datasets.active.slice(0);
      const index = active.indexOf(action.payload);
      // Toggle the active dataset
      if (index !== -1) {
        active.splice(index, 1);
      } else {
        active.push(action.payload);
      }

      const datasets = Object.assign({}, state.datasets, {
        active
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

export function toggleDatasetActive(id) {
  return {
    type: SET_DATASETS_ACTIVE,
    payload: id
  };
}

export function setDatasetsMode(mode) {
  return {
    type: SET_DATASETS_MODE,
    payload: mode
  };
}
