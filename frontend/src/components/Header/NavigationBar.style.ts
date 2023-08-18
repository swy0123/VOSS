import { styled } from "styled-components";


export const Navbar = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.25px solid grey;
  height: 65px;
  width: 100vw;
  background-color: rgba(34, 34, 34, 0.3);
`
export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`
export const Logo = styled.img`
  cursor: pointer;
  height: 35px;
  width: 63px;
  margin: 0px 30px 0px 40px;
`
export const MenuList = styled.ul`
  display: flex;
  list-style: none;
  line-height: 65px;
  height: 65px;
  width: 400px;
  z-index: 5;
`

export const Menu = styled.li`
  text-align: center;
  width: 120px;
  color: white;
  font-size: 16px;
  height: 62px;
  line-height: 64px;
  
  cursor: pointer;
  position: relative;

  &:hover {
    border-bottom: solid 3px #efefef;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, transparent 0%, white 100%);
      opacity: 0.1; /* 조절 가능한 투명도 */
      pointer-events: none;
    }
  }
`;

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
  height: 39px;
  width: 39px;
  background-color: ${props => props.$AlarmIsShown ? "#949494" : ""};
  cursor: pointer;

  &:hover {
    background-color: #949494;
  }
`

export const AlarmIcon = styled.img`
  height: 30px;
`
export const Profile = styled.img`
  height: 46px;
  margin-right: 30px;
  z-index: 1;
  border-radius: 100px;
  cursor: pointer;
`
export const ProfileHover =styled.img`
  border: solid 1px white;
  width: 10vw;
  height: 10vh;
`

export const EmptySpace = styled.div`
  height: 70px;
`

export const DivForHover = styled.div`
  position: fixed;
  top: 45px;
  right: 30px;
  width: 100px;
  height: 15px;
  /* border: solid 1px red; */
`;

export const ProfileHoverList = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 60px;
  right: 30px;
  width: 90px;
  height: 140px;
  padding: 0px 5px 0px 5px;
  border-radius: 2px;
  /* border: dotted 1px yellow; */
  `;

export const ProfileHoverListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 35px;
  font-size: 14px;
  border-bottom: solid 1px #d9d9d9;
  cursor: pointer;
  // 마우스 호버 시에 작동
  
  &:hover {
    text-decoration: underline;
    font-weight: bold;
    color: black;
  }
`;

export const ProfileHoverTriangle = styled.div`
  position: fixed;
  top: 48px;
  right: 70px;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 14px solid white; 
  z-index: 2;
`
