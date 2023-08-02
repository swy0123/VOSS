import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { FollowerListState } from '/src/recoil/Auth';
import { FollowListType } from '/src/type/Auth';
import zammanboImage from '/src/assets/ProfileImages/zammanbo.png';
import { getFollowers } from "/src/api/profile";
import {  
  UserContainer,
  UserImage,
  UserName, 
  FollowButton,
  FollowingButton,
} from "./FollowContent.style";


const FollowerContent = () => {
  const [followerList, setFollowerList] = useRecoilState(FollowerListState)
  const setFollow = (id: number) => {
    setFollowerList(followerList.map((user: FollowListType) => user.memberid === id ? { ...user, following: !user.following } : user));
  };
  
  const id = parseInt(useParams().id || "");
  useEffect(() => {
    getFollowers(id).then(followers => {
      console.log(followers)
      if (followers) {setFollowerList(followers)};
    })
  }, [])
  

  return (
    <div>
      {followerList.map((user: FollowListType) => (
        <UserContainer key={user.memberid}>
          <UserImage src={zammanboImage} alt={user.nickname}></UserImage>
          <UserName>{user.nickname}</UserName>
          {user.following
          ? <FollowButton onClick={()=>setFollow(user.memberid)}>팔로우</FollowButton>
          : <FollowingButton onClick={()=>setFollow(user.memberid)}>팔로잉</FollowingButton>
          }
        </UserContainer>
      ))}
    </div>
  );
};

export default FollowerContent;