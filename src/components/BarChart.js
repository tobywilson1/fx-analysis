import React, { useEffect } from 'react';
import BarChartD3 from '../charts/BarChartD3';
import { connect } from 'react-redux';
import { getFx } from '../actions/fxActions';

function BarChart({ chartData, chartWidth, chartHeight, getFx }) {
  //console.log(chartData);

  useEffect(() => {
    getFx();
  }, []);

  return (
    <div className='chartArea'>
      <BarChartD3 width={chartWidth} height={chartHeight} data={chartData} />
    </div>
  );
}

//the bits of the state we want to add into props
const mapStateToProps = (state) => ({
  chartData: state.chartData,
  chartWidth: state.chartWidth,
  chartHeight: state.chartHeight,
});

//any actions added to props via second parameter
export default connect(mapStateToProps, { getFx })(BarChart);

// const useCanvas = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     let animationFrameId;

//     //initialise animation and retrieve callback functions to pass to animation frame
//     const { callback, resizeFunc, mousemoveFunc } = canvasInit(canvasRef);

//     const render = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       callback();
//       animationFrameId = window.requestAnimationFrame(
//         render.bind(null, callback)
//       );
//     };
//     render();

//     //tidy up objects on unmounting of component
//     return () => {
//       window.cancelAnimationFrame(animationFrameId);
//       window.removeEventListener('resize', resizeFunc, false);
//       window.removeEventListener('mousemove', mousemoveFunc);
//     };
//   }, []);

//   return canvasRef;
// };

// export const Animation = (props) => {
//   const { draw, ...rest } = props;
//   const canvasRef = useCanvas(draw);

//   return <canvas ref={canvasRef} {...rest} />;
// };
