import Avatar, { genConfig } from 'react-nice-avatar'
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ModalOverlay, ModalContent, CompleteButton, ToggleButton, CancelButton} from "./ImageModifyModal.style"
import Tabs from './Tabs';
import Tab from './Tab';
import domtoimage from "dom-to-image";
import { putUpdateMember, uploadFile } from '/src/api/join';
import { ProfileState } from "/src/recoil/Auth";
import { useRecoilState, useRecoilValue } from "recoil";
import AlertContext from "/src/context/alert/AlertContext";


interface ImageModalDefaultType {
  closeModal: () => void;
  changeImage: (newUrl: string) => void;
}

async function getBlob(): Promise<Blob> {
  const node = document.getElementById("myAvatar");
  if (node) {
    node.style.width = '50rem';
    node.style.height = '50rem';

    const blob = await domtoimage.toBlob(node, {
      width: node.offsetWidth,
      height: node.offsetHeight
    });

    node.style.width = '5rem';
    node.style.height = '5rem';

    return blob;
  }
  return new Blob();
}


const ImageModifyModal = ({ closeModal, changeImage }: PropsWithChildren<ImageModalDefaultType>) => {
  type Gender = "man" | "woman";
  const [hairColor, setHairColor] = useState("#aabbcc");
  const [faceColor, setFaceColor] = useState("#ffeeee");
  const [shirtColor, setShirtColor] = useState("#ffeeee");
  const [gender, setGender] = useState<Gender>("woman");
  const [profile, setProfile] = useRecoilState(ProfileState)
  const config = genConfig({ sex: gender, hairColor, faceColor, shirtColor });
  const { alert: alertComp } = useContext(AlertContext);

  useEffect(() => {
    setHairColor(hairColor);
  }, [hairColor]);

  useEffect(() => {
    setFaceColor(faceColor);
  }, [faceColor]);

  useEffect(() => {
    setShirtColor(shirtColor);
  }, [shirtColor]);

  const handleCompleteClick = async () => {
    closeModal();

    const blobPromise = getBlob();
    const blob = await blobPromise;

    const formData = new FormData();
    formData.append("file", blob, "image.jpg");

    const profileImage = uploadFile(formData);
    profileImage.then((res) => {
      const UpdateProps = {
        nickname: profile.nickname,
        imageUrl: res[0].savedFileName,
      };

      const updateInfo = putUpdateMember(UpdateProps);
      updateInfo.then((res) => {
        if (res) {
          onAlertClick(`정보 수정이 완료 되었습니다`);
          changeImage(UpdateProps.imageUrl);
          
        } else {
          onAlertClick("회원가입 정보가 잘못되었습니다");
        }
      });
    });
  };

  const handleGenderChange = () => {
    setGender(prevGender => (prevGender === "man" ? "woman" : "man"));
  };

  const onAlertClick = async (text:string) => {
    const result = await alertComp(text);
    console.log("custom", result);
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
          프로필 이미지 바꾸기
        </div> 

        <Avatar 
          className="avatar-bar" 
          id="myAvatar" 
          style={{ width: '5rem', height: '5rem' }} {...config} />

        <ToggleButton gender={gender} onClick={handleGenderChange}>
          {gender === "man" ? "남성" : "여성"}
        </ToggleButton>
        <Tabs selectedTab={selectedTab} tabs={tabs} />
        <div style={{display: "flex" }}>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <CompleteButton onClick={handleCompleteClick}>완료</CompleteButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageModifyModal;

