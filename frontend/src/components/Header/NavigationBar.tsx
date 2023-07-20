import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Navbar = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.25px solid grey;
  height: 70px;
  width: 100vw;
`
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`
const Logo = styled.img`
  cursor: pointer;
  height: 40px;
  width: 75px;
  margin: 0px 20px 0px 40px;
`
const MenuList = styled.ul`
  display: flex;
  list-style: none;
`
const Menu = styled.li`
  color: white;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  margin-right: 40px;
  cursor: pointer;
`
const IconList = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
`
const Notification = styled.img`
  height: 25px;
  margin-right: 30px;
`
const Profile = styled.img`
  height: 40px;
  margin-right: 30px;
`

const EmptySpace = styled.div`
  height: 70px;
`
interface Headertype {
  setMenuIsShown : Dispatch<SetStateAction<boolean>>
}

function NavigationBar({ setMenuIsShown }: Headertype) {
  // Router Link와 동일한 부분
  const navigate = useNavigate()  
  const goSelectCategory = () => {navigate("/category")}
  return(
    <>
    <Navbar>
      <LeftSection >
        <Logo onClick={goSelectCategory} src="/src/assets/Header/logo.png"></Logo>
        
        <MenuList
          onMouseEnter={() => setMenuIsShown(true)}>
          <Menu>Training</Menu>
          <Menu>Meeting</Menu>
          <Menu>Community</Menu>
        </MenuList>
      </LeftSection>
      
      <IconList>
        <Notification src="/src/assets/Header/notification.png"></Notification>
        <Profile src="/src/assets/Header/profile_tmp.png"></Profile>
      </IconList>
    </Navbar>
    <EmptySpace/>
    </>
  )
}

export default NavigationBar