import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const AnalysisBtn = styled.button`
  background-color: #132b31;
  color: white;
  height: 30px;
  width: 80px;
  border: none;
  border-radius: 20px;
  margin: 8px;
  cursor: pointer;
`
export const AnalysisResult = styled.input`
  background-color: #444444;
  border-radius: 8px;
  border: none;
  line-height: 37px;
  text-align: center;
  height: 40px;
  width: 400px;
  margin-top: 20px;
  color: white;
  font-size: 18px;
  outline: none;
`