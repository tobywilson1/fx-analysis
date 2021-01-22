import React, { useEffect, useRef } from 'react';
import BarChartD3 from '../charts/BarChartD3';
import { connect } from 'react-redux';
import { getFx, updateChartDims } from '../actions/fxActions';

const resizeChart = (chartRef, updateChartDims) => {
  const chartArea = chartRef.current;

  //get size of the chartArea
  const styles = getComputedStyle(chartArea);
  const width = parseFloat(styles.width);
  const height = parseFloat(styles.height);

  // console.log('width', styles.width);
  // console.log('height', styles.height);

  //save the dimensions to the windows object -- need to refactor this
  window.fxChart.width = width;
  window.fxChart.height = height;

  //console.log(parentWidth, parentHeight);

  updateChartDims();
};

function BarChart({
  chartData,
  chartWidth,
  chartHeight,
  getFx,
  updateChartDims,
}) {
  const chartRef = useRef(null);

  //init
  useEffect(() => {
    window.fxChart = {};
    resizeChart(chartRef, updateChartDims);
    const resizeFunc = resizeChart.bind(null, chartRef, updateChartDims);
    window.addEventListener('resize', resizeFunc, false);
    return () => {
      window.removeEventListener('resize', resizeFunc, false);
    };
  }, []);

  //update chart data
  useEffect(() => {
    getFx();
  }, []);

  return (
    <div ref={chartRef} className='chartArea'>
      <BarChartD3 width={chartWidth} height={chartHeight} data={chartData} />
    </div>
  );
}

//the bits of the state we want to add into props
const mapStateToProps = (state) => ({
  chartData: state.chartData,
  chartWidth: state.chartWidth,
  chartHeight: state.chartHeight,
});

//any actions added to props via second parameter
export default connect(mapStateToProps, { getFx, updateChartDims })(BarChart);
