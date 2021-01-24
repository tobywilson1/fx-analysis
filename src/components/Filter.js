import React from 'react';
import FilterInputField from './FilterInputField';
import { connect } from 'react-redux';
import * as fxActions from '../actions/fxActions';
import filters from '../config.json';

const Filter = ({ report, selectReport, fxPair, getFx }) => {
  return (
    <>
      <FilterInputField
        report={report}
        labelText='Report'
        inputFieldValue={report}
        onChangeFunc={selectReport}
        optionValues={['Test', 'FrAPI']}
      />
      <FilterInputField
        report={report}
        labelText={filters[report].filter1.labelText}
        inputFieldValue={fxPair}
        onChangeFunc={getFx}
        optionValues={filters[report].filter1.optionValues}
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
export default connect(mapStateToProps, {
  getFx: fxActions.getFx,
  selectReport: fxActions.selectReport,
})(Filter);
