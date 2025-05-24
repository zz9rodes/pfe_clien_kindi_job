<template>
  <div class="overflow-hidden bg-white border border-gray-300 rounded-[2px] hover:shadow-md hover:cursor-pointer transition ease-in-out duration-700">
    <!-- Image container with relative positioning for the "Seen" label -->
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="job.imageUrl" 
        :alt="job.title" 
        class="object-cover w-full h-full"
      />
      <span 
        v-if="job.seen" 
        class="absolute px-2 py-1 text-xs font-medium text-gray-700 bg-white rounded-md top-3 right-3"
      >
        Seen
      </span>
    </div>
    
    <!-- Company logo and name -->
    <div class="p-4">
      <div class="flex items-center mb-3">
        <img 
          :src="job.companyLogo" 
          :alt="job.companyName" 
          class="object-contain w-8 h-8 mr-2"
        />
        <span class="text-sm text-gray-600 uppercase">{{ job.companyName }}</span>
      </div>
      
      <!-- Job title -->
      <h3 class="mb-3 text-lg font-bold text-gray-900">{{ job.title }}</h3>
      
      <!-- Location -->
      <div class="flex items-center mb-2">
        <MapPinIcon class="w-4 h-4 mr-1 text-gray-500" />
        <span class="text-sm text-gray-600">{{ job.location }}</span>
      </div>
      
      <!-- Job type -->
      <div class="flex items-center mb-8">
        <BriefcaseIcon class="w-4 h-4 mr-1 text-gray-500" />
        <span class="text-sm text-gray-600">{{ job.contractType }}</span>
      </div>
      
      <!-- Footer with timestamp and bookmark -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <div class="flex items-center text-xs text-gray-500">
          <ClockIcon class="w-3 h-3 mr-1" />
          <span>{{ job.postedTime }}</span>
        </div>
        <button 
          class="text-gray-400 hover:text-[#e4097f] transition-colors"
          @click="toggleBookmark"
        >
          <BookmarkIcon v-if="isBookmarked" class="w-5 h-5 fill-[#e4097f] text-[#e4097f]" />
          <BookmarkIcon v-else class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MapPinIcon, BriefcaseIcon, ClockIcon, BookmarkIcon } from 'lucide-vue-next';

const props = defineProps({
  job: {
    type: Object,
    required: true,
    // Expected job object structure:
    // {
    //   id: String,
    //   title: String,
    //   companyName: String,
    //   companyLogo: String,
    //   location: String,
    //   contractType: String,
    //   postedTime: String,
    //   imageUrl: String,
    //   seen: Boolean,
    //   bookmarked: Boolean
    // }
  }
});

const emit = defineEmits(['bookmark']);

const isBookmarked = ref(props.job.bookmarked || false);

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value;
  emit('bookmark', {
    jobId: props.job.id,
    bookmarked: isBookmarked.value
  });
};
</script>
