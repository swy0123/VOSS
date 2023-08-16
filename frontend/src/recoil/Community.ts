import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { MyCommentType, RecordType, PostListType } from "../type/FreeBoard";
const { persistAtom } = recoilPersist();


// 자유게시판 글 목록 10개
export const FreeBoardListState = atom<PostListType[]>({
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


// 자유게시판 전체 게시글 개수
export const FreeBoardTotalElementsState = atom<number>({
  key: "FreeBoardTotalElementsState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});


// 자유게시판 현재 댓글 개수
export const FreeBoardCommentCountState = atom<number>({
  key: "FreeBoardCommentCountState",
  default: 0,
});


// 녹음게시판 글 목록
export const RecordsState = atom<RecordType[]>({
  key: "RecordsState",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});


// 녹음게시판 검색어
export const RecordBoardInputState = atom<string>({
  key: "RecordBoardInputState",
  default: "",
});


// 녹음게시판 정렬 조건
export const RecordBoardSortState = atom<string>({
  key:  "RecordBoardSortState",
  default: "1",
});


// 녹음게시판 검색 조건
export const RecordBoardCondState = atom<string>({
  key:  "RecordBoardCondState",
  default: "1",
});


// 녹음게시판 현재 페이지 수
export const RecordBoardCurrentPageState = atom<number>({
  key:  "RecordBoardCurrentPageState",
  default: 1,
});

// 녹음게시판 작성하기 모달
export const ShowRecordCreateModalState = atom<boolean>({
  key:  "ShowRecordCreateModalState",
  default: false,
});


// 내가 쓴 댓글
export const MyCommentsState = atom<MyCommentType[]>({
  key:  "MyCommentsState",
  default: [],
});