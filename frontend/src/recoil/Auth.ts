import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { FollowListType } from "../type/Auth";
const { persistAtom } = recoilPersist();


// 현재 유저 정보
export const CurrentUserAtom = atom({
  key: "CurrentUserAtom",
  default: {
    userid: 0,
    email: "",
    nickname: "",
    imageUrl: "",
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
    id: 0,
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
export const FollowerListState = atom<FollowListType[]>({
  key: "FollowerListState",
  default: [],
});
export const FollowingListState = atom<FollowListType[]>({
  key: "FollowingListState",
  default: []
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


// 배지 전체 정보
export const BadgesState = atom({
  key: "BadgesState",
  default: [
    { "id": 1, "name": "여자 청소년 목소리 능력자" },
    { "id": 2, "name": "중년 여성 목소리 능력자" },
    { "id": 3, "name": "장년 여성 목소리 능력자" },
    { "id": 4, "name": "여자 어린이 목소리 능력자" },
    { "id": 5, "name": "남자 어린이 목소리 능력자" },
    { "id": 6, "name": "남자 청소년 목소리 능력자" },
    { "id": 7, "name": "중년 여성 목소리 능력자" },
    { "id": 8, "name": "장년 남성 목소리 능력자" },
    { "id": 9, "name": "인간 목소리 분석기" },
    { "id": 10, "name": "성대모사의 달인" },
    { "id": 11, "name": "인기스타" },
    { "id": 12, "name": "무엇이든 물어보세요(고인물)" },
    { "id": 13,"name": "피리부는 사나이" }
  ],
});


// 뱃지 모달창 토글
export const BadgeModalShowState = atom({
  key: "BadgeModalShowState",
  default: false,
});