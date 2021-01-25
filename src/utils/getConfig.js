import store from '../store';
import filters from '../config.json';

export const getConfigReports = () => {
  return Object.keys(filters);
};

export const getConfig = (attr) => {
  const report = store.getState().report;
  return filters[report][attr];
};
