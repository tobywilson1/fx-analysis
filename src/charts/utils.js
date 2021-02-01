export class baseChart {
  constructor(d3, ref) {
    this.ref = ref;
    this.d3 = d3;
  }

  clearSvg() {
    this.d3.select(this.ref.current).selectAll('svg').remove();
  }
}

//function factory for tooltip event handlers
export function createTooltipEventHandlers(
  d3,
  ref,
  svg,
  radius,
  xScale,
  yScale,
  xAttr,
  yAttr
) {
  // Create Event Handlers for mouse
  function handleMouseEnter(event, d) {
    // Add interactivity

    const e = svg.selectAll('circle').nodes();
    const i = e.indexOf(event.currentTarget);

    var t = d3.transition().duration(400);

    const target = this;
    div_MouseEnter(target, event, d, i, t);
    //orangeToolip_MouseEnter(target, d, i, t);
  }

  function handleMouseOut(event, d) {
    const e = svg.selectAll('circle').nodes();
    const i = e.indexOf(event.currentTarget);

    const target = this;
    div_MouseLeave(target, event, d, i);
    //orangeToolip_MouseLeave(target, d, i);
  }

  // // Specific tool tip styles
  // function orangeToolip_MouseEnter(target, d, i, t) {
  //   //initially make it small but visible so the animation works
  //   d3.select(target).attr('fill', 'orange').attr('r', 0.1).attr('opacity', 1);

  //   // Use D3 to select element, change color and size
  //   d3.select(target)
  //     .transition(t)
  //     .attr('r', radius * 1.5);

  //   // Specify where to put label of text
  //   svg
  //     .append('text')
  //     .attr('id', 't' + d3.timeFormat('%a%d')(d[xAttr]) + '-' + i) // Create an id for text so we can select it later for removing on mouseLeave
  //     .attr('x', function () {
  //       return xScale(d[xAttr]) - 30;
  //     })
  //     .attr('y', function () {
  //       return yScale(d[yAttr]) - 15;
  //     })
  //     .attr('class', 'tooltip')
  //     .text(function () {
  //       return `${d3.timeFormat('%d%b')(d[xAttr])} ${d[yAttr]}`; // Value of the text
  //     });
  // }

  // function orangeToolip_MouseLeave(target, d, i) {
  //   // Use D3 to select element, change color back to normal
  //   d3.select(target)
  //     .attr('fill', 'black')
  //     .attr('r', radius)
  //     .attr('opacity', 0);

  //   // Select text by id and then remove
  //   d3.select('#t' + d3.timeFormat('%a%d')(d[xAttr]) + '-' + i).remove(); // Remove text location
  // }

  function div_MouseEnter(target, event, d, i, t) {
    // console.log('Adding tooltip..', d);
    // console.log(d);
    var u = d3.select(ref.current).selectAll('div').data('1');

    // console.log(d3.select(ref.current));

    u.enter()
      .append('div')
      .merge(u)
      .attr('class', 'tooltip')
      .html(d3.timeFormat('%d%b')(d[xAttr]) + ': ' + String(d[yAttr])) //'<br>'
      .style('position', 'absolute')
      // .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px')
      .style('opacity', 1)
      .style('left', Math.round(event.pageX) - 50 + 'px') // need to ensure no overlap with the element having the listener otherwise fires endlessly
      .style('top', Math.round(event.pageY) - 50 + 'px'); // need to ensure no overlap with the element having the listener otherwise fires endlessly

    u.exit().remove();

    // console.log(event);
    // console.log(d3.select(ref.current).selectAll('.tooltip').size());
  }

  function div_MouseLeave(target, event, d, i) {
    d3.select(ref.current).selectAll('.tooltip').remove();
    // console.log('Removing tooltip..');
    // console.log(event);
  }

  return [handleMouseEnter, handleMouseOut];
}

// function getPos(el) {
//   const position = document.querySelector(el).getBoundingClientRect();
//   return position;
// }
