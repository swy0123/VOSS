import { styled } from "styled-components";


export const Navbar = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.25px solid grey;
  height: 46px;
  width: 100vw;
`
export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`
export const Logo = styled.img`
  cursor: pointer;
  height: 28px;
  width: 48px;
  margin: 0px 30px 0px 40px;
`
export const MenuList = styled.ul`
  display: flex;
  list-style: none;
  line-height: 46px;
  height: 46px;
  width: 270px;
  `
export const Menu = styled.li`
  text-align: center;
  width: 90px;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 12px;
  height: 44px;
  line-height: 44px;
  cursor: pointer;
  &:hover {
    border-bottom: solid 2px #efefef;
  }
`
export const IconList = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
`
export const Alarm = styled.div<{$AlarmIsShown?: boolean}>`
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
export const AlarmCount = styled.div`
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
export const AlarmIcon = styled.img`
  height: 20px;
`
export const Profile = styled.img`
  height: 30px;
  margin-right: 30px;
`
export const ProfileHover =styled.img`
  border: solid 1px white;
  width: 10vw;
  height: 10vh;
`

export const EmptySpace = styled.div`
  height: 70px;
`
export const ProfileHoverList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  
  position: fixed;
  top: 35px;
  right: 40px;
  width: 62px;
  height: 103px;
  /* border: dotted 1px yellow; */
`;

export const ProfileHoverListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #495057;
  width: 62px;
  height: 22px;
  font-size: 5px;
  border-bottom: solid 1px gray;

  // 마우스 호버 시에 작동
  &:hover {
    text-decoration: underline;
    font-weight: bold;
    color: black;
  }
`;

export const ProfileHoverTriangle = styled.div`
  position: fixed;
  top: 40px;
  right: 66px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 7px solid white; 
`