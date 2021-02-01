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

//function factory for tooltip event handlers
export function createTooltipEventHandlers(
  d3,
  svg,
  radius,
  xScale,
  yScale,
  xAttr,
  yAttr
) {
  // Create Event Handlers for mouse
  function handleMouseOver(event, d) {
    // Add interactivity

    const e = svg.selectAll('circle').nodes();
    const i = e.indexOf(event.currentTarget);

    var t = d3.transition().duration(400);

    const target = this;
    orangeToolip_MouseOver(target, d, i, t);
  }

  function handleMouseOut(event, d) {
    const e = svg.selectAll('circle').nodes();
    const i = e.indexOf(event.currentTarget);

    const target = this;
    orangeToolip_MouseOut(target, d, i);
  }

  // Specific tool tip styles
  function orangeToolip_MouseOver(target, d, i, t) {
    //initially make it small but visible so the animation works
    d3.select(target).attr('fill', 'orange').attr('r', 0.1).attr('opacity', 1);

    // Use D3 to select element, change color and size
    d3.select(target)
      .transition(t)
      .attr('r', radius * 1.5);

    // Specify where to put label of text
    svg
      .append('text')
      .attr('id', 't' + d3.timeFormat('%a%d')(d[xAttr]) + '-' + i) // Create an id for text so we can select it later for removing on mouseout
      .attr('x', function () {
        return xScale(d[xAttr]) - 30;
      })
      .attr('y', function () {
        return yScale(d[yAttr]) - 15;
      })
      .attr('class', 'tooltip')
      .text(function () {
        return `${d3.timeFormat('%d%b')(d[xAttr])} ${d[yAttr]}`; // Value of the text
      });
  }

  function orangeToolip_MouseOut(target, d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(target)
      .attr('fill', 'black')
      .attr('r', radius)
      .attr('opacity', 0);

    // Select text by id and then remove
    d3.select('#t' + d3.timeFormat('%a%d')(d[xAttr]) + '-' + i).remove(); // Remove text location
  }

  return [handleMouseOver, handleMouseOut];
}
