import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const CurrentUserState = {
  email: "",
  password: "",
  accessToken: ""
}

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