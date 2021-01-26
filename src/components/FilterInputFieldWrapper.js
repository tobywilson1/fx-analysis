import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getFx, fxPairValue } from '../slices/fxSlice';

import FilterInputField from './FilterInputField';

import { getConfig } from '../utils/getConfig';

const FilterInputFieldWrapper = ({ report }) => {
  const dispatch = useDispatch();

  const fxPair = useSelector(fxPairValue); //need tomake this dynamic so
  const inputFieldArray = getConfig(report, 'filters');

  const result = inputFieldArray.map((filter) => {
    const labelText = filter.labelText;
    const optionValues = filter.optionValues;
    const onChangeFunc = (fxPair) => dispatch(getFx(fxPair)); //rest[filter.onChangeFunc];
    const inputFieldValue = fxPair; //rest[filter.inputFieldValue];
    const id = filter.id;

    return (
      <FilterInputField
        key={id}
        report={report}
        labelText={labelText}
        inputFieldValue={inputFieldValue}
        onChangeFunc={onChangeFunc}
        optionValues={optionValues}
      />
    );
  });

  return result;
};

export default FilterInputFieldWrapper;
