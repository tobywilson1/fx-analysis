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

    const fullURL = `${FX_URL}${fxPair}`;
    //console.log(fullURL);
    // const res = await fetch({
    //   fullURL,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // });
    const res = await fetch(fullURL);
    console.log(res);
    //debugger;
    const data = await res.json();
    console.log(data);

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
