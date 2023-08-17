import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { AlarmInfoListType } from "../type/hw_type";
const { persistAtom } = recoilPersist();

// 화상 더빙 연습 녹음 기록
export const MeetDubRecordState = atom<string>({
  key: 'MeetDubRecordState',
  default: "",
})

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

// 더빙 개인 연습방 youtube control
export const youtubeState = atom<object | undefined>({
  key: "youtubeState",
  default: undefined,
})

// 알림 목록
export const alarmInfoState = atom<AlarmInfoListType[]>({
  key: "alarmInfoState",
  default: [],
})

// 녹음버튼 === 비디오버튼
export const PlayTriggerState = atom<number>({
  key: "PlayTriggerState",
  default: "",
})

// 화상 더빙방 비디오 컨트롤
export const VideoTriggerState = atom<number>({
  key: "VideoTriggerState",
  default: 0,
})

// 화상 더빙방 오디오와 비디오 컨트롤
export const VideoAudioTriggerState = atom<number>({
  key: "VideoAudioTriggerState",
  default: 2,
})

// 화상 더빙방 비디오+녹음 컨트롤
export const RecordTriggerState = atom<number>({
  key: "RecordTriggerState",
  default: 0,
})

// 발음교정 방 녹음 초기상태 표시
export const initialBtnState = atom<boolean>({
  key: "initialBtnState",
  default: true,
})

// 메인페이지 스크롤이벤트
export const scrollEventState = atom<number>({
  key: "scrollEventState",
  default: 0,
})

// 메인페이지 회원창 스크롤이벤트
export const scrollUserState = atom<boolean>({
  key: "scrollUserState",
  default: false,
})

// STT 스피너 
export const accentClickableState = atom<boolean>({
  key: "accentClickableState",
  default: true,
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