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

import React from "react";
import LeaderBoard from "../tags/LeaderBoard";
import Clocks from "../tags/Clock";
import TimerComponent from "../components/Timer";
import Header from "../tags/Header";
import { useTypingGame } from "../lib/inputs";


const Page: React.FC = () => {

    const {
        currentWord,
        userInput,
        score,
        isCorrect,
        pickRandomWord,
        handleInputChange,
        handleKeyDown,
      } = useTypingGame();

      React.useEffect(() => {
        pickRandomWord();
      }, [pickRandomWord]);

    //   console.log(currentWord)

    return (
        <>
        <section>
            <Header />
            {/* {Math.random()} */}
            <div>
                <div className="flex items-center justify-center py-5 px-10 bg white text-4xl font-semibold rounded-[2rem] bg-white">
                    <p>{currentWord}</p>
                </div>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type the word here"
                    className="w-full py-5 text-xl bg-white border-black border-[2px] font-semibold my-2 rounded-2xl px-5"
                />
                {isCorrect && <p style={{ color: 'green' }}>Correct!</p>}
                <p>Score: {score}</p>
            </div>
            <TimerComponent />

        </section>
        
        </>
    )
}

export default Page;