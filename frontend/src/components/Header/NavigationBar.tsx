import { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { CurrentUserAtom, LoginState } from "../../recoil/Auth";
import ProfileImg from "/src/assets/Header/profile_tmp.png";
import {
  Navbar,
  LeftSection,
  Logo,
  MenuList,
  Menu,
  IconList,
  Alarm,
  AlarmCount,
  AlarmIcon,
  Profile,
  EmptySpace,
  ProfileHoverList,
  ProfileHoverListItem,
  ProfileHoverTriangle,
} from "./NavigationBar.style";


interface Headertype {
  AlarmIsShown : boolean, 
  setAlarmIsshown : Dispatch<SetStateAction<boolean>>,
  setMenuIsShown : Dispatch<SetStateAction<boolean>>,
}

function NavigationBar({AlarmIsShown, setAlarmIsshown, setMenuIsShown }: Headertype) {
  // Router Link와 동일한 부분!!
  const navigate = useNavigate()  
  const goSelectCategory = () => {navigate("/category")}
  const AlarmToggle = () => {setAlarmIsshown((IsShown) => !IsShown)}
  const goProfile = (id: number) => {
    navigate(`/profile/${id}`);
  }
  const setLogout = () => {
    setLoginState(false);
    setCurrentUser({
      userid: 0,
      email: "",
      nickname: "",
      accessToken: "",
      refreshToken: ""});
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate("/");
  }
  const [profileMenuShown, setProfileMenuShown] = useState(false)
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom)
  const [isLogin, setLoginState] = useRecoilState(LoginState)

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
          <AlarmCount>3</AlarmCount>
        </Alarm>
        <Profile
        src={ProfileImg}
        onClick={() => goProfile(currentUser.userid)}
        onMouseEnter={() => setProfileMenuShown(true)}
        onMouseLeave={() => setProfileMenuShown(false)}>
        </Profile>
        {profileMenuShown
        ? <div>
          <ProfileHoverList 
            onMouseEnter={() => setProfileMenuShown(true)} 
            onMouseLeave={() => setProfileMenuShown(false)}>
            <ProfileHoverListItem onClick={() => goProfile(currentUser.userid)}>{currentUser.nickname}</ProfileHoverListItem>
            <ProfileHoverListItem >내가 쓴 글</ProfileHoverListItem>
            <ProfileHoverListItem>내가 쓴 댓글</ProfileHoverListItem>
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