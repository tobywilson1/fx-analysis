import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

//import { getFx, fxPairValue, reportConfigValue } from '../slices/fxSlice';
import * as fxActions from '../slices/fxSlice';

import FilterInputField from './FilterInputField';

//import { getConfig } from '../utils/getConfig';

const FilterInputFieldWrapper = ({ report }) => {
  const dispatch = useDispatch();

  //get report filters
  //const reportConfig = useSelector(reportConfigValue); //need tomake this dynamic so
  //const inputFieldArray = reportConfig.filters; //getConfig(report, 'filters');
  const inputFieldArray = useSelector((state) =>
    state.fx.reportConfig.filters.map((filter) => {
      //const addRefs = { inputFieldValueRef: state['FxPair']}
      console.log(filter.onChangeFunc);
      const func = fxActions[filter.onChangeFunc];
      const newFilterObj = {
        ...filter,
        inputFieldValueRef: state.fx[filter.inputFieldValue],
        //onChangeFuncRef: func,
        onChangeFuncRef: (fxPair) => dispatch(func(fxPair)),
      };
      console.log(newFilterObj);
      console.log(typeof func);
      return newFilterObj;
    })
  );

  //const fxPair = useSelector((state) => state['FxPair']);
  //const fxPair = useSelector(fxPairValue); //need tomake this dynamic so

  const result = inputFieldArray.map((filter) => {
    const labelText = filter.labelText;
    const optionValues = filter.optionValues;
    const onChangeFunc = filter.onChangeFuncRef; //(fxPair) => dispatch(getFx(fxPair)); //rest[filter.onChangeFunc];
    //const onChangeFunc = (fxPair) => dispatch(getFx(fxPair)); //rest[filter.onChangeFunc];
    const inputFieldValue = filter.inputFieldValueRef; //fxPair; //rest[filter.inputFieldValue];
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
