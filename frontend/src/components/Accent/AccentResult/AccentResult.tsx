import { useRecoilState } from "recoil";
import { useState,useEffect } from "react"
import { Accuracy, ResultBox, Section, Text, Warning } from "./AccentResult.style"
import { accentScriptState, accentSttState } from "/src/recoil/HW_Atom";

function AccentResult () {
  const [accentStt, setAccentStt] = useRecoilState(accentSttState)
  const [accentScript, setAccentScript] = useRecoilState(accentScriptState)
  const [accuracyRate, setAccuracyRate] = useState<number>(0)

  // 발음 정확도 분석
  function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    dp[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return dp[len1][len2];
}
function calculateStringAccuracy(actual: string, sttResult: string) {
  const distance = levenshteinDistance(actual, sttResult);
  const maxLength = Math.max(actual.length, sttResult.length);
  const accuracy = 1 - distance / maxLength;
  setAccuracyRate(accuracy.toFixed(2) * 100)
}

useEffect(() => {
  calculateStringAccuracy(accentScript,accentStt)
},[accentStt])


  return (
    <ResultBox>
      <Text>{accentStt}</Text>
      <Section>
        <Warning>발음 교정은 한국어만 가능합니다.</Warning>
        <Accuracy>정확도 : {accuracyRate} %</Accuracy>
      </Section>
    </ResultBox>
  )
}
export default AccentResult