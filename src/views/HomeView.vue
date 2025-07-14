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



  <AppModal @closeModal="closeLocationDialog" :isOpen="isLocationDialogOpen" :isLoader="false">
  
     <UseLocation @close-modal="closeLocationDialog">
      
     </UseLocation>
  </AppModal>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import MostRatingJobs from '../components/globales/MostRatingJobs.vue'
import OursSercices from '../components/globales/OursSercices.vue'
import Princing from '../components/globales/Princing.vue'
import Testimonies from '@/components/globales/Testimonies.vue'
import AppInputJobsFilter from '@/components/AppInputJobsFilter.vue'
import AppModal from '@/components/globales/AppModal.vue'
import UseLocation from '@/components/globales/UseLocation.vue'
import heroSection from '@/components/globales/heroSection.vue'

// State
const isLocationDialogOpen = ref(true)

// Data
const popularCities = ["Freelance", "Full-Time", "Yaounde", "Intrship", "Software ingenier"]

// Methods
const closeLocationDialog = () => {
  isLocationDialogOpen.value = false
}


</script>

<style scoped>

</style>