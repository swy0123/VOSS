import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { videoState } from '../../recoil/Training';
import { getVideo } from "/src/api/video"
import { ScriptData } from "/src/type/type"
import { BackGroundImg } from '../../components/BackGroundImg';
import Header from '/src/components/Header/Header';
import Messenger from '/src/components/Message/Messenger';
import RecordButton from '/src/components/DubbingRoom/RecordButton/RecordButton';
import Loading from '/src/components/Loading';
import Video from '/src/components/DubbingRoom/Video/Video';
import Script from '/src/components/DubbingRoom/Script/Script';
import Recording from '/src/components/DubbingRoom/Recording/Recording';
import { 
  Container, 
  LeftSection, 
  RightSection } from './DubbingRoom.style';

function Dubbing() {
  const [video, setVideo] = useRecoilState<ScriptData | null>(videoState);
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
    setVideo(null);
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
          <RecordButton
            script={video.script}
            lines={video.lines}></RecordButton>
        </RightSection>
      
      </Container>
      <Messenger/>
    </BackGroundImg>
  )
}
export default Dubbing