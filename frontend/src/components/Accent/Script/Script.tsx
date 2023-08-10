import { ChangeEvent, useState } from "react";
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
  ScriptInput, 
  Title } from "./Script.style";

function Script() {
  const [accentScript, setAccentScript] = useRecoilState(accentScriptState)
  const categoryOpt = ["뉴스", "날씨","법률","스포츠","과학"]
  const [isCategorySelect,setIsCategorySelect] = useState<boolean[]>([true,false,false,false,false])
  const [categorySelected,setCategorySelected] = useState<string[]>([])
  
  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAccentScript(e.target.value)
  }
  const DelScripts = () => {setAccentScript("")}

  const handleCategoryBtn = (index:number) => {
    setIsCategorySelect(isCategorySelect.map((_,C_idx)=>(C_idx === index)))
    const CategorySelected = categoryOpt.filter((_,index)=>(isCategorySelect[index]===true))
    setCategorySelected(CategorySelected)
  }

  const axiosMakeScript = async (categorySelected:string) => {
    setAccentScript("스크립트를 생성중입니다...")
    try {
      const makeScriptData: string = await makeAccentScript(categorySelected);
      setAccentScript(makeScriptData.script)
    } 
    catch (error) {
      console.log(error);
    }
  };

  return(
    <Container>
      <Title>스크립트</Title>
      
      <Options>
        <OptionSelect>
          <CategoryBox>
            카테고리 : {categoryOpt.map((data,index) => (
              <CategoryButton 
                key={index}
                $IsClick={isCategorySelect[index]}
                onClick={()=>handleCategoryBtn(index)}
                >{data}
              </CategoryButton>
            ))}
          </CategoryBox>
        </OptionSelect>
        <OptionCreate
          onClick={() => axiosMakeScript(
            categorySelected)}>생성</OptionCreate>
      </Options>
      
      <ScriptBox>
        <ScriptInput 
          value={accentScript}
          onChange={ChagneScripts} 
          placeholder="대사를 입력해주세요.">
        </ScriptInput>
        <ScriptButtons>
          <DelButton 
            src="/src/assets/Training/delete.png"
            onClick={DelScripts}>
          </DelButton>
          <PlayButton src="/src/assets/Training/play.png"></PlayButton>
        </ScriptButtons>
      </ScriptBox>
    </Container>
  )
}

export default Script