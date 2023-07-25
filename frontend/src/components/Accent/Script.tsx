import { ChangeEvent, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  margin: 0px 0px 20px 0px;
`
const Title = styled.h2`
  color: white;
  text-align: center;
`
const Options = styled.div`
  display: flex;
  justify-content: space-between;
`
const OptionSelect = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
`
const OptionCreate = styled.button`
  background-color: #1B3E46;
  border-radius: 20px;
  border: none;
  position: relative;
  top: 9px;
  height: 34px;
  width: 70px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  
  cursor: pointer;
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
const CategoryBox =styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  height: 33px;
  margin:8px 0px 18px 0px;
`
const OptionButton = styled.button`
  background-color: transparent;
  border: 1px solid #6C6C6C;
  border-radius: 14px;
  color:#6C6C6C;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  padding: 0px 7px 0px 7px;
  margin-left: 6px;
  
  &:hover{
    transform: scale(1.1);
    transition: .3s;
  }
`
const CategoryButton = styled(OptionButton)<{$IsClick:boolean}>`
  color: ${props => props.$IsClick ? "white" : "#6C6C6C"};
  border: solid ${props => props.$IsClick ? "2px white" : "1px $6C6C6C"};
`
const ScriptBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 190px;
`
const ScriptInput = styled.textarea`
  background-color: transparent;
  font-size: 14px;
  color: white;
  padding: 25px 0px 25px 20px;
  height: 125px;
  width: 400px;
  border: none;
  resize: none;

  &:focus {
    outline:none;
  }
`
const ScriptButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
`
const DelButton = styled.img`
  margin: 6px;
  width: 23px;
  cursor: pointer;
`
const PlayButton = styled.img`
  margin: 6px;
  width: 23px;
  cursor: pointer;
`
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