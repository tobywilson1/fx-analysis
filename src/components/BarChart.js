import React, { useEffect } from 'react';
import BarChartD3 from '../charts/BarChartD3';
import { connect } from 'react-redux';
import { getFx } from '../actions/fxActions';

function BarChart({ chartData, chartWidth, chartHeight, getFx }) {
  //console.log(chartData);
  useEffect(() => {
    getFx();
  }, []);

  return (
    <BarChartD3 width={chartWidth} height={chartHeight} data={chartData} />
  );
}

//the bits of the state we want to add into props
const mapStateToProps = (state) => ({
  chartData: state.chartData,
  chartWidth: state.chartWidth,
  chartHeight: state.chartHeight,
});

//any actions added to props via second parameter
export default connect(mapStateToProps, { getFx })(BarChart);
