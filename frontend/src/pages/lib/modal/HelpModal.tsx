import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">How to Play</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Gameplay</h3>
            <p>
              Type the sentences as they appear. The current character to type is
              underlined. Correct characters turn green, incorrect ones turn red.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Scoring</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 point per correct character</li>
              <li>Bonus points for completing sentences quickly</li>
              <li>Accuracy affects your final score</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Difficulty Levels</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Easy:</strong> Short sentences (5-8 words)
              </li>
              <li>
                <strong>Medium:</strong> Medium sentences (8-12 words)
              </li>
              <li>
                <strong>Hard:</strong> Long sentences (12-20 words)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Controls</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Press Enter to start the game</li>
              <li>Space to complete the current sentence</li>
              <li>Game automatically ends after 1 minute</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;