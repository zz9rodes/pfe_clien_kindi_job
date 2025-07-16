<template>
  <div class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 hover:border-[#e4097f]/30">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-gray-50/50 to-white group-hover:opacity-100"></div>
    
    <!-- External link icon -->
    <div class="absolute z-20 transition-all duration-300 transform translate-x-2 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:translate-x-0">
      <div class="p-2 border border-gray-200 rounded-full shadow-sm bg-white/90 backdrop-blur-sm">
        <ExternalLinkIcon class="w-4 h-4 text-gray-600" />
      </div>
    </div>

    <!-- Cover image with enhanced styling -->
    <div class="relative h-32 overflow-hidden">
      <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"></div>
      <img
        :src="company.coverUrl"
        :alt="company.name"
        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      <!-- Gradient overlay at bottom -->
      <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
    </div>

    <!-- Logo section with enhanced positioning -->
    <div class="relative h-12 bg-white">
      <div class="absolute -top-8 left-6">
        <div class="relative">
          <img
            :src="company.avatarUrl"
            :alt="`${company.name} logo`"
            class="object-cover w-16 h-16 transition-transform duration-300 border-4 border-white shadow-lg rounded-xl group-hover:scale-105"
          />
          <div class="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent group-hover:opacity-100"></div>
        </div>
      </div>
    </div>

    <!-- Content section -->
    <div class="relative px-6 pb-6 space-y-4">
      <!-- Industry badge -->
      <div class="flex justify-start">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#e4097f]/10 text-[#e4097f] group-hover:bg-[#e4097f]/20 transition-colors duration-300">
          {{ company.industry.toUpperCase() }}
        </span>
      </div>

      <!-- Company name -->
      <div>
        <h3 class="text-xl font-bold text-gray-900 group-hover:text-[#e4097f] transition-colors duration-300">
          {{ company.name }}
        </h3>
        <p class="mt-1 text-sm text-gray-600 line-clamp-2">
          {{ company.industry }}
        </p>
      </div>

      <!-- Company stats -->
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <div class="p-1 bg-gray-100 rounded-full group-hover:bg-[#e4097f]/10 transition-colors duration-300">
            <UsersIcon class="w-3 h-3 text-gray-500 group-hover:text-[#e4097f] transition-colors duration-300" />
          </div>
          <span class="text-sm font-medium text-gray-600">{{ membersCount }} members</span>
        </div>
        
        <div class="flex items-center space-x-2">
          <div class="p-1 bg-gray-100 rounded-full group-hover:bg-[#e4097f]/10 transition-colors duration-300">
            <MapPinIcon class="w-3 h-3 text-gray-500 group-hover:text-[#e4097f] transition-colors duration-300" />
          </div>
          <span class="text-sm font-medium text-gray-600">{{ company.country }}, {{ company.city }}</span>
        </div>
      </div>

      <!-- Footer with jobs count and follow button -->
      <div class="flex items-center justify-between pt-4 transition-colors duration-300 border-t border-gray-100 group-hover:border-gray-200">
        <div class="text-sm font-semibold text-gray-900">
          <span class="text-[#e4097f]">{{ jobsCount }}</span> jobs available
        </div>
        
        <button
          :class="[
            'relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-sm',
            company.isFollowed
              ? 'bg-gradient-to-r from-[#e4097f] to-[#c4087a] text-white hover:shadow-lg hover:shadow-[#e4097f]/25'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md',
          ]"
        >
          {{ company.isFollowed ? "Following" : "Follow" }}
          
          <!-- Ripple effect for non-followed state -->
          <div v-if="!company.isFollowed" class="absolute inset-0 rounded-full bg-[#e4097f]/20 scale-0 hover:scale-100 transition-transform duration-300 opacity-0 hover:opacity-100"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExternalLinkIcon, MapPinIcon, UsersIcon } from "lucide-vue-next";
import { defineProps } from "vue";

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
  jobsCount:{
    type:Number,
    required:false,
    default:1
  },
  membersCount:{
    type:Number,
    required:false,
    default:1
  }
});
</script>

<style scoped>
/* Enhanced backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
