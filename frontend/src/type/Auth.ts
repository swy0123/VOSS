// 팔로우 팔로잉 목록
export interface FollowListType {
  memberId: number;
  email: string;
  nickname: string;
  following: boolean;
}

// 게시글 목록 타입
export interface PostListType {
  id?: number;
  title?: string;
  nickname?: string;
  userid?: number;
  createdAt?: string;
  hasImageFile?: boolean;
  hasOtherFile?: boolean;
  comments?: number;
  likes?: number;
  hits?: number;
}