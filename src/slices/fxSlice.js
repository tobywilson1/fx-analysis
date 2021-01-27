import { createSlice } from '@reduxjs/toolkit';
import { getReportConfig } from '../utils/getConfig';

export const slice = createSlice({
  name: 'fx',
  initialState: {
    report: 'Test',
    reportConfig: getReportConfig('Test'),
    Filter1: '',
    rawData: null,
    chartData: null,
    chartWidth: 600,
    chartHeight: 400,
    current: null,
    loading: false,
    error: null,
  },
  //these are the simple actions that work directly on the state
  reducers: {
    UPDATE_CHART_DATA: (state, action) => {
      state.chartData = action.payload.timeSeries;
      state.loading = false;
    },
    SET_LOADING: (state) => {
      state.loading = true;
      state.error = null;
    },
    FX_ERROR: (state, action) => {
      console.error(action.payload);
      state.error = action.payload;
    },
    CHART_RESIZE: (state, action) => {
      state.chartWidth = action.payload.width - 10;
      state.chartHeight = action.payload.height - 10;
    },
    SELECT_REPORT: (state, action) => {
      state.report = action.payload.report;
      state.reportConfig = action.payload.reportConfig;
      state.rawData = null;
      state.chartData = null;
    },
    SAVE_RAW_DATA: (state, action) => {
      state.rawData = action.payload;
    },
    UPDATE_FILTER: (state, action) => {
      state[action.payload.filter] = action.payload.value;
    },
  },
});

export const {
  GET_FX,
  SET_LOADING,
  FX_ERROR,
  CHART_RESIZE,
  SELECT_REPORT,
  SAVE_RAW_DATA,
  UPDATE_CHART_DATA,
  UPDATE_FILTER,
} = slice.actions;

// Thunk functions with async logic for parsing API data
export const getFx = (fxPair) => async (dispatch, getState) => {
  //debugger;
  try {
    dispatch(SET_LOADING());
    console.log('getFx..');
    //if missing set fxPair to existing fxPair state
    if (!fxPair) {
      fxPair = getState().fx.fxPair;
    }

    //const FX_URL = getConfig(getState().fx.report, 'url');
    const FX_URL = getState().fx.reportConfig.url;
    const fullURL = `${FX_URL}${fxPair}`;
    const res = await fetch(fullURL);
    const data = await res.json();

    if (res.status !== 200) {
      dispatch(FX_ERROR(data.status));
    }

    dispatch(UPDATE_CHART_DATA({ fxPair, timeSeries: data.timeSeries }));
    dispatch(UPDATE_FILTER({ filter: 'Filter1', value: fxPair }));
  } catch (error) {
    console.error(String(error));
    dispatch(FX_ERROR(String(error)));
  }
};

export const getFrankfurter = (fxPair) => async (dispatch, getState) => {
  //debugger;
  try {
    dispatch(SET_LOADING());
    console.log('getFrankfurter..');
    //const FX_URL = getConfig(getState().fx.report, 'url');

    //load all data for all currencies before filtering later on
    const FX_URL = getState().fx.reportConfig.url;
    const fullURL = FX_URL;
    const res = await fetch(fullURL);
    let data = await res.json();

    if (res.status !== 200) {
      dispatch(FX_ERROR(data.status));
      return;
    }

    // parse rawData (testing only)
    const rawData = data;
    //console.log(typeof rawData);

    // //save raw results
    dispatch(SAVE_RAW_DATA(rawData));

    //need to parse the returned object
    const timeSeries = Object.entries(data.rates).map((dailyData) => [
      dailyData[0],
      dailyData[1][fxPair],
    ]);

    //rawData.unshift(['date', 'value']);

    dispatch(UPDATE_CHART_DATA({ fxPair, timeSeries }));
    dispatch(UPDATE_FILTER({ filter: 'Filter1', value: fxPair }));
  } catch (error) {
    console.error(String(error));
    dispatch(FX_ERROR(String(error)));
  }
};

//Resize chart for window resize
export const updateChartDims = () => (dispatch) =>
  dispatch(CHART_RESIZE(window.fxChart));

//Refresh report with default values
export const refreshReport = () => async (dispatch, getState) => {
  console.log('Refreshing chart data');

  //obtain data parsing functions
  const thunkNameSpace = {
    getFx,
    getFrankfurter,
  };

  //refresh chart data
  const refreshFuncString = getState().fx.reportConfig.onChangeFunc;
  const defaultValue = getState().fx.reportConfig.defaultValue;

  var reportRefreshFunc = thunkNameSpace[refreshFuncString];
  console.log(
    `Refreshing report data via ${refreshFuncString} with input ${defaultValue}`
  );

  dispatch(reportRefreshFunc(defaultValue));

  //update filter1 **need to generalise this logic**
  const filter1DefaultValue = getState().fx.reportConfig.filters.find(
    (filter) => filter.id === 1
  ).defaultOptionValue;
  dispatch(UPDATE_FILTER({ filter: 'Filter1', value: filter1DefaultValue }));
};

//Select report
export const selectReport = (report) => async (dispatch, getState) => {
  console.log('Selecting new report');
  dispatch(
    SELECT_REPORT({
      report,
      reportConfig: getReportConfig(report),
    })
  );

  refreshReport();
};

export default slice.reducer;
