
import find from 'lodash/find';
import { createSelector } from 'reselect';
import partners from 'json/partners.json';

// Get partner path
const partnerPath = state => state.routing.locationBeforeTransitions.pathname;

// Get partner data
const getPartnerData = (_path) => {
  const name = _getPartnerName(_path);
  const partner = partners.filter(p => p.name === name)[0] || {};
  return partner;
};

// Get partner path and get its name from it
const _getPartnerName = (_path) => {
  const pathArray = _path.split('/');
  const partnerName = decodeURIComponent(pathArray[pathArray.length - 1]);

  return partnerName;
};

// Export the selector
export default createSelector(partnerPath, getPartnerData);
