/* global config */
import 'whatwg-fetch';

/**
 * CONSTANTS
*/
const GET_PARTNER_SUCCESS = 'explore/GET_PARTNER_SUCCESS';
const GET_PARTNER_ERROR = 'explore/GET_PARTNER_ERROR';
const GET_PARTNER_LOADING = 'explore/GET_PARTNER_LOADING';
const SET_PARTNER_ID = 'explore/SET_PARTNER_ID';

/**
 * REDUCER
*/
const initialState = {
  data: null,
  id: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PARTNER_SUCCESS: {
      return Object.assign({}, state, {
        data: action.payload,
        loading: false,
        error: false
      });
    }

    case GET_PARTNER_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    }

    case GET_PARTNER_LOADING: {
      return Object.assign({}, state, {
        loading: true,
        error: false
      });
    }

    case SET_PARTNER_ID: {
      return Object.assign({}, state, {
        id: action.payload
      });
    }
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - getPartnerData
*/
export function getPartnerData(id) {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_PARTNER_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.CMS_API_URL}/api/partners/${id}`))
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((response) => {
        // TODO: filter by those who are published
        const data = response.data;

        dispatch({
          type: GET_PARTNER_SUCCESS,
          payload: data
        });
      })
      .catch((err) => {
        // Fetch from server ko -> Dispatch error
        dispatch({
          type: GET_PARTNER_ERROR,
          payload: err.message
        });
      });
  };
}

export function setPartnerId(id) {
  return (dispatch) => {
    dispatch({
      type: SET_PARTNER_ID,
      payload: id
    });
    dispatch(replace(locationDescriptor));
  };
}