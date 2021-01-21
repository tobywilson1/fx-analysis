import React from 'react';
import './App.css';
import BarChart from './components/BarChart';
import { Provider } from 'react-redux';
import store from './store';

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
