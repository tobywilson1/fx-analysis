import { createTooltipEventHandlers, baseChart } from './utils';

export class linePlot extends baseChart {
  // constructor(d3, ref) {
  //   super(d3, ref);
  // }

  draw(data, width, height) {
    console.log('rendering linePlot..');

    const d3 = this.d3;
    const ref = this.ref;

    const margin = {
      top: 50, //10,
      right: 50, // 30,
      bottom: 50, //this is space for x-axis
      left: 50, //60,
    };

    width = width - margin.left - margin.right;
    height = height - margin.top - margin.bottom;

    let svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    svg = svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const parser = function (d) {
      return { date: d3.timeParse('%Y-%m-%d')(d[0]), value: d[1] };
    };

    data = data.map((record) => parser(record));

    var xScale = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          return d.date;
        })
      )
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale));

    // Add Y axis
    var yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, function (d) {
          return +d.value * 0.85;
        }),
        d3.max(data, function (d) {
          return +d.value * 1.15;
        }),
      ])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(yScale));

    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return xScale(d.date);
          })
          .y(function (d) {
            return yScale(d.value);
          })
      );

    //add circles
    var radius = 6;

    var circleAttrs = {
      cx: function (d) {
        return xScale(d.date);
      },
      cy: function (d) {
        return yScale(d.value);
      },
      r: radius,
    };

    const [handleMouseEnter, handleMouseLeave] = createTooltipEventHandlers(
      d3,
      ref,
      svg,
      radius,
      xScale,
      yScale,
      'date',
      'value'
    );

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('id', function (d) {
        return d3.timeFormat('%d%b')(d.date);
      })
      .attr('opacity', 0)
      .attr('cx', circleAttrs.cx)
      .attr('cy', circleAttrs.cy)
      .attr('r', circleAttrs.r)
      .on('mouseenter', handleMouseEnter)
      .on('mouseleave', handleMouseLeave);
  }
}
