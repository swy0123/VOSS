import { ChangeEvent, useState } from "react";
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
  const ageOpt = ["뉴스", "날씨","법률","스포츠","직접 입력"]
  const [isAgeSelect,setIsAgeSelect] = useState<boolean[]>([])
  
  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputSctipts(e.target.value)
  }
  const DelScripts = () => {setInputSctipts("")}

  const handleAgeBtn = (index:number) => {
    const newAgeSelect = Array(ageOpt.length).fill(false)
    newAgeSelect[index] = !isAgeSelect[index]
    setIsAgeSelect(newAgeSelect)
  }

  return(
    <Container>
      <Title>스크립트</Title>
      
      <Options>
        <OptionSelect>
          <CategoryBox>
            카테고리 : {ageOpt.map((data,index) => (
              <CategoryButton 
                key={index}
                $IsClick={isAgeSelect[index]}
                onClick={()=>handleAgeBtn(index)}
                >{data}
              </CategoryButton>
            ))}
          </CategoryBox>
        </OptionSelect>
        <OptionCreate>생성</OptionCreate>
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