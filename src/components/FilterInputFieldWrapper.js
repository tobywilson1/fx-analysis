import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterInputField from './FilterInputField';
import { getReportFilterDetails } from '../slices/selectors';
import { applyFilter } from '../slices/fxActions';

const FilterInputFieldWrapper = ({ report }) => {
  const dispatch = useDispatch();

  //get report filter details
  const inputFieldArray = useSelector(getReportFilterDetails);

  //generate individual filter components
  const result = inputFieldArray.map((filter) => {
    const labelText = filter.labelText;
    const optionValues = filter.optionValues;
    const onChangeFunc = (value) => dispatch(applyFilter(filter.id, value));
    const inputFieldValue = filter.inputFieldValue;
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
