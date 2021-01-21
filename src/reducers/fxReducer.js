import { GET_FX, FX_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
  chartData: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FX:
      return {
        ...state,
        chartData: action.payload,
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
    default:
      return state;
  }
};
