import { styled } from "styled-components";
import UpdateIconHover from "/src/assets/Profile/UpdateIconHover.png";

export const BasicBoxDesign = styled.div`
  /* border: dotted 1px red; */
  display: flex;
  justify-content: center;
  width: 30vw;
  height: 100%;
  color: white;
`;

export const ProfileImgDesign = styled.div`
  /* border: solid 2px blue; */
  display: flex;
  justify-content: center;
  height: 100%;
  aspect-ratio: 1/1;
  cursor: pointer;
  `;

export const ProfileImgDesign2 = styled.div`
  /* border: solid 2px yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  &:hover {
    img{
      opacity: 0.5; /* 호버 상태에서 아이콘을 보이게 합니다. */
    }
    #updateIcon{
      opacity: 1; /* 호버 상태에서 아이콘을 보이게 합니다. */
    }
  };
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  };
  #updateIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.6vw;
    height: 1.6vw;
  }
`;

export const ProfileInfoDesign = styled.div`
  /* border: solid 3px green; */
  margin-left: 1vw;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 10%;
  width: 18vw;
  height: 80%;
`;

export const ProfileNameBoxDesign = styled.div`
  /* border: solid 2px white; */
  display: flex;
  width: 100%;
  height: 50%;
`;

export const ProfileNameDesign = styled.div`
  /* border: solid 2px red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.6vw;
  font-weight: bold;
  width: 14vw;
  height: 100%;
`;

export const ProfileBtnDesign = styled.div`
  /* border: solid 2px yellow; */
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 4vw;
  height: 100%;
  cursor: pointer;
  img {
    margin-top: 10%;
    height: 40%;
    aspect-ratio: 1/1;
    &:hover{
      content: url(${UpdateIconHover});
    };
  };
`;

export const FollowButton = styled.button`
  margin-top: 1.5vh;
  padding: 0.3vw;
  width: 6.2vw;
  height: 2.05vw;
  background-color: #132B31;
  color: #EFEFEF;
  text-align: center;
  line-height: 50%;
  font-weight: bold;
  border: solid 1px #EFEFEF;
  border-radius: 0.8vw;
  cursor: pointer;
  font-size: 1vw;
  `;

export const FollowingButton = styled.button`
  margin-top: 1.5vh;
  padding: 0.3vw;
  width: 6.2vw;
  height: 2.05vw;
  background-color: #EFEFEF;
  color: #132B31;
  text-align: center;
  line-height: 50%;
  font-weight: bold;
  border: solid 1px #EFEFEF;
  border-radius: 0.8vw;
  cursor: pointer;
  font-size: 1vw;
  `;

export const FollowBoxDesign = styled.div`
  /* border: solid 2px purple; */
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40%;
  font-size: 0.8vw;
`;

export const ProfileFollowerDesign = styled.div`
  /* border: solid 2px white; */
  display: flex;
  align-self: end;
  flex-direction: column;
  justify-self: end;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 80%;
  font-size: 14px;
  cursor: pointer;
  p {
    margin: 0vw;
  }
  &:hover {
    text-decoration: underline;
  }
  `;

export const ProfileFollowingDesign = styled.div`
  /* border: solid 2px white; */
  display: flex;
  align-self: end;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 80%;
  font-size: 14px;
  cursor: pointer;
  p {
    margin: 0vw;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export const ProfileFollowingSpaceDesign = styled.div`
  /* border: solid 2px white; */
  width: 4vw;
  height: 100%;
`;

export const InputDiv = styled.div`
  position: relative;
`;

export const InputHeader = styled.div`
  width: fit-content;
  font-size: 14px;
  color: #757575;
  padding: 8px;
  height: 12px;
  background-color: #ffffff;
  position: absolute;
  top: 2px;
  left: 12%;
`;

export const Input = styled.input`
  border: #bdbdbd;
  border-style: solid;
  width: 80%;
  height: 40px;
  padding: 0px;
  padding-left: 5%;
  border-width: 1px;
  border-radius: 8px;
  margin-top: 20px;
`;