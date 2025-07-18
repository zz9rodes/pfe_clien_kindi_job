<template>
  <div class="flex flex-col min-h-screen mt-24 bg-white">

    <main class="flex-1">

      <heroSection/>

      <AppInputJobsFilter :showToggleModal="false" />
      
      <OursSercices/>

      <!-- <MostRatingJobs/> -->
      
      <Testimonies/>
    
    </main>
    <Princing/>

    <AppModal @closeModal="closeLocationDialog" :isOpen="isLocationDialogOpen" :isLoader="isRequestingLocation">
      <UseLocation @accept="handleLocationAccept" @close-modal="closeLocationDialog" />
    </AppModal>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import OursSercices from '../components/globales/OursSercices.vue'
import Princing from '../components/globales/Princing.vue'
import Testimonies from '@/components/globales/Testimonies.vue'
import AppInputJobsFilter from '@/components/AppInputJobsFilter.vue'
import AppModal from '@/components/globales/AppModal.vue'
import UseLocation from '@/components/globales/UseLocation.vue'
import heroSection from '@/components/globales/heroSection.vue'

// État
const isLocationDialogOpen = ref(false)
const isRequestingLocation = ref(false)
const locationPermission = ref(null)

// Méthodes
const checkLocationPermission = async () => {
  try {
    // Vérifier si la géolocalisation est supportée
    if (!navigator.geolocation) {
      console.warn('La géolocalisation n\'est pas supportée par ce navigateur')
      return
    }

    // Vérifier les permissions si l'API est disponible
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'geolocation' })
      locationPermission.value = permission.state
      
      if (permission.state === 'prompt') {
        // L'utilisateur n'a pas encore répondu, afficher le modal
        isLocationDialogOpen.value = true
      } else if (permission.state === 'granted') {
        // Permission déjà accordée, on peut utiliser la géolocalisation
        console.log('Permission de géolocalisation déjà accordée')
        getCurrentLocation()
      } else if (permission.state === 'denied') {
        // Permission refusée, ne pas afficher le modal
        console.log('Permission de géolocalisation refusée')
      }
    } else {
      // API permissions non disponible, afficher le modal par défaut
      isLocationDialogOpen.value = true
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions :', error)
    // En cas d'erreur, afficher le modal par sécurité
    isLocationDialogOpen.value = true
  }
}

const handleLocationAccept = async () => {
  isRequestingLocation.value = true
  
  try {
    await getCurrentLocation()
    closeLocationDialog()
  } catch (error) {
    console.error('Erreur lors de la demande de géolocalisation :', error)
    // Optionnel : afficher un message d'erreur à l'utilisateur
  } finally {
    isRequestingLocation.value = false
  }
}

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Géolocalisation non supportée'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log('Position obtenue :', { latitude, longitude })
        
        // Ici vous pouvez stocker la position ou l'utiliser selon vos besoins
        // Par exemple, la sauvegarder dans un store Pinia ou localStorage
        localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }))
        
        resolve({ latitude, longitude })
      },
      (error) => {
        console.error('Erreur de géolocalisation :', error.message)
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  })
}

const closeLocationDialog = () => {
  isLocationDialogOpen.value = false
}

// Cycle de vie
onMounted(() => {
  checkLocationPermission()
})
</script>

<style scoped>
</style>
