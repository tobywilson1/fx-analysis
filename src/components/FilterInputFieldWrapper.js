import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterInputField from './FilterInputField';
import {
  getReportFilterDetails,
  getFilter1OptionValues,
} from '../slices/selectors';
import { applyFilter } from '../slices/fxActions';
import DateRange from './DateRange';

const FilterInputFieldWrapper = ({ report }) => {
  const dispatch = useDispatch();

  //get report filter details
  const inputFieldArray = useSelector(getReportFilterDetails);

  //get option values
  const filter1OptionValues = useSelector(getFilter1OptionValues);

  //generate individual filter components
  const result = inputFieldArray.map((filter) => {
    const labelText = filter.labelText;
    const optionValues = filter1OptionValues;
    const onChangeFunc = (value) => dispatch(applyFilter(filter.id, value));
    const inputFieldValue = filter.inputFieldValue;
    const id = filter.id;
    const inputType = filter.inputType;

    return inputType === 'dropdown' ? (
      <FilterInputField
        key={id}
        report={report}
        labelText={labelText}
        inputFieldValue={inputFieldValue}
        onChangeFunc={onChangeFunc}
        optionValues={optionValues}
      />
    ) : (
      <DateRange
        key={id}
        labelText={labelText}
        inputFieldValue={inputFieldValue}
        onChangeFunc={onChangeFunc}
      />
    );
  });

  return result;
};

export default FilterInputFieldWrapper;
