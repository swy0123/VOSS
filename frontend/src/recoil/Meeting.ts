import { atom } from "recoil";

// 유저 선택 보내기
export const selectedMember = atom({
  key: "selectedMemberState",
  default: {
    userId: 0,
    email: "",
    nickname: "",
    userImgURL:"",
  }
});
