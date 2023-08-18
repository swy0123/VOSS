import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { makeAccentScript } from "../../../api/script";
import { accentScriptState, initialBtnState } from "/src/recoil/HW_Atom";
import {
  CategoryBox,
  CategoryButton,
  Container,
  DelButton,
  DelButtonActive,
  OptionCreate,
  OptionSelect,
  Options,
  PlayButton,
  ScriptBox,
  ScriptButtons,
  ScriptDiv,
  ScriptInput,
  SpinnerDiv,
  Title,
} from "./Script.style";
import { ScaleLoader } from "react-spinners";
import AlertContext from "/src/context/alert/AlertContext";

function Script() {
  const [isHovered, setIsHovered] = useState(false);
  const [accentScript, setAccentScript] = useRecoilState(accentScriptState);
  const [scriptClickable, setScriptClickable] = useState<boolean>(true);
  const [initialBtn, setInitialBtn] = useRecoilState(initialBtnState);
  const categoryOpt = ["뉴스", "날씨", "법률", "스포츠"];
  const [isCategorySelect, setIsCategorySelect] = useState<boolean[]>([true, false, false, false]);
  const [categorySelected, setCategorySelected] = useState<string[]>([]);
  const { alert: alertComp } = useContext(AlertContext);

  const onAlertClick = async (text:string) => {
    const result = await alertComp(text);
    console.log("custom", result);
  };

  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(!initialBtn) {
      onAlertClick("녹음을 취소/완료 해주세요")
      return
    }
    setAccentScript(e.target.value);
  };
  const DelScripts = () => {
    if(!initialBtn) {
      onAlertClick("녹음을 취소/완료 해주세요")
      return
    }
    setAccentScript("");
    setIsHovered(false);
  };
  
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCategoryBtn = (index: number) => {
    const isCategorySelectTmp = isCategorySelect.map((_, C_idx) => C_idx === index);
    setIsCategorySelect(isCategorySelectTmp);
    const CategorySelected = categoryOpt.filter((_, d_idx) => isCategorySelectTmp[d_idx] === true);
    setCategorySelected(CategorySelected);
  };

  const axiosMakeScript = async (categorySelected: string) => {
    console.log(categorySelected + "       asd");
    setAccentScript("스크립트를 생성중입니다...");
    setScriptClickable(false);
    console.log("setScriptClickable(false)");
    try {
      const makeScriptData: string = await makeAccentScript(categorySelected);
      const scriptDate = makeScriptData.script.replace(reg, "");
      setAccentScript(scriptDate);
      setScriptClickable(true);
      console.log("setScriptClickable(true)");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Title>스크립트</Title>
      <Options $IsClickable={scriptClickable}>
        <OptionSelect>
          <CategoryBox>
            카테고리 :{" "}
            {categoryOpt.map((data, index) => (
              <CategoryButton
                key={index}
                $IsClick={isCategorySelect[index]}
                onClick={() => handleCategoryBtn(index)}
              >
                {data}
              </CategoryButton>
            ))}
          </CategoryBox>
        </OptionSelect>
        <OptionCreate onClick={() => axiosMakeScript(categorySelected)}>생성</OptionCreate>
      </Options>

      <ScriptBox>
        <ScriptDiv>
          <ScriptInput
            value={accentScript}
            onChange={ChagneScripts}
            placeholder="대사를 입력해주세요."
          ></ScriptInput>
          <SpinnerDiv $IsClickable={scriptClickable}>
            <ScaleLoader color="rgba(220, 220, 220, 1)" />
          </SpinnerDiv>
        </ScriptDiv>
        {/* <ScriptButtons $IsClickable={scriptClickable}>
          <DelButton
            src="/src/assets/Training/delete.png"
            onClick={DelScripts}>
          </DelButton>
        </ScriptButtons> */}
        {accentScript ? (
          <ScriptButtons $IsClickable={scriptClickable}>
            <DelButtonActive
              src={isHovered
                  ? "/src/assets/Training/trashcan(del).png"
                  : "/src/assets/Training/trashcan(active).png"
              }
              onClick={DelScripts}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}
            ></DelButtonActive>
          </ScriptButtons>
        ) : (
          <ScriptButtons $IsClickable={scriptClickable}>
            <DelButton src="/src/assets/Training/trashcan.png"></DelButton>
          </ScriptButtons>
        )}
      </ScriptBox>
    </Container>
  );
}

export default Script;
