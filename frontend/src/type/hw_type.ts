// 알림 타입
export interface AlarmType {
  id : number,
  senderNickname : string,
  contentId : number | null
  type : string
}