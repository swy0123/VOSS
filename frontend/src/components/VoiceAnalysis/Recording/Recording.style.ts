import { styled } from 'styled-components';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0px 0px 20px 0px;
`
export const Title = styled.h2`
  color: white;
  text-align: center;
`
export const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  height: 185px;
`
export const RecordItem = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  width: 370px;
  margin : 2px 0px 2px 9px;
`
export const RecordSelect = styled.input` 
  width: 18px;
  height: 18px;
`

export const RecordLable = styled.label`
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 100;
  line-height: 30px;
  color: white;
  
`
export const DownloadImg = styled.img`
  height: 16px;
`
export const Warning = styled.div`
  color: #BABABA;
  font-size: 12px;
  margin-top: 8px;
  text-align: end;
`