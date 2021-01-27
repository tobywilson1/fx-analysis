import * as fxActions from './fxActions';
import { createSelector } from 'reselect';

const getFilters = (state) => state.fx.reportConfig.filters; //the filters for the currently selected report
const getFxState = (state) => state.fx;

//filters enriched with the refresh function and the value of the filter state attribute
export const getReportFilterDetails = createSelector(
  [getFilters, getFxState],
  (filters, fxState) => {
    return filters.map((filter) => {
      return {
        ...filter,
        inputFieldValueRef: fxState[filter.inputFieldValue],
        filterFunc: fxActions[filter.onChangeFunc],
      };
    });
  }
);
