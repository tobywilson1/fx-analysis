import React from 'react';
import FilterInputField from './FilterInputField';
import { connect } from 'react-redux';
import { getFx, selectReport } from '../actions/fxActions';

const Filter = ({ report, selectReport, fxPair, getFx }) => {
  return (
    <>
      <FilterInputField
        labelText='Report'
        inputFieldValue={report}
        onChangeFunc={selectReport}
        optionValues={['Test', 'FrAPI']}
      />
      <FilterInputField
        labelText='FX pair'
        inputFieldValue={fxPair}
        onChangeFunc={getFx}
        optionValues={['GBPUSD', 'GBPEUR']}
      />
    </>
  );
};

//the bits of the state we want to add into props
const mapStateToProps = (state) => ({
  report: state.report,
  fxPair: state.fxPair,
});

//any actions added to props via second parameter
export default connect(mapStateToProps, { getFx, selectReport })(Filter);
