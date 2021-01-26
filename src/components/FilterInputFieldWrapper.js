import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as fxActions from '../slices/fxActions';
import FilterInputField from './FilterInputField';

const FilterInputFieldWrapper = ({ report }) => {
  const dispatch = useDispatch();

  //get report filters from config and add actual state and function references
  const inputFieldArray = useSelector((state) =>
    state.fx.reportConfig.filters.map((filter) => {
      const func = fxActions[filter.onChangeFunc];
      const newFilterObj = {
        ...filter,
        inputFieldValueRef: state.fx[filter.inputFieldValue],
        onChangeFuncRef: (...args) => dispatch(func(...args)),
      };
      return newFilterObj;
    })
  );

  //generate individual filter components
  const result = inputFieldArray.map((filter) => {
    const labelText = filter.labelText;
    const optionValues = filter.optionValues;
    const onChangeFunc = filter.onChangeFuncRef;
    const inputFieldValue = filter.inputFieldValueRef;
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
