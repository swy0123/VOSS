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

export const UserName = styled.div`
  text-align: start;
  width: 13vw;
  font-weight: bold;
  font-size: 1vw;
  /* border: 3px solid aquamarine; */
  `;

export const FollowButton = styled.button`
  padding: 0.3vw;
  width: 6.2vw;
  height: 2.05vw;
  background-color: #132B31;
  color: #EFEFEF;
  text-align: center;
  line-height: 50%;
  font-weight: bold;
  border: solid 1px #132B31;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1vw;
  text-decoration: none;
  `;

export const FollowingButton = styled.button`
  padding: 0.3vw;
  width: 6.2vw;
  height: 2.05vw;
  background-color: #EFEFEF;
  color: #132B31;
  text-align: center;
  line-height: 50%;
  font-weight: bold;
  border: solid 1px #132B31;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1vw;
  `;

export const ItsMeButton  = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.3vw;
  width: 6.2vw;
  height: 2.05vw;
  color: #132B31;
  text-align: center;
  line-height: 50%;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1vw;
  `;