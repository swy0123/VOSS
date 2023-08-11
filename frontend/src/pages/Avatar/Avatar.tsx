import Avatar, { genConfig } from 'react-nice-avatar'
import { useEffect, useState } from 'react';
import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver';
import { HexColorPicker } from "react-colorful";

function AvatarBoard() {
  const [hairColor, setHairColor] = useState("#aabbcc"); // Hair color state
  const [faceColor, setFaceColor] = useState("#ffeeee"); // Face color state

  const config = genConfig({ 
    sex: "man", 
    glassesStyle: "none", 
    hatStyle: "none", 
    hairColor: hairColor, 
    faceColor: faceColor }); // Use hairColor state

  useEffect(() => {
    setHairColor(hairColor);
  }, [hairColor]);

  useEffect(() => {
    setFaceColor(faceColor);
  }, [faceColor]);

  async function download() {
    const scale = 2;
    const node = document.getElementById("myAvatar");
    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${node.offsetWidth / 2 / scale}px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0
        },
        width: node.offsetWidth * scale
      });

      saveAs(blob, "avatar.png");
    }
  }


  return (
    <div>
      <Avatar id="myAvatar" style={{ width: '4rem', height: '4rem' }} {...config} />
      <button onClick={download}>Download Avatar</button>
      <HexColorPicker id="hairColorPicker" color={hairColor} onChange={setHairColor} />
      <HexColorPicker id="faceColorPicker" color={faceColor} onChange={setFaceColor} />
    </div>
  )
}

export default AvatarBoard;