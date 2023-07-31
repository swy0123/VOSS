import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useRecoilValue } from "recoil";
import { TempUserListAtom } from "../../../recoil/Auth";
import FollowModal from '../ModalBox/FollowModal';
import zammanbo from "../../../assets/ProfileImages/zammanbo.png";
import UpdateIcon from "../../../assets/ProfileImages/UpdateIcon.png";
import {
    BasicBoxDesign,
    ProfileImgDesign,
    ProfileImgDesign2,
    ProfileInfoDesign,
    ProfileNameBoxDesign,
    ProfileNameDesign,
    ProfileBtnDesign,
    FollowBoxDesign,
    ProfileFollowerDesign,
    ProfileFollowingDesign,
    ProfileFollowingSpaceDesign,
} from "./BasicBox.style";



function BasicBox({email, nickname, userid}: {email: string, nickname: string, userid: number,}) {
  const [modalShow, setModalShow] = useState(false);
  const [activeTab, setActiveTab] = useState('follower');
  
  return (
    <BasicBoxDesign>
      <ProfileImgDesign>
        <ProfileImgDesign2>
          <img src={zammanbo} alt=""/>
        </ProfileImgDesign2>
      </ProfileImgDesign>
      
      <ProfileInfoDesign>

        <ProfileNameBoxDesign>
          <ProfileNameDesign>{nickname}</ProfileNameDesign>
          <ProfileBtnDesign><img src={UpdateIcon} alt=""/></ProfileBtnDesign>
        </ProfileNameBoxDesign>

        <FollowBoxDesign>
          <ProfileFollowerDesign onClick={() => (setModalShow(true), setActiveTab('follower'))}>
            <p>팔로워</p>
            <p>32명</p>
          </ProfileFollowerDesign>
          <ProfileFollowingDesign onClick={() => (setModalShow(true), setActiveTab('following'))}>
            <p>팔로잉</p>
            <p>12명</p>
          </ProfileFollowingDesign>
          <ProfileFollowingSpaceDesign/>
        </FollowBoxDesign>

        {modalShow ? <FollowModal onClose={() => setModalShow(false)} activeTab={activeTab} setActiveTab={setActiveTab}/> : null}

      </ProfileInfoDesign>
      
    </BasicBoxDesign>
  );
};

export default BasicBox;