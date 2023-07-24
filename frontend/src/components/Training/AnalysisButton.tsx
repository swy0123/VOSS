import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const AnalysisBtn = styled.button`
  background-color: #132b31;
  color: white;
  height: 30px;
  width: 80px;
  border: none;
  border-radius: 20px;
  margin: 17px;
  cursor: pointer;
`
const AnalysisResult = styled.div`
  background-color: #444444;
  line-height: 37px;
  text-align: center;
  color: #6C6C6C;
  height: 37px;
  width: 400px;
  margin-top: 5px;
  border-radius: 8px;
`

function AnalysisButton() {
  return(
    <Container>
      <AnalysisBtn>분석하기</AnalysisBtn>
      <AnalysisResult>원하는 파일을 선택해 목소리를 분석해 보세요</AnalysisResult>
    </Container>
  )
}
export default AnalysisButton