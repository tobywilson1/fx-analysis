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

    console.log(`${FX_URL}${fxPair}`);
    const res = await fetch(`${FX_URL}${fxPair}`, {
      mode: 'no-cors',
    });
    console.log(`res=${res}`);
    const data = await res.json();
    console.log(`data=${data}`);

    dispatch({
      type: GET_FX,
      payload: { fxPair, timeSeries: data.timeSeries },
    });
  } catch (error) {
    dispatch({
      type: FX_ERROR,
      payload: String(error),
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
