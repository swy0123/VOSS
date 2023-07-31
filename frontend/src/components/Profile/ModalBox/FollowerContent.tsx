import zammanboImage from '../../../assets/ProfileImages/zammanbo.png';
import {  
  UserContainer,
  UserImage,
  UserName, 
  FollowButton,
  FollowingButton,
} from "./FollowContent.style";


export const users = [
  { id: 1, username: 'safv__sfd9', image: zammanboImage, },
  { id: 2, username: 'idid__320', image: zammanboImage, },
  { id: 3, username: 'laav8019', image: zammanboImage, },
  { id: 4, username: '._.dffa00', image: zammanboImage, },
  { id: 5, username: 'yukgaejang', image: zammanboImage, },
  { id: 6, username: 'voooooox', image: zammanboImage, },
  { id: 7, username: 'safv__sfd9', image: zammanboImage, },
  { id: 8, username: 'idid__320', image: zammanboImage, },
  { id: 9, username: 'laav8019', image: zammanboImage, },
  { id: 10, username: '._.dffa00', image: zammanboImage, },
  { id: 11, username: 'yukgaejang', image: zammanboImage, },
  { id: 12, username: 'voooooox', image: zammanboImage, },
];


const FollowerContent = () => (
  <div>
    {users.map((user) => (
      <UserContainer key={user.id}>
        <UserImage src={user.image} alt={user.username}></UserImage>
        <UserName>{user.username}</UserName>
        <FollowButton>팔로우</FollowButton>
      </UserContainer>
    ))}
  </div>
);

export default FollowerContent;