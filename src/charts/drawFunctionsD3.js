export class barChart {
  constructor() {
    this.width = 100;
    this.height = 100;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    return {
      chartWidth: width,
      chartHeight: height,
    };
  }

  draw(d3, svg, data) {
    console.log('rendering barChart..');
    const width = this.width;
    const height = this.height;
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

export class linePlot {
  constructor() {
    this.width = 100;
    this.height = 100;
  }

  resize(width, height) {
    // set the dimensions and margins of the graph
    const margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 60,
    };

    this.width = width - margin.left - margin.right;
    this.height = height - margin.top - margin.bottom;

    return {
      chartWidth: width,
      chartHeight: height,
      chartMarginLeft: margin.left,
      chartMarginRight: margin.right,
    };
  }

  draw(d3, svg, data) {
    console.log('rendering linePlot..');
    const width = this.width;
    const height = this.height;

    const parser = function (d) {
      return { date: d3.timeParse('%Y-%m-%d')(d[0]), value: d[1] };
    };

    data = data.map((record) => parser(record));

    var x = d3
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
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return +d.value;
        }),
      ])
      .range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

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
            return x(d.date);
          })
          .y(function (d) {
            return y(d.value);
          })
      );
  }
}
