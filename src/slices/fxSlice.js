import { createSlice } from '@reduxjs/toolkit';
import { getConfig, getReportConfig } from '../utils/getConfig';

export const slice = createSlice({
  name: 'fx',
  initialState: {
    report: 'Test',
    reportConfig: getReportConfig('Test'),
    fxPair: 'GBPUSD',
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
    GET_FX: (state, action) => {
      state.fxPair = action.payload.fxPair;
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
      const report = action.payload;
      state.report = report;
      state.reportConfig = getReportConfig(report);
    },
    SAVE_RAW_DATA: (state, action) => {
      state.rawData = action.payload;
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
} = slice.actions;

// Thunk functions for async logic
export const getFx = (fxPair) => async (dispatch, getState) => {
  //debugger;
  try {
    dispatch(SET_LOADING());

    //if missing set fxPair to existing fxPair state
    if (!fxPair) {
      fxPair = getState().fx.fxPair;
    }

    const FX_URL = getConfig(getState().fx.report, 'url');
    const fullURL = `${FX_URL}${fxPair}`;
    const res = await fetch(fullURL);
    const data = await res.json();

    if (res.status !== 200) {
      dispatch(FX_ERROR(data.status));
    }

    dispatch(GET_FX({ fxPair, timeSeries: data.timeSeries }));
  } catch (error) {
    console.error(String(error));
    dispatch(FX_ERROR(String(error)));
  }
};

export const getFrankfurter = (fxPair) => async (dispatch, getState) => {
  //debugger;
  try {
    dispatch(SET_LOADING());

    const FX_URL = getConfig(getState().fx.report, 'url');
    const fullURL = `${FX_URL}`;
    const res = await fetch(fullURL);
    let data = await res.json();

    if (res.status !== 200) {
      dispatch(FX_ERROR(data.status));
      return;
    }

    // //save raw results
    dispatch(SAVE_RAW_DATA(data));

    //need to parse the returned object
    const timeSeries = Object.entries(data.rates).map(
      (dailyData) => dailyData[1][fxPair]
    );
    //dispatch(SAVE_RAW_DATA(timeSeries));

    //test harness
    //const fxPair = 'GBP';
    //timeSeries = [1, 2, 3];

    dispatch(GET_FX({ fxPair, timeSeries }));
  } catch (error) {
    console.error(String(error));
    dispatch(FX_ERROR(String(error)));
  }
};

//Resize chart for window resize
export const updateChartDims = () => (dispatch) =>
  dispatch(CHART_RESIZE(window.fxChart));

// Selector functions
export const reportValue = (state) => state.fx.report;
export const fxPairValue = (state) => state.fx.fxPair;
export const chartDataValue = (state) => state.fx.chartData;
export const chartWidthValue = (state) => state.fx.chartWidth;
export const chartHeightValue = (state) => state.fx.chartHeight;
export const reportConfigValue = (state) => state.fx.reportConfig;

export default slice.reducer;
