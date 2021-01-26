import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { selectReport, reportValue } from '../slices/fxSlice';

import FilterInputField from './FilterInputField';
import FilterInputFieldWrapper from './FilterInputFieldWrapper';

import { getConfigReports } from '../utils/getConfig';

function Filter() {
  const dispatch = useDispatch();
  const report = useSelector(reportValue);

  return (
    <>
      <FilterInputField
        report={report}
        labelText='Report'
        inputFieldValue={report}
        onChangeFunc={(report) => dispatch(selectReport(report))}
        optionValues={getConfigReports()}
      />
      <FilterInputFieldWrapper report={report} />
    </>
  );
}

export default Filter;
