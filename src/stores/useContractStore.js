import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useContractStore = defineStore('contract', () => {
  const saved = localStorage.getItem('contractData')
  const contractData = ref(
    saved
      ? JSON.parse(saved)
      : {
          id: null,
          title: '',
          textDescription: '',
          articlesAndClauses: []
        }
  )

  // Watch utile en cas de changement indirect
  watch(contractData, (newVal) => {
    localStorage.setItem('contractData', JSON.stringify(newVal))
  }, { deep: true })

  const setContract = (data) => {
    contractData.value = { ...contractData.value, ...data }
    localStorage.setItem('contractData', JSON.stringify(contractData.value)) // ici directement
    console.log('✅ Sauvegardé dans localStorage:', contractData.value)
  }

  const resetContract = () => {
    contractData.value = {
      id: null,
      title: '',
      textDescription: '',
      articlesAndClauses: []
    }
    localStorage.removeItem('contractData')
  }

  return {
    contractData,
    setContract,
    resetContract
  }
})
