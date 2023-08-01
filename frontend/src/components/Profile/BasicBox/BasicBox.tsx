import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentUserAtom, ProfileState } from "/src/recoil/Auth";
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
    FollowButton,
    FollowingButton,
    FollowBoxDesign,
    ProfileFollowerDesign,
    ProfileFollowingDesign,
    ProfileFollowingSpaceDesign,
} from "./BasicBox.style";


function BasicBox() {
  const id = parseInt(useParams().id || "");
  const currentUser = useRecoilValue(CurrentUserAtom)
  const [modalShow, setModalShow] = useState(false);
  const [activeTab, setActiveTab] = useState('follower');
  const [profile, setProfile] = useRecoilState(ProfileState)
  // 아직 임시기능
  const setFollow = () => {
    setProfile({...profile, isFollowing: !profile.isFollowing})
  };

  return (
    <BasicBoxDesign>
      <ProfileImgDesign>
        <ProfileImgDesign2>
          <img src={zammanbo} alt=""/>
        </ProfileImgDesign2>
      </ProfileImgDesign>
      
      <ProfileInfoDesign>

        <ProfileNameBoxDesign>
          <ProfileNameDesign>{profile.nickname}</ProfileNameDesign>
            { id === currentUser.userid
            ? <ProfileBtnDesign><img src={UpdateIcon} alt=""/></ProfileBtnDesign>
            : profile.isFollowing
              ? <FollowingButton onClick={() => setFollow()}>팔로잉</FollowingButton>
              : <FollowButton onClick={()=>setFollow()}>팔로우</FollowButton>
            }
        </ProfileNameBoxDesign>

        <FollowBoxDesign>
          <ProfileFollowerDesign onClick={() => (setModalShow(true), setActiveTab('follower'))}>
            <p>팔로워</p>
            <p>{profile.followerCnt} 명</p>
          </ProfileFollowerDesign>
          <ProfileFollowingDesign onClick={() => (setModalShow(true), setActiveTab('following'))}>
            <p>팔로잉</p>
            <p>{profile.followingCnt} 명</p>
          </ProfileFollowingDesign>
          <ProfileFollowingSpaceDesign/>
        </FollowBoxDesign>

        {modalShow ? <FollowModal onClose={()=>setModalShow(false)} activeTab={activeTab} setActiveTab={setActiveTab}/> : null}

      </ProfileInfoDesign>
      
    </BasicBoxDesign>
  );
};

export default BasicBox;