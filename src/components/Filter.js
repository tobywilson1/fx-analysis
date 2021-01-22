import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { getFx } from '../actions/fxActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const Filter = ({ getFx }) => {
  const selectRef = useRef(null);
  const [fxPair, setFxPair] = useState('');

  useEffect(() => {
    //Init Materialize JS
    M.FormSelect.init(selectRef.current);
  });

  const onChange = (e) => {
    setFxPair(e.target.value);
    getFx(fxPair);
  };

  return (
    <div>
      <div className='input-field col s12'>
        <select ref={selectRef} value={fxPair} onChange={onChange}>
          <option disabled>Choose FX pair</option>
          <option value='GBPUSD'>GBPUSD</option>
          <option value='GBPEUR'>GBPEUR</option>
        </select>
        <label>FX pair</label>
      </div>
    </div>
  );
};

//the bits of the state we want to add into props
const mapStateToProps = (state) => ({});

//any actions added to props via second parameter
export default connect(mapStateToProps, { getFx })(Filter);
