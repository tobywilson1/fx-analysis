import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const Filter = () => {
  const selectRef = useRef(null);
  const [fxPair, setFxPair] = useState('');

  useEffect(() => {
    //Init Materialize JS
    M.FormSelect.init(selectRef.current);
  });

  return (
    <div>
      <div className='input-field col s12'>
        <select
          ref={selectRef}
          value={fxPair}
          onChange={(e) => setFxPair(e.target.value)}
        >
          <option disabled>Choose FX pair</option>
          <option value='1'>GBPUSD</option>
          <option value='2'>GBPEUR</option>
        </select>
        <label>FX pair</label>
      </div>
    </div>
  );
};

export default Filter;
