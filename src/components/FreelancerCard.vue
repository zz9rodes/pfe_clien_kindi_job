<template>
  <div
    class="group flex flex-col overflow-hidden relative transition duration-700 rounded-[2px] ease-in-out bg-white border border-gray-300 shadow-sm hover:shadow-md hover:cursor-pointer"
  >
  <div  class="flex-1 ">
       <div class="flex justify-center mb-4">
      <div class="relative">
        <img
          v-if="freelancer?.avatarUrl"
          :src="freelancer?.avatarUrl"
          :alt="freelancer?.firstName"
          class="object-cover w-16 h-16 border-4 border-white rounded-full shadow-md"
        />
        <UserIcon
          class="w-16 h-16 text-gray-600 bg-gray-300 border-4 border-white rounded-full shadow-md"
          v-else
        />
        <div
          class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"
        ></div>
      </div>
    </div>

    <div class="mb-4 text-center">
      <h3 class="mb-1 text-lg font-bold text-gray-900">
        {{ freelancer?.firstName }} {{ freelancer?.lastName }}
      </h3>
      <p class="text-[#00a3e0] text-sm font-medium">
        {{ freelancer?.cvProfiles?.bio ?? "Available for Job" }}
      </p>
    </div>

    <div class="flex items-center justify-center mb-4">
      <div class="flex items-center">
        <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </svg>
        <span class="ml-1 text-sm font-semibold text-gray-900">{{
          rating.stars
        }}</span>
        <span class="ml-1 text-xs text-gray-500"
          >({{ rating.reviews }} reviews)</span
        >
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-2 mb-6">
      <span
        v-for="skill in freelancer?.cvProfiles?.competence?.slice(0, 3)"
        :key="skill"
        class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-[#e4097f]/10 hover:text-[#e4097f] transition-colors"
      >
        {{ skill }}
      </span>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-6 text-center">
      <div>
        <p class="mb-1 text-xs text-gray-500">Location</p>
        <p class="text-sm font-semibold text-gray-900">
          {{ freelancer.country }} {{ freelancer.city }}
        </p>
      </div>

      <div>
        <p class="mb-1 text-xs text-gray-500">Job Success</p>
        <p class="text-sm font-semibold text-green-600">10%</p>
      </div>
    </div>
  </div>
   

    <button
      @click="$emit('view-profile')"
      class="flex items-center justify-center w-full px-3 py-2 font-semibold text-white transition-all duration-200 bg-[#e4097f] rounded-sm"
    >
      View Profile
      <svg
        class="w-4 h-4 ml-2"
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
    </button>
  </div>
</template>

<script setup>
import { UserIcon } from "lucide-vue-next";
import { defineProps ,defineEmits} from "vue";
const emit=defineEmits(['view-profile'])
const props = defineProps({
  freelancer: {
    type: Object,
    required: true,
  },
});

const rating = {
  stars: Math.floor(Math.random() * 5) + 1, // Génère un nombre entre 1 et 5
  reviews:
    Math.floor(Math.random() * (50 - (Math.floor(Math.random() * 5) + 1))) +
    (Math.floor(Math.random() * 5) + 1),
};

// console.log(rating);
</script>

<style>
</style>