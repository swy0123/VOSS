import { BackGroundImg } from '../../components/BackGroundImg';
import { styled } from 'styled-components';
import Messenger from '../../components/Message/Messenger';
import Script from '../../components/DubbingRoom/Script';
import Video from '../../components/DubbingRoom/Video';
import { useParams } from 'react-router';
import { Container, H1, LeftSection, RightSection } from './Meeting.style';


interface MeetingData {
  index: number;
  type: number;
  title: string;
  password: string;
  curMan: number;
  limit: number;
}


function Meeting() {
  const {id} = useParams() as { id: string };

  //id를 통해 해당 화상회의방 api 호출

  return (
    <BackGroundImg>
      <Container>
        <H1>{id}</H1>

        <LeftSection>
          <Video></Video>
          
        </LeftSection>

        <RightSection>
          <Video></Video>
        </RightSection>

      </Container>
      <Messenger />
    </BackGroundImg>
  )
}
export default Meeting
