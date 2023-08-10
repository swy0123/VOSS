import { styled } from "styled-components";

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
  width: 550px;
  height: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 14px;
  /* align-items: center; */
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 10000;
`;

export const Title = styled.p`
  text-align: center;
  font-size: 22px;
`;

export const Span = styled.span`
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  margin-top: 15px;
`;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const ExitImg = styled.img`
  position: absolute;
  right: 30px;
  top: 20px;
  width: 20px;
  height: 20px;
`;

export const CategoryDiv = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
`;

export const TagButton = styled.div<{ $IsClick: boolean }>`
  position: relative;
  background-color: transparent;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  width: fit-content;
  color: #6c6c6c;
  font-size: 15px;
  font-weight: bold;
  margin: 5px 10px 15px 0px;
  padding: 5px 10px;
  &:hover {
    transform: scale(1.05);
    transition: 0.2s;
  }
  color: ${(props) => (props.$IsClick ? "white" : "#6C6C6C")};
  border: solid ${(props) => (props.$IsClick ? "1px white" : "1px #6C6C6C")};
`;

export const TmpBorder = styled.span`
  margin: 2px;
  border-width: 1px;
  border-style: solid;
  border-radius: 2px;
  border-color: red;
`;

// export const Form = styled.form`
// width: 100%;
// `;

export const TitleInput = styled.input`
  background-color: transparent;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  width: 96%;
  color: #6c6c6c;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 2%;
  margin-bottom: 15px;
  margin-top: 5px;
`;
export const PasswordInput = styled.input`
  background-color: transparent;
  border: 1px solid #6c6c6c;
  border-radius: 5px;
  width: 48%;
  color: #6c6c6c;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 1%;
  margin-bottom: 15px;
  margin-top: 5px;
`;

export const PassaDiv = styled.span`
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  
`;
