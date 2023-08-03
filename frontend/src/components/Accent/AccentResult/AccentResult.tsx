import { useRecoilState } from "recoil";
import { ResultBox, Text } from "./AccentResult.style"
import { accentTextState } from '/src/recoil/HW_Atom';

function AccentResult () {
  const [accentText, setAccentText] = useRecoilState(accentTextState)

  return (
    <ResultBox>
      <Text>{accentText}</Text>
    </ResultBox>
  )
}
export default AccentResult