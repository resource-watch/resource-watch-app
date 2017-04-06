/* global config */
import 'whatwg-fetch';
import find from 'lodash/find';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';

// We should merge the layerSpecPulse with the response of the layers
import layerSpecPulse from 'utils/layers/layerSpecPulse.json';


/**
 * CONSTANTS
*/
const GET_LAYERS_SUCCESS = 'planetpulse/GET_LAYERS_SUCCESS';
const GET_LAYERS_ERROR = 'planetpulse/GET_LAYERS_ERROR';
const GET_LAYERS_LOADING = 'planetpulse/GET_LAYERS_LOADING';

const SET_ACTIVE_LAYER = 'planetpulse/SET_ACTIVE_LAYER';

const GET_LAYER_POINTS_SUCCESS = 'planetpulse/GET_LAYER_POINTS_SUCCESS';
const GET_LAYER_POINTS_ERROR = 'planetpulse/GET_LAYER_POINTS_ERROR';


/**
 * REDUCER
*/
const initialState = {
  layers: [],
  loading: false,
  error: false,
  layerActive: null,
  layerPoints: []
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
        layerActive: (state.layerActive !== action.payload) ? action.payload : null
      });
    case GET_LAYER_POINTS_SUCCESS:
      return Object.assign({}, state, {
        layerPoints: action.payload,
        error: false
      });
    case GET_LAYER_POINTS_ERROR:
      return Object.assign({}, state, {
        layerPoints: action.payload,
        error: true
      });
    default:
      return state;
  }
}

/**
 * ACTIONS
 * - getLayers
 * - setActiveDataset
 * - getLayerPoints
*/
export function getLayers() {
  function getLayerFromDataset(dataset) {
    const hasVocabulary = dataset.attributes.vocabulary && dataset.attributes.vocabulary.length;

    if (hasVocabulary) {
      const vocabulary = dataset.attributes.vocabulary.find(v => v.attributes.name === 'legacy');
      if (vocabulary) {
        return compact(dataset.attributes.layer.map((layer) => {
          if (!layer.attributes.default && layer.attributes.staticImageConfig) {
            const layerSpec = find(layerSpecPulse, { id: layer.id });
            return Object.assign({}, layerSpec, layer.attributes);
          }
          return null;
        }));
      }
    }
    return null;
  }
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_LAYERS_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.API_URL}/dataset?application=rw&status=saved&includes=vocabulary,layer&vocabulary[function]=planet_pulse&page[size]=${Date.now() / 100000}`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((response) => {
      const datasets = response.data;
      const layers = compact(flatten(datasets.map(getLayerFromDataset)));
      dispatch({
        type: GET_LAYERS_SUCCESS,
        payload: layers
      });
    })
    .catch((err) => {
      // Fetch from server ko -> Dispatch error
      dispatch({
        type: GET_LAYERS_ERROR,
        payload: err.message
      });
    });
  };
}

export function toggleActiveLayer(id) {
  return {
    type: SET_ACTIVE_LAYER,
    payload: id
  };
}

export function getLayerPoints(datasetId, tableName) {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    // dispatch({ type: GET_LAYERS_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.API_URL}/query/${datasetId}?sql=SELECT *, st_y(the_geom) AS lat, st_x(the_geom) AS lon FROM ${tableName}`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((response) => {
      dispatch({
        type: GET_LAYER_POINTS_SUCCESS,
        payload: response.data
      });
    })
    .catch((err) => {
      // Fetch from server ko -> Dispatch error
      dispatch({
        type: GET_LAYER_POINTS_ERROR,
        payload: err.message
      });
    });
  };
}
