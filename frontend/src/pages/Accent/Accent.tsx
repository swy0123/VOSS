import { styled } from 'styled-components';
import { BackGroundImg } from "../../components/BackGroundImg"
import Header from "../../components/Header/Header"
import Messenger from '../../components/Message/Messenger';
import Script from '../../components/Accent/Script/Script';
import AccentResult from '../../components/Accent/AccentResult/AccentResult';
import RecordButton from '../../components/Accent/RecordButton/RecordButton';
import Recording from '../../components/Accent/Recording/Recording';
import { 
  OverflowHeaderHidden,
  Container, 
  LeftSection, 
  RightSection } from './Accent.style';



function Accent() {
  return (
    <BackGroundImg>
      <Header/>
      <OverflowHeaderHidden>
      <Container>

        <LeftSection>
          <Script></Script>
          <AccentResult></AccentResult>
        </LeftSection>

        <RightSection>
          <Recording></Recording>
          <RecordButton></RecordButton>
        </RightSection>

      </Container>
      </OverflowHeaderHidden>
      <Messenger/>
    </BackGroundImg>
  )
}
export default Accent