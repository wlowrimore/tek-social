import { atom } from "recoil";

export const profileSuccessMsgState = atom({
  key: 'profileSuccessMsg',
  default: false
})

export const profileSuccessMsgContentState = atom({
  key: 'profileSuccessMsgContent',
  default: ''
})

export const profileErrorMsgState = atom({
  key: 'profileErrorMsg',
  default: false
})

export const profileErrorMsgContentState = atom({
  key: 'profileErrorMsgContent',
  default: ''
})