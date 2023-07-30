import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();


// 현재 유저 정보
export const CurrentUserAtom = atom({
  key: "CurrentUserAtom",
  default: {
    userid: 0,
    email: "",
    nickname: "",
    accessToken: "",
    refreshToken: ""
  },
  effects_UNSTABLE: [persistAtom], // 상태가 변할 때마다 로컬스토리지에 저장
});


// 로그인 여부
export const LoginState = atom({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom], // 상태가 변할 때마다 로컬스토리지에 저장
});


// 로그인 / 회원가입 창 토글
export const LoginModeAtom = atom({
  key: "LoginModeAtom",
  default: true,
});


// 더미 유저 정보 (서버에 있기는 함)
const TempUserList = [
  {email: 'rmsgPtest@naver.com', nickname: '박근혜', userid: 24},
  {email: 'tmdakstest@naver.com', nickname: '이승만', userid: 25},
  {email: 'wjdgmltest@naver.com', nickname: '박정희', userid: 26},
  {email: 'audqkrtest@naver.com', nickname: '이명박', userid: 27},
  {email: 'wodlstest@naver.com', nickname: '문재인', userid: 28},
]
export const TempUserListAtom = atom({
  key: "TempUserListAtom",
  default: TempUserList,
});