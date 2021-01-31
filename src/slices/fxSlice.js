import { createSlice } from '@reduxjs/toolkit';
import { getReportConfig, formatDate } from '../utils/utils';

export const slice = createSlice({
  name: 'fx',
  initialState: {
    report: 'FrankBankAPI',
    reportConfig: getReportConfig('FrankBankAPI'),
    Filter1: '',
    Filter1OptionValues: [],
    Filter2: ['', ''],
    // test: '',
    LastFilterApplied: 'Filter2',
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
    // TEST: (state, action) => {
    //   state.test = action.payload;
    // },
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
      state.LastFilterApplied = action.payload.filter;
    },
    UPDATE_OPTION_VALUES: (state, action) => {
      state.Filter1OptionValues = action.payload;
    },
  },
});

export const {
  TEST,
  GET_FX,
  SET_LOADING,
  FX_ERROR,
  CHART_RESIZE,
  SELECT_REPORT,
  SAVE_RAW_DATA,
  UPDATE_CHART_DATA,
  UPDATE_FILTER,
  UPDATE_OPTION_VALUES,
} = slice.actions;

// Thunk functions with async logic for parsing API data
export const getFx = (fxPair) => async (dispatch, getState) => {
  //debugger;
  try {
    dispatch(SET_LOADING());
    console.log('getFx..');
    //if missing set fxPair to existing fxPair state
    if (!fxPair) {
      fxPair = getState().fx.Filter1;
    }

    //const FX_URL = getConfig(getState().fx.report, 'url');
    const FX_URL = getState().fx.reportConfig.url;
    const fullURL = `${FX_URL}${fxPair}`;
    console.log(`Using URL ${fullURL}`);
    const res = await fetch(fullURL);
    const data = await res.json();

    if (res.status !== 200) {
      dispatch(FX_ERROR(data.status));
    }

    dispatch(UPDATE_CHART_DATA({ timeSeries: data.timeSeries }));
    //dispatch(UPDATE_FILTER({ filter: 'Filter1', value: fxPair }));
  } catch (error) {
    console.error(String(error));
    dispatch(FX_ERROR(String(error)));
  }
};

export const getFrankfurter = (filterValue) => async (dispatch, getState) => {
  //debugger;

  //only grab data from API on initial report load OR when filter2 (dates) is applied
  if (getState().fx.LastFilterApplied === 'Filter2' || !getState().fx.rawData) {
    try {
      dispatch(SET_LOADING());
      console.log('running getFrankfurter API fetch and parser..');
      //const FX_URL = getConfig(getState().fx.report, 'url');

      //load all data for all currencies before filtering later on

      let FX_URL = getState().fx.reportConfig.url.replace(
        '<filter2>',
        !getState().fx.rawData ? '2020-11-01' : filterValue[0]
      );

      let today = new Date();
      let lastBusinessDay = today.setDate(today.getDate()); //estimated
      //console.log(lastBusinessDay);

      FX_URL = FX_URL.replace(
        '<currentdate>',
        !getState().fx.rawData ? formatDate(lastBusinessDay) : filterValue[1]
      );

      console.log(`Using URL ${FX_URL}`);
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
      const timeSeries = Object.entries(rawData.rates).map((dailyData) => [
        dailyData[0],
        dailyData[1][getState().fx.Filter1.substring(3)],
      ]);

      dispatch(UPDATE_CHART_DATA({ timeSeries }));

      const firstDatesData = rawData.rates[Object.keys(rawData.rates)[0]];
      const ccyList = Object.keys(firstDatesData).map((ccy) => 'EUR' + ccy);

      //console.log(ccyList);
      console.log('Updating Filter1 dropdown list with ccy pairs..');
      dispatch(UPDATE_OPTION_VALUES([...ccyList]));
    } catch (error) {
      console.error(String(error));
      dispatch(FX_ERROR(String(error)));
    }
  } else if (getState().fx.LastFilterApplied === 'Filter1') {
    //need to update the chart data from the raw data that's already been stored
    console.log(
      'Updating chart data from raw data using supplied currency filter'
    );
    const data = getState().fx.rawData;

    const timeSeries = Object.entries(data.rates).map((dailyData) => [
      dailyData[0],
      dailyData[1][filterValue.substring(3)],
    ]);

    dispatch(UPDATE_CHART_DATA({ timeSeries }));
  } else {
    console.error('Unrecognised condition in function getFrankfurter');
  }
};

//Resize chart for window resize
export const updateChartDims = () => (dispatch) =>
  dispatch(CHART_RESIZE(window.fxChart));

const getRefreshFunc = (getState) => {
  //obtain data parsing functions
  const thunkNameSpace = {
    getFx,
    getFrankfurter,
  };

  const refreshFuncString = getState().fx.reportConfig.onChangeFunc;
  const reportRefreshFunc = thunkNameSpace[refreshFuncString];
  return reportRefreshFunc;
};

//Refresh report with default values
export const refreshReport = () => async (dispatch, getState) => {
  const defaultValue = getState().fx.reportConfig.defaultValue;
  const reportRefreshFunc = getRefreshFunc(getState);
  console.log(
    `Refreshing report data via ${reportRefreshFunc.name} with report default input ${defaultValue}`
  );

  dispatch(reportRefreshFunc(defaultValue));
  dispatch(applyDefaultFilters());
};

export const applyFilter = (id, value) => async (dispatch, getState) => {
  console.log(`Applying filter${id} of value ${value}`);
  dispatch(UPDATE_FILTER({ filter: `Filter${id}`, value: value }));

  const reportRefreshFunc = getRefreshFunc(getState);
  //debugger;
  console.log(
    `Refreshing report data via ${reportRefreshFunc.name} with user-entered filter${id} value ${value}`
  );

  dispatch(reportRefreshFunc(value));
};

export const applyDefaultFilters = () => async (dispatch, getState) => {
  console.log('Applying default filter1 to report data');

  //update filter1 **need to generalise this logic**
  const filter1DefaultValue = getState().fx.reportConfig.filters.find(
    (filter) => filter.id === 1
  ).defaultOptionValue;
  dispatch(UPDATE_FILTER({ filter: 'Filter1', value: filter1DefaultValue }));

  //update filter2 **need to generalise this logic**
  const filter2DefaultValue = getState().fx.reportConfig.filters.find(
    (filter) => filter.id === 2
  )?.defaultOptionValue;
  dispatch(UPDATE_FILTER({ filter: 'Filter2', value: filter2DefaultValue }));
};

//Select report
export const selectReport = (report) => async (dispatch, getState) => {
  console.log(`Selecting new report ${report}`);
  dispatch(
    SELECT_REPORT({
      report,
      reportConfig: getReportConfig(report),
    })
  );

  dispatch(refreshReport());
};

export default slice.reducer;
