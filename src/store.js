import { configureStore } from '@reduxjs/toolkit';
import fxReducer from './slices/fxSlice';

export default configureStore({
  reducer: {
    fx: fxReducer,
  },
});

// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
// //import rootReducer from './slices/fxSlice';

// const initialState = {
//   report: 'Test',
//   fxPair: 'GBPUSD',
//   chartData: null,
//   chartWidth: 600,
//   chartHeight: 400,
//   current: null,
//   loading: false,
//   error: null,
// };

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
