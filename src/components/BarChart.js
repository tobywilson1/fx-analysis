import React, { useEffect } from 'react';
import BarChartD3 from '../charts/BarChartD3';
import { connect } from 'react-redux';
import { getFx } from '../actions/fxActions';

function BarChart({ chartData, getFx }) {
  //console.log(chartData);
  useEffect(() => {
    getFx();
  }, []);

  return <BarChartD3 width={600} height={400} data={chartData} />;
}

//the bits of the state we want to add into props
const mapStateToProps = (state) => ({ chartData: state.chartData });

//any actions added to props via second parameter
export default connect(mapStateToProps, { getFx })(BarChart);
