import Avatar, { genConfig } from 'react-nice-avatar'
import { PropsWithChildren, useEffect, useState } from 'react';
import { ModalOverlay, ModalContent, CompleteButton, ToggleButton } from "./ImageModifyModal.style"
import Tabs from './Tabs';
import Tab from './Tab';
import { Margin } from '@mui/icons-material';


interface ImageModalDefaultType {
  handleConfigUpdate: (config: any) => void;
}


const ImageModifyModal = ({ handleConfigUpdate }: PropsWithChildren<ImageModalDefaultType>) => {
  type Gender = "man" | "woman";
  const [hairColor, setHairColor] = useState("#aabbcc");
  const [faceColor, setFaceColor] = useState("#ffeeee");
  const [shirtColor, setShirtColor] = useState("#ffeeee");
  const [gender, setGender] = useState<Gender>("woman");
  const config = genConfig({ sex: gender, hairColor, faceColor, shirtColor });

  useEffect(() => {
    setHairColor(hairColor);
  }, [hairColor]);

  useEffect(() => {
    setFaceColor(faceColor);
  }, [faceColor]);

  useEffect(() => {
    setShirtColor(shirtColor);
  }, [shirtColor]);

  const handleCompleteClick = () => {
    handleConfigUpdate(config);
  };

  const handleGenderChange = () => {
    setGender(prevGender => (prevGender === "man" ? "woman" : "man"));
  };

  type TabsType = {
    label: string;
    index: number;
    Component: React.FC<{}>;
  }[];

  const tabs: TabsType = [
    {
      label: "머리 색",
      index: 1,
      Component: () => <Tab content="일부 조건에서는 적용되지 않습니다" handleColorChange={setHairColor} newColor={hairColor} />
    },
    {
      label: "얼굴 색",
      index: 2,
      Component: () => <Tab content="얼굴 색을 지정해주세요" handleColorChange={setFaceColor} newColor={faceColor} />
    },
    {
      label: "상의 색",
      index: 3,
      Component: () => <Tab content="상의 색을 자유롭게 골라주세요" handleColorChange={setShirtColor} newColor={shirtColor} />
    }
  ];
  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);

  return (
    <ModalOverlay>
      <ModalContent>
        <div style={{
          color: "#555",
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "15px"
        }}>
          프로필 이미지 꾸미기
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3%' }}>
          <div style={{ position: 'relative' }}>
            <Avatar className="avatar-bar" id="myAvatar" style={{ width: '5rem', height: '5rem', marginTop: "20px" }} {...config} />
          </div>
        </div>
        <ToggleButton gender={gender} onClick={handleGenderChange}>
          {gender === "man" ? "남성" : "여성"}
        </ToggleButton>
        <Tabs selectedTab={selectedTab} tabs={tabs} />
        <CompleteButton onClick={handleCompleteClick}>완료</CompleteButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageModifyModal;

