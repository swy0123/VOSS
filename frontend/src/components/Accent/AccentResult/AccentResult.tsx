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
  // // 정규식 선언 (특수문자, 괄호, 공백 모두 제거 실시 - 점은 제거 안함)
  // var reg = /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/ ]/gim;
  // // 정규식 선언 (특수문자, 괄호, 점, 공백 모두 제거 실시)
  var reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
  
  // 정규식 선언 (특수문자, 괄호, 점 모두 제거 실시 - 공백은 제거 안함)
  // var reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gim;
  const str1Modified = str1.replace(reg, "");
  const str2Modified = str2.replace(reg, "");
  
  const len1 = str1Modified.length;
  const len2 = str2Modified.length;
  const dp: number[][] = [];
  
  for (let i = 0; i <= len1; i++) {
    dp[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1Modified[i - 1] === str2Modified[j - 1] ? 0 : 1;
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
  if (!accuracy) {return}
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

