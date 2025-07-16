<template>
  <div class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 hover:border-[#e4097f]/30">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-gray-50/50 to-white group-hover:opacity-100"></div>
    
    <div class="relative p-6 space-y-6">
      <!-- Avatar section with enhanced styling -->
      <div class="flex justify-center">
        <div class="relative">
          <div class="relative">
            <img
              v-if="freelancer?.avatarUrl"
              :src="freelancer?.avatarUrl"
              :alt="freelancer?.firstName"
              class="object-cover w-20 h-20 transition-transform duration-300 border-4 border-white rounded-full shadow-lg group-hover:scale-105"
            />
            <div
              v-else
              class="flex items-center justify-center w-20 h-20 border-4 border-white rounded-full shadow-lg bg-gradient-to-br from-gray-200 to-gray-300"
            >
              <UserIcon class="w-8 h-8 text-gray-500" />
            </div>
            
            <!-- Enhanced online indicator -->
            <div class="absolute w-5 h-5 bg-green-400 border-white rounded-full shadow-sm bottom-1 right-1 border-3">
              <div class="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <!-- Subtle glow effect -->
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#e4097f]/20 to-[#00a3e0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
        </div>
      </div>

      <!-- Name and bio section -->
      <div class="space-y-2 text-center">
        <h3 class="text-xl font-bold text-gray-900 group-hover:text-[#e4097f] transition-colors duration-300">
          {{ freelancer?.firstName }} {{ freelancer?.lastName }}
        </h3>
        <p class="text-[#00a3e0] text-sm font-medium">
          {{ freelancer?.cvProfiles?.bio ?? "Available for Job" }}
        </p>
      </div>

      <!-- Rating section with enhanced styling -->
      <div class="flex items-center justify-center">
        <div class="flex items-center px-4 py-2 space-x-2 transition-colors duration-300 border border-yellow-200 rounded-full bg-yellow-50 group-hover:bg-yellow-100">
          <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span class="text-sm font-semibold text-gray-900">{{ rating.stars }}</span>
          <span class="text-xs text-gray-500">({{ rating.reviews }} reviews)</span>
        </div>
      </div>

      <!-- Skills section with enhanced badges -->
      <div class="flex flex-wrap justify-center gap-2">
        <span
          v-for="skill in freelancer?.cvProfiles?.competence?.slice(0, 3)"
          :key="skill"
          class="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-[#e4097f]/10 hover:text-[#e4097f] transition-all duration-300 transform hover:scale-105 cursor-default"
        >
          {{ skill }}
        </span>
      </div>

      <!-- Stats grid with enhanced styling -->
      <div class="grid grid-cols-2 gap-4">
        <div class="p-3 text-center transition-colors duration-300 bg-gray-50 rounded-xl group-hover:bg-gray-100">
          <p class="mb-1 text-xs font-medium text-gray-500">Location</p>
          <p class="text-sm font-semibold text-gray-900">
            {{ freelancer.country }}, {{ freelancer.city }}
          </p>
        </div>

        <div class="p-3 text-center transition-colors duration-300 bg-green-50 rounded-xl group-hover:bg-green-100">
          <p class="mb-1 text-xs font-medium text-gray-500">Success Rate</p>
          <p class="text-sm font-semibold text-green-600">95%</p>
        </div>
      </div>

      <!-- Enhanced CTA button -->
      <button
        @click="$emit('view-profile')"
        class="group/btn relative w-full px-4 py-3 bg-gradient-to-r from-[#e4097f] to-[#c4087a] text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#e4097f]/25 overflow-hidden"
      >
        <div class="relative flex items-center justify-center space-x-2">
          <span>View Profile</span>
          <svg
            class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
        
        <!-- Ripple effect -->
        <div class="absolute inset-0 transition-transform duration-300 scale-0 opacity-0 bg-white/20 group-hover/btn:scale-100 rounded-xl group-hover/btn:opacity-100"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { UserIcon } from "lucide-vue-next";
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(['view-profile']);

const props = defineProps({
  freelancer: {
    type: Object,
    required: true,
  },
});

const rating = {
  stars: Math.floor(Math.random() * 5) + 1,
  reviews: Math.floor(Math.random() * (50 - (Math.floor(Math.random() * 5) + 1))) + (Math.floor(Math.random() * 5) + 1),
};
</script>

<style scoped>
/* Enhanced backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Custom border width for online indicator */
.border-3 {
  border-width: 3px;
}

/* Enhanced animations */
@keyframes subtle-glow {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse {
  animation: subtle-glow 2s ease-in-out infinite;
}
</style>
