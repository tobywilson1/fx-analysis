import React from 'react';
import './App.css';
import BarChart from './components/BarChart';
import { Provider } from 'react-redux';
import store from './store';

// const datas = [
//   [10, 30, 40, 20],
//   [10, 40, 30, 20, 50, 10],
//   [60, 30, 40, 20, 30],
// ];
var i = 0;

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <h2>FX analysis</h2>
        <BarChart />
      </div>
    </Provider>
  );
}

export default App;
