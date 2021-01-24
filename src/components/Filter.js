import React from 'react';
import FilterInputField from './FilterInputField';
import FilterInputFieldWrapper from './FilterInputFieldWrapper';
import { connect } from 'react-redux';
import { selectReport } from '../actions/fxActions';

const Filter = ({ report, selectReport }) => {
  return (
    <>
      <FilterInputField
        report={report}
        labelText='Report'
        inputFieldValue={report}
        onChangeFunc={selectReport}
        optionValues={['Test', 'FrAPI']}
      />
      <FilterInputFieldWrapper report={report} />
    </>
  );
};

//the bits of the state we want to add into props
const mapStateToProps = (state) => ({
  report: state.report,
});

//any actions added to props via second parameter
export default connect(mapStateToProps, {
  selectReport: selectReport,
})(Filter);
