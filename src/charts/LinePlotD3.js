import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChartD3({ width = 100, height = 100, data }) {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).attr('width', width).attr('height', height);
    //.style('border', '1px solid black');
  }, [width, height]);

  useEffect(() => {
    data && draw();
    // eslint-disable-next-line
  }, [data, width, height]);

  const draw = () => {
    const svg = d3.select(ref.current);
    var selection = svg.selectAll('rect').data(data);
    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, height - 100]);

    selection
      .transition()
      .duration(300)
      .attr('height', (d) => yScale(d))
      .attr('y', (d) => height - yScale(d));

    selection
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 45)
      .attr('y', (d) => height)
      .attr('width', 40)
      .attr('height', 0)
      .attr('fill', 'orange')
      .transition()
      .duration(300)
      .attr('height', (d) => yScale(d))
      .attr('y', (d) => height - yScale(d));

    selection
      .exit()
      .transition()
      .duration(300)
      .attr('y', (d) => height)
      .attr('height', 0)
      .remove();
  };

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
}

export default BarChartD3;