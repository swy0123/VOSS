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
  effects_UNSTABLE: [persistAtom],
});


// 로그인 / 회원가입 창 토글
export const LoginModeAtom = atom({
  key: "LoginModeAtom",
  default: true,
});


// 프로필 페이지 정보
export const ProfileState = atom({
  key: "ProfileState",
  default: {
    userid: 0,
    email: "",
    nickname: "",
    isFollowing: false,
    followerCnt: 0,
    followingCnt: 0,
    imageUrl: "",
    badges: [],
    actCnt: 0,
    dubCnt: 0,
    dictionCnt: 0,
    totalCnt: 0,
  },
})


// 팔로워, 팔로잉 목록
export const FollowerListState = atom({
  key: "FollowerListState",
  default: [],
});
export const FollowingListState = atom({
  key: "FollowingListState",
  default: [],
});


// 팔로우 모달, 팔로워 탭 여닫기
export const ModalOpenState = atom({
  key: "ModalOpenState",
  default: false,
});
export const FollowerTabState = atom({
  key: "FollowerTabState",
  default: true,
});