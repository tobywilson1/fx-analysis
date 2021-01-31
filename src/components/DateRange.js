import React, { useRef, useEffect } from 'react';
import noUiSlider from 'materialize-css/extras/noUiSlider/nouislider.min.js';
import 'materialize-css/extras/noUiSlider/nouislider.css';
import wNumb from 'wnumb/wNumb.js';
import { formatDate as myFormatDate } from '../utils/utils';

function timestamp(str) {
  return new Date(str).getTime();
}

// Create a list of day and month names.
var weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
function nth(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

// Create a string representation of the date.
function formatDate(date) {
  return (
    weekdays[date.getDay()] +
    ', ' +
    date.getDate() +
    nth(date.getDate()) +
    ' ' +
    months[date.getMonth()] +
    ' ' +
    date.getFullYear()
  );
}

const DateRange = ({ labelText, inputFieldValue, onChangeFunc }) => {
  const sliderRef = useRef(null);
  const eventStartRef = useRef(null);
  const eventEndRef = useRef(null);

  useEffect(() => {
    noUiSlider.create(sliderRef.current, {
      // Create two timestamps to define a range.
      range: {
        min: timestamp('2019'),
        max: timestamp('2020'),
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
      dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
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
      const newStartDate = myFormatDate(unencoded[0]);
      const newEndDate = myFormatDate(unencoded[1]);
      onChangeFunc([newStartDate, newEndDate]);
    }

    // Binding signature
    sliderRef.current.noUiSlider.on('end', datesUpdated);
  }, [onChangeFunc]);

  useEffect(() => {
    const startDate = !inputFieldValue[0]
      ? timestamp('2019-01-01')
      : timestamp(inputFieldValue[0]);

    let today = new Date();
    let lastBusinessDay = today.setDate(today.getDate());
    lastBusinessDay = timestamp(myFormatDate(lastBusinessDay));
    let endDate = !inputFieldValue[1]
      ? lastBusinessDay
      : timestamp(inputFieldValue[1]);

    //console.log([startDate, endDate]);
    sliderRef.current.noUiSlider.set([startDate, endDate]);
  }, [inputFieldValue]);

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
