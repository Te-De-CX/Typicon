import { useState, useCallback, useEffect, useRef } from 'react';
import { Difficulty } from './types/types';

// Enhanced sentence generator with more natural English patterns
const generateSentence = (difficulty: Difficulty): string => {
  const wordCounts = {
    easy: { min: 50, max: 50 },    // Short, simple sentences
    medium: { min: 7, max: 12 }, // Medium complexity
    hard: { min: 13, max: 20 }   // Long, complex sentences
  };

  // Common sentence starters for more natural flow
  const starters = [
    "The", "A", "This", "That", "These", "Those", 
    "I", "You", "We", "They", "He", "She", "It"
  ];

  // Common verbs for sentence construction
  const verbs = [
    "is", "are", "was", "were", "have", "has", "had",
    "do", "does", "did", "can", "could", "will", "would",
    "go", "went", "see", "saw", "make", "made", "take", "took"
  ];

  // Common nouns and adjectives
  const nouns = [
    "dog", "cat", "house", "car", "book", "tree", "city",
    "computer", "phone", "friend", "family", "school", "work"
  ];
  const adjectives = [
    "big", "small", "happy", "sad", "fast", "slow", "new", "old",
    "beautiful", "ugly", "smart", "dumb", "interesting", "boring"
  ];

  const { min, max } = wordCounts[difficulty];
  const wordCount = Math.floor(Math.random() * (max - min + 1)) + min;

  // Build a more natural sounding sentence
  let sentence = starters[Math.floor(Math.random() * starters.length)];
  
  for (let i = 1; i < wordCount; i++) {
    // Alternate between different word types for better flow
    const wordType = Math.floor(Math.random() * 3);
    let nextWord = '';
    
    if (i === 1 && Math.random() > 0.3) {
      // Often follow starter with a verb
      nextWord = verbs[Math.floor(Math.random() * verbs.length)];
    } else if (wordType === 0) {
      nextWord = nouns[Math.floor(Math.random() * nouns.length)];
    } else if (wordType === 1) {
      nextWord = adjectives[Math.floor(Math.random() * adjectives.length)];
    } else {
      nextWord = verbs[Math.floor(Math.random() * verbs.length)];
    }

    sentence += ' ' + nextWord;
  }

  // Add punctuation
  sentence += Math.random() > 0.7 ? '!' : 
              Math.random() > 0.9 ? '?' : '.';

  return sentence;
};

export const useTypingGame = (difficulty: Difficulty) => {
  const [currentSentence, setCurrentSentence] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [incorrectChars, setIncorrectChars] = useState<number>(0);
  const [completedSentences, setCompletedSentences] = useState<number>(0);
  const currentPositionRef = useRef<number>(0);

  const pickRandomSentence = useCallback(() => {
    const sentence = generateSentence(difficulty);
    setCurrentSentence(sentence);
    currentPositionRef.current = 0;
  }, [difficulty]);

  // Initialize with first sentence
  useEffect(() => {
    pickRandomSentence();
  }, [pickRandomSentence]);

  // Calculate words per minute
  const calculateWPM = useCallback(() => {
    if (!startTime || completedSentences === 0) return 0;
    const minutes = (Date.now() - startTime) / 60000;
    const words = completedSentences * (currentSentence.split(' ').length || 1);
    return Math.round(words / minutes);
  }, [startTime, completedSentences, currentSentence]);

  // Calculate typing accuracy
  const calculateAccuracy = useCallback(() => {
    const totalChars = correctChars + incorrectChars;
    return totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
  }, [correctChars, incorrectChars]);

  // Get the state of each character (correct, incorrect, current, or none)
  const getLetterState = (index: number): 'none' | 'correct' | 'incorrect' | 'current' => {
    if (index < currentPositionRef.current) {
      return userInput[index] === currentSentence[index] ? 'correct' : 'incorrect';
    }
    if (index === currentPositionRef.current) {
      return 'current';
    }
    return 'none';
  };

  // Handle input changes and track accuracy
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    // Track character accuracy
    const newPosition = input.length;
    if (newPosition > currentPositionRef.current) {
      if (newPosition <= currentSentence.length && 
          input[newPosition - 1] === currentSentence[newPosition - 1]) {
        setCorrectChars(prev => prev + 1);
      } else {
        setIncorrectChars(prev => prev + 1);
      }
    }
    currentPositionRef.current = newPosition;
  };

  // Handle key presses (especially space for sentence completion)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    // Check for sentence completion
    if (currentPositionRef.current === currentSentence.length && e.key === ' ') {
      e.preventDefault();
      setScore(prev => prev + currentSentence.length);
      setCompletedSentences(prev => prev + 1);
      setUserInput('');
      pickRandomSentence();
    }
  };

  // Reset all game state
  const resetGame = () => {
    setUserInput('');
    setScore(0);
    setStartTime(null);
    setCorrectChars(0);
    setIncorrectChars(0);
    setCompletedSentences(0);
    pickRandomSentence();
  };

  return {
    currentSentence,
    userInput,
    score,
    accuracy: calculateAccuracy(),
    wpm: calculateWPM(),
    correctChars,
    incorrectChars,
    handleInputChange,
    handleKeyDown,
    getLetterState,
    resetGame,
  };
};