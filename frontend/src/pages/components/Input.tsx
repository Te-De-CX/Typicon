import React, { useState, useEffect, useCallback } from 'react';

const words = [
  'react', 'typescript', 'javascript', 'developer', 'speed', 'test', 'keyboard', 'challenge', 'programming', 'coding'
];

const Input: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Function to pick a random word from the list
  const pickRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  }, []);

  // Initialize the first word
  useEffect(() => {
    pickRandomWord();
  }, [pickRandomWord]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    // Check if the input matches the current word
    if (input.trim() === currentWord) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // Handle spacebar press to change the word
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault(); // Prevent default spacebar behavior

      if (userInput.trim() !== '') {
        if (isCorrect) {
          setScore((prevScore) => prevScore + 1);
        }
        setUserInput('');
        pickRandomWord();
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Typing Speed Tester</h1>
      <div style={styles.wordDisplay}>
        <p style={styles.wordText}>{currentWord}</p>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        style={styles.input}
        placeholder="Type the word here..."
      />
      <div style={styles.scoreboard}>
        <p style={styles.scoreText}>Score: {score}</p>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  wordDisplay: {
    margin: '20px 0',
    padding: '10px 20px',
    backgroundColor: '#444',
    borderRadius: '5px',
  },
  wordText: {
    fontSize: '1.5rem',
    margin: '0',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    width: '300px',
    borderRadius: '5px',
    border: '2px solid #61dafb',
    outline: 'none',
  },
  scoreboard: {
    marginTop: '20px',
  },
  scoreText: {
    fontSize: '1.2rem',
  },
};

export default Input;