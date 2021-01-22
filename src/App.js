import React from 'react';
import BarChart from './components/BarChart';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Header />
      <main>
        <div className='row'>
          <div className='col-2-of-3 border'>
            <BarChart />
          </div>
          <div className='col-1-of-3 border'>Filter</div>
        </div>
      </main>
    </Provider>
  );
}

export default App;
