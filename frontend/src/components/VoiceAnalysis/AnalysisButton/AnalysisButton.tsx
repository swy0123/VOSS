import { 
  Container,
  AnalysisBtn,
  AnalysisResult
  } from "./AnalysisButton.style";

function AnalysisButton() {
  return(
    <Container>
      <AnalysisBtn>분석하기</AnalysisBtn>
      <AnalysisResult>원하는 파일을 선택해 목소리를 분석해 보세요</AnalysisResult>
    </Container>
  )
}
export default AnalysisButton 