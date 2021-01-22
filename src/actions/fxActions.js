import { GET_FX, FX_ERROR, SET_LOADING } from './types';

//Get fx from server
export const getFx = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const res = await fetch('/fxData/1');
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
// export const updateChartDims = () => async (dispatch) => {

//     dispatch({
//       type: FX_ERROR,
//       payload: error.response.statusText,
//     });

// };
