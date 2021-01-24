import React from 'react';
import FilterInputField from './FilterInputField';
import { connect } from 'react-redux';
import * as fxActions from '../actions/fxActions';
import filters from '../config.json';
import store from '../store';

const FilterInputFieldWrapper = ({ report, ...rest }) => {
  const inputFieldArray = filters[report].filters;

  const result = inputFieldArray.map((filter) => {
    const labelText = filter.labelText;
    const optionValues = filter.optionValues;
    const onChangeFunc = rest[filter.onChangeFunc];
    const inputFieldValue = rest[filter.inputFieldValue];
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

//the bits of the state we want to add into props
const mapStateToProps = (state) => {
  //const key = filters[report].filters[0].inputFieldValue;
  return {
    //key: state[key],
    ...state,
  };
};

//any actions added to props via second parameter
export default connect(mapStateToProps, {
  ...fxActions,
})(FilterInputFieldWrapper);
