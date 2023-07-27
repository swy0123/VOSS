import { BackGroundImg } from '../components/BackGroundImg';
import { styled } from 'styled-components';
import Header from '../components/Header/Header';
import Messenger from '../components/Message/Messenger';
import RecordButton from '../components/DubbingRoom/RecordButton';
import Recording from '../components/DubbingRoom/Recording';
import Script from '../components/DubbingRoom/Script';
import Video from '../components/DubbingRoom/Video';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVideo } from '../api/video';
import { ScriptData } from '../type/type';


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
  const [video, setVideo] = useState()
  const id = parseInt(useParams().id || "");

  const axiosVideo = async () => {
    try {
      const VideoData: ScriptData = await getVideo(id);
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
            script={video.script}></Video>
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