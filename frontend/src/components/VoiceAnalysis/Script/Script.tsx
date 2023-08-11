import { ChangeEvent, useEffect, useState } from "react";
import { makeAnalysisScript } from "../../../api/script";
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
  PlayButton, 
  PlayButtonActive, 
  ScriptBox, 
  ScriptButtons, 
  ScriptInput, 
  Title } from "./Script.style";

function Script() {
  const [isHovered, setIsHovered] = useState(false);
  const [inputScripts, setInputSctipts] = useState("")
  const genderOpt = ["남성", "여성"]
  const ageOpt = ["어린이", "청소년","청년","중년","장년"]
  const [isGenderSelect,setIsGenderSelect] = useState<boolean[]>([true,false])
  const [isAgeSelect,setIsAgeSelect] = useState<boolean[]>([true,false,false,false,false])
  const [genderSelected,setGenderSelected] = useState<string[]>([])
  const [ageSelected,setAgeSelected] = useState<string[]>([])

  const ChagneScripts = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputSctipts(e.target.value)
  }
  const DelScripts = () => {
    setInputSctipts("")
    setIsHovered(false);
  }

  const handleGenderBtn = (index:number) => {
    setIsGenderSelect(isGenderSelect.map((_,G_idx)=>(G_idx === index)))
    const GenderSelected = genderOpt.filter((_,index)=>(isGenderSelect[index]===true))
    setGenderSelected(GenderSelected)
  }
  
  const handleAgeBtn = (index:number) => {
    setIsAgeSelect(isAgeSelect.map((_,G_idx)=>(G_idx === index)))
    const AgeSelected = ageOpt.filter((_,index)=>(isAgeSelect[index]===true))
    setAgeSelected(AgeSelected)
  }

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const axiosMakeScript = async (genderSelected:string, ageSelected:string) => {
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
        {inputScripts ? (
          <ScriptButtons>
            <DelButtonActive
              src={isHovered ? "/src/assets/Training/trashcan(del).png" :
              "/src/assets/Training/trashcan(active).png" } 
              onClick={DelScripts}
              onMouseEnter={handleHover}
              onMouseLeave={handleMouseLeave}></DelButtonActive>
            <PlayButtonActive 
              src="/src/assets/Training/play(active).png"></PlayButtonActive>
          </ScriptButtons>
        ) : (
          <ScriptButtons>
            <DelButton 
              src="/src/assets/Training/trashcan.png"></DelButton>
            <PlayButton 
              src="/src/assets/Training/play.png"></PlayButton>
          </ScriptButtons>
        )}
      </ScriptBox>
    </Container>
  )
}

export default Script

