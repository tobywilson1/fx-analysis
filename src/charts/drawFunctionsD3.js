import { createTooltipEventHandlers } from './utils';

export class baseChart {
  constructor(d3, ref) {
    this.ref = ref;
    this.d3 = d3;
  }

  clearSvg() {
    this.d3.select(this.ref.current).select('svg').remove();
  }

  // clearElements() {
  //   this.d3.select(this.ref.current).select('svg').selectAll('*').remove();
  // }
}

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

    const [handleMouseOver, handleMouseOut] = createTooltipEventHandlers(
      d3,
      svg,
      radius,
      xScale,
      yScale
    );

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('opacity', 0)
      .attr('cx', circleAttrs.cx)
      .attr('cy', circleAttrs.cy)
      .attr('r', circleAttrs.r)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);
  }
}

export class Testing extends baseChart {
  // constructor(d3, ref) {
  //   super(d3, ref);
  // }

  draw(data, width, height) {
    const d3 = this.d3;
    const ref = this.ref;

    var margin = { top: 40, right: 20, bottom: 20, left: 40 };
    var radius = 6;

    var svg = d3
      .select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const w = width;
    const h = height;

    var dataset = [
      { x: 100, y: 110 },
      { x: 83, y: 43 },
      { x: 92, y: 28 },
      { x: 49, y: 74 },
      { x: 51, y: 10 },
      { x: 25, y: 98 },
      { x: 77, y: 30 },
      { x: 20, y: 83 },
      { x: 11, y: 63 },
      { x: 4, y: 55 },
      { x: 0, y: 0 },
      { x: 85, y: 100 },
      { x: 60, y: 40 },
      { x: 70, y: 80 },
      { x: 10, y: 20 },
      { x: 40, y: 50 },
      { x: 25, y: 31 },
    ];

    // We're passing in a function in d3.max to tell it what we're maxing (x value)
    var xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return d.x + 10;
        }),
      ])
      .range([margin.left, w - margin.right]); // Set margins for x specific

    // We're passing in a function in d3.max to tell it what we're maxing (y value)
    var yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function (d) {
          return d.y + 10;
        }),
      ])
      .range([margin.top, h - margin.bottom]); // Set margins for y specific

    // Add a X and Y Axis (Note: orient means the direction that ticks go, not position)
    //console.log(Object.keys(d3.svg));
    var xAxis = d3.axisBottom(xScale); //.orient('top');
    var yAxis = d3.axisLeft(yScale); //.orient('left');

    var circleAttrs = {
      cx: function (d) {
        return xScale(d.x);
      },
      cy: function (d) {
        return yScale(d.y);
      },
      r: radius,
    };

    // Adds X-Axis as a 'g' element
    svg
      .append('g')
      .attr('class', 'axis') // Give class so we can style it
      .attr('transform', 'translate(' + [0, margin.top] + ')') // Translate just moves it down into position (or will be on top)
      .call(xAxis); // Call the xAxis function on the group

    // Adds Y-Axis as a 'g' element
    svg
      .append('g')
      .attr('class', 'axis') // Give class so we can style it
      .attr('transform', 'translate(' + [margin.left, 0] + ')')
      .call(yAxis); // Call the yAxis function on the group

    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', circleAttrs.cx) // Get attributes from circleAttrs var
      .attr('cy', circleAttrs.cy) // Get attributes from circleAttrs var
      .attr('r', circleAttrs.r) // Get attributes from circleAttrs var
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    // On Click, we want to add data to the array and chart
    svg.on('click', function (event) {
      var coords = [
        event.pageX - event.target.getBoundingClientRect().x + 10,
        event.pageY - event.target.getBoundingClientRect().y + 10,
      ]; //d3.mouse(this);

      // Normally we go from data to pixels, but here we're doing pixels to data
      var newData = {
        x: Math.round(xScale.invert(coords[0])), // Takes the pixel number to convert to number
        y: Math.round(yScale.invert(coords[1])),
      };

      //console.log(newData);

      dataset.push(newData); // Push data to our array

      svg
        .selectAll('circle') // For new circle, go through the update process
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', circleAttrs.cx) // Get attributes from circleAttrs var
        .attr('cy', circleAttrs.cy) // Get attributes from circleAttrs var
        .attr('r', circleAttrs.r) // Get attributes from circleAttrs var
        .on('mouseover', handleMouseOver)
        .on('mouseout', handleMouseOut);
    });

    // Create Event Handlers for mouse
    function handleMouseOver(event, d) {
      // Add interactivity

      const e = svg.selectAll('circle').nodes();
      const i = e.indexOf(event.currentTarget);

      // Use D3 to select element, change color and size
      d3.select(this)
        .attr('fill', 'orange')
        .attr('r', radius * 2);

      // Specify where to put label of text
      svg
        .append('text')
        .attr('id', 't' + d.x + '-' + d.y + '-' + i) // Create an id for text so we can select it later for removing on mouseout
        .attr('x', function () {
          return xScale(d.x) - 30;
        })
        .attr('y', function () {
          return yScale(d.y) - 15;
        })
        .text(function () {
          return [d.x, d.y]; // Value of the text
        });
    }

    function handleMouseOut(event, d) {
      const e = svg.selectAll('circle').nodes();
      const i = e.indexOf(event.currentTarget);

      // Use D3 to select element, change color back to normal
      d3.select(this).attr('fill', 'black').attr('r', radius);

      // Select text by id and then remove
      d3.select('#t' + d.x + '-' + d.y + '-' + i).remove(); // Remove text location
    }
  }
}
