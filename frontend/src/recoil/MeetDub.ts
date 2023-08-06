import { atom } from "recoil";

// 테스트 보내기
export const sendMsg = atom({
  key: "SendMsgState",
  default: "none"
});
// 테스트 받기
export const recieveMsg = atom({
  key: "RecieveMsgState",
  default: "none"
});

// // 더빙 연습 녹음 기록
// export const dubbingRecordState = atom({
//   key: "dubbingRecordState",
//   default: [],
// });

// // 더빙 연습 녹음 기록 시간
// export const dubbingRecordTimeState = atom({
//   key: "dubbingRecordTimeState",
//   default: [],
// });

// // 발음 교정 전 스크립트
// export const accentScriptState = atom({
//   key: "accentScriptState",
//   default: "",
// });

// // 발음 교정 후 스크립트
// export const accentSttState = atom({
//   key: "accentSttState",
//   default: "",
// });

// // 목소리 분석 결과
// export const analysisResultState = atom({
//   key: "analysisResultState",
//   default: "",
// });
