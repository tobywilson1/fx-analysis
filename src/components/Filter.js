import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getReport } from '../slices/selectors';
import { selectReport } from '../slices/fxActions';

import FilterInputField from './FilterInputField';
import FilterInputFieldWrapper from './FilterInputFieldWrapper';

import { getConfigReports } from '../utils/utils';
const allReports = getConfigReports();

function Filter() {
  const dispatch = useDispatch();
  const report = useSelector(getReport);

  return (
    <>
      <FilterInputField
        report={report}
        labelText='Report'
        inputFieldValue={report}
        onChangeFunc={(report) => dispatch(selectReport(report))}
        optionValues={allReports}
      />
      <FilterInputFieldWrapper report={report} />
    </>
  );
}

export default Filter;
