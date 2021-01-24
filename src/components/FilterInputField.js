import React, { useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const FilterInputField = ({ labelText, inputFieldValue, onChangeFunc }) => {
  const selectRef = useRef(null);

  useEffect(() => {
    //Init Materialize JS
    M.FormSelect.init(selectRef.current);
  });

  const onChange = async (e) => {
    onChangeFunc(e.target.value);
  };

  return (
    <div className='input-field col s12'>
      <select ref={selectRef} value={inputFieldValue} onChange={onChange}>
        <option value='GBPUSD'>GBPUSD</option>
        <option value='GBPEUR'>GBPEUR</option>
      </select>
      <label>{labelText}</label>
    </div>
  );
};

export default FilterInputField;
