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
  width: 450px;
  height: 410px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 16px;
  /* align-items: center; */
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8) ;
  backdrop-filter: blur(5px);
  color: white;
  z-index: 10000;
`;

export const Title = styled.p`
  text-align: center;
  font-size: 24px;
`;

export const Span = styled.span`
  font-size: 16px;
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
  cursor:pointer;
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
  border-radius: 7px;
  width: fit-content;
  color: #6c6c6c;
  font-size: 15px;
  font-weight: bold;
  margin: 5px 10px 15px 0px;
  padding: 5px 10px;
  cursor:pointer;
  &:hover {
    transform: scale(1.05);
    transition: 0.2s;
  }
  color: ${(props) => (props.$IsClick ? "white" : "#6C6C6C")};
  border: solid ${(props) => (props.$IsClick ? "1px white" : "1px #6C6C6C")};
`;

export const TmpBorder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;
  margin: 1px;
  width: 50px;
  height: 30px;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  border-color: 6C6C6C;
`;

// export const Form = styled.form`
// width: 100%;
// `;

export const Input = styled.input`
  background-color: transparent;
  border: 1px solid #6c6c6c;
  border-radius: 7px;
  width: 96%;
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 2%;
  margin-bottom: 15px;
  margin-top: 10px;
`;

export const Checkbox = styled.input`
  position: relative;
  left: 3px;
  top: 8px;
  width: 20px;
  height: 20px;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  cursor:pointer;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

export const FlexDiv = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const LimitDiv = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const HalfInDiv = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

export const TmpButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: transparent;
  padding-bottom: 2px;
  margin: 5px;
  width: 50px;
  height: 30px;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  border-color: white;
  cursor: pointer;
  
  &:hover {
    color: black;
    background-color: white;
  }
`;