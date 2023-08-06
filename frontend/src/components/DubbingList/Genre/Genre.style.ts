import { styled } from "styled-components";

const OptionButton = styled.button`
  background-color: transparent;
  border: 1px solid #6C6C6C;
  border-radius: 12px;
  padding: 0px 7px 0px 7px;
  margin-right: 10px;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  color:#6C6C6C;
  
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
  color: ${props => props.$IsClick ? "white" : "#6C6C6C"};
  border: solid ${props => props.$IsClick ? "2px white" : "1px #6C6C6C"};
`