import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { barChart } from './drawFunctionsD3';

const chartTypes = {
  barChart,
};

function ChartD3({ width = 100, height = 100, data, chartType }) {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).attr('width', width).attr('height', height);
    //.style('border', '1px solid black');
  }, [width, height]);

  useEffect(() => {
    data && draw();
    // eslint-disable-next-line
  }, [data, width, height]);

  const draw = () => chartTypes[chartType](d3, ref, width, height, data);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default ChartD3;
