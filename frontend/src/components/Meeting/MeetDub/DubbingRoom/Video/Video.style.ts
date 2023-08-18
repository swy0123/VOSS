import { StyledEngineProvider } from '@mui/material';
import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  margin-bottom: 0px;
`
export const Title = styled.h2`
  color: white;
  margin-top: 0px;
  text-align: left;
  margin-bottom: 10px;
`
export const VideoBox = styled.div`
  height: 255px;
`
export const Display = styled.div`
  position: absolute;
  background-color: black;
  margin-bottom: 10px;
  height: 250px;
  width: 550px;
`
export const ImgSection = styled.div`
  position: absolute;
  display: flex;
  height: 250px;
  width: 550px;
  margin-top: 5px;
  align-items: center;
  justify-content: center;
`
export const ProtectSection = styled(ImgSection)`
  background-color: transparent;
`

export const VideoControl = styled.img`
  cursor: pointer;
  opacity: 0;
  
  ${ImgSection}:hover & {
    opacity: 1;
    transform: scale(1);
  }
  &:hover{
    transition: transform 0.3s ease-in-out;
    transform: scale(1.1);
  }
`

export const VideoPlay = styled(VideoControl)``
export const VideoPause = styled(VideoControl)``
export const VideoReset = styled(VideoControl)`
  width: 60px;
`

export const ButtonBox = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-between;
`

export const Thumbnail = styled.img`
  position: absolute;
  margin-bottom: 10px;
  height: 250px;
  width: 450px;
`
export const YoutubeIcon =styled.img`
  position: absolute;
  cursor: pointer;
`

export const RoleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 33px;
  margin-bottom: 20px;
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
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
export const RoleButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#6C6C6C"};
  border: solid ${props => props.$IsClick ? "2px white" : "1px #6C6C6C"};
`
