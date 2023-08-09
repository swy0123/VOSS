import Avatar, { genConfig } from 'react-nice-avatar'
import { PropsWithChildren, useEffect, useState } from 'react';
import domtoimage from "dom-to-image";
import { saveAs } from 'file-saver';
import { HexColorPicker } from "react-colorful";
import { ModalOverlay, ModalContent, CompleteButton } from "./ImageModifyModal.style"


interface ImageModalDefaultType {
  handleConfigUpdate: (config: any) => void;
  closeModal: () => void;
}

const ImageModifyModal = ({ handleConfigUpdate }: PropsWithChildren<ImageModalDefaultType>) => {
  const [hairColor, setHairColor] = useState("#aabbcc");
  const [faceColor, setFaceColor] = useState("#ffeeee");
  const config = genConfig({  glassesStyle: "none", hatStyle: "none", hairColor, faceColor });

  useEffect(() => {
    setHairColor(hairColor);
  }, [hairColor]);

  useEffect(() => {
    setFaceColor(faceColor);
  }, [faceColor]);

  const handleCompleteClick = () => {
    handleConfigUpdate(config);
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
        <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%' }}>
          <div style={{ position: 'relative' }}>
            <Avatar className="avatar-bar" id="myAvatar" style={{ width: '5rem', height: '5rem' }} {...config} />
            </div>
          </div>
          <button onClick={download}>Download Avatar</button>
          <HexColorPicker id="hairColorPicker" color={hairColor} onChange={setHairColor} />
          <HexColorPicker id="faceColorPicker" color={faceColor} onChange={setFaceColor} />
        </div>
        </ModalContent>
        <CompleteButton onClick={handleCompleteClick}>Complete</CompleteButton>
      </ModalOverlay>
  );
};

export default ImageModifyModal;

