import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { FollowingListState } from '/src/recoil/Auth';
import { FollowListType } from '/src/type/Auth';
import zammanboImage from '/src/assets/ProfileImages/zammanbo.png';
import { getFollowings } from "/src/api/profile";
import {  
  UserContainer,
  UserImage,
  UserName, 
  FollowButton,
  FollowingButton,
} from "./FollowContent.style";


const FollowingContent = () => {
  const [followingList, setFollowingList] = useRecoilState(FollowingListState )
  const setFollow = (id: number) => {
    setFollowingList(followingList.map((user: FollowListType) => user.memberid === id ? { ...user, following: !user.following } : user));
  };

  const id = parseInt(useParams().id || "");
  useEffect(() => {
    getFollowings(id).then(followings => {
      console.log(followings)
      if (followings) {setFollowingList(followings)};
    })
  }, [])

  return (
    <div>
      {followingList.map((user: FollowListType) => (
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

export default FollowingContent;