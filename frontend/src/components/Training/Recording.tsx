import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px; 
`
const Title = styled.h2`
  color: white;
  text-align: center;
  margin: 0px 0px 20px 0px;
`
const RecordBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 185px;
  `

function Recording (){
  return(
    <Container>
      <Title>녹음 기록</Title>
      <RecordBox>

      </RecordBox>
    </Container>
  )
}

export default Recording