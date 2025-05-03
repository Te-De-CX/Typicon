import React from 'react';
import { Difficulty } from '../types/types';

interface SettingsPanelProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  gameActive: boolean;
  onStart: () => void;
  onReset: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  difficulty,
  onDifficultyChange,
  gameActive,
  onStart,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Difficulty</h3>
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => onDifficultyChange(level)}
                className={`px-4 py-2 rounded-lg ${
                  difficulty === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                disabled={gameActive}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onStart}
            disabled={gameActive}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            Start
          </button>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;