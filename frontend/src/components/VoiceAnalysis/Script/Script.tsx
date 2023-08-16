import { ChangeEvent, useEffect, useState } from "react";
import { makeAnalysisScript } from "../../../api/script";
import { useRecoilState } from "recoil";
import { GenderSelectedState, AgeSelectedState } from "/src/recoil/Training";
import {
  AgeBox,
  AgeButton,
  Container,
  DelButton,
  DelButtonActive,
  GenderBox,
  GenderButton,
  OptionCreate,
  OptionSelect,
  Options,
  // PlayButton,
  // PlayButtonActive,
  ScriptBox,
  ScriptButtons,
  ScriptDiv,
  ScriptInput,
  SpinnerDiv,
  Title
} from "./Script.style";
import { ScaleLoader } from "react-spinners";

function Script() {
  const [isHovered, setIsHovered] = useState(false);
  const [inputScripts, setInputSctipts] = useState("")
  const [scriptClickable, setScriptClickable] = useState<boolean>(true);
  const genderOpt = ["남성", "여성"]
  const ageOpt = ["어린이", "청소년", "청년", "중년", "장년"]
  const [isGenderSelect, setIsGenderSelect] = useState<boolean[]>([true, false])
  const [isAgeSelect, setIsAgeSelect] = useState<boolean[]>([true, false, false, false, false])
  const [genderSelected, setGenderSelected] = useRecoilState(GenderSelectedState);
  const [ageSelected, setAgeSelected] = useRecoilState(AgeSelectedState);

  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputSctipts(e.target.value)
  }
  const DelScripts = () => {
    setInputSctipts("")
    setIsHovered(false);
  }

  const handleGenderBtn = (index: number) => {
    const isGenderSelectTmp = isGenderSelect.map((_, G_idx) => (G_idx === index))
    setIsGenderSelect(isGenderSelectTmp)
    const GenderSelected = genderOpt.filter((_, d_idx) => (isGenderSelectTmp[d_idx] === true))
    setGenderSelected(GenderSelected)
  }

  const handleAgeBtn = (index: number) => {
    const isAgeSelectTmp = isAgeSelect.map((_, G_idx) => (G_idx === index))
    setIsAgeSelect(isAgeSelectTmp)
    const AgeSelected = ageOpt.filter((_, d_idx) => (isAgeSelectTmp[d_idx] === true))
    setAgeSelected(AgeSelected)
  }

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const axiosMakeScript = async (genderSelected: string, ageSelected: string) => {
    setInputSctipts("스크립트를 생성중입니다...")
    setScriptClickable(false);
    try {
      const makeScriptData: string = await makeAnalysisScript(genderSelected, ageSelected);
      setInputSctipts(makeScriptData.script)
      setScriptClickable(true);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>스크립트</Title>

      <Options $IsClickable={scriptClickable}>
        <OptionSelect>
          <GenderBox>
            성별 : {genderOpt.map((data, index) => (
              <GenderButton
                key={index}
                $IsClick={isGenderSelect[index]}
                onClick={() => handleGenderBtn(index)}
              >{data}
              </GenderButton>
            ))}
          </GenderBox>

          <AgeBox>
            연령대 : {ageOpt.map((data, index) => (
              <AgeButton
                key={index}
                $IsClick={isAgeSelect[index]}
                onClick={() => handleAgeBtn(index)}
              >{data}
              </AgeButton>
            ))}
          </AgeBox>
        </OptionSelect>
        <OptionCreate
          onClick={() => axiosMakeScript(
            genderSelected[0], ageSelected[0]
          )}>생성</OptionCreate>
      </Options>

      <ScriptBox>
        <ScriptDiv>
          <ScriptInput
            value={inputScripts}
            onChange={ChagneScripts}
            placeholder="대사를 입력해주세요.">
          </ScriptInput>
          <SpinnerDiv $IsClickable={scriptClickable}>
            <ScaleLoader color="rgba(220, 220, 220, 1)" />
          </SpinnerDiv>
        </ScriptDiv >
        {inputScripts ? (
          <ScriptButtons $IsClickable={scriptClickable}>
            <DelButtonActive
              src={isHovered ? "/src/assets/Training/trashcan(del).png" :
                "/src/assets/Training/trashcan(active).png"}
              onClick={DelScripts}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}></DelButtonActive>
          </ScriptButtons>
        ) : (
          <ScriptButtons $IsClickable={scriptClickable}>
            <DelButton
              src="/src/assets/Training/trashcan.png"></DelButton>
          </ScriptButtons>
        )}
      </ScriptBox>
    </Container>
  )
}

export default Script

