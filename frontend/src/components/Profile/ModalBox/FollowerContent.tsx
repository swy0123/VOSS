import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { CurrentUserAtom, FollowerListState } from '/src/recoil/Auth';
import { FollowListType } from '/src/type/Auth';
import { postFollow, deleteUnfollow } from '/src/api/profile';
import zammanboImage from '/src/assets/Profile/zammanbo.png';
import {  
  UserContainer,
  UserImage,
  UserName,
  ItsMeButton,
  FollowButton,
  FollowingButton,
} from "./FollowContent.style";


const FollowerContent = () => { 
  const [followerList, setFollowerList] = useRecoilState(FollowerListState)
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom)
  const setFollow = (id: number) => {
    setFollowerList(followerList.map((user: FollowListType) => user.memberId === id ? { ...user, following: !user.following } : user));
  };
  const navigate = useNavigate()  
  const goToProfile = (id: number) => {navigate(`/profile/${id}`)}

  return (
    <div>
      {followerList.map((user: FollowListType) => (
        <UserContainer key={user.memberId}>
          <UserImage onClick={()=>goToProfile(user.memberId)} src={zammanboImage} alt={user.nickname} />
          <UserName onClick={()=>goToProfile(user.memberId)}><span>{user.nickname}</span></UserName>
          { currentUser.userid === user.memberId
          ? <ItsMeButton/>
          : user.following
            ? <FollowButton onClick={()=>(setFollow(user.memberId), deleteUnfollow(user.memberId))}>팔로우</FollowButton>
            : <FollowingButton onClick={()=>(setFollow(user.memberId), postFollow(user.memberId))}>팔로잉</FollowingButton>
          }
        </UserContainer>
      ))}
    </div>
  );
};

export default FollowerContent;