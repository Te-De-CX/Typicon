import React from "react";

interface LayersProps {
    stylings:string,
    text: string
}

const Layers: React.FC <LayersProps> = ({ stylings, text }) => {
  const LayersStyle = {
    cursor: "pointer",
  };

  return (
    <div style={LayersStyle} className={`${stylings} flex items-center justify-start`}>
      {text}
    </div>
  );
};

export default Layers;