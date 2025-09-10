import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    presets: {
      pomodoro: 25 * 60,
      short: 5 * 60,
      long: 15 * 60,
    }
  }),
  actions: {
    updatePreset(type: 'pomodoro' | 'short' | 'long', minutes: number) {
      this.presets[type] = minutes * 60
    }
  }
})
