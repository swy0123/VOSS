import zammanboImage from '/src/assets/ProfileImages/zammanbo.png';
import { atom } from "recoil";

// 더미 팔로워, 팔로잉
const FollowerList = [
  { id: 1, username: 'safv__sfd9', image: zammanboImage, isfollow: true},
  { id: 2, username: 'idid__320', image: zammanboImage, isfollow: false},
  { id: 3, username: 'laav8019', image: zammanboImage, isfollow: true},
  { id: 4, username: '._.dffa00', image: zammanboImage, isfollow: false},
  { id: 5, username: 'yukgaejang', image: zammanboImage, isfollow: true},
  { id: 6, username: 'voooooox', image: zammanboImage, isfollow: true},
  { id: 7, username: 'safv__sfd9', image: zammanboImage, isfollow: false},
  { id: 8, username: 'idid__320', image: zammanboImage, isfollow: true},
  { id: 9, username: 'laav8019', image: zammanboImage, isfollow: true},
  { id: 10, username: '._.dffa00', image: zammanboImage, isfollow: false},
  { id: 11, username: 'yukgaejang', image: zammanboImage, isfollow: true},
  { id: 12, username: 'voooooox', image: zammanboImage, isfollow: false},
];
export const FollowerListState = atom({
  key: "FollowerListState",
  default: FollowerList,
});