import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 470px;
  margin-bottom: 0px;
`

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const BackButton = styled.button`
  background: rgba(34, 80, 91, 0.70);
  border-radius: 20px;
  font-weight: 800;
  font-size: 14px;
  height: 28px;
  width: 80px;
  color: white;
  border: none;
  margin-top: 5px;
  cursor: pointer;

  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
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

export const ImgSection = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 270px;
  width: 470px;
  top: 138px;
`

export const ProtectSection = styled(ImgSection)`
  background-color: transparent;
`

export const Thumbnail = styled.img`
  position: absolute;
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
  line-height: 29px;
  height: 30px;
  padding: 0px 7px 0px 7px;
  margin-right: 8px;
  font-size: 13px;
  cursor: pointer;

  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`

export const RoleButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#999999"};
  border: solid ${props => props.$IsClick ? "1px white" : "1px #999999"};
`