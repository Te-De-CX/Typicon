// timer.tsx
import React, { useState, useEffect } from "react";
import { Timer } from "../lib/timer";

const TimerComponent: React.FC = () => {
  const [time, setTime] = useState("01:00:00"); // Initial time display
  const [timer, setTimer] = useState<Timer | null>(null);

  // Initialize the timer
  useEffect(() => {
    const newTimer = new Timer(setTime);
    setTimer(newTimer);

    return () => {
      newTimer.stop(); // Cleanup on unmount
    };
  }, []);

  // Start the timer
  const handleStart = () => {
    if (timer) {
      timer.start();
    }
  };

  // Stop the timer
  const handleStop = () => {
    if (timer) {
      timer.stop();
    }
  };

  // Reset the timer
  const handleReset = () => {
    if (timer) {
      timer.reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Countdown Timer</h1>
      <div className="text-6xl font-mono bg-white p-6 rounded-lg shadow-lg">
        {time}
      </div>
      <div className="mt-8 space-x-4">
        <button
          onClick={handleStart}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerComponent;