import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();


// 자유게시판 글 목록 10개
export const FreeBoardListState = atom({
  key: "FreeBoardListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});


// 자유게시판 검색어
export const FreeBoardInputState = atom<string>({
  key: "FreeBoardInputState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});


// 자유게시판 정렬 조건
export const FreeBoardSortState = atom<string>({
  key: "FreeBoardSortState",
  default: "1",
  effects_UNSTABLE: [persistAtom],
});


// 자유게시판 검색 조건
export const FreeBoardCondState = atom<string>({
  key: "FreeBoardCondState",
  default: "1",
  effects_UNSTABLE: [persistAtom],
});


// 자유게시판 현재 페이지 수
export const FreeBoardCurrentPageState = atom<number>({
  key: "FreeBoardCurrentPageState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});


// 자유게시판 전체 페이지 수
export const FreeBoardTotalPagesState = atom<number>({
  key: "FreeBoardTotalPagesState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});


// 자유게시판 현재 댓글 개수
export const FreeBoardCommentCountState = atom<number>({
  key: "FreeBoardCommentCountState",
  default: 0,
});