import React, { useEffect, useRef } from 'react';
import BarChartD3 from '../charts/BarChartD3';
import { connect } from 'react-redux';
import { getFx, updateChartDims } from '../actions/fxActions';

const resizeChart = (chartRef, updateChartDims) => {
  const gridSection = chartRef.current.parentNode;

  //get size of the parent grid section
  const styles = getComputedStyle(gridSection);
  const parentWidth = parseInt(styles.getPropertyValue('width'), 10);
  const parentHeight = parseInt(styles.getPropertyValue('height'), 10);

  //save the dimensions to the windows object -- need to refactor this
  window.fxChart.width = parentWidth;
  window.fxChart.height = parentHeight;

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
