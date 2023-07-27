import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const CurrentUserState = {
  email: "",
  nickname: "",
  userid: 0,
  accessToken: "",
  refreshToken: ""
}

const TempUserList = [
  {email: 'rmsgPtest@naver.com', nickname: '박근혜', userid: 24},
  {email: 'tmdakstest@naver.com', nickname: '이승만', userid: 25},
  {email: 'wjdgmltest@naver.com', nickname: '박정희', userid: 26},
  {email: 'audqkrtest@naver.com', nickname: '이명박', userid: 27},
  {email: 'wodlstest@naver.com', nickname: '문재인', userid: 28},
]

// 현재 유저 정보
export const CurrentUserAtom = atom({
  key: "CurrentUser",
  default: CurrentUserState,
  effects_UNSTABLE: [persistAtom],
});

// 로그인 / 회원가입 창 토글
export const LoginModeAtom = atom({
    key: "LoginModeAtom",
    default: true,
    effects_UNSTABLE: [persistAtom],
});

// 더미 유저 정보 (서버에 있기는 함)
export const TempUserListAtom = atom({
  key: "TempUserListAtom",
  default: TempUserList,
  effects_UNSTABLE: [persistAtom],
});