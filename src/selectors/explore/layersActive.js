import find from 'lodash/find';
import { createSelector } from 'reselect';
// import layerSpec from 'utils/layers/layer_spec.json';

// Get the datasets and filters from state
const datasets = state => state.explore.datasets.list;
const activeLayers = state => state.explore.datasets.active;

// Create a function to compare the current active datatasets and the current datasetsIds
const getActiveLayers = (_datasets, _activeLayers) => {
  const layerList = [];
  const activeDatasets = [];
  let layer;

  if (_datasets.length) {
    _activeLayers.forEach((id) => {
      const matchDataset = _datasets.filter((d) => d.id === id)[0];
      activeDatasets.push(matchDataset);
    });

    activeDatasets.forEach((dataset, i) => {
      if (dataset && dataset.attributes.layer.length) {
        layer = {
          name: dataset.attributes.name,
          subtitle: dataset.attributes.subtitle,
          ...dataset.attributes.layer[0].attributes,
          order: i + 1
        };

        layerList.push(Object.assign({}, layer));
      }
    });
  }

  return layerList;
};

// Export the selector
export default createSelector(
  datasets,
  activeLayers,
  getActiveLayers
);
