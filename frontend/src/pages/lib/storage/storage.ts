const HIGH_SCORES_KEY = 'typingGameHighScores';

export const saveHighScore = (score: number) => {
  const scores = getHighScores();
  scores.push(score);
  // Keep only top 10 scores
  const sortedScores = scores.sort((a, b) => b - a).slice(0, 10);
  localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(sortedScores));
};

export const getHighScores = (): number[] => {
  const scores = localStorage.getItem(HIGH_SCORES_KEY);
  return scores ? JSON.parse(scores) : [];
};