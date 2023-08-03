import { styled } from 'styled-components';
import { useEffect } from 'react';
import { ScriptData } from '../type/type';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getVideo } from '../api/video';
import { videoState } from '../recoil/Training';
import { BackGroundImg } from '../components/BackGroundImg';
import Header from '../components/Header/Header';
import Messenger from '../components/Message/Messenger';
import RecordButton from '../components/DubbingRoom/RecordButton/RecordButton';
import Recording from '../components/DubbingRoom/Recording/Recording';
import Script from '../components/DubbingRoom/Script/Script';
import Video from '../components/DubbingRoom/Video/Video';

const Container = styled.div`
  display: flex;
  justify-content: center;
`
const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function Dubbing() {
  const [video, setVideo] = useRecoilState<ScriptData | null>(videoState)
  const id = parseInt(useParams().id || "");

  const axiosVideo = async () => {
    try {
      const VideoData:ScriptData = await getVideo(id);
      setVideo(VideoData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axiosVideo();
  }, [id]);

  if (!video) {return <div>Loading...</div>;}

  return (
    <BackGroundImg>
      <Header/>
      <Container>

        <LeftSection>
          <Video 
            script={video.script}
            roles={video.roles}
            lines={video.lines}></Video>
          <Script 
            lines={video.lines}></Script>
        </LeftSection>
        
        <RightSection>
          <Recording></Recording>
          <RecordButton></RecordButton>
        </RightSection>
      
      </Container>
      <Messenger/>
    </BackGroundImg>
  )
}
export default Dubbing