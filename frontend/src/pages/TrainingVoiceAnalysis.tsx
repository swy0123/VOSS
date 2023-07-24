import { styled } from 'styled-components';
import { BackGroundImg } from '../components/BackGroundImg';
import Header from '../components/Header/Header';
import Script from '../components/Training/Script';
import Recording from '../components/Training/Recording';
import AnalysisButton from '../components/Training/AnalysisButton';

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
`

function TrainingVoiceAnalysis() {
  return (
    <BackGroundImg>
      <Header></Header>
      <Container>
        <LeftSection>
          <Script></Script>
        </LeftSection>
        <RightSection>
          <Recording></Recording>
          <AnalysisButton></AnalysisButton>
        </RightSection>
      </Container>
    </BackGroundImg>
  )
}
export default TrainingVoiceAnalysis