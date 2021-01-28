export const handleFrameResize = (svg, width, height, chartRef) => {
  const {
    chartWidth,
    chartHeight,
    chartMarginLeft,
    chartMarginRight,
  } = chartRef.resize(width, height);

  svg.attr('width', chartWidth).attr('height', chartHeight);

  if (chartMarginLeft || chartMarginRight) {
    svg
      //.append('g')
      .attr(
        'transform',
        'translate(' + chartMarginLeft + ',' + chartMarginRight + ')'
      );
  }
};
