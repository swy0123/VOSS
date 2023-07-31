import { ChangeEvent, useEffect, useState } from "react";
import { makeAnalysisScript } from "../../../api/script";
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
  const [genderSelected,setGenderSelected] = useState<string[]>([])
  const [ageSelected,setAgeSelected] = useState<string[]>([])

  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputSctipts(e.target.value)
  }
  const DelScripts = () => {setInputSctipts("")}

  const handleGenderBtn = (index:number) => {
    const newGenderSelect = Array(genderOpt.length).fill(false)
    newGenderSelect[index] = !isGenderSelect[index]
    setIsGenderSelect(newGenderSelect)

    const GenderSelected = genderOpt.filter((gender,index)=>(newGenderSelect[index]===true))
    setGenderSelected(GenderSelected)
  }
  
  const handleAgeBtn = (index:number) => {
    const newAgeSelect = Array(ageOpt.length).fill(false)
    newAgeSelect[index] = !isAgeSelect[index]
    setIsAgeSelect(newAgeSelect)
    
    const AgeSelected = ageOpt.filter((age,index)=>(newAgeSelect[index]===true))
    setAgeSelected(AgeSelected)
  }

  const axiosMakeScript = async (genderSelected:string,ageSelected:string) => {
    setInputSctipts("스크립트를 생성중입니다...")
    try {
      const makeScriptData: string = await makeAnalysisScript(genderSelected,ageSelected);
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
        <OptionCreate 
          onClick={() => axiosMakeScript(
            genderSelected,ageSelected
          )}>생성</OptionCreate>
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

