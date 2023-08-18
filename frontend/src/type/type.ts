// 더빙영상 전체
export interface VideosType {
  id: number;
  category: string;
  title: string;
  durationInSec: number;
  videoUrl: string;
  roleCnt: number;
}

// 더빙영상 상세
export interface Script {
  createdAt: string | null;
  updatedAt: string | null;
  id: number;
  category: string;
  title: string;
  durationInSec: number;
  videoUrl: string;
  roleCnt: number;
}

export interface Line {
  id: number;
  name: string;
  content: string;
  startSec: number;
  endSec: number;
}

export interface ScriptData {
  script: Script;
  roles: string[];
  lines: Line[];
}

// 자유게시판 전체 게시물
export interface postListType {
  id: number,
  title: string,
  content: string,
  userid: number,
  nickname: string,
  createAt: string,
}