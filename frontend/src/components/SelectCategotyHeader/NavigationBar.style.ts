import { styled } from "styled-components";

export const Navbar = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  width: 100vw;
  z-index: 9999;
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
  z-index: 1;
`
export const ProfileHover =styled.img`
  border: solid 1px white;
  width: 10vw;
  height: 10vh;
`

export const EmptySpace = styled.div`
`
export const ProfileHoverList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  position: fixed;
  top: 26px;
  right: 32px;
  width: 68px;
  height: 120px;
  padding: 0px 5px 10px 5px;
  /* border: dotted 1px yellow; */
  `;

export const ProfileHoverListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 68px;
  height: 25px;
  font-size: 5px;
  border-bottom: solid 1px #d9d9d9;
  // 마우스 호버 시에 작동
  &:hover {
    text-decoration: underline;
    font-weight: bold;
    color: black;
  }
`;

export const ProfileHoverTriangle = styled.div`
  position: fixed;
  top: 37px;
  right: 63px;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 10px solid white; 
  z-index: 2;
`