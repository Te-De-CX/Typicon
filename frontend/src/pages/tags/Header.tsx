import React, { useState, useEffect } from "react";
import ProfileSelectionModal from "./ProfileSelectionModal";

interface UserData {
  name: string;
  avatar: string;
}

const Header: React.FC<{ onHelpClick: () => void }> = ({ onHelpClick }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Check for existing user data on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('typingGameUser');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    } else {
      // Show profile selection if no user data exists
      setShowProfileModal(true);
    }
  }, []);

  const handleProfileSave = (name: string, avatar: string) => {
    const newUserData = { name, avatar };
    setUserData(newUserData);
    localStorage.setItem('typingGameUser', JSON.stringify(newUserData));
    setShowProfileModal(false);
  };

  const handleProfileEdit = () => {
    setShowProfileModal(true);
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-b-lg">
        <div 
          className="flex gap-3 items-center text-lg font-semibold bg-amber-100 hover:bg-amber-200 px-3 py-2 rounded-lg cursor-pointer transition-colors"
          onClick={handleProfileEdit}
        >
          <img 
            src={userData?.avatar || "/default-avatar.png"} 
            alt="Profile" 
            className="h-10 w-10 rounded-full border-2 border-amber-500 object-cover" 
          />
          <div className="flex flex-col">
            <p className="text-xs text-gray-600">Hello</p>
            <p className="text-amber-800">{userData?.name || "Guest"}</p>
          </div>
        </div>
        
        <div className="text-xl font-bold text-amber-600">
          <h1>TypeMaster Pro</h1>
        </div>

        <button 
          onClick={onHelpClick}
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
          aria-label="Help"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      {showProfileModal && (
        <ProfileSelectionModal
          onSave={handleProfileSave}
          initialName={userData?.name || ""}
          initialAvatar={userData?.avatar || ""}
          onClose={() => {
            if (userData) setShowProfileModal(false);
            // Don't allow closing if no user data exists (required for first visit)
          }}
          isRequired={!userData}
        />
      )}
    </>
  );
};

export default Header;