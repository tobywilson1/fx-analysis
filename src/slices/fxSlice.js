import { createSlice } from '@reduxjs/toolkit';
import { getConfig } from '../utils/getConfig';

export const slice = createSlice({
  name: 'fx',
  initialState: {
    report: 'Test',
    fxPair: 'GBPUSD',
    chartData: null,
    chartWidth: 600,
    chartHeight: 400,
    current: null,
    loading: false,
    error: null,
  },
  reducers: {
    GET_FX: (state, action) => {
      state.fxPair = action.payload.fxPair;
      state.chartData = action.payload.timeSeries;
      state.loading = false;
    },
    SET_LOADING: (state) => {
      state.loading = true;
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
      state.report = action.payload;
    },
  },
});

export const {
  GET_FX,
  SET_LOADING,
  FX_ERROR,
  CHART_RESIZE,
  SELECT_REPORT,
} = slice.actions;

// Thunk functions for async logic
export const getFx = (fxPair) => async (dispatch, getState) => {
  //debugger;
  try {
    dispatch(SET_LOADING());
    //if missing set fxPair to existing fxPair state
    if (!fxPair) {
      fxPair = getState().fx.fxPair;
      //console.log('fx pair', fxPair, getState());
    }

    const FX_URL = getConfig('url');
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

//Resize chart for window resize
export const updateChartDims = () => (dispatch) =>
  dispatch(CHART_RESIZE(window.fxChart));

//Change report
// export const selectReport = (report) => (dispatch) =>
//   dispatch(SELECT_REPORT(report));

// Selector functions
export const reportValue = (state) => state.fx.report;
export const fxPairValue = (state) => state.fx.fxPair;
export const chartDataValue = (state) => state.fx.chartData;
export const chartWidthValue = (state) => state.fx.chartWidth;
export const chartHeightValue = (state) => state.fx.chartHeight;

export default slice.reducer;
