import React, { useState, useEffect } from "react";
import Header from "../tags/Header";
import { useTypingGame } from "../lib/inputs";
import { Timer } from "../lib/timer";
import { Difficulty } from "../lib/types/types";
import ScoreChart from "../lib/modal/ScoreChart";
import SettingsPanel from "../lib/modal/SettingsPanel";
import HelpModal from "../lib/modal/HelpModal";
import { saveHighScore, getHighScores } from "../lib/storage/storage";

const Page: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [highScores, setHighScores] = useState<number[]>([]);
  const [time, setTime] = useState("01:00:00");
  const [timer, setTimer] = useState<Timer | null>(null);

  const {
    currentSentence,
    userInput,
    score,
    accuracy,
    wpm,
    // correctChars,
    // incorrectChars,
    handleInputChange,
    handleKeyDown,
    getLetterState,
    resetGame: resetTypingGame,
  } = useTypingGame(difficulty);

  // Initialize the timer
  useEffect(() => {
    const newTimer = new Timer(setTime, () => {
      endGame();
    });
    setTimer(newTimer);

    // Load high scores
    setHighScores(getHighScores());

    return () => {
      newTimer.stop();
    };
  }, []);

  const startGame = () => {
    if (timer) {
      timer.reset();
      timer.start();
    }
    resetTypingGame();
    setGameActive(true);
    setGameOver(false);
  };

  const endGame = () => {
    if (timer) {
      timer.stop();
    }
    setGameActive(false);
    setGameOver(true);
    saveHighScore(score);
    setHighScores(getHighScores());
  };

  const resetGame = () => {
    if (timer) {
      timer.reset();
    }
    resetTypingGame();
    setGameActive(false);
    setGameOver(false);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!gameActive && !gameOver && e.key !== "Enter") return;
    
    if (gameOver && e.key === "Enter") {
      startGame();
      return;
    }

    if (!gameActive && e.key === "Enter") {
      startGame();
      return;
    }

    handleKeyDown(e);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onHelpClick={() => setShowHelp(true)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <SettingsPanel
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            gameActive={gameActive}
            onStart={startGame}
            onReset={resetGame}
          />

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            {gameOver ? (
              <div className="text-center py-8">
                <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
                <p className="text-xl mb-2">Final Score: {score}</p>
                <p className="text-xl mb-6">
                  WPM: {wpm} | Accuracy: {accuracy}%
                </p>
                <button
                  onClick={startGame}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
                >
                  Play Again
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="text-6xl font-mono bg-gray-800 text-white p-6 rounded-lg mb-4 text-center">
                    {time}
                  </div>
                  
                  <div className="text-2xl leading-relaxed bg-gray-100 p-6 rounded-lg min-h-32">
                    {currentSentence.split("").map((char, index) => {
                      const state = getLetterState(index);
                      let className = "text-gray-500";
                      if (state === "correct") className = "text-green-600";
                      if (state === "incorrect") className = "text-red-600";
                      if (state === "current") className = "underline text-blue-600";
                      
                      return (
                        <span key={index} className={className}>
                          {char}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder={gameActive ? "" : "Press Enter to start..."}
                  className={`w-full py-4 text-2xl border-2 rounded-xl px-6 focus:outline-none focus:ring-2 ${
                    gameActive
                      ? "border-blue-500 focus:ring-blue-300"
                      : "border-gray-300 focus:ring-gray-300"
                  }`}
                  autoFocus
                  disabled={gameOver}
                />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800">Score</h3>
                    <p className="text-3xl font-bold text-blue-600">{score}</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800">WPM</h3>
                    <p className="text-3xl font-bold text-green-600">{wpm}</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-800">Accuracy</h3>
                    <p className="text-3xl font-bold text-purple-600">{accuracy}%</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            <ScoreChart scores={highScores} />
          </div>
        </div>
      </main>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
};

export default Page;