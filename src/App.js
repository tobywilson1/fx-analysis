import React, { useEffect } from 'react';
import Chart from './components/Chart';
import Header from './components/Header';
import Filter from './components/Filter';
import M from 'materialize-css/dist/js/materialize.min.js';
import { refreshReport } from './slices/fxActions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    M.AutoInit(); //Init Materialize JS
    dispatch(refreshReport()); //Refresh report data
  });
  return (
    <div className='container'>
      <Header />
      <div className='row'>
        <div className='col s9 border'>
          <Chart />
        </div>
        <div className='col s3 border'>
          <Filter />
        </div>
      </div>
    </div>
  );
}

export default App;
