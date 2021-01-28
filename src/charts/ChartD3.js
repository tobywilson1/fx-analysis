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
  //const d3ChartObj = useSelector(getChartObj);
  const [d3ChartObj, setD3ChartObj] = useState(null);
  const [chartObjCreated, setChartObjCreated] = useState(false);

  //create a new chart object, which is available to other useEffects in next render cycle
  //trigger a rerender by setting the chartObjCreated state
  useEffect(() => {
    const d3ChartObj = new chartTypes[chartType]();
    setD3ChartObj(d3ChartObj);
    setChartObjCreated(true);
    handleFrameResize(svg, width, height, d3ChartObj);
    return () => {
      setD3ChartObj(null);
      setChartObjCreated(false);
    };
  }, [chartType]);

  useEffect(() => {
    console.log('Resizing D3 chart');
    chartObjCreated && handleFrameResize(svg, width, height, d3ChartObj);
  }, [width, height]);

  useEffect(() => {
    svg.selectAll('*').remove();
    const draw = () => d3ChartObj.draw(d3, svg, data);
    chartObjCreated && data && draw();
  }, [data]);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default ChartD3;
