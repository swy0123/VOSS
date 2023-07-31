import { ChangeEvent, useEffect, useState } from "react";
import { 
  AgeBox,
  AgeButton,
  Container, 
  DelButton, 
  GenderBox, 
  GenderButton, 
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
  const genderOpt = ["남성", "여성"]
  const ageOpt = ["어린이", "청소년","청년","중년","장년"]
  const [isGenderSelect,setIsGenderSelect] = useState<boolean[]>([])
  const [isAgeSelect,setIsAgeSelect] = useState<boolean[]>([])
  
  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputSctipts(e.target.value)
  }
  const DelScripts = () => {setInputSctipts("")}

  const handleGenderBtn = (index:number) => {
    const newGenderSelect = Array(genderOpt.length).fill(false)
    newGenderSelect[index] = !isGenderSelect[index]
    setIsGenderSelect(newGenderSelect)
  }

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
          <GenderBox>
            성별 : {genderOpt.map((data,index) => (
              <GenderButton
                key={index}
                $IsClick={isGenderSelect[index]}
                onClick={()=>handleGenderBtn(index)}
                >{data}
              </GenderButton>
            ))}
          </GenderBox>
          
          <AgeBox>
            연령대 : {ageOpt.map((data,index) => (
              <AgeButton 
                key={index}
                $IsClick={isAgeSelect[index]}
                onClick={()=>handleAgeBtn(index)}
                >{data}
              </AgeButton>
            ))}
          </AgeBox>
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