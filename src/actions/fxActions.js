import { GET_FX } from './types';

// //Get fx from server
export const getFx = () => async (dispatch) => {
  // try {
  //   setLoading();

  const res = await fetch('/fxData/1');
  const data = await res.json();

  //console.log(data);
  //console.log(data.timeSeries);

  dispatch({
    type: GET_FX,
    payload: data.timeSeries,
  });

  // } catch (error) {
  //   dispatch({
  //     type: LOGS_ERROR,
  //     payload: error.response.statusText,
  //   });
  // }
};

// //Add new log
// export const addLog = (log) => async (dispatch) => {
//   try {
//     setLoading();

//     const res = await fetch('/logs', {
//       method: 'POST',
//       body: JSON.stringify(log),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await res.json();

//     dispatch({
//       type: ADD_LOG,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGS_ERROR,
//       payload: error.response.statusText,
//     });
//   }
// };

// //Delete log from server
// export const deleteLog = (id) => async (dispatch) => {
//   try {
//     setLoading();

//     await fetch(`/logs/${id}`, {
//       method: 'DELETE',
//     });

//     dispatch({
//       type: DELETE_LOG,
//       payload: id,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGS_ERROR,
//       payload: error.response.statusText,
//     });
//   }
// };

// //Update log on server
// export const updateLog = (log) => async (dispatch) => {
//   try {
//     setLoading();

//     const res = await fetch(`/logs/${log.id}`, {
//       method: 'PUT',
//       body: JSON.stringify(log),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await res.json();

//     dispatch({
//       type: UPDATE_LOG,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGS_ERROR,
//       payload: error.response.statusText,
//     });
//   }
// };

// //Search logs
// export const searchLogs = (text) => async (dispatch) => {
//   try {
//     setLoading();

//     const res = await fetch(`/logs?q=${text}`);
//     const data = await res.json();

//     dispatch({
//       type: SEARCH_LOGS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGS_ERROR,
//       payload: error.response.statusText,
//     });
//   }
// };

// //Set current log
// export const setCurrent = (log) => {
//   return {
//     type: SET_CURRENT,
//     payload: log,
//   };
// };

// //Clear current log
// export const clearCurrent = () => {
//   return {
//     type: CLEAR_CURRENT,
//   };
// };

// //Set loading to true (course comments: this should be dispatched)
// export const setLoading = () => {
//   return {
//     type: SET_LOADING,
//   };
// };
