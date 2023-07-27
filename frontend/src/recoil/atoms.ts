import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { Video, postListType } from "../type/type";

const { persistAtom } = recoilPersist();

const token = localStorage.getItem("access-token") || "";
export const loginState = atom({
  key: "isLogin",
  default: token ? true : false,
});

// 더미 data
const PostList: postListType[] = [
  { id: 1, title: "간절히 바라면", content: "온 우주가 도와준다", userid: 24, nickname: "박근혜", },
  { id: 2, title: "사람이 먼저다", content: "훠훠훠", userid: 28, nickname: "문재인", },
  { id: 3, title: "각하 정치를", content: "대국적으로 하십시오", userid: 26, nickname: "박정희",},
  { id: 4, title: "바쁜 벌꿀은", content: "일할 시간이 없다", userid: 24, nickname: "박근혜", },
  { id: 5, title: "여러분 이거 다", content: "거짓말인 거 아시죠?", userid: 27, nickname: "이명박",},
  { id: 6, title: "기회는", content: "평등할 것입니다", userid: 28, nickname: "문재인", },
  { id: 7, title: "이명박은", content: "배고픕니다", userid: 27, nickname: "이명박",},
  { id: 8, title: "한마디로 통일은", content: "대박이다", userid: 24, nickname: "박근혜", },
  { id: 9, title: "국민 여러분", content: "서울은 안전합니다", userid: 25, nickname: "이승만",},
  { id: 10, title: "뭉치면 살고", content: "흩어지면 죽는다", userid: 25, nickname: "이승만", },
];

export const PostListState = atom<postListType[]>({
  key: "PostListState",
  default: PostList,
  effects_UNSTABLE: [persistAtom],
});

export const PostSearchState = atom<postListType[]>({
  key: "PostSearchState",
  default: PostList,
  effects_UNSTABLE: [persistAtom],
});

export const PostListNum = atom<number>({
  key: "PostListNum",
  default: 10,
  effects_UNSTABLE: [persistAtom],
});

export const videoListState = atom<Video[]>({
  key: 'videoListState',
  default: [],
})