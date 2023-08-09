// 팔로우 팔로잉 목록
export interface FollowListType {
  memberId: number;
  email: string;
  nickname: string;
  following: boolean;
}

// 채팅방
export interface RoomType {
  chatId: number;
  name: string;
  memberId: number;
  sessionId: string;
  lastLeaveTime: string;
  lastReceiveMessageTime: string;
}


// 현재 채팅방
export interface CurrentRoomType {
  name: string;
  chatId: number;
  memberId: number;
  sessionId: string;
}


// 채팅방 메시지
export interface MessageType {
  chatId?: number;
  sessionId?: string;
  memberId?: number;
  content?: string;
}

// 유저페이지 유저
export interface UserType {
  memberId: number;
  nickname?: string;
  email?: string;
}
