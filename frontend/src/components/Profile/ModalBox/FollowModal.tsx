import { MouseEventHandler } from 'react';
import FollowingContent from './FollowingContent';
import FollowerContent from './FollowerContent';
import RightArrow from "../../../assets/ProfileImages/RightArrow.png"
import { 
  ModalContainer, 
  ModalContent, 
  ModalUser, 
  TabContainer, 
  Tab, 
} from "./FollowModal.style"

const FollowModal = ({ onClose, activeTab, setActiveTab }: { onClose: MouseEventHandler<HTMLDivElement>, activeTab: string, setActiveTab: Function }) => {

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
      <ModalUser><img onClick={onClose} src={RightArrow} alt='RigthArrow'/><span style={{paddingLeft: "1vw"}}>aadadaa00</span></ModalUser>
        <TabContainer>
          <Tab active={activeTab === 'follower'} onClick={() => setActiveTab('follower')}>
            팔로워
          </Tab>
          <Tab active={activeTab === 'following'} onClick={() => setActiveTab('following')}>
            팔로잉
          </Tab>
        </TabContainer>
        {activeTab === 'follower' ? <FollowerContent /> : <FollowingContent />}
      </ModalContent>
    </ModalContainer>
  );
};

export default FollowModal;
