import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 470px;
  margin-bottom: 0px;
`

export const Title = styled.h2`
  color: white;
  text-align: left;
  margin-bottom: 20px;
`
export const VideoBox = styled.div`
  height: 270px;
  width: 470px; 
`

export const Display = styled.div`
  background-color: black;
  margin-bottom: 10px;
  height: 270px;
  width: 470px;
`

export const RoleBox = styled.div`
  display: flex;
  align-items: center;
  height: 33px;
  margin-bottom: 10px;
`

export const OptionButton = styled.button`
  background-color: transparent;
  border-radius: 12px;
  line-height: 30px;
  height: 30px;
  padding: 0px 7px 0px 7px;
  margin-right: 8px;
  font-size: 14px;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`

export const RoleButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#999999"};
  border: solid ${props => props.$IsClick ? "2px white" : "2px #999999"};
`