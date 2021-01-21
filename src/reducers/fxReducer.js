import { GET_FX } from '../actions/types';

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
    default:
      return state;
  }
};
