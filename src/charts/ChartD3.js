import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';
import { barChart, linePlot } from './drawFunctionsD3';
import { handleFrameResize } from './chartUtils';

const chartTypes = {
  barChart,
  linePlot,
};

function ChartD3({ width = 100, height = 100, data, chartType }) {
  const ref = useRef();
  const svg = d3.select(ref.current);

  useEffect(() => {
    handleFrameResize(svg, width, height, chartTypes, chartType);
  }, [width, height]);

  useEffect(() => {
    svg.selectAll('*').remove();
    const draw = () => chartTypes[chartType].draw(d3, svg, width, height, data);
    data && draw();
  }, [data]);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default ChartD3;
