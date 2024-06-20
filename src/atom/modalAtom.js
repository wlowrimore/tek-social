import { atom } from "recoil";
export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const commentModalState = atom({
  key: 'commentModalState',
  default: false,
})

export const postIdState = atom({
  key: 'postIdState',
  default: "",
});