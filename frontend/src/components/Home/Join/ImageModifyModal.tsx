import Avatar, { genConfig } from 'react-nice-avatar'
import { PropsWithChildren, useEffect, useState } from 'react';
import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver';
import { HexColorPicker } from "react-colorful";
import { ModalOverlay, ModalContent, CompleteButton } from "./ImageModifyModal.style"


interface ImageModalDefaultType {
  handleConfigUpdate: (config: any) => void;
}

const ImageModifyModal = ({ handleConfigUpdate }: PropsWithChildren<ImageModalDefaultType>) => {
  type Gender = "man" | "woman";
  const [hairColor, setHairColor] = useState("#aabbcc");
  const [faceColor, setFaceColor] = useState("#ffeeee");
  const [gender, setGender] = useState<Gender>("woman");
  const config = genConfig({ sex: gender, hatStyle: "none", hairColor, faceColor });

  useEffect(() => {
    setHairColor(hairColor);
  }, [hairColor]);

  useEffect(() => {
    setFaceColor(faceColor);
  }, [faceColor]);

  const handleCompleteClick = () => {
    handleConfigUpdate(config);
  };

  const handleGenderChange = () => {
    setGender(prevGender => (prevGender === "man" ? "woman" : "man"));
  };

  const handleShowHairPicker = () => {
    const colorPicker = document.getElementById("hairColorPicker");
    if (colorPicker) {
      colorPicker.style.visibility = colorPicker.style.visibility === "hidden" ? "visible" : "hidden";
    }
  };

  const handleShowFacePicker = () => {
    const colorPicker = document.getElementById("faceColorPicker");
    if (colorPicker) {
      console.log();
      colorPicker.style.visibility = colorPicker.style.visibility === "visible" ? "hidden" : "visible";
    }
  };

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
    <ModalOverlay>
      <ModalContent>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%' }}>
          <div style={{ position: 'relative' }}>
            <Avatar className="avatar-bar" id="myAvatar" style={{ width: '5rem', height: '5rem' }} {...config} />
          </div>
        </div>
        <button onClick={handleGenderChange}>
          {gender === "man" ? "남성" : "여성"}
        </button>
        <div className='image-options'>
          <div>
            <button onClick={handleShowHairPicker}>머리 색</button>
            <HexColorPicker id="hairColorPicker" color={hairColor} onChange={setHairColor} />
          </div>
          <div>
            <button onClick={handleShowFacePicker}>얼굴 색</button>
            <HexColorPicker id="faceColorPicker" color={faceColor} onChange={setFaceColor} />
          </div>
        </div>
        <CompleteButton onClick={handleCompleteClick}>완료</CompleteButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageModifyModal;

