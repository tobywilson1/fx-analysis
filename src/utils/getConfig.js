//import store from '../store';
//don't import store into this file since this file is imported into fxSlices which is a dependency for store creation
import filters from '../config.json';

export const getConfigReports = () => {
  return Object.keys(filters);
};

export const getConfig = (report, attr) => {
  //const report = store.getState().report;
  return filters[report][attr];
};
