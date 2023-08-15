import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

export const DialogBox = styled.dialog`
  border: none;
  /* border: solid 5px yellow; */
  width: 360px;
  height: 400px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  /* align-items: center; */
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 200;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const FriendTitleDesign = styled.div`
  /* border: solid 3px blue; */
  margin-left: 5px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  z-index: 300;
`;


export const ExitImg = styled.img`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 12px;
  width: 20px;
  height: 20px;
  `;

export const FriendSearchDesign = styled.div`
  /* border: solid 3px blue; */
  width: 91%;
  padding: 4px 12px;
  background-color: #EFEFEF;
  border-radius: 7px;
  align-self: center;
  z-index: 300;
`;

export const FriendListDesign = styled.div`
  /* border: solid 3px blue; */
  margin-top: 10px;
  width: 100%;
  height: 380px;
  z-index: 300;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    border-radius: 6px;
    background: rgba(186, 186, 186, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

export const FriendListItemDesign = styled.div`
  /* border: solid 3px blue; */
  height: 45px;
  display: flex;
  justify-content: space-evenly;
  &:hover {
    background-color: #efefef;
  }
`;

export const FriendListItem1 = styled.div`
  /* border: solid 3px blue; */
  display: flex;
  align-items: center;
  width: 10%;
  img {
    cursor: pointer;
    border-radius: 50%;
    width: 35px;
    height: 35px;
  };
  `;
  
  export const FriendListItem2 = styled.div`
  /* border: solid 3px blue; */
  display: flex;
  align-items: center;
  width: 58%;
  span{
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  };
  `;
  
  export const FriendListItem3 = styled.div`
  /* border: solid 3px blue; */
  display: flex;
  align-items: center;
  width: 8%;
  img {
    cursor: pointer;
    width: 32px;
    height: 30px;
  }
`;