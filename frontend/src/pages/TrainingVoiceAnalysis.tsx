import { styled } from 'styled-components';
import { BackGroundImg } from '../components/BackGroundImg';
import Header from '../components/Header/Header';
import Script from '../components/Training/Script';

const Container = styled.div`
  display: flex;
  justify-content: center;
`
const Section = styled.div`
  display: flex;
  flex-direction: column;
`

function TrainingVoiceAnalysis() {
  return (
    <BackGroundImg>
      <Header></Header>
      <Container>
        <Section>
          <Script></Script>
        </Section>
      </Container>
    </BackGroundImg>
  )
}
export default TrainingVoiceAnalysis