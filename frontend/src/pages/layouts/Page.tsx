// import React from "react";
// import Button from "../components/Button"
// import Dropdown from "../components/Dropdown"
// import TimerComponent from "../components/Timer"

// const Page : React.FC  = () => {

//     const options = ["Option 1", "Option 2", "Option 3"];

//     const handleSelect = (selectedOption: string) => {
//     console.log("Selected:", selectedOption);
//   };

  

//     return (
//         <>
//             <header>
//                 <div>
//                     <img src="" alt="" />
//                     <div>
//                         <p>hello</p>
//                         <p>{name}</p>
//                     </div>
//                 </div>
//                 <div>
//                     <h2>websites name</h2>
//                 </div>
//             </header>
//         </>
//     )
// }

// export default Page;

import React, { useState, useEffect }  from "react";
import LeaderBoard from "../tags/LeaderBoard";
import Clocks from "../tags/Clock";
import TimerComponent from "../components/Timer";
import Header from "../tags/Header";
import { useTypingGame } from "../lib/inputs";
import { Timer } from "../lib/timer";

const Page: React.FC = () => {

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

  const {
    currentWord,
    userInput,
    score,
    isCorrect,
    pickRandomWord,
    handleInputChange,
    handleKeyDown,
    isInputIncorrect,
  } = useTypingGame();

  React.useEffect(() => {
    pickRandomWord();
  }, [pickRandomWord]);

  return (
    <>
      <section>
        <Header />
        <div>
          <div className="flex items-center justify-center py-5 px-10 bg-white text-4xl font-semibold rounded-[2rem]">
            {/* Render the current word with conditional styling */}
            {currentWord.split('').map((letter, index) => (
              <span
                key={index}
                style={{
                  color: isInputIncorrect(index) ? 'red' : 'black', // Turn red if the letter is incorrect
                }}
              >
                {letter}
              </span>
            ))}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange handleStart}
            onKeyDown={handleKeyDown}
            placeholder="Type the word here"
            className="w-full py-5 text-xl bg-white border-black border-[2px] font-semibold my-2 rounded-2xl px-5"
          />
          {isCorrect && <p style={{ color: 'green' }}>Correct!</p>}
          <p>Score: {score}</p>
        </div>
        <div className="text-6xl font-mono bg-white p-6 rounded-lg shadow-lg">
        {time}
      </div>
      </section>
    </>
  );
};

export default Page;