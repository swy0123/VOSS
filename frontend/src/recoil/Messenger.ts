import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
import ProfileImg from "/src/assets/Messenger/profile.png";


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


export const RoomListState = atom({
  key: "RoomListState",
  default: [
    { member: "이시영", id: 1 },
    { member: "정현우", id: 2 },
    { member: "김준섭", id: 3 },
    { member: "이원영", id: 4 },
    { member: "이승종", id: 5 },
    { member: "이수연", id: 6 },
    { member: "김하진", id: 7 },
    { member: "김선진", id: 8 },
    { member: "류민지", id: 9 },
    { member: "아무나", id: 10 },
  ]
});

export const FriendListState = atom({
  key: "FriendListState",
  default: [
    { id: 1, name: "이시영", img: ProfileImg },
    { id: 2, name: "정현우", img: ProfileImg },
    { id: 3, name: "김준섭", img: ProfileImg },
    { id: 4, name: "이원영", img: ProfileImg },
    { id: 5, name: "이승종", img: ProfileImg },
    { id: 6, name: "이수연", img: ProfileImg },
    { id: 7, name: "김하진", img: ProfileImg },
    { id: 8, name: "김선진", img: ProfileImg },
    { id: 9, name: "류민지", img: ProfileImg },
    { id: 10, name: "아무나", img: ProfileImg },
    { id: 11, name: "윤동훈", img: ProfileImg },
    { id: 12, name: "여현빈", img: ProfileImg },
    { id: 13, name: "이주언", img: ProfileImg },
    { id: 14, name: "신윤지", img: ProfileImg },
    { id: 15, name: "김정수", img: ProfileImg },
  ]
});

export const OpenRoomIdState = atom({
  key: "OpenRoomIdState",
  default: "",
});

export const MessageLogState = atom({
  key: "MessageLogState",
  default: [
    { chatId: 0, id: 1, member: "이시영0", content: "뭐긴 뭐야1", time: "10:9:21", date: "2023-07-21", },
    { chatId: 1, id: 1, member: "이시영1", content: "뭐긴 뭐야1", time: "10:10:21", date: "2023-07-21", },
    { chatId: 2, id: 1, member: "me", content: ";;;; 뭐야2", time: "10:11:21", date: "2023-07-21" },
    { chatId: 3, id: 1, member: "me", content: "ㅎㅎㅎ 뭐야3", time: "10:11:21", date: "2023-07-21" },
    { chatId: 4, id: 1, member: "이시영1", content: "그냥 뭐야4", time: "10:11:21", date: "2023-07-21", },
    { chatId: 5, id: 1, member: "이시영1", content: "왜;; 뭐야5", time: "10:12:21", date: "2023-07-21", },
    { chatId: 6, id: 1, member: "me", content: "뭐야뭐야6", time: "10:12:21", date: "2023-07-21" },
    { chatId: 7, id: 1, member: "이시영1", content: "ㄹㅇ 뭐야7", time: "10:13:21", date: "2023-07-21", },
    { chatId: 8, id: 1, member: "이시영1", content: "=정말 뭐야8", time: "10:14:21", date: "2023-07-21", },
    { chatId: 9, id: 1, member: "이시영1", content: "진짜 뭐야9", time: "10:15:21", date: "2023-07-21", },
    { chatId: 10, id: 1,member: "이시영1", content: "아니 뭐야10", time: "10:16:21", date: "2023-07-21", },
    { chatId: 11, id: 1, member: "me", content: "zzzzzzzㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋzzzzzzz뭐야11", time: "10:17:21", date: "2023-07-21", },
    { chatId: 12, id: 1, member: "me", content: ";;;; 뭐야12", time: "10:17:21", date: "2023-07-21" },
    { chatId: 13, id: 1, member: "me",  content: "ㅎㅎㅎ 뭐야13", time: "10:18:21", date: "2023-07-21",  },
    { chatId: 14, id: 1, member: "이시영1", content: "그냥 뭐야14", time: "10:19:21", date: "2023-07-21",  },
    { chatId: 15, id: 1, member: "이시영1", content: "왜;; 뭐야15", time: "10:20:21", date: "2023-07-21", },
    { chatId: 16, id: 1, member: "me", content: "뭐야뭐야16", time: "10:20:21", date: "2023-07-21" },
    { chatId: 17, id: 1, member: "이시영1", content: "ㄹㅇ 뭐야17", time: "10:21:21", date: "2023-07-21",  },
    { chatId: 18, id: 1, member: "이시영1", content: "=정말 뭐야18", time: "10:22:21", date: "2023-07-21",  },
    { chatId: 19, id: 1, member: "이시영1", content: "진짜 뭐야19", time: "10:23:21", date: "2023-07-21",  },
    { chatId: 20, id: 1, member: "이시영1", content: "아니 뭐야20", time: "10:24:21", date: "2023-07-21", },
  ]
});