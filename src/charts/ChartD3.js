import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import { barChart } from './barChart';

function ChartD3({ width = 100, height = 100, data, type }) {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).attr('width', width).attr('height', height);
    //.style('border', '1px solid black');
  }, [width, height]);

  useEffect(() => {
    data && draw();
    // eslint-disable-next-line
  }, [data, width, height]);

  const draw = () => barChart(d3, ref, width, height, data);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default ChartD3;
