import { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CurrentUserAtom, LoginState, ProfileState } from "../../recoil/Auth";
import ProfileNull from "/src/assets/Profile/ProfileNull.png"
import {
  Navbar,
  LeftSection,
  Logo,
  MenuList,
  Menu,
  IconList,
  Alarm,
  AlarmIcon,
  Profile,
  EmptySpace,
  DivForHover,
  ProfileHoverList,
  ProfileHoverListItem,
  ProfileHoverTriangle,
} from "./NavigationBar.style";

const FILE_SERVER_URL = "https://b106-voss.s3.ap-northeast-2.amazonaws.com"

interface Headertype {
  AlarmIsShown : boolean, 
  setAlarmIsshown : Dispatch<SetStateAction<boolean>>,
  setMenuIsShown : Dispatch<SetStateAction<boolean>>,
}

function NavigationBar({AlarmIsShown, setAlarmIsshown, setMenuIsShown }: Headertype) {
  const [profileMenuShown, setProfileMenuShown] = useState(false)
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom)
  const [isLogin, setLoginState] = useRecoilState(LoginState)
  const [profile, setProfile] = useRecoilState(ProfileState)

  // Router Link와 동일한 부분!!
  const navigate = useNavigate()  
  const goSelectCategory = () => {navigate("/category")}
  const AlarmToggle = () => {setAlarmIsshown((IsShown) => !IsShown)}
  const goProfile = (id: number) => {navigate(`/profile/${id}`)}
  const goBoardData = (id: number) => {navigate(`/boarddata/${id}`)}
  const goCommentData = (id: number) => {navigate(`/commentdata/${id}`)}

  const setLogout = () => {
    setLoginState(false);
    setCurrentUser({
      userid: 0,
      email: "",
      nickname: "",
      imageUrl: ""});
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate("/");
  }

  return(
    <>
    <Navbar>
      <LeftSection >
        <Logo onClick={goSelectCategory} src="/src/assets/Header/logo.png"></Logo>
        
        <MenuList
          onMouseEnter={() => setMenuIsShown(true)}
          onMouseLeave={() => setMenuIsShown(false)}>
          <Menu>Training</Menu>
          <Menu>Meeting</Menu>
          <Menu style={{marginLeft:"6px"}}>Community</Menu>
        </MenuList>
      </LeftSection>
      
      <IconList>
        <Alarm onClick={AlarmToggle} $AlarmIsShown={AlarmIsShown}>
          <AlarmIcon src="/src/assets/Header/alarm.png"/>
        </Alarm>

        <Profile
          src = {currentUser.imageUrl ? `${FILE_SERVER_URL}/${currentUser.imageUrl}` : ProfileNull}    
          onClick={() => goProfile(currentUser.userid)}
          onMouseEnter={() => setProfileMenuShown(true)}
          onMouseLeave={() => setProfileMenuShown(false)}>
        </Profile>
        
        {profileMenuShown
        ? <div>
          <DivForHover
            onMouseEnter={() => setProfileMenuShown(true)}
            onMouseLeave={() => setProfileMenuShown(false)}
          />
          <ProfileHoverList 
            onMouseEnter={() => setProfileMenuShown(true)} 
            onMouseLeave={() => setProfileMenuShown(false)}>
            <ProfileHoverListItem onClick={() => goProfile(currentUser.userid)}>{currentUser.nickname}</ProfileHoverListItem>
            <ProfileHoverListItem onClick={()=> goBoardData(currentUser.userid)}>내가 쓴 글</ProfileHoverListItem>
            <ProfileHoverListItem onClick={()=> goCommentData(currentUser.userid)}>내가 쓴 댓글</ProfileHoverListItem>
            <ProfileHoverListItem onClick={() => setLogout()}>로그아웃</ProfileHoverListItem>
          </ProfileHoverList>
          <ProfileHoverTriangle
            onMouseEnter={() => setProfileMenuShown(true)}
            onMouseLeave={() => setProfileMenuShown(false)}
          />
        </div>
        : null} 
      </IconList>

    </Navbar>
    <EmptySpace/>
    </>
  )
}

export default NavigationBar