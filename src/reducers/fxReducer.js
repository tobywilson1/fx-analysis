import { GET_FX, FX_ERROR, SET_LOADING, CHART_RESIZE } from '../actions/types';

const fxReducer = (state, action) => {
  switch (action.type) {
    case GET_FX:
      return {
        ...state,
        fxPair: action.payload.fxPair,
        chartData: action.payload.timeSeries,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FX_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    case CHART_RESIZE:
      return {
        ...state,
        chartWidth: action.payload.width - 10,
        chartHeight: action.payload.height - 10,
      };
    default:
      return state;
  }
};

export default fxReducer;
