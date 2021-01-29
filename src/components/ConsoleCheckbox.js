import React from 'react';

const ConsoleCheckbox = ({ clickHandler }) => {
  return (
    <form action='#'>
      <p>
        <label>
          <input
            id='indeterminate-checkbox'
            type='checkbox'
            onClick={clickHandler}
          />
          <span>View logs?</span>
        </label>
      </p>
    </form>
  );
};

export default ConsoleCheckbox;
