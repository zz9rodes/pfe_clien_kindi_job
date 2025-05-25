<template>
  <div class="flex flex-col min-h-screen mt-24 bg-white">

    <main class="flex-1">


      <AppInputJobsFilter :showToggleModal="false" />

      <div class="container px-4 mx-auto mt-16">
        <div class="flex border-b border-gray-200">
          <button class="px-3 py-1 text-white bg-[#e4097f] rounded-t-lg font-medium ">
            <span class="hidden sm:block">Job Finder</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-business-icon lucide-briefcase-business sm:hidden"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
          </button>
          <button class="px-8 py-4 text-gray-700 hover:text-[#e4097f] font-medium">
            <span class="hidden sm:block">Companies</span> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2-icon sm:hidden lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
          </button>
          <button class="px-8 py-4 text-gray-700 hover:text-[#e4097f] font-medium">
            <span  class="hidden sm:block">For Project Mangers</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-properties-icon sm:hidden lucide-table-properties"><path d="M15 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 9H3"/><path d="M21 15H3"/></svg>
          </button>
        </div>
      </div>
      
      <div class="container px-4 mx-auto mt-6">
        <div class="overflow-hidden bg-gray-100 rounded-3xl">
          <div class="flex flex-col items-center p-4 lg:flex-row lg:p-12">
            <div class="flex h-60">
              <img
                src="https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg"
                alt="KindiJob App Screenshots" class="object-contain " />
            </div>

          </div>
        </div>
      </div>


      <OursSercices/>

      <div class="container px-4 mx-auto mt-16">
        <h2 class="mb-6 text-2xl font-bold">Popular Searches</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <a v-for="city in popularCities" :key="city" href="#"
            class="px-2 py-4 text-center transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md md:px-0">
            <h3 class="font-medium text-gray-800 truncate">{{ city }}</h3>
          </a>
        </div>
      </div>

      <MostRatingJobs/>
      
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