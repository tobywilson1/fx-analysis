import { GET_FX, FX_ERROR, SET_LOADING, CHART_RESIZE } from './types';

//Get fx from server
export const getFx = (fxPair = 'GBPUSD') => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const res = await fetch(`/fxData/${fxPair}`);
    const data = await res.json();

    dispatch({
      type: GET_FX,
      payload: data.timeSeries,
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
