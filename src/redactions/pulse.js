/* global config */
import 'whatwg-fetch';
import find from 'lodash/find';
import { Deserializer } from 'jsonapi-serializer';

// We should merge the layerSpecPulse with the response of the layers
import layerSpecPulse from 'utils/layers/layerSpecPulse.json';


/**
 * CONSTANTS
*/
const GET_LAYERS_SUCCESS = 'planetpulse/GET_LAYERS_SUCCESS';
const GET_LAYERS_ERROR = 'planetpulse/GET_LAYERS_ERROR';
const GET_LAYERS_LOADING = 'planetpulse/GET_LAYERS_LOADING';

const SET_ACTIVE_LAYER = 'planetpulse/SET_ACTIVE_LAYER';

const DESERIALIZER = new Deserializer({ keyForAttribute: 'camelCase' });

/**
 * REDUCER
*/
const initialState = {
  layers: [],
  loading: false,
  error: false,
  layerActive: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LAYERS_SUCCESS:
      return Object.assign({}, state, { layers: action.payload, loading: false, error: false });
    case GET_LAYERS_ERROR:
      return Object.assign({}, state, { error: true, loading: false });
    case GET_LAYERS_LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    case SET_ACTIVE_LAYER:
      return Object.assign({}, state, {
        layerActive: (state.layerActive !== action.payload) ? action.payload : null,
      });
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - getLayers
 * - setActiveDataset
*/
export function getLayers() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_LAYERS_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.API_URL}/layer?app=rw&tags=real_time&page[size]=${Date.now() / 100000}`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      // Transforn JSON-API-like data
      DESERIALIZER.deserialize(data, (err, layers) => {
        if (err) throw new Error('Error deserializing json api');
        // Fetch from server ok -> Dispatch layers
        dispatch({
          type: GET_LAYERS_SUCCESS,
          payload: layers.map((layer) => {
            const layerSpec = find(layerSpecPulse, { id: layer.id });
            return Object.assign({}, layerSpec, layer);
          }),
        });
      });
    })
    .catch((err) => {
      // Fetch from server ko -> Dispatch error
      dispatch({
        type: GET_LAYERS_ERROR,
        payload: err.message,
      });
    });
  };
}

export function toggleActiveLayer(id) {
  return {
    type: SET_ACTIVE_LAYER,
    payload: id,
  };
}
