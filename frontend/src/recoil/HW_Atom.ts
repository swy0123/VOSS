import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 더빙 연습 녹음 기록
export const dubbingRecordState = atom({
  key: 'dubbingRecordState',
  default: [],
})

// 더빙 연습 녹음 기록 시간
export const dubbingRecordTimeState = atom({
  key: 'dubbingRecordTimeState',
  default: [],
})

// 발음 교정 전 스크립트
export const accentScriptState = atom({
  key: 'accentScriptState',
  default: "",
})

// 발음 교정 후 스크립트
export const accentSttState = atom({
  key: 'accentSttState',
  default: "",
})

// 목소리 분석 결과
export const analysisResultState = atom({
  key: 'analysisResultState',
  default: ""
})

// 화상 더빙 영상 선택
export const meetDubSelectState = atom<number>({
  key: 'meetDubSelectState',
  default: 0,
  effects_UNSTABLE: [persistAtom]
})

// 더빙영상 Play and Stop
export const MeetDubPlayChangebState = atom<number[]>({
  key: 'MeetDubPlayChangebState',
  default: [],
})

// 역할 선택 모달창 ture-false
export const RoleModalState = atom<boolean>({
  key: 'RoleModalState',
  default: false
})

// 화상방 subscribers 인원수
export const meetDubUserState = atom<number>({
  key: "meetDubUserState",
  default: 0
})

// 동영상 현재시간
export const timeState = atom<number>({
  key: "timeState",
  default: 0
})

// // User가 선택한 Role
// export const userSelectRoleState = atom<string[]>({
//   key: "userSelectRoleState",
//   default:
// })

// // User가 선택한 Role
// export const userSelectRoleState = atom<string[]>({
//   key: "userSelectRoleState",
//   default:["","","","","",""]
// })