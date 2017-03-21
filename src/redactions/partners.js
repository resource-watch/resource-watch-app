/* global config */
import 'whatwg-fetch';
import { find, compact, flatten } from 'lodash';

/**
 * CONSTANTS
*/
const GET_PARTNERS_SUCCESS = 'explore/GET_PARTNERS_SUCCESS';
const GET_PARTNERS_ERROR = 'explore/GET_PARTNERS_ERROR';
const GET_PARTNERS_LOADING = 'explore/GET_PARTNERS_LOADING';

/**
 * REDUCER
*/
const initialState = {
  list: [],
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PARTNERS_SUCCESS: {
      const partners = Object.assign({}, state.partners, {
        list: action.payload,
        loading: false,
        error: false
      });
      return Object.assign({}, state, { partners });
    }

    case GET_PARTNERS_ERROR: {
      const partners = Object.assign({}, state.partners, {
        loading: false,
        error: true
      });
      return Object.assign({}, state, { partners });
    }

    case GET_PARTNERS_LOADING: {
      const partners = Object.assign({}, state.partners, {
        loading: true,
        error: false
      });
      return Object.assign({}, state, { partners });
    }
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - getPartners
*/
export function getPartners() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_PARTNERS_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.CMS_API_URL}/partners`))
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((response) => {
        // TODO: We should check which app do we want here
        // Filtering partners that have widget or layer
        // and only belong to RW app
        const partners = response.data;
        // .filter((dataset) => {
        //   const isRwApp = (dataset.attributes.application.length === 1) && dataset.attributes.application.includes('rw');
        //   // const hasWidgetDefault = dataset.attributes.widget.length &&
        //   //                          !!find(dataset.attributes.widget, {
        //   //                            attributes: { default: true }
        //   //                          });
        //   // const hasLayerDefault = dataset.attributes.layer.length &&
        //   //                         !!find(dataset.attributes.layer, {
        //   //                           attributes: { default: true }
        //   //                         });
        //   // return isRwApp && (hasWidgetDefault || hasLayerDefault);
        //   return isRwApp;
        // });

        dispatch({
          type: GET_PARTNERS_SUCCESS,
          payload: partners
        });
      })
      .catch((err) => {
        // Fetch from server ko -> Dispatch error
        dispatch({
          type: GET_PARTNERS_ERROR,
          payload: err.message
        });
      });
  };
}
