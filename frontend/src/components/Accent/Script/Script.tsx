import { ChangeEvent, useState } from "react";
import { makeAccentScript } from "../../../api/script";
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
  const [inputScripts, setInputSctipts] = useState("")
  const categoryOpt = ["뉴스", "날씨","법률","스포츠","직접 입력"]
  const [isCategorySelect,setIsCategorySelect] = useState<boolean[]>([])
  const [categorySelected,setCategorySelected] = useState<string[]>([])
  
  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputSctipts(e.target.value)
  }
  const DelScripts = () => {setInputSctipts("")}

  const handleCategoryBtn = (index:number) => {
    const newCategorySelect = Array(categoryOpt.length).fill(false)
    newCategorySelect[index] = !isCategorySelect[index]
    setIsCategorySelect(newCategorySelect)

    const CategorySelected = categoryOpt.filter((category,index)=>(newCategorySelect[index]===true))
    setCategorySelected(CategorySelected)
  }

  const axiosMakeScript = async (categorySelected:string) => {
    setInputSctipts("스크립트를 생성중입니다...")
    try {
      const makeScriptData: string = await makeAccentScript(categorySelected);
      setInputSctipts(makeScriptData.script)
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
          value={inputScripts}
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