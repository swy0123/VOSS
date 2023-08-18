import { BackGroundImg } from '../../components/BackGroundImg';
import Header from '../../components/Header/Header';
import Script from '../../components/VoiceAnalysis/Script/Script';
import AnalysisButton from '../../components/VoiceAnalysis/AnalysisButton/AnalysisButton';
import Messenger from '../../components/Message/Messenger';
import RecordButton from '../../components/VoiceAnalysis/RecordButton/RecordButton';
import Recording from '../../components/VoiceAnalysis/Recording/Recording';
import { 
  OverflowHeaderHidden,
  Container, 
  LeftSection, 
  RightSection, 
  UpSection } from './VoiceAnalysis.style';

function VoiceAnalysis() {
  return (
    <BackGroundImg>
      <Header/>
      <OverflowHeaderHidden>
      <Container>
        <UpSection>
          <LeftSection>
            <Script></Script>
          </LeftSection>
          <RightSection>
            <Recording></Recording>
            <AnalysisButton></AnalysisButton>
          </RightSection>
        </UpSection>
        <RecordButton></RecordButton>
      </Container>
      </OverflowHeaderHidden>
      <Messenger/>
    </BackGroundImg>
  )
}
export default VoiceAnalysis