import groupBy from 'lodash/groupBy';
import { createSelector } from 'reselect';
import layerSpecPulse from 'utils/layers/layerSpecPulse.json';

// Get the pulse
const pulse = state => state.pulse;

// Create a function to compare the current active datatasets and the current pulseIds
const getLayersGroupPulse = (_pulse) => {
  // We will improve this by merging the layerSpec with the dataset.layer
  return groupBy(layerSpecPulse, 'group');
};

// Export the selector
export default createSelector(
  pulse,
  getLayersGroupPulse
);
