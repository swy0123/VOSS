import { BackGroundImg } from '../../components/BackGroundImg';
import Messenger from '../../components/Message/Messenger';
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
          
        </LeftSection>

        <RightSection>
        </RightSection>

      </Container>
      <Messenger />
    </BackGroundImg>
  )
}
export default Meeting