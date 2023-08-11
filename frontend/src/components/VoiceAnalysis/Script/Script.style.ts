import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 470px; 
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
  margin: 8px 0px 18px 0px;
`
export const OptionButton = styled.button`
  background-color: transparent;
  border-radius: 12px;
  line-height: 29px;
  height: 30px;
  margin-left: 7px;
  padding: 0px 7px 0px 7px;
  cursor: pointer;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
export const GenderButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#999999"};
  border: solid ${props => props.$IsClick ? "1px white" : "1px #999999"};
`
export const AgeButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#999999"};
  border: solid ${props => props.$IsClick ? "1px white" : "1px #999999"};
`
export const ScriptBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 225px;
`
export const ScriptInput = styled.textarea`
  background-color: transparent;
  font-size: 18px;
  color: white;
  margin-top: 20px;
  padding: 0px 0px 25px 20px;
  height: 130px;
  width: 440px;
  border: none;
  resize: none;
  outline: none;

  &::-webkit-scrollbar {
    width: 8px;
    margin-right: 20px;
  }

  &::-webkit-scrollbar-thumb {
    height: 20px; /* 스크롤바의 길이 */
    background: #535353; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
`

export const ScriptButtons = styled.div`
  display: flex;
  justify-content: flex-end; 
  align-items: flex-end;
`

export const DelButton = styled.img`
  width: 24px;
  height: 24px;
  margin: 0px 10px 14px 0px;
  cursor: pointer;
`

export const PlayButton = styled.img`
  margin: 6px;
  width: 33px;
  margin-right: 10px;
  cursor: pointer;
`

export const DelButtonActive = styled(DelButton)``
export const PlayButtonActive = styled(PlayButton)``