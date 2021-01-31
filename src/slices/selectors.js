import * as fxActions from './fxActions';
import { createSelector } from 'reselect';

export const getReport = (state) => state.fx.report;
export const getChartData = (state) => state.fx.chartData;
export const getChartWidth = (state) => state.fx.chartWidth;
export const getChartHeight = (state) => state.fx.chartHeight;
export const getChartType = (state) => state.fx.reportConfig.chartType;

const getFilters = (state) => state.fx.reportConfig.filters; //the filters for the currently selected report
const getFxState = (state) => state.fx;

//filter1 option values
const getFilter1LoadedOptionValues = (state) => state.fx.Filter1OptionValues;
const getFilter1DefaultOptionValues = (state) =>
  state.fx.reportConfig.filters[0].optionValues;

export const getFilter1OptionValues = createSelector(
  [getFilter1LoadedOptionValues, getFilter1DefaultOptionValues],
  (loaded, defaults) => {
    return loaded.length > 0 ? loaded : defaults;
  }
);

//filters enriched with the refresh function and the value of the filter state attribute
export const getReportFilterDetails = createSelector(
  [getFilters, getFxState],
  (filters, fxState) => {
    return filters.map((filter) => {
      return {
        ...filter,
        inputFieldValue: fxState[filter.inputFieldName],
        filterFunc: fxActions[filter.onChangeFunc],
      };
    });
  }
);

export const getReportRefreshFunc = (state) =>
  state.fx.reportConfig.onChangeFunc;
export const getDefaultValue = (state) => state.fx.reportConfig.defaultValue;

export const getReportRefreshFuncWithDefaults = createSelector(
  [getReportRefreshFunc, getDefaultValue],
  (onChangeFunc, defaultValue) => () => fxActions[onChangeFunc](defaultValue)
);
