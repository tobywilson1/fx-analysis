import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as fxActions from '../slices/fxActions';
import FilterInputField from './FilterInputField';
import { createSelector } from 'reselect';

const getFilters = (state) => state.fx.reportConfig.filters;
const getFxState = (state) => state.fx;

const getFilterDetails = createSelector(
  [getFilters, getFxState],
  (filters, fxState) => {
    return filters.map((filter) => {
      return {
        ...filter,
        inputFieldValueRef: fxState[filter.inputFieldValue],
        filterFunc: fxActions[filter.onChangeFunc],
      };
    });
  }
);

const FilterInputFieldWrapper = ({ report }) => {
  const dispatch = useDispatch();

  //get report filters from config and add actual state and function references
  const inputFieldArray = useSelector(getFilterDetails);

  //generate individual filter components
  const result = inputFieldArray.map((filter) => {
    const labelText = filter.labelText;
    const optionValues = filter.optionValues;
    const onChangeFunc = (...args) => dispatch(filter.filterFunc(...args));
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
