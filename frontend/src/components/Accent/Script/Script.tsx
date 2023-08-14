import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { makeAccentScript } from "../../../api/script";
import { accentScriptState } from "/src/recoil/HW_Atom";
import {
  CategoryBox,
  CategoryButton,
  Container,
  DelButton,
  OptionCreate,
  OptionSelect,
  Options,
  PlayButton,
  ScriptBox,
  ScriptButtons,
  ScriptDiv,
  ScriptInput,
  SpinnerDiv,
  Title
} from "./Script.style";
import Spinner from "/src/assets/Spinner/Spinner.gif";
import { ScaleLoader } from "react-spinners";

function Script() {
  const [accentScript, setAccentScript] = useRecoilState(accentScriptState);
  const [scriptClickable, setScriptClickable] = useState<boolean>(true);

  const categoryOpt = ["뉴스", "날씨", "법률", "스포츠"]
  const [isCategorySelect, setIsCategorySelect] = useState<boolean[]>([true, false, false, false])
  const [categorySelected, setCategorySelected] = useState<string[]>([])

  // useEffect(()=>{
  // },[scriptClickable])

  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAccentScript(e.target.value)
  }
  const DelScripts = () => { setAccentScript("") }

  const handleCategoryBtn = (index:number) => {
    const isCategorySelectTmp = isCategorySelect.map((_,C_idx) => (C_idx === index))
    setIsCategorySelect(isCategorySelectTmp)
    const CategorySelected = categoryOpt.filter((_,d_idx)=>(isCategorySelectTmp[d_idx]===true))
    setCategorySelected(CategorySelected)
  }

  const axiosMakeScript = async (categorySelected: string) => {
    console.log(categorySelected+"       asd")
    setAccentScript("스크립트를 생성중입니다...")
    setScriptClickable(false);
    console.log("setScriptClickable(false)")
    try {
      const makeScriptData: string = await makeAccentScript(categorySelected);
      const scriptDate = makeScriptData.script.replace(reg,'');
      setAccentScript(scriptDate)
      setScriptClickable(true);
      console.log("setScriptClickable(true)")
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
          <CategoryBox>
            카테고리 : {categoryOpt.map((data, index) => (
              <CategoryButton
                key={index}
                $IsClick={isCategorySelect[index]}
                onClick={() => handleCategoryBtn(index)}
              >{data}
              </CategoryButton>
            ))}
          </CategoryBox>
        </OptionSelect>
        <OptionCreate
          onClick={() => axiosMakeScript(categorySelected)}>생성
        </OptionCreate>
      </Options>

      <ScriptBox>
        <ScriptDiv>
          <ScriptInput
            value={accentScript}
            onChange={ChagneScripts}
            placeholder="대사를 입력해주세요.">
          </ScriptInput>
          <SpinnerDiv $IsClickable={scriptClickable}>
            <ScaleLoader color="rgba(220, 220, 220, 1)" />
          </SpinnerDiv>
        </ScriptDiv >
        <ScriptButtons $IsClickable={scriptClickable}>
          <DelButton
            src="/src/assets/Training/delete.png"
            onClick={DelScripts}>
          </DelButton>
          {/* <PlayButton src="/src/assets/Training/play.png"></PlayButton> */}
        </ScriptButtons>
      </ScriptBox>
    </Container>
  )
}

export default Script