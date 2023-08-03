import { styled } from 'styled-components';
import { BackGroundImg } from "../components/BackGroundImg"
import Header from "../components/Header/Header"
import Messenger from '../components/Message/Messenger';
import Script from '../components/Accent/Script/Script';
import AccentResult from '../components/Accent/AccentResult/AccentResult';
import RecordButton from '../components/Accent/RecordButton/RecordButton';
import Recording from '../components/Accent/Recording/Recording';

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
const Warning = styled.div`
  color: #BABABA;
  font-size: 12px;
  margin-top: 14px;
`

function Accent() {
  return (
    <BackGroundImg>
      <Header/>
      <Container>

        <LeftSection>
          <Script></Script>
          <AccentResult></AccentResult>
          <Warning>발음 교정은 한국어만 가능합니다.</Warning>
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
export default Accent