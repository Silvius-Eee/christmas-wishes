import { defineStore } from 'pinia'

export const useWishStore = defineStore('wish', {
  state: () => ({
    goals: [],
    blessing: '',
    date: ''
  }),
  actions: {
    saveWish(data: { goals: any[], blessing: string }) {
      this.goals = data.goals
      this.blessing = data.blessing
      this.date = new Date().toISOString()
    }
  },
  persist: true // 持久化存储
}) 