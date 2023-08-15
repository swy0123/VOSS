// 게시글 목록 타입
export interface PostListType {
  id: number,
  page: number,
  title: string,
  nickname: string,
  memberId: number,
  createdAt: string,
  hasImageFile?: boolean,
  hasOtherFile?: boolean,
  comments: number,
  likes: number,
  hits: number,
};


// 게시글 타입
export interface PostType {
  id?: number,
  title?: string,
  content?: string,
  nickname?: string,
  memberId?: number,
  createdAt?: string,
  hits?: number,
  likes?: number,
  liked?: boolean,
  imageFiles?: Array<any>,
  otherFiles?: Array<any>,
  hasImageFile?: boolean,
  hasOtherFile?: boolean,
  comments?: Array<any>,
};


// 게시글 첨부파일 타입
export interface PostFilesType {
  id?: number,
  originalFileName?: string,
  savedFileName?: string,
  contentType?: string,
  size?: number,
};


// 댓글 타입
export interface CommentType {
  id?: number,
  memberId?: number,
  nickname?: string,
  content?: string,
  createdAt?: string,
  profileImage? : string,
};


// 녹음 게시글 타입
export interface RecordType {
  recordId: number,
  description: string,
  nickname: string,
  memberId: number,
  hits: number,
  originalFileName: string,
  savedFileName: string,
  createdAt: string,
  likes: number,
  likeMembers: string,
  liked: boolean,
  profileImage : string,
};


// 내가 쓴 댓글 타입
export interface MyCommentType {
  postId?: number,
  postTitle?: string,
  postCreatedAt?: string,
  commentId?: number,
  commentContent?: string,
  commentCreatedAt?: string,
};