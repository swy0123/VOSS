import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  margin-bottom: 20px;
`
const Title = styled.h2`
  color: white;
  text-align: left;
  margin-bottom: 30px;
`
const Display = styled.img`
  background-color: black;
  height: 250px;
`
const ScriptBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.15);
  margin-top: 20px;
  padding: 30px;
  height: 160px;
  /* overflow-y: scroll; */
`
const Script = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 12px 0px;
`
const Script_Unit = styled.p`
  color: white;
  font-size: 12px;
  text-align: left;
  margin: 0px;
`
const Role = styled(Script_Unit)``
const Sentence = styled(Script_Unit)`
  text-align: left;
  width: 250px;
`
const Time = styled(Script_Unit)``

function Video () {
  return(
    <Container>
      <Title>무한도전 - 무한상사</Title>
      <Display src="/src/assets/Training/videoexample.png"></Display>
      <ScriptBox>
        <Script>
          <Role>박차장</Role>
          <Sentence>어디 어른...붑.. 부장님 앞에서 색안경을! 어?!</Sentence>
          <Time>4:21</Time>
        </Script>

        <Script>
          <Role>유부장</Role>
          <Sentence>박차장 고만해요 고만. 진정해요.</Sentence>
          <Time>4:22</Time>
        </Script>

        <Script>
          <Role>노사원</Role>
          <Sentence>(웃으며) 차장님! 차장님!</Sentence>
          <Time>4:23</Time>
        </Script>

      </ScriptBox>
    </Container>
  )
}
export default Video