import { BackGroundImg } from '../../components/BackGroundImg';
import { styled } from 'styled-components';
import Messenger from '../../components/Message/Messenger';
import Script from '../../components/DubbingRoom/Script';
import Video from '../../components/DubbingRoom/Video';

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
  return (
    <BackGroundImg>
      <Header/>
      <Container>

        <LeftSection>
          <Video></Video>
          <Script></Script>
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