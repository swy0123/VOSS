import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { CurrentUserAtom, FollowingListState } from '/src/recoil/Auth';
import { FollowListType } from '/src/type/Auth';
import { postFollow, deleteUnfollow } from '/src/api/profile';
import zammanboImage from '/src/assets/ProfileImages/zammanbo.png';
import {  
  UserContainer,
  UserImage,
  UserName, 
  ItsMeButton,
  FollowButton,
  FollowingButton,
} from "./FollowContent.style";


const FollowingContent = () => {
  const [followingList, setFollowingList] = useRecoilState(FollowingListState)
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom)
  const setFollow = (id: number) => {
    setFollowingList(followingList.map((user: FollowListType) => user.memberId === id ? { ...user, following: !user.following } : user));
  };

  return (
    <div>
      {followingList.map((user: FollowListType) => (
        <UserContainer key={user.memberId}>
          <UserImage src={zammanboImage} alt={user.nickname}></UserImage>
          <Link style={{color: 'black', textDecoration: 'none'}} to={`/profile/${user.memberId}`}>
          <UserName>{user.nickname}</UserName>
          </Link>
          { currentUser.userid === user.memberId
          ? <ItsMeButton>나</ItsMeButton>
          : user.following
            ? <FollowButton onClick={()=>(setFollow(user.memberId), deleteUnfollow(user.memberId))}>팔로우</FollowButton>
            : <FollowingButton onClick={()=>(setFollow(user.memberId), postFollow(user.memberId))}>팔로잉</FollowingButton>
          }
        </UserContainer>
      ))};
    </div>
  );
};

export default FollowingContent;