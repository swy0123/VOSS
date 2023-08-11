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
  top: 9px;
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
export const CategoryBox =styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  height: 33px;
  margin:8px 0px 18px 0px;
`
export const OptionButton = styled.button`
  border-radius: 14px;
  line-height: 30px;
  height: 30px;
  padding: 0px 7px 0px 7px;
  margin-left: 7px;
  font-weight: 800;
  cursor: pointer;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
export const CategoryButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "#222222" : "white"};
  border: solid ${props => props.$IsClick ? "1px black" : "1px white"};
  background-color: ${props => props.$IsClick ? "#efefef" : "transparent"};
`
export const ScriptBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 210px;
`
export const ScriptInput = styled.textarea`
  background-color: transparent;
  font-size: 14px;
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