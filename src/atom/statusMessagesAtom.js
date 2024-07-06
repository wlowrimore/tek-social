import { atom } from "recoil";

export const profileSuccessMsgState = atom({
  key: 'profileSuccessMsg',
  default: false
})

export const profileSuccessMsgContentState = atom({
  key: 'profileSuccessMsgContent',
  default: ''
})

export const profileUpdateSuccessMsgState = atom({
  key: 'profileUpdateSuccessMsg',
  default: false
})

export const profileUpdateSuccessMsgContentState = atom({
  key: 'profileUpdateSuccessMsgContent',
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