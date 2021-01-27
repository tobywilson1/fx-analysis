import React, { useEffect, useRef } from 'react';
import ChartD3 from '../charts/ChartD3';
import { updateChartDims } from '../slices/fxActions';
import {
  getChartData,
  getChartWidth,
  getChartHeight,
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

  return (
    <div ref={chartRef} className='chartArea'>
      <ChartD3
        width={chartWidth}
        height={chartHeight}
        data={chartData}
        type=''
      />
    </div>
  );
};

export default BarChart;
