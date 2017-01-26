/* global config */
import 'whatwg-fetch';
import { Deserializer } from 'jsonapi-serializer';

// We should merge the layerSpecPulse with the response of the datasets
import layerSpecPulse from 'utils/layers/layerSpecPulse.json';
import layerExamplePulse from 'utils/layers/layerExamplePulse.json';


/**
 * CONSTANTS
*/
const GET_DATASETS_SUCCESS = 'planetpulse/GET_DATASETS_SUCCESS';
const GET_DATASETS_ERROR = 'planetpulse/GET_DATASETS_ERROR';
const GET_DATASETS_LOADING = 'planetpulse/GET_DATASETS_LOADING';

const SET_ACTIVE_DATASET = 'planetpulse/SET_ACTIVE_DATASET';

const DESERIALIZER = new Deserializer({ keyForAttribute: 'camelCase' });

/**
 * REDUCER
*/
const initialState = {
  layers: [],
  loading: false,
  error: false,
  layerActive: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATASETS_SUCCESS:
      return Object.assign({}, state, { layers: action.payload, loading: false, error: false });
    case GET_DATASETS_ERROR:
      return Object.assign({}, state, { error: true, loading: false });
    case GET_DATASETS_LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    case SET_ACTIVE_DATASET:
      return Object.assign({}, state, { layerActive: (state.layerActive !== action.payload) ? action.payload : null });
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - getDatasets
 * - setActiveDataset
*/
export function getDatasets() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_DATASETS_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.API_URL}/dataset?app=rw&tags=realtime&includes=layer&page[size]=${Date.now()}`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      // Transforn JSON-API-like data
      DESERIALIZER.deserialize(data, (err, datasets) => {
        if (err) throw new Error('Error deserializing json api');
        // Fetch from server ok -> Dispatch datasets
        dispatch({
          type: GET_DATASETS_SUCCESS,
          payload: layerSpecPulse.map((layer) => {
            return Object.assign({}, layerExamplePulse.attributes, layer);
          })
        });
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

export function toggleActiveLayer(id) {
  return {
    type: SET_ACTIVE_DATASET,
    payload: id
  };
}
