<template>
  <div class="flex flex-col min-h-screen bg-white ">

    <main class="flex-1">


      <!-- Hero Section -->


      <div class="container px-4 mx-auto mt-16">
        <div class="flex border-b border-gray-200">
          <button class="px-8 py-4 text-white bg-[#e4097f] rounded-t-lg font-medium">
            For Parents & Families
          </button>
          <button class="px-8 py-4 text-gray-700 hover:text-[#e4097f] font-medium">
            For Childcare Providers
          </button>
          <button class="px-8 py-4 text-gray-700 hover:text-[#e4097f] font-medium">
            For Job Seekers
          </button>
        </div>
      </div>
      
      <div class="container px-4 mx-auto mt-6">
        <div class="overflow-hidden bg-gray-100 rounded-3xl">
          <div class="flex flex-col items-center p-8 lg:flex-row lg:p-12">
            <div class="mb-8 lg:w-1/3 lg:mb-0">
              <img
                src="https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg"
                alt="KindiCare App Screenshots" class="object-contain mx-auto" />
            </div>

                   <div class="flex justify-center lg:w-1/3 lg:justify-end">
              <div class="relative">
                <div class="p-6 bg-white shadow-md rounded-xl">
                  <img
                    src="https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg"
                    alt="QR Code" class="object-contain w-[180px] h-[180px]" />
                </div>
                <div class="absolute -top-4 -right-4 text-[#00a3e0]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L8 16M20 4V14M20 4H10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <OursSercices/>

      <!-- Popular Searches -->
      <div class="container px-4 mx-auto mt-16">
        <h2 class="mb-6 text-2xl font-bold">Popular Searches</h2>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <a v-for="city in popularCities" :key="city" href="#"
            class="p-4 text-center transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
            <h3 class="font-medium text-gray-800">{{ city }}</h3>
          </a>
        </div>
      </div>

      <MostRatingJobs/>
      
      <Testimonies/>
    
    </main>
    <Princing/>



    <!-- Location Dialog -->
    <div v-if="isLocationDialogOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-full max-w-md overflow-hidden bg-white rounded-xl">
        <div class="flex justify-center w-full">
              <img
                src="/src/assets/image.png"
                alt="Child pointing at map" class="" />
            </div>
        <div class="p-6">
          <h2 class="mb-4 text-xl font-bold text-center">Allow "KindiJob" to use your location?</h2>
          <p class="mb-6 text-center text-gray-600">
            KindiJob would like to use your location to show you early childhood education and care centres in your
            area.
          </p>

          <div class="flex gap-4">
            <button @click="closeLocationDialog"
              class="flex-1 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-100">
              Cancel
            </button>
            <button @click="closeLocationDialog"
              class="flex-1 bg-[#e4097f] hover:bg-[#c8076f] text-white py-2 px-4 rounded">
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon, MapPinIcon, MailIcon, MoreHorizontalIcon } from 'lucide-vue-next'
import MostRatingJobs from '../components/globales/MostRatingJobs.vue'
import OursSercices from '../components/globales/OursSercices.vue'
import Princing from '../components/globales/Princing.vue'
import Testimonies from '@/components/globales/Testimonies.vue'
import AppInputFilter from '@/components/AppInputFilter.vue'

// State
const isLocationDialogOpen = ref(false)

// Data
const popularCities = ["Freelance", "Full-Time", "Yaounde", "Intrship", "Software ingenier"]

// Methods
const closeLocationDialog = () => {
  isLocationDialogOpen.value = false
}


</script>

<style scoped>

</style>