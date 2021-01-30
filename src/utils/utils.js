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

export const getReportConfig = (report) => {
  return filters[report];
};

export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
