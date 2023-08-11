import React from "react";
import { HexColorPicker } from "react-colorful";

type TabProps = {
  content: string;
  handleColorChange: (color: string) => void;
  newColor: string;
};

const Tab: React.FC<TabProps> = ({ content, handleColorChange, newColor }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HexColorPicker id={`${content}ColorPicker`} color={newColor} onChange={handleColorChange}/>
      </div>
      <p style={{ height: "20px", margin: 0, fontSize: "12px", marginTop: "20px", marginBottom:"0px" }}>{content}</p>
    </div>
  );
};

export default Tab;
