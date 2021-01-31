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

export function timestamp(str) {
  return new Date(str).getTime();
}

// Create a list of day and month names.
var weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
export function nth(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

// Create a string representation of the date.
export function noUIFormatDate(date) {
  return (
    weekdays[date.getDay()] +
    ', ' +
    date.getDate() +
    nth(date.getDate()) +
    ' ' +
    months[date.getMonth()] +
    ' ' +
    date.getFullYear()
  );
}
