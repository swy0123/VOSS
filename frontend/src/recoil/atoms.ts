import { atom } from "recoil";

const token = localStorage.getItem("access-token") || "";

export const loginState = atom({
  key: "isLogin",
  default: token ? true : false,
});