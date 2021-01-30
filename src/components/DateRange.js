import React, { useRef, useEffect } from 'react';
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.min.js';
import 'materialize-css/extras/noUiSlider/nouislider.css';

const DateRange = ({ labelText }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    noUiSlider.create(sliderRef.current, {
      start: [20, 80],
      connect: true,
      step: 1,
      orientation: 'horizontal', // 'horizontal' or 'vertical'
      range: {
        min: 0,
        max: 100,
      },
    });
  }, []);

  return (
    <div className='slider-container'>
      <p className='slider-label'>{labelText}</p>
      <div ref={sliderRef} className='col s12'></div>
    </div>
  );
};

export default DateRange;
