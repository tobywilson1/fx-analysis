import {
  GET_FX,
  FX_ERROR,
  SET_LOADING,
  CHART_RESIZE,
  SELECT_REPORT,
} from './types';
import store from '../store';
import { getConfig } from '../utils/getConfig';

//Get fx from server
export const getFx = (fxPair) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    //if missing set fxPair to existing fxPair state
    if (!fxPair) {
      fxPair = store.getState().fxPair;
    }

    const FX_URL = getConfig('url');
    const fullURL = `${FX_URL}${fxPair}`;
    const res = await fetch(fullURL);
    const data = await res.json();

    if (res.status !== 200) {
      dispatch({
        type: FX_ERROR,
        payload: data.status,
      });
    }

    dispatch({
      type: GET_FX,
      payload: { fxPair, timeSeries: data.timeSeries },
    });
  } catch (error) {
    dispatch({
      type: FX_ERROR,
      payload: error.response.statusText,
    });
  }
};

//Resize chart for window resize
export const updateChartDims = () => (dispatch) => {
  dispatch({
    type: CHART_RESIZE,
    payload: window.fxChart,
  });
};

//Change report
export const selectReport = (report) => (dispatch) => {
  dispatch({
    type: SELECT_REPORT,
    payload: report,
  });
};
