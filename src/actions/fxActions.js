import { GET_FX, FX_ERROR, SET_LOADING, CHART_RESIZE } from './types';
import store from '../store';

const FX_URL = process.env.REACT_APP_FX_URL;

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

    const res = await fetch(`${FX_URL}${fxPair}`);
    const data = await res.json();

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
