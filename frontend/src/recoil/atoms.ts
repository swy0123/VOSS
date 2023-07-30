import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { Video, postListType } from "../type/type";
const { persistAtom } = recoilPersist();


// 더미 data
const PostList: postListType[] = [
  { id: 1, title: "간절히 바라면", content: "온 우주가 도와준다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 2, title: "사람이 먼저다", content: "훠훠훠", userid: 28, nickname: "문재인", createAt: "2023-07-10 02:13:54", },
  { id: 3, title: "각하 정치를", content: "대국적으로 하십시오", userid: 26, nickname: "박정희", createAt: "2023-07-10 02:13:54", },
  { id: 4, title: "바쁜 벌꿀은", content: "일할 시간이 없다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 5, title: "여러분 이거 다", content: "거짓말인 거 아시죠?", userid: 27, nickname: "이명박", createAt: "2023-07-10 02:13:54", },
  { id: 6, title: "기회는", content: "평등할 것입니다", userid: 28, nickname: "문재인", createAt: "2023-07-10 02:13:54", },
  { id: 7, title: "이명박은", content: "배고픕니다", userid: 27, nickname: "이명박", createAt: "2023-07-10 02:13:54", },
  { id: 8, title: "한마디로 통일은", content: "대박이다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 9, title: "국민 여러분", content: "서울은 안전합니다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 10, title: "뭉치면 살고", content: "흩어지면 죽는다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 11, title: "한마디로 통일은", content: "대박이다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 12, title: "국민 여러분", content: "서울은 안전합니다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 13, title: "뭉치면 살고", content: "흩어지면 죽는다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 14, title: "한마디로 통일은", content: "대박이다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 15, title: "국민 여러분", content: "서울은 안전합니다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 16, title: "뭉치면 살고", content: "흩어지면 죽는다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 17, title: "한마디로 통일은", content: "대박이다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 18, title: "국민 여러분", content: "서울은 안전합니다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 19, title: "뭉치면 살고", content: "흩어지면 죽는다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 20, title: "여러분 이거 다", content: "거짓말인 거 아시죠?", userid: 27, nickname: "이명박", createAt: "2023-07-10 02:13:54", },
  { id: 21, title: "기회는", content: "평등할 것입니다", userid: 28, nickname: "문재인", createAt: "2023-07-10 02:13:54", },
  { id: 22, title: "이명박은", content: "배고픕니다", userid: 27, nickname: "이명박", createAt: "2023-07-10 02:13:54", },
  { id: 23, title: "한마디로 통일은", content: "대박이다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 24, title: "국민 여러분", content: "서울은 안전합니다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 25, title: "뭉치면 살고", content: "흩어지면 죽는다", userid: 25, nickname: "이승만", createAt: "2023-07-10 02:13:54", },
  { id: 26, title: "한마디로 통일은", content: "대박이다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 27, title: "간절히 바라면", content: "온 우주가 도와준다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 28, title: "사람이 먼저다", content: "훠훠훠", userid: 28, nickname: "문재인", createAt: "2023-07-10 02:13:54", },
  { id: 29, title: "각하 정치를", content: "대국적으로 하십시오", userid: 26, nickname: "박정희", createAt: "2023-07-10 02:13:54", },
  { id: 30, title: "바쁜 벌꿀은", content: "일할 시간이 없다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 31, title: "여러분 이거 다", content: "거짓말인 거 아시죠?", userid: 27, nickname: "이명박", createAt: "2023-07-10 02:13:54", },
  { id: 32, title: "간절히 바라면", content: "온 우주가 도와준다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 33, title: "사람이 먼저다", content: "훠훠훠", userid: 28, nickname: "문재인", createAt: "2023-07-10 02:13:54", },
  { id: 34, title: "각하 정치를", content: "대국적으로 하십시오", userid: 26, nickname: "박정희", createAt: "2023-07-10 02:13:54", },
  { id: 35, title: "바쁜 벌꿀은", content: "일할 시간이 없다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 36, title: "여러분 이거 다", content: "거짓말인 거 아시죠?", userid: 27, nickname: "이명박", createAt: "2023-07-10 02:13:54", },
  { id: 37, title: "간절히 바라면", content: "온 우주가 도와준다", userid: 24, nickname: "박근혜", createAt: "2023-07-10 02:13:54", },
  { id: 38, title: "사람이 먼저다", content: "훠훠훠", userid: 28, nickname: "문재인", createAt: "2023-07-10 02:13:54", },
]

export const PostListState = atom<postListType[]>({
  key: "PostListState",
  default: PostList,
  effects_UNSTABLE: [persistAtom],
});

export const PostListNum = atom<number>({
  key: "PostListNum",
  default: 38,
});

export const videoListState = atom<Video[]>({
  key: 'videoListState',
  default: [],
})