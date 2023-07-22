import { styled } from "styled-components";

const AlarmList = styled.div`
  overflow-y: scroll;
`

const AlarmItem = styled.div`
  background-color: #efefef;
  border-radius: 4px;
  margin: 8px 10px 0px 10px;
  padding: 10px;
  font-size: 11px;
`
const AlarmTime = styled.div`
  font-size: 1px;
  margin-right: 10px;
  text-align: right;
  color: #797979;
`

function AlarmListItem() {
  return(
    <AlarmList>
      <AlarmItem>abc님이 회원님을 팔로우 했습니다.</AlarmItem>
      <AlarmTime>3분전</AlarmTime>
      <AlarmItem>abc님이 회원님을 팔로우 했습니다.</AlarmItem>
      <AlarmTime>3분전</AlarmTime>
      <AlarmItem>abc님이 회원님을 팔로우 했습니다.</AlarmItem>
      <AlarmTime>3분전</AlarmTime>
      <AlarmItem>abc님이 회원님을 팔로우 했습니다.</AlarmItem>
      <AlarmTime>3분전</AlarmTime>
      <AlarmItem>abc님이 회원님을 팔로우 했습니다.</AlarmItem>
      <AlarmTime>3분전</AlarmTime>
      <AlarmItem>abc님이 회원님을 팔로우 했습니다.</AlarmItem>
      <AlarmTime>3분전</AlarmTime>
    </AlarmList>
  )
}
export default AlarmListItem