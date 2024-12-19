import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    nickname: ''
  }),
  actions: {
    setNickname(name: string) {
      this.nickname = name
    }
  },
  persist: true // 持久化存储
}) 