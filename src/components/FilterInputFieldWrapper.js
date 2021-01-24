import React from 'react';
import FilterInputField from './FilterInputField';
import { connect } from 'react-redux';
import * as fxActions from '../actions/fxActions';
import filters from '../config.json';
import store from '../store';

const FilterInputFieldWrapper = ({ report, filterId, ...rest }) => {
  const labelText = filters[report][filterId].labelText;
  const optionValues = filters[report][filterId].optionValues;
  const onChangeFunc = rest[filters[report][filterId].onChangeFunc];
  const { fxPair } = rest;

  return (
    <FilterInputField
      report={report}
      labelText={labelText}
      inputFieldValue={fxPair}
      onChangeFunc={onChangeFunc}
      optionValues={optionValues}
    />
  );
};

//the bits of the state we want to add into props
const mapStateToProps = (state) => {
  const report = state.report;
  const key = filters[report].filter1.inputFieldValue;
  return {
    key: state[key],
  };
};

//any actions added to props via second parameter
export default connect(mapStateToProps, {
  ...fxActions,
})(FilterInputFieldWrapper);
