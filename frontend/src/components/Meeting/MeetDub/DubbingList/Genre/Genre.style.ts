import { styled } from "styled-components";

const OptionButton = styled.button`
  background-color: transparent;
  border-radius: 12px;
  padding: 0px 7px 0px 7px;
  margin-right: 10px;
  font-size: 14px;
  line-height: 29px;
  height: 30px;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`

export const GenreBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 33px;
  margin-bottom: 12px;
`

export const GenreButton = styled(OptionButton)<{$IsClick:boolean}>`
  cursor: pointer;
  color: ${props => props.$IsClick ? "white" : "#999999"};
  border: solid ${props => props.$IsClick ? "1px white" : "1px #999999"};
`