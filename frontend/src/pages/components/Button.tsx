import React from "react";

interface ButtonProps {
  text: string;
  color?: string;
  width: string;
  borderRadius: string; // Optional color prop
}

const Button: React.FC<ButtonProps> = ({ text, color, width, borderRadius }) => {
  const buttonStyle = {
    backgroundColor: color, 
    width: width,
    padding: "10px 20px",
    border: `1px solid ${color || "black"}`,
    borderRadius: borderRadius,
    cursor: "pointer",
  };

  return (
    <button style={buttonStyle} className="flex items-center justify-center">
      {text}
    </button>
  );
};

export default Button;