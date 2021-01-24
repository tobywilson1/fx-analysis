import React from 'react';
import FilterInputField from './FilterInputField';
import { connect } from 'react-redux';
import { getFx } from '../actions/fxActions';

const Filter = ({ fxPair, getFx }) => {
  return (
    <FilterInputField
      labelText='FX pair'
      inputFieldValue={fxPair}
      onChangeFunc={getFx}
    />
  );
};

//the bits of the state we want to add into props
const mapStateToProps = (state) => ({ fxPair: state.fxPair });

//any actions added to props via second parameter
export default connect(mapStateToProps, { getFx })(Filter);
