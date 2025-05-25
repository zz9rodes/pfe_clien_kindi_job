<template>
        <div 
        class="group flex flex-col overflow-hidden relative transition duration-700 rounded-[2px] ease-in-out bg-white border border-gray-300 shadow-sm hover:shadow-md hover:cursor-pointer"
      >
        <div class="flex justify-center mb-4">
          <div class="relative">
            <img 
              :src="freelancer.avatar" 
              :alt="freelancer.name"
              class="object-cover w-16 h-16 border-4 border-white rounded-full shadow-md"
            />
            <div v-if="freelancer.isOnline" class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
        </div>

        <div class="mb-4 text-center">
          <h3 class="mb-1 text-lg font-bold text-gray-900">{{ freelancer.name }}</h3>
          <p class="text-[#00a3e0] text-sm font-medium">{{ freelancer.title }}</p>
        </div>

        <div class="flex items-center justify-center mb-4">
          <div class="flex items-center">
            <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span class="ml-1 text-sm font-semibold text-gray-900">{{ freelancer.rating }}</span>
            <span class="ml-1 text-xs text-gray-500">({{ freelancer.reviewCount }} reviews)</span>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <span 
            v-for="skill in freelancer.skills.slice(0, 3)" 
            :key="skill"
            class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-[#e4097f]/10 hover:text-[#e4097f] transition-colors"
          >
            {{ skill }}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <p class="mb-1 text-xs text-gray-500">Location</p>
            <p class="text-sm font-semibold text-gray-900">{{ freelancer.location }}</p>
          </div>

          <div>
            <p class="mb-1 text-xs text-gray-500">Job Success</p>
            <p class="text-sm font-semibold text-green-600">{{ freelancer.jobSuccess }}%</p>
          </div>
        </div>

        <button 
          @click="viewProfile(freelancer)"
          class="flex items-center justify-center w-full px-3 py-2 font-semibold text-white transition-all duration-200 bg-[#e4097f] rounded-sm  "
        >
          View Profile
          <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props=defineProps({
    freelancer:{
        type:Object,
        required:true
    }
})
</script>

<style>

</style>