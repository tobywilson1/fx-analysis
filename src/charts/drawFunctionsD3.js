export class baseChart {
  constructor(d3, ref) {
    this.ref = ref;
    this.d3 = d3;
  }

  clearSvg() {
    this.d3.select(this.ref.current).select('svg').remove();
  }

  clearElements() {
    this.d3.select(this.ref.current).select('svg').selectAll('*').remove();
  }
}

export class barChart extends baseChart {
  constructor(d3, ref) {
    super(d3, ref);
  }

  // resize(width, height) {
  //   const svg=this.svg
  // //   this.width = width;
  // //   this.height = height;
  // //   svg.attr('width', this.width).attr('height', this.height);
  // }

  draw(data, width, height) {
    console.log('rendering barChart..');

    // this.width = width;
    // this.height = height;
    const d3 = this.d3;
    const ref = this.ref;

    const svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // const width = this.width;
    // const height = this.height;
    // const svg = this.svg;
    // const d3 = this.d3;

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

export class linePlot extends baseChart {
  constructor(d3, ref) {
    super(d3, ref);

    // this.svg = d3.select(ref.current).append('svg');
    // .attr('width', this.width + margin.left + margin.right)
    // .attr('height', this.height + margin.top + margin.bottom);

    // this.svg = this.svg.append('g');
    // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  }

  // resize(width, height) {
  //   const svg = this.svg;
  //   const d3 = this.d3;

  //   const margin = {
  //     top: 50, //10,
  //     right: 50, // 30,
  //     bottom: 50, //this is space for x-axis
  //     left: 50, //60,
  //   };

  //   this.width = width - margin.left - margin.right;
  //   this.height = height - margin.top - margin.bottom;

  //   d3.select('svg')
  //     .attr('width', this.width + margin.left + margin.right)
  //     .attr('height', this.height + margin.top + margin.bottom);

  //   svg.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
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
        d3.min(data, function (d) {
          return +d.value;
        }),
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

export class Testing extends baseChart {
  constructor(d3, ref) {
    super(d3, ref);
  }

  // resize(svg, width, height) {
  //   // set the dimensions and margins of the graph
  //   const margin = {
  //     top: 0, //10,
  //     right: 0, // 30,
  //     bottom: 0, //this is space for x-axis
  //     left: 0, //60,
  //   };

  //   this.width = width - margin.left - margin.right;
  //   this.height = height - margin.top - margin.bottom;

  //   svg
  //     .attr('width', this.width + margin.left + margin.right)
  //     .attr('height', this.height + margin.top + margin.bottom);
  //   // .append('g')
  //   // .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  // }

  draw(data, width, height) {
    const d3 = this.d3;
    const ref = this.ref;

    let svg = d3.select(ref.current).append('svg');

    svg
      .append('circle')
      .attr('cx', 2)
      .attr('cy', 2)
      .attr('r', 40)
      .style('fill', 'blue');
    svg
      .append('circle')
      .attr('cx', 140)
      .attr('cy', 70)
      .attr('r', 40)
      .style('fill', 'red');
    svg
      .append('circle')
      .attr('cx', 300)
      .attr('cy', 100)
      .attr('r', 40)
      .style('fill', 'green');
  }
}
