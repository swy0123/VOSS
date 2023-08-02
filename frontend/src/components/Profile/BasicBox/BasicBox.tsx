import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { CurrentUserAtom, ProfileState, ModalOpenState, FollowerTabState ,FollowerListState, FollowingListState } from "/src/recoil/Auth";
import { postFollow, deleteUnfollow, getFollowers, getFollowings  } from '/src/api/profile';
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
  const [isModalOpen, setIsModalOpen] = useRecoilState(ModalOpenState);
  const [followerTabShow, setFollowerTabShow] = useRecoilState(FollowerTabState)
  const [followers, setFollowers] = useRecoilState(FollowerListState)
  const [followings, setFollowings] = useRecoilState(FollowingListState)
  const [profile, setProfile] = useRecoilState(ProfileState)
  const setFollow = () => {
    setProfile({...profile, isFollowing: !profile.isFollowing})
  };

  useEffect(()=> {
    getFollowings(id).then(followings => {
      if (followings) {setFollowings(followings)};
    })
    getFollowers(id).then(followers => {
      if (followers) {setFollowers(followers)};
    })
  }, [isModalOpen])

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
              ? <FollowButton onClick={()=>(setFollow(), deleteUnfollow(id))}>팔로우</FollowButton>
              : <FollowingButton onClick={() => (setFollow(), postFollow(id))}>팔로잉</FollowingButton>
            }
        </ProfileNameBoxDesign>

        <FollowBoxDesign>
          <ProfileFollowerDesign onClick={() => (setIsModalOpen(true), setFollowerTabShow(true))}>
            <p>팔로워</p>
            <p>{followers.length} 명</p>
          </ProfileFollowerDesign>
          <ProfileFollowingDesign onClick={() => (setIsModalOpen(true), setFollowerTabShow(false))}>
            <p>팔로잉</p>
            <p>{followings.length} 명</p>
          </ProfileFollowingDesign>
          <ProfileFollowingSpaceDesign/>
        </FollowBoxDesign>

      </ProfileInfoDesign>
      
    </BasicBoxDesign>
  );
};

export default BasicBox;