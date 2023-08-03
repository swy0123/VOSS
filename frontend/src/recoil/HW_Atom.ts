import { atom } from "recoil";

export const accentTextState = atom<string>({
  key: 'accentTextState',
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