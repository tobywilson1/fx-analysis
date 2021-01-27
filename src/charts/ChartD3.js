import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';
import { getChartWidth } from '../slices/selectors';
import { barChart, linePlot } from './drawFunctionsD3';

const chartTypes = {
  barChart,
  linePlot,
};

function ChartD3({ width = 100, height = 100, data, chartType }) {
  const ref = useRef();
  const svg = d3.select(ref.current);
  //const [chartSize, setChartSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    const { chartWidth, chartHeight } = chartTypes[chartType].resize(
      width,
      height
    );
    svg.attr('width', chartWidth).attr('height', chartHeight);
    //.style('border', '1px solid black');
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
