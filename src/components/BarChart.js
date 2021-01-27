import React, { useEffect, useRef } from 'react';
import BarChartD3 from '../charts/BarChartD3';
import { updateChartDims } from '../slices/fxActions';
import {
  getChartData,
  getChartWidth,
  getChartHeight,
  getReportRefreshFuncWithDefaults,
} from '../slices/selectors';
import { useSelector, useDispatch } from 'react-redux';

const resizeChart = (chartRef, updateFunc) => {
  const chartArea = chartRef.current;

  //get size of the chartArea
  const styles = getComputedStyle(chartArea);
  const width = parseFloat(styles.width);
  const height = parseFloat(styles.height);

  //save the dimensions to the windows object -- need to refactor this
  window.fxChart.width = width;
  window.fxChart.height = height;

  updateFunc();
};

const BarChart = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();

  const chartData = useSelector(getChartData);
  const chartWidth = useSelector(getChartWidth);
  const chartHeight = useSelector(getChartHeight);
  const reportRefreshFunc = useSelector(getReportRefreshFuncWithDefaults);

  const despUpdateChartDims = () => dispatch(updateChartDims());

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
  useEffect(() => {
    dispatch(reportRefreshFunc());
    console.log('refreshing chart to default values');
  }, []);

  return (
    <div ref={chartRef} className='chartArea'>
      <BarChartD3 width={chartWidth} height={chartHeight} data={chartData} />
    </div>
  );
};

export default BarChart;
