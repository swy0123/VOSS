import { atom } from "recoil";
import { ScriptData, VideosType} from "../type/type";

// 목소리 분석 녹음 기록
export const analysisRecordState = atom({
  key: 'analysisRecordState',
  default: [],
})

// 목소리 분석 녹음 기록 시간
export const analysisRecordTimeState = atom({
  key: 'analysisRecordTimeState',
  default: [],
})

// 발음 교정 녹음 기록
export const accentRecordState = atom({
  key: 'accentRecordState',
  default: [],
})

// 발음 교정 녹음 기록 시간
export const accentRecordTimeState = atom({
  key: 'accentRecordTimeState',
  default: [],
})

export const RoleSelectState = atom<boolean[]>({
  key: 'RoleSelectState',
  default: [],
})

export const ScriptSelectState = atom<boolean[]>({
  key: 'ScriptSelectState',
  default: [],
})

// 더비영상 Play and Stop
export const PlayChangebState = atom<number[]>({
  key: 'PlayChangebState',
  default: [],
})

// 더빙영상
export const videoState = atom<ScriptData | null>({
  key: 'videoState',
  default: "",
})

// 전체 더빙영상
export const videoListState = atom<VideosType[]>({
  key: 'videoListState',
  default: [],
})

// 전체 더빙영상 필텅링
export const videoFilterState = atom<VideosType[]>({
  key: 'videoFilterState',
  default: [],
})