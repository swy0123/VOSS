import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 메신저 창 토글
export const ShowMessengerState = atom({
  key: "ShowMessengerState",
  default: false
});

// 메시지룸 토글
export const ShowMessageRoomState = atom({
  key: "ShowMessageRoomState",
  default: false
});

// 친구찾기 토글
export const ShowFindFriendState = atom({
  key: "ShowFindFriendState",
  default: false
});

// 채팅방 목록
export const RoomsState = atom({
  key: "RoomsState",
  default: [],
});

// 실시간 메시지 받은 채팅방 목록
export const LiveRoomsState = atom({
  key: "LiveRoomsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 현재 입장한 채팅방
export const CurrentRoomState = atom({
  key: "CurrentRoomState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

// 현재 입장한 채팅방의 메시지 목록
export const MessagesState = atom({
  key: "MessagesState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 메신저 알림 여부
export const MessengerAlarmState = atom({
  key: "MessengerAlarmState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});