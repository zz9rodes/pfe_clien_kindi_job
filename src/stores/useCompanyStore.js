// stores/useCompanyStore.ts
import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companyData: {
      CompanyName: '',
      LogoUrl: '',
      city: '',
      country: '',
      languageAttachment: 'fr'
    }
  }),
  actions: {
    setCompany(data) {
      this.companyData = { ...this.companyData, ...data }
    },
    resetCompany() {
      this.companyData = {
        CompanyName: '',
        LogoUrl: '',
        city: '',
        country: '',
        languageAttachment: 'fr'
      }
    }
  }
})
