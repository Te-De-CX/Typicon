import React, { useState } from "react";

interface DropdownProps {
  options: string[]; // List of options to display in the dropdown
  onSelect: (selectedOption: string) => void; // Callback when an option is selected
  placeholder?: string; // Placeholder text for the dropdown
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, placeholder = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // State to store the selected option

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle option selection
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block w-64">
      {/* Dropdown button */}
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedOption || placeholder}
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;