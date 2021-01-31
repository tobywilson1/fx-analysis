import React, { useRef, useEffect } from 'react';
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.min.js';
import 'materialize-css/extras/noUiSlider/nouislider.css';
import wNumb from 'wnumb/wNumb.js';
import { formatDate, timestamp, noUIFormatDate } from '../utils/utils';

const DateRange = ({ labelText, inputFieldValue, onChangeFunc }) => {
  const sliderRef = useRef(null);
  const eventStartRef = useRef(null);
  const eventEndRef = useRef(null);
  //console.log(`onChangeFunc is ${onChangeFunc}`);

  const startDate = !inputFieldValue[0]
    ? timestamp('2019-01-01')
    : timestamp(inputFieldValue[0]);

  let today = new Date();
  let lastBusinessDay = today.setDate(today.getDate());
  lastBusinessDay = timestamp(formatDate(lastBusinessDay));

  let endDate = !inputFieldValue[1]
    ? lastBusinessDay
    : timestamp(inputFieldValue[1]);

  useEffect(() => {
    if (!sliderRef.current?.noUiSlider) {
      noUiSlider.create(sliderRef.current, {
        // Create two timestamps to define a range.
        range: {
          min: timestamp('2019'),
          max: endDate,
        },

        // Steps of one week
        step: 7 * 24 * 60 * 60 * 1000,

        // Two more timestamps indicate the handle starting positions.
        start: [timestamp('2019'), timestamp('2020')],

        tooltips: false,
        connect: true,

        // No decimals
        format: wNumb({
          decimals: 0,
        }),
      });

      //sliderRef.current.noUiSlider.set();

      var dateValues = [eventStartRef.current, eventEndRef.current];

      sliderRef.current.noUiSlider.on('update', function (values, handle) {
        dateValues[handle].innerHTML = noUIFormatDate(
          new Date(+values[handle])
        );
      });

      function datesUpdated(
        values,
        handle,
        unencoded,
        tap,
        positions,
        noUiSlider
      ) {
        // values: Current slider values (array);
        // handle: Handle that caused the event (number);
        // unencoded: Slider values without formatting (array);
        // tap: Event was caused by the user tapping the slider (boolean);
        // positions: Left offset of the handles (array);
        // noUiSlider: slider public Api (noUiSlider);
        const newStartDate = formatDate(unencoded[0]);
        const newEndDate = formatDate(unencoded[1]);
        onChangeFunc([newStartDate, newEndDate]);
      }

      // Binding signature
      sliderRef.current.noUiSlider.on('end', datesUpdated);
    }
  }, [onChangeFunc, endDate]);

  useEffect(() => {
    //console.log([startDate, endDate]);
    sliderRef.current.noUiSlider.set([startDate, endDate]);
  }, [startDate, endDate]);

  return (
    <div className='slider-container'>
      <p className='slider-label'>{labelText}</p>
      <div ref={sliderRef} className='col s12'></div>
      <div ref={eventStartRef} className='slider-event-start' />
      <div ref={eventEndRef} className='slider-event-end' />
    </div>
  );
};

export default DateRange;
