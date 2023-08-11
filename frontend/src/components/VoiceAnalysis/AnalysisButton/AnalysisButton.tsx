import { useRecoilState } from "recoil";
import { analysisResultState } from "/src/recoil/HW_Atom";
import { 
  Container,
  AnalysisBtn,
  AnalysisResult
  } from "./AnalysisButton.style";

function AnalysisButton() {
  const [analysisResult] = useRecoilState(analysisResultState)
  const analysising = (event: { target: { value: string; }; }) => {event.target.value = analysisResult}
  return(
    <Container>
      {/* <AnalysisBtn>분석하기</AnalysisBtn> */}
      <AnalysisResult 
        type="text" 
        value={analysisResult}
        onChange={analysising} 
        placeholder="원하는 파일을 선택해 목소리를 분석해 보세요"></AnalysisResult>
    </Container>
  )
}
export default AnalysisButton 