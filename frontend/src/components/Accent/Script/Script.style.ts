import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 470px;
  margin: 0px 0px 20px 0px;
`;
export const Title = styled.h2`
  color: white;
  text-align: center;
`;
export const Options = styled.div<{ $IsClickable: boolean }>`
  display: flex;
  justify-content: space-between;
  pointer-events: ${(props) => (props.$IsClickable ? "auto" : "none")};
`;
export const OptionSelect = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`;
export const OptionCreate = styled.button`
  background-color: #1b3e46;
  border-radius: 20px;
  border: none;
  position: relative;
  top: 9px;
  height: 34px;
  width: 70px;
  color: white;
  font-size: 18px;
  font-weight: bold;

  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;
export const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 30px;
  margin: 8px 0px 18px 0px;
`;
export const OptionButton = styled.button`
  background-color: transparent;
  border-radius: 12px;
  line-height: 29px;
  height: 30px;
  padding: 0px 7px 0px 7px;
  margin-left: 7px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;
export const CategoryButton = styled(OptionButton)<{ $IsClick: boolean }>`
  color: ${(props) => (props.$IsClick ? "white" : "#999999")};
  border: solid ${(props) => (props.$IsClick ? "1px white" : "1px #999999")};
`;
export const ScriptBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 210px;
`;
export const ScriptInput = styled.textarea`
  display: flex;
  background-color: transparent;
  font-size: 18px;
  color: white;
  padding: 25px 0px 25px 20px;
  height: 125px;
  width: 400px;
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export const ScriptButtons = styled.div<{ $IsClickable: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: ${(props) => (props.$IsClickable ? "auto" : "none")};
`;

export const ScriptDiv = styled.div`
  height: 125px;
  width: 400px;
  display: flex;
  position: relative;
  /* align-items: center; */
  /* transform: translate(-50%, -50%); */
`;
export const SpinnerDiv = styled.div<{ $IsClickable: boolean }>`
  width: 90px;
  position: absolute;
  top: 60%;
  left: 55%;
  display : ${(props) => (props.$IsClickable ? "none" : "block")};;
  /* transform: translate(-50%, -50%); */
`;
export const DelButton = styled.img`
  margin: 6px;
  width: 23px;
  cursor: pointer;
`;
export const PlayButton = styled.img`
  margin: 6px;
  width: 23px;
  cursor: pointer;
`;
