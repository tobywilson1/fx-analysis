import * as d3 from 'd3';
import React, { useRef, useEffect, useState } from 'react';
import { barChart, linePlot, Testing } from './drawFunctionsD3';

const chartTypes = {
  barChart,
  linePlot,
  Testing,
};

function ChartD3({ width = 100, height = 100, data, chartType }) {
  const ref = useRef();
  const [d3ChartObj, setD3ChartObj] = useState(null);
  const [chartObjCreated, setChartObjCreated] = useState(false);

  //create a chart objecta, which are available to other useEffects in next render cycle (not this one)
  //trigger a re-render by updating the state
  useEffect(() => {
    const d3ChartObj = new chartTypes[chartType](d3, ref);
    setD3ChartObj(d3ChartObj);
    setChartObjCreated(true);
    return () => {
      d3ChartObj.clearSvg();
      setD3ChartObj(null);
      setChartObjCreated(false);
    };
  }, [chartType]);

  useEffect(() => {
    const draw = () => {
      d3ChartObj.clearSvg();
      d3ChartObj.draw(data, width, height);
    };
    chartObjCreated && data && draw();
  }, [width, height, data]);

  return <div ref={ref}></div>;
}

export default ChartD3;
