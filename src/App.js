import React, { useEffect } from 'react';
import BarChart from './components/BarChart';
import Header from './components/Header';
import Filter from './components/Filter';
import { Provider } from 'react-redux';
import store from './store';
import M from 'materialize-css/dist/js/materialize.min.js';

function App() {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <div className='container'>
        <Header />
        <div className='row'>
          <div className='col s9 border'>
            <BarChart />
          </div>
          <div className='col s3 border'>
            <Filter />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
