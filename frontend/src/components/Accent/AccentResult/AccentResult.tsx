import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { Accuracy, ResultBox, Section, SpinnerDiv, Text, Warning } from "./AccentResult.style";
import { accentClickableState, accentScriptState, accentSttState } from "/src/recoil/HW_Atom";
import { ScaleLoader } from "react-spinners";

function AccentResult() {
  const [accentStt, setAccentStt] = useRecoilState(accentSttState);
  const [accentScript, setAccentScript] = useRecoilState(accentScriptState);
  const [accuracyRate, setAccuracyRate] = useState<number>(0);
  const [accentClickable, setaccentClickable] = useRecoilState<boolean>(accentClickableState);

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
    if (!accuracy) {
      return;
    }
    setAccuracyRate(parseInt((accuracy * 100).toFixed(1)));
  }

  useEffect(() => {
    if (accentStt.length > 0) calculateStringAccuracy(accentScript, accentStt);
    else setAccuracyRate(0);
  }, [accentStt]);
  
  return (
    <ResultBox>
      <Text placeholder="대사를 읽어보아요">
        {accentStt}
      </Text>

      <SpinnerDiv $IsClickable={accentClickable}>
        <ScaleLoader color="#0d0808" />
      </SpinnerDiv>
      <Section>
        <Warning>발음 교정은 한국어만 가능합니다.</Warning>
        {accentScript !== "" ? (
          <Accuracy>정확도 : {accuracyRate} %</Accuracy>
        ) : (
          <Accuracy>스크립트를 생성한 후에 이용해주세요.</Accuracy>
        )}
      </Section>
    </ResultBox>
  );
}
export default AccentResult;
