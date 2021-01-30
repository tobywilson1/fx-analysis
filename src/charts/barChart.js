import { baseChart } from './utils';

export class barChart extends baseChart {
  // constructor(d3, ref) {
  //   super(d3, ref);
  // }

  draw(data, width, height) {
    console.log('rendering barChart..');

    const d3 = this.d3;
    const ref = this.ref;

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

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
  }
}
