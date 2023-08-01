import { styled } from "styled-components";


export const BasicBoxDesign = styled.div`
  /* border: dotted 1px red; */
  display: flex;
  width: 25vw;
  height: 100%;
  color: white;
`;

export const ProfileImgDesign = styled.div`
  /* border: solid 2px blue; */
  display: flex;
  justify-content: center;
  width: 14vh;
  aspect-ratio: 1/1;
  `;

export const ProfileImgDesign2 = styled.div`
  width: 14vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


export const ProfileInfoDesign = styled.div`
  /* border: solid 3px green; */
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 60%;
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
  font-size: 1.4vw;
  font-weight: bold;
  width: 80%;
  height: 100%;
`;

export const ProfileBtnDesign = styled.div`
/* border: solid 2px yellow;s */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  img {
    margin-top: 10%;
    height: 40%;
    aspect-ratio: 1/1;
  }
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
  width: 30%;
  height: 80%;
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
  width: 30%;
  height: 80%;
  p {
    margin: 0vw;
  }
  &:hover {
    text-decoration: underline;
  }
`;

export const ProfileFollowingSpaceDesign = styled.div`
  /* border: solid 2px white; */
  width: 20%;
  height: 100%;
`;