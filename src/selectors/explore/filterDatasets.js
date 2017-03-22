import { createSelector } from 'reselect';

// Get datasets
const datasetList = state => state.explore.datasets.list;
const filters = state => state.explore.filters;

// Filter datasets by issues
const getFilteredDatasets = (_list, _filters) => {
  return _list.filter(it => {
    for (let i = _filters.length - 1; i >= 0; i--) {
      const key = it.attributes[_filters[i].key];
      if (!key || key.indexOf(_filters[i].value) === -1) return false;
    }
    return true;
  });
};

// Export the selector
export default createSelector(datasetList, filters, getFilteredDatasets);
