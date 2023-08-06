import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { videoState } from '../recoil/Training';
import { BackGroundImg } from '../components/BackGroundImg';
import { getVideo } from "/src/api/video"
import { ScriptData } from "/src/type/type"
import { styled } from 'styled-components';
import Header from '../components/Header/Header';
import Messenger from '../components/Message/Messenger';
import RecordButton from '../components/DubbingRoom/RecordButton/RecordButton';
import Recording from '../components/DubbingRoom/Recording/Recording';
import Script from '../components/DubbingRoom/Script/Script';
import Video from '../components/DubbingRoom/Video/Video';
import Loading from '../components/Loading';

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

  const axiosVideo = async (id:number):Promise<void> => {
    try {
      const VideoData:ScriptData = await getVideo(id);
      setVideo(VideoData);
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void axiosVideo(id);
  }, []);

  // 로딩 페이지가 하나 더 있으면 좋겠다.
  if (!video) {return <Loading/>;}

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