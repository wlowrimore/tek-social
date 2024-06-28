import { atom } from "recoil";

export const userLocationInput = atom({
  key: 'userLocation',
  default: ''
})

export const userSkillsInput = atom({
  key: 'userSkills',
  default: []
})

export const bioInput = atom({
  key: 'bio',
  default: ''
})

export const linkedInUrlInput = atom({
  key: 'linkedInUrl',
  default: ''
})

export const gitHubUrlInput = atom({
  key: 'gitHubUrl',
  default: ''
})

export const portfolioUrlInput = atom({
  key: 'portfolioUrl',
  default: ''
})

export const ProfileDetailsModalState = atom({
  key: 'profileDetailsModal',
  default: false
})

export const profileDetailsState = atom({
  key: 'detailsComplete',
  default: false
})