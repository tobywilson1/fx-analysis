import React, { useEffect, useRef } from 'react';
import BarChartD3 from '../charts/BarChartD3';
import { connect } from 'react-redux';
import { getFx } from '../actions/fxActions';

const resizeChart = (chartRef) => {
  const gridSection = chartRef.current.parentNode;

  //get size of the parent grid section
  const styles = getComputedStyle(gridSection);
  const parentWidth = parseInt(styles.getPropertyValue('width'), 10);
  const parentHeight = parseInt(styles.getPropertyValue('height'), 10);

  //position the particle origin at centre of canvas
  // window.fxChart.width = parentWidth;
  // window.fxChart.height = parentHeight;

  console.log(parentWidth, parentHeight);
};

function BarChart({ chartData, chartWidth, chartHeight, getFx }) {
  const chartRef = useRef(null);

  //init
  useEffect(() => {
    window.fxChart = {};
    resizeChart(chartRef);
    const resizeFunc = resizeChart.bind(null, chartRef);
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
export default connect(mapStateToProps, { getFx })(BarChart);
