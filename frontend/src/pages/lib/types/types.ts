export type Difficulty = 'easy' | 'medium' | 'hard';

export interface HighScore {
  score: number;
  date: string;
  wpm: number;
  accuracy: number;
}