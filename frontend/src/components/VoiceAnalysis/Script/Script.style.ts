import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px; 
  margin: 0px 0px 20px 0px;
`
export const Title = styled.h2`
  color: white;
  text-align: center;
`
export const Options = styled.div`
  display: flex;
  justify-content: space-between;
`
export const OptionSelect = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`
export const OptionCreate = styled.button`
  background-color: #1B3E46;
  border-radius: 20px;
  border: none;
  position: relative;
  top: 38px;
  height: 34px;
  width: 70px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  
  cursor: pointer;
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
export const GenderBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 33px;
`
export const AgeBox =styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 33px;
  margin:8px 0px 18px 0px;
`
export const OptionButton = styled.button`
  background-color: transparent;
  border: 1px solid #6C6C6C;
  border-radius: 14px;
  color:#6C6C6C;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  padding: 0px 7px 0px 7px;
  margin-left: 6px;
  cursor: pointer;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
export const GenderButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#6C6C6C"};
  border: solid ${props => props.$IsClick ? "2px white" : "1px #6C6C6C"};
`
export const AgeButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#6C6C6C"};
  border: solid ${props => props.$IsClick ? "2px white" : "1px $6C6C6C"};
`
export const ScriptBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 225px;
`
export const ScriptInput = styled.textarea`
  background-color: transparent;
  font-size: 18px;
  color: white;
  padding: 25px 0px 25px 20px;
  height: 125px;
  width: 400px;
  border: none;
  resize: none;

  &:focus {
    outline:none;
  }
`
export const ScriptButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
`
export const DelButton = styled.img`
  margin: 6px;
  width: 23px;
  cursor: pointer;
`
export const PlayButton = styled.img`
  margin: 6px;
  width: 23px;
  cursor: pointer;
`