import { useRecoilState } from 'recoil';
import { FollowerListState } from '/src/recoil/JS_Atom';
import {  
  UserContainer,
  UserImage,
  UserName, 
  FollowButton,
  FollowingButton,
} from "./FollowContent.style";


const FollowerContent = () => {
  const [followerList, setFollowerList] = useRecoilState(FollowerListState)
  const setFollower = (id: number) => {
    setFollowerList(followerList.map(user => user.id === id ? { ...user, isfollow: !user.isfollow } : user));
  };
  return (
    <div>
      {followerList.map((user) => (
        <UserContainer key={user.id}>
          <UserImage src={user.image} alt={user.username}></UserImage>
          <UserName>{user.username}</UserName>
          {user.isfollow
          ? <FollowingButton onClick={()=>setFollower(user.id)}>팔로잉</FollowingButton>
          : <FollowButton onClick={()=>setFollower(user.id)}>팔로우</FollowButton>
          }
        </UserContainer>
      ))}
    </div>
  );
};

export default FollowerContent;