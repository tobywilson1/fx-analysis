import React, { useState, useEffect } from 'react';
import { Console, Hook, Unhook } from 'console-feed';
import ConsoleCheckbox from './ConsoleCheckbox';

const LogsContainer = () => {
  const [showConsole, setShowConsole] = useState(false);
  const [logs, setLogs] = useState([]);

  // run once!
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, []);

  return (
    <div className='console-container '>
      <ConsoleCheckbox clickHandler={() => setShowConsole(!showConsole)} />
      {showConsole && (
        <div className='console teal lighten-1'>
          <Console logs={logs} />
        </div>
      )}
    </div>
  );
};

export default LogsContainer;
