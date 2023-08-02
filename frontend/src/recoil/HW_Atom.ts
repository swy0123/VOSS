import { atom } from "recoil";

export const accentTextState = atom<string>({
  key: 'accentTextState',
  default: "",
})

export const testState = atom<string>({
  key: 'testState',
  default: [],
})