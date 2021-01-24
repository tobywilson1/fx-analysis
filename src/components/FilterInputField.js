import React, { useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const FilterInputField = ({
  report,
  labelText,
  inputFieldValue,
  onChangeFunc,
  optionValues,
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    //Init Materialize JS
    M.FormSelect.init(selectRef.current);
  }, [inputFieldValue, report]);

  const onChange = async (e) => {
    onChangeFunc(e.target.value);
  };

  return (
    <div className='input-field col s12'>
      <select ref={selectRef} value={inputFieldValue} onChange={onChange}>
        {optionValues.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label>{labelText}</label>
    </div>
  );
};

export default FilterInputField;
