// stores/useUserStore.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      position: ''
    }
  }),
  actions: {
    setUser(data) {
      this.userData = { ...this.userData, ...data }
    },
    resetUser() {
      this.userData = {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        position: ''
      }
    }
  }
})
