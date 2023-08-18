import { MouseEvent } from 'react';
import FollowingContent from './FollowingContent';
import FollowerContent from './FollowerContent';
import RightArrow from "../../../assets/Profile/RightArrow.png"
import { useRecoilState } from 'recoil';
import { ModalOpenState, FollowerTabState } from '/src/recoil/Auth';
import { 
  ModalContainer, 
  ModalContent, 
  ModalUser, 
  TabContainer, 
  Tab, 
} from "./FollowModal.style"

const FollowModal = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(ModalOpenState)
  const [followerTabShow, setFollowerTabShow] = useRecoilState(FollowerTabState)
  const closeModal = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <ModalContainer onClick={closeModal}>
      <ModalContent>
      <ModalUser onClick={()=>setIsModalOpen(false)}><img src={RightArrow} alt='RigthArrow'/><span style={{paddingLeft: "1vw"}}></span></ModalUser>
        <TabContainer>
          <Tab active={followerTabShow} onClick={() => setFollowerTabShow(true)}>
            팔로워
          </Tab>
          <Tab active={!followerTabShow} onClick={() => setFollowerTabShow(false)}>
            팔로잉
          </Tab>
        </TabContainer>
        {followerTabShow ? <FollowerContent /> : <FollowingContent />}
      </ModalContent>
    </ModalContainer>
  );
};

export default FollowModal;
