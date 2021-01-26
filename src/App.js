import React, { useEffect } from 'react';
import BarChart from './components/BarChart';
import Header from './components/Header';
import Filter from './components/Filter';
import M from 'materialize-css/dist/js/materialize.min.js';

function App() {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  });
  return (
    <div className='container'>
      <Header />
      <div className='row'>
        <div className='col s9 border'>{/* <BarChart /> */}</div>
        <div className='col s3 border'>
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default App;
