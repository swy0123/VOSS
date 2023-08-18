// 팔로우 팔로잉 목록
export interface FollowListType {
  memberId: number,
  email: string,
  nickname: string,
  following: boolean,
  imageUrl: string,
}


// 채팅방
export interface RoomType {
  chatId: number,
  name: string,
  memberId: number,
  sessionId: string,
  lastLeaveTime: string,
  unReadMessage: boolean,
}


// 현재 채팅방
export interface CurrentRoomType {
  name: string,
  chatId: number,
  memberId: number,
  sessionId: string,
  lastLeaveTime: string,
  unReadMessage?: boolean,
}


// 채팅방 메시지
export interface MessageType {
  chatId: number,
  sessionId: string,
  memberId: number,
  content: string,
  time: string,
}

// 유저페이지 유저
export interface UserType {
  memberId: number,
  nickname: string,
  email: string,
  imageUrl: string,
}


// 뱃지들
export interface BadgeType {
  cnt? : number,
  id?: number,
  name?: string,
}