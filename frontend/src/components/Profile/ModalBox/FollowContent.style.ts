import { styled } from "styled-components";

export const UserContainer = styled.div`
  /* border: 2px solid purple; */
  height: 4.6vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75vw 2.6vw;
  
  &:hover {
    background-color: #EFEFEF;
  }
  `;

export const UserImage = styled.img`
  width: 13%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  `;

export const UserName = styled.div`
  /* border: 3px solid aquamarine; */
  text-align: start;
  width: 12.5vw;
  font-weight: bold;
  font-size: 1vw;
  cursor: pointer;
  span {
    &:hover {
      border-bottom: solid 1.5px;
    }
  }
  `;

export const FollowButton = styled.button`
  padding: 0.3vw;
  width: 6.2vw;
  height: 2.05vw;
  background-color: #333333;
  color: #FFFFFF;
  text-align: center;
  line-height: 50%;
  font-weight: bold;
  border: solid 1px #132B31;
  border-radius: 0.8vw;
  cursor: pointer;
  font-size: 1vw;
  `;

export const FollowingButton = styled.button`
  padding: 0.3vw;
  width: 6.2vw;
  height: 2.05vw;
  background-color: #FFFFFF;
  color: #333333;
  text-align: center;
  line-height: 50%;
  font-weight: bold;
  border: solid 1px #132B31;
  border-radius: 0.8vw;
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