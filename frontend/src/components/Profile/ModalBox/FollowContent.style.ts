import { styled } from "styled-components";

export const UserContainer = styled.div`
  /* border: 2px solid purple; */
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75vw 2.75vw;
  
  &:hover {
    background-color: rgba(239, 239, 239, 1);
  }
  `;

export const UserImage = styled.img`
  width: 10%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
  `;

export const UserName = styled.span`
  /* border: 3px solid aquamarine; */
  width: 58%;
  font-weight: bold;
  font-size: 1.1vw;
  `;

export const FollowButton = styled.button`
  padding: 0.3vw;
  width: 25%;
  background-color: #132B31;
  color: #EFEFEF;
  font-weight: bold;
  border: solid 1px #132B31;
  border-radius: 7px;
  cursor: pointer;
  font-size: 1vw;
  `;

export const FollowingButton = styled.button`
  padding: 0.3vw;
  width: 25%;
  background-color: #EFEFEF;
  color: #132B31;
  font-weight: bold;
  border: solid 1px #132B31;
  border-radius: 7px;
  cursor: pointer;
  font-size: 1vw;
  `;