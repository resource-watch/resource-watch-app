import { createSelector } from 'reselect';

// Get datasets
const datasetList = state => state.explore.datasets.list;
const filters = state => state.explore.filters;

// Filter datasets by issues
const getFilteredDatasets = (_list, _filters) => (
  _list.filter((it) => {
    for (let i = 0; i < _filters.length; i++) {
      // Set vocabulary name wether the whole vocabulary is selected or only a specific tag
      // TODO: search in cascade if vocabularies get more levels (picking levels[0] by default)
      const vocName = _filters[i].levels.length ? _filters[i].levels[0] : _filters[i].value;
      const vocabulary = it.attributes.vocabulary.find(voc => voc.attributes.name === vocName);

      // Levels specify wether is necessary to search into the vocabulary or not
      if (_filters[i].levels.length) {
        if (vocabulary && vocabulary.attributes.tags.includes(_filters[i].value)) {
          return true;
        }
      } else if (vocabulary) {
        return true;
      }
    }
    return false;
  })
);

// Export the selector
export default createSelector(datasetList, filters, getFilteredDatasets);
