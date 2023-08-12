import { styled } from "styled-components";

// color: ${props => props.$IsClick ? "white" : "#999999"};

export const Container = styled.div<{$IsClick:boolean}>`
  opacity: ${props => props.$IsClick ? 1 : 0};
`

export const Triangle = styled.div`
  position: fixed;
  top: 35px;
  right: 114px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 7px solid white;
  z-index  : 1;
`

export const AlarmListBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: white;
  border-radius: 5px;
  top: 42px;
  right: 75px;
  height: 280px;
  width: 230px;
`

export const AlarmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  height: 27px;
`

export const AlarmWord = styled.p`
  font-size: 11px;
  margin-left: 10px;
`

export const AlarmExitBtn = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 5px;
  cursor: pointer;
`

export const AlarmListItem = styled.div`
`

export const AlarmList = styled.div`
  overflow-y: scroll;
`

export const AlarmItem = styled.div`
  background-color: #efefef;
  border-radius: 4px;
  margin: 8px 10px 0px 10px;
  padding: 10px;
  font-size: 11px;
`

export const AlarmTime = styled.div`
  font-size: 1px;
  margin-right: 10px;
  text-align: right;
  color: #797979;
`