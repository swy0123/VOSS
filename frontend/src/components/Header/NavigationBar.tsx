import { useState, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { CurrentUserAtom } from "../../recoil/Auth";

const Navbar = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.25px solid grey;
  height: 46px;
  width: 100vw;
`
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`
const Logo = styled.img`
  cursor: pointer;
  height: 28px;
  width: 48px;
  margin: 0px 30px 0px 40px;
`
const MenuList = styled.ul`
  display: flex;
  list-style: none;
  line-height: 46px;
  height: 46px;
`
const Menu = styled.li`
  color: white;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 12px;
  margin-right: 40px;
  cursor: pointer;
`
const IconList = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
`
const Alarm = styled.div<{$AlarmIsShown?: boolean}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-right: 20px;
  height: 30px;
  width: 30px;
  background-color: ${props => props.$AlarmIsShown ? "#949494" : ""};
  cursor: pointer;
  
  &:hover {
    background-color: #949494;
  }
`
const AlarmCount = styled.div`
  position: absolute;
  top: 5px;
  left: 15px;
  background-color: #B3261E;
  border-radius: 100px;
  height: 11px;
  width: 11px;
  font-size: 1px;
  color: white;
  text-align: center;
  line-height: 11px;
`
const AlarmIcon = styled.img`
  height: 20px;
`
const Profile = styled.img`
  height: 30px;
  margin-right: 30px;
`
const EmptySpace = styled.div`
  height: 70px;
`
interface Headertype {
  AlarmIsShown : boolean, 
  setAlarmIsshown : Dispatch<SetStateAction<boolean>>,
  setMenuIsShown : Dispatch<SetStateAction<boolean>>,
}

function NavigationBar({AlarmIsShown, setAlarmIsshown, setMenuIsShown }: Headertype) {
  // Router Link와 동일한 부분
  const navigate = useNavigate()  
  const goSelectCategory = () => {navigate("/category")}
  const AlarmToggle = () => {setAlarmIsshown((IsShown) => !IsShown)}
  // 현재 유저 정보
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUserAtom)

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
          <Menu>Community</Menu>
        </MenuList>
      </LeftSection>
      
      <IconList>
        <div style={{color: "white"}}>{currentUser.email} 님</div>
        <Alarm onClick={AlarmToggle} $AlarmIsShown={AlarmIsShown}>
          <AlarmIcon src="/src/assets/Header/alarm.png"/>
          <AlarmCount>3</AlarmCount>
        </Alarm>
        <Profile src="/src/assets/Header/profile_tmp.png"/>
      </IconList>
    </Navbar>
    <EmptySpace/>
    </>
  )
}

export default NavigationBar