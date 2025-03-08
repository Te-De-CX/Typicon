import { useState, useCallback } from 'react';
import { faker } from '@faker-js/faker';

const generateWords = (count: number): string[] => {
    const words: string[] = [];
    for (let i = 0; i < count; i++) {
      words.push(faker.word.sample()); // Generate a random word
    }
    return words;
  };
  
  const words = generateWords(1000);

export const useTypingGame = () => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Function to pick a random word from the list
  const pickRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    // Check if the input matches the current word
    setIsCorrect(input.trim() === currentWord);
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

  return {
    currentWord,
    userInput,
    score,
    isCorrect,
    pickRandomWord,
    handleInputChange,
    handleKeyDown,
  };
};