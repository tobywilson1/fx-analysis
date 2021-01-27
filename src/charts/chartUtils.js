export const handleFrameResize = (
  svg,
  width,
  height,
  chartTypes,
  chartType
) => {
  const {
    chartWidth,
    chartHeight,
    chartMarginLeft,
    chartMarginRight,
  } = chartTypes[chartType].resize(width, height);

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
