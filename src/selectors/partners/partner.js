
import find from 'lodash/find';
import { createSelector } from 'reselect';

// Get partner path
const partnerPath = state => state.routing.locationBeforeTransitions.pathname;

// Get partner path and get its name from it
const getPartnerId = (_partnerPath) => {
  const pathArray = _partnerPath.split('/');
  const partnerId = decodeURIComponent(pathArray[pathArray.length - 1]);

  return partnerId;
};

// Export the selector
export default createSelector(partnerPath, getPartnerId);
