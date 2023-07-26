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
const Display = styled.iframe`
  background-color: black;
  height: 250px;
`

function Video ({script}) {
  return(
    <Container>
      <Title>{script.title}</Title>
      <Display src={script.videoUrl}></Display>
    </Container>
  )
}
export default Video