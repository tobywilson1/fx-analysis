import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { barChart, linePlot } from './drawFunctionsD3';

const chartTypes = {
  barChart,
  linePlot,
};

function ChartD3({ width = 100, height = 100, data, chartType }) {
  const ref = useRef();

  // useEffect(() => {
  //   d3.select(ref.current).attr('width', width).attr('height', height);
  //   //.style('border', '1px solid black');
  // }, [width, height]);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();
    const draw = () => chartTypes[chartType](d3, svg, width, height, data);
    data && draw();
  }, [data, width, height]);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default ChartD3;
