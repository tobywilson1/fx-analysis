import React, { useEffect, useRef } from 'react';
import BarChartD3 from '../charts/BarChartD3';
//import { connect } from 'react-redux';
//import { getFx, updateChartDims } from '../actions/fxActions';
import {
  getFx,
  updateChartDims,
  chartDataValue,
  chartWidthValue,
  chartHeightValue,
} from '../slices/fxSlice';
import { useSelector, useDispatch } from 'react-redux';

const resizeChart = (chartRef, updateFunc) => {
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

  updateFunc();
};

const BarChart = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();

  const chartData = useSelector(chartDataValue);
  const chartWidth = useSelector(chartWidthValue);
  const chartHeight = useSelector(chartHeightValue);

  const despUpdateChartDims = () => dispatch(updateChartDims());
  //const despGetFx = (fxPair) => dispatch(getFx(fxPair));

  //init
  useEffect(() => {
    window.fxChart = {};
    resizeChart(chartRef, despUpdateChartDims);
    const resizeFunc = resizeChart.bind(null, chartRef, despUpdateChartDims);
    window.addEventListener('resize', resizeFunc, false);
    return () => {
      window.removeEventListener('resize', resizeFunc, false);
    };
  }, []);

  //update chart data
  // useEffect(() => {
  //   despGetFx(null); //refresh existing fx pair
  // }, []);

  return (
    <div ref={chartRef} className='chartArea'>
      <BarChartD3 width={chartWidth} height={chartHeight} data={chartData} />
    </div>
  );
};

export default BarChart;
