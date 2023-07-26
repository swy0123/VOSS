import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface postListType {
  id: number,
  title: string,
  content: string
}

let PostList: postListType[] = [
  { id: 1, title: "첫째 제목", content: "첫째 내용" },
  { id: 2, title: "둘째 제목", content: "둘째 내용" },
  { id: 3, title: "셋째 제목", content: "셋째 내용" },
  { id: 4, title: "넷째 제목", content: "넷째 내용" },
  { id: 5, title: "다섯째 제목", content: "다섯째 내용" },
  { id: 6, title: "여섯째 제목", content: "여섯째 내용" },
  { id: 7, title: "일곱째 제목", content: "일곱째 내용" },
  { id: 8, title: "여덟째 제목", content: "여덟째 내용" },
  { id: 9, title: "아홉째 제목", content: "아홉째 내용" },
  { id: 10, title: "열째 제목", content: "열째 내용" },
];

interface CommentListType {
  id: number,
  userid: number,
  content: string
}

let CommentList: CommentListType[] = [
  { id: 1, userid: 1, content: "첫째 댓글" },
  { id: 2, userid: 6, content: "둘째 댓글" },
  { id: 3, userid: 1, content: "셋째 댓글" },
  { id: 4, userid: 2, content: "넷째 댓글" },
  { id: 5, userid: 2, content: "다섯째 댓글" },
  { id: 6, userid: 3, content: "여섯째 댓글" },
  { id: 7, userid: 3, content: "일곱째 댓글" },
  { id: 8, userid: 4, content: "여덟째 댓글" },
  { id: 9, userid: 3, content: "아홉째 댓글" },
  { id: 10, userid: 1, content: "열번째 댓글" },
  { id: 11, userid: 7, content: "열한번째 댓글" },
  { id: 12, userid: 1, content: "열두번째 댓글" },
  { id: 13, userid: 2, content: "열세번째 댓글" },
  { id: 14, userid: 9, content: "열네번째 댓글" },
  { id: 15, userid: 1, content: "열다섯번째 댓글" },
  { id: 16, userid: 5, content: "열여섯번째 댓글" },
  { id: 17, userid: 1, content: "열일곱번째 댓글" },
  { id: 18, userid: 4, content: "열여덟번째 댓글" },
  { id: 19, userid: 1, content: "열아홉번째 댓글" },
  { id: 20, userid: 2, content: "스무번째 댓글" },

]

export const PostListState = atom<postListType[]>({
  key: "PostListState",
  default: PostList,
  effects_UNSTABLE: [persistAtom],
});

export const PostListNum = atom<number>({
  key: "PostListNum",
  default: 10,
  effects_UNSTABLE: [persistAtom],
});

export const CommentListState = atom<CommentListType[]>({
  key: "CommentListState",
  default: CommentList,
  effects_UNSTABLE: [persistAtom],
});