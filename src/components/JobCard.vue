<template>
  <div class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 hover:border-[#e4097f]/30">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-gray-50/50 to-white group-hover:opacity-100"></div>
    
    <!-- Image container with enhanced styling -->
    <div class="relative h-48 overflow-hidden">
      <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"></div>
      <img 
        :src="job?.coverUrl" 
        :alt="job?.title" 
        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      
      <!-- Enhanced "Seen" label -->
      <span 
        v-if="job?.seen" 
        class="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-gray-200"
      >
        Seen
      </span>
      
      <!-- Gradient overlay at bottom -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
    </div>
    
    <!-- Enhanced content section -->
    <div class="relative p-6 space-y-4">
      <!-- Company section with improved styling -->
      <div class="flex items-center space-x-3">
        <div class="relative">
          <img 
            :src="companyLogo" 
            :alt="companyName" 
            class="object-contain w-10 h-10 transition-transform duration-300 border-2 border-gray-100 rounded-lg shadow-sm group-hover:scale-105"
          />
          <div class="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-0 bg-gradient-to-br from-white/20 to-transparent group-hover:opacity-100"></div>
        </div>
        <div>
          <span class="text-sm font-medium tracking-wide text-gray-500 uppercase">{{ companyName }}</span>
        </div>
      </div>
      
      <!-- Enhanced job title -->
      <div class="space-y-2">
        <h3 class="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#e4097f] transition-colors duration-300">
          {{ job?.title }}
        </h3>
      </div>
      
      <!-- Location and job type with improved layout -->
      <div class="space-y-3">
        <div class="flex items-center space-x-2">
          <MapPinIcon class="flex-shrink-0 w-4 h-4 text-gray-400" />
          <span class="text-sm font-medium text-gray-600">{{ job?.country }} - {{ job.city }}</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <BriefcaseIcon class="flex-shrink-0 w-4 h-4 text-gray-400" />
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 group-hover:bg-[#e4097f]/10 group-hover:text-[#e4097f] transition-colors duration-300">
            {{ job?.jobType }}
          </span>
        </div>
      </div>
      
      <!-- Enhanced footer -->
      <div class="flex items-center justify-between pt-4 transition-colors duration-300 border-t border-gray-100 group-hover:border-gray-200">
        <div class="flex items-center space-x-2">
          <ClockIcon class="w-4 h-4 text-gray-400" />
          <span class="text-sm font-medium text-gray-500">{{ moment(job?.createdAt).format('LL') }}</span>
        </div>
        
        <button 
          v-if="showFavorite"
          class="relative p-2 rounded-full text-gray-400 hover:text-[#e4097f] hover:bg-[#e4097f]/5 transition-all duration-300 transform hover:scale-110"
          @click="toggleBookmark"
        >
          <BookmarkIcon 
            v-if="isBookmarked" 
            class="w-5 h-5 fill-[#e4097f] text-[#e4097f] drop-shadow-sm" 
          />
          <BookmarkIcon 
            v-else 
            class="w-5 h-5" 
          />
          
          <!-- Ripple effect -->
          <div class="absolute inset-0 rounded-full bg-[#e4097f]/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 hover:opacity-100"></div>
        </button>
      </div>
    </div>
    
    <!-- Subtle border gradient on hover -->
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MapPinIcon, BriefcaseIcon, ClockIcon, BookmarkIcon } from 'lucide-vue-next';
import { string } from 'zod';
import moment from 'moment';

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
  companyLogo:{
    type:String,
    required:true
  },
  companyName:{
    type:String,
    required:true
  },
  showFavorite:{
    type:Boolean,
    required:false,
    default:true
  }
});

const emit = defineEmits(['bookmark']);

const isBookmarked = ref(props.job || false);

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
  emit('bookmark', {
    jobId: props.job?.id,
    bookmarked: isBookmarked.value
  });
};
</script>

<style scoped>
/* Custom animations for enhanced interactions */
@keyframes subtle-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.group:hover {
  animation: subtle-bounce 0.6s ease-in-out;
}

/* Enhanced backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Smooth gradient transitions */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Enhanced shadow effects */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Improved focus states for accessibility */
button:focus-visible {
  outline: 2px solid #e4097f;
  outline-offset: 2px;
}
</style>
