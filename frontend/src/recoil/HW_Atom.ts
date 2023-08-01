import { atom } from "recoil";

export const accentTextState = atom<string>({
  key: 'accentTextState',
  default: "",
})