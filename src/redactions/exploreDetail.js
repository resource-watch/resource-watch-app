/* global config */
// import 'whatwg-fetch';
// import find from 'lodash/find';
// import { replace } from 'react-router-redux';

/**
 * CONSTANTS
*/
const GET_DATASET_SUCCESS = 'explore/GET_DATASET_SUCCESS';
const GET_DATASET_ERROR = 'explore/GET_DATASET_ERROR';
const GET_DATASET_LOADING = 'explore/GET_DATASET_LOADING';
const RESET_DATASET = 'explore/RESET_DATASET';

/**
 * REDUCER
*/
const initialState = {
  dataset: {
    detail: {},
    loading: false,
    error: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATASET_SUCCESS: {
      const dataset = Object.assign({}, state.dataset, {
        detail: action.payload,
        loading: false,
        error: false
      });
      return Object.assign({}, state, { dataset });
    }

    case GET_DATASET_ERROR: {
      const dataset = Object.assign({}, state.dataset, {
        loading: false,
        error: true
      });
      return Object.assign({}, state, { dataset });
    }

    case GET_DATASET_LOADING: {
      const dataset = Object.assign({}, state.dataset, {
        loading: true,
        error: false
      });
      return Object.assign({}, state, { dataset });
    }

    case RESET_DATASET: {
      return initialState;
    }

    default:
      return state;
  }
}

/**
 * ACTIONS
 * - getDataset
 * - resetDataset
*/
export function getDataset(datasetId) {
  return (dispatch) => {
    console.info(datasetId);
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_DATASET_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.API_URL}/dataset/${datasetId}?app=rw&includes=widget,layer&page[size]=${Date.now() / 100000}`))
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((response) => {
        const dataset = response.data;

        dispatch({
          type: GET_DATASET_SUCCESS,
          payload: dataset
        });
      })
      .catch((err) => {
        // Fetch from server ko -> Dispatch error
        dispatch({
          type: GET_DATASET_ERROR,
          payload: err.message
        });
      });
  };
}

export function resetDataset() {
  return {
    type: RESET_DATASET
  };
}

// Let's use {replace} instead of {push}, that's how we will allow users to
// go away from the current page
// export function setUrlParams() {
//   return (dispatch, state) => {
//     const { explore } = state();
//     const { active, page } = explore.dataset;
//     const locationDescriptor = {
//       pathname: '/explore',
//       query: {
//         active: active.length ? active.join(',') : undefined,
//         page
//       }
//     };
//     dispatch(replace(locationDescriptor));
//   };
// }
