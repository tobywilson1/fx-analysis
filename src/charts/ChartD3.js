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
  //const d3ChartObj = useSelector(getChartObj);
  //const [svg, setSvg] = useState(null);
  const [d3ChartObj, setD3ChartObj] = useState(null);
  const [chartObjCreated, setChartObjCreated] = useState(false);

  //create a chart objecta, which are available to other useEffects in next render cycle (not this one)
  //trigger a re-render by updating the state
  useEffect(() => {
    // const svg = d3
    //   .select(ref.current)
    //   .append('svg')
    //   .append('g')
    //   .attr('transform', 'translate(' + 30 + ',' + 50 + ')');
    // setSvg(svg);
    const d3ChartObj = new chartTypes[chartType](d3, ref, width, height);
    setD3ChartObj(d3ChartObj);
    setChartObjCreated(true);
    //d3ChartObj.resize(svg, width, height);
    return () => {
      //setSvg(null);
      d3ChartObj.clearSvg();
      setD3ChartObj(null);
      setChartObjCreated(false);
    };
  }, [chartType]);

  // useEffect(() => {
  //   console.log('Resizing D3 chart');
  //   if (chartObjCreated) {
  //     d3ChartObj.resize(svg, width, height);
  //   }
  // }, [width, height]);

  useEffect(() => {
    //data && svg.selectAll('*').remove();
    const draw = () => d3ChartObj.draw(data);
    chartObjCreated && data && draw();
  }, [width, height, data]);

  return <div ref={ref}></div>;
}

export default ChartD3;
