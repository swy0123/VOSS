// 알림 타입
export interface AlarmType {
  contentId : number | undefined
  id : number,
  senderNickname : string,
  type : string
}

export interface AlarmInfoType {
  content : string,
  notiId : number,
  type : string,
  postId : number,
}

export interface AlarmInfoListType {
  AlarmInfo : Promise<AlarmInfoType[]>
}