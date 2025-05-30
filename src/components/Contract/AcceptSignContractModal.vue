<template>
  <div class="bg-white mx-3 rounded-md w-96  shadow-lg max-h-[80vh] overflow-y-auto modal-container">
    <!-- Header -->
    <div class="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-100">
      <div class="flex items-center gap-4">
        <h3 class="text-xl font-bold text-gray-900">Sign Contract</h3>
        <span v-if="activeFiltersCount > 0"
          class="bg-[#e4097f] text-[8px] text-white px-2 py-1 rounded-full size-[18px] flex justify-center items-center">
          {{ activeFiltersCount }}
        </span>
      </div>
      <div class="flex items-center gap-3">

        <button @click="HadleCloseModal" class="p-1 text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>



    <div class="p-6">
      <div class="">
              

        <div class="space-y-6 ">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <input id="email" v-model="email" type="email" placeholder="example-mail@demo.com"
              class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e4097f] outline-none"
              required />
          </div>
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Password <span class="text-red-500">*</span>
            </label>
            <input id="password" v-model="email" type="email" placeholder="*********"
              class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e4097f] outline-none"
              required />
          </div>
            <div class="space-y-4">
              <div class="flex items-center group">
                <input
                  type="checkbox"
                  id="terms"
                  v-model="acceptTerms"
                  class="sr-only"
                />
                <label for="terms" class="flex items-center cursor-pointer">
                  <div
                    class="w-4 h-4 border border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-[#e4097f]"
                    :class="{
                      'bg-[#e4097f] border-[#e4097f]': acceptTerms,
                    }"
                  >
                    <svg
                      v-if="acceptNewsletter"
                      class="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <label for="terms" class="ml-3 text-sm text-gray-700">
                    I accept the
                    <span  class="font-medium text-[#e4097f]"
                      >terms </span
                    >
                   
                  </label>
                </label>
              </div>

            
            </div>
        </div>

      </div>
      <div class="pt-6 mt-6 border-t border-gray-100">
        <button @click="handleSubmit"
          class="w-full bg-[#e4097f] text-white py-2 px-6 rounded-md font-semibold hover:shadow-lg hover:scale transition-all duration-200 flex items-center justify-center gap-2">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const categories = ['Personal', 'Companies'];


const emit = defineEmits(['close'])

const activeCategory = ref(categories[0])


const handleSubmit = () => {

  emit('close')
}

const handleCategoryClick = (category) => {
  activeCategory.value = category;
};


const HadleCloseModal = () => {
  emit('close')
}
</script>

<style scoped>
/* Custom scrollbar for the filter container */
.filter-container::-webkit-scrollbar {
  width: 4px;
}

.filter-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.filter-container::-webkit-scrollbar-thumb {
  background: #e4097f;
  border-radius: 2px;
}

.filter-container::-webkit-scrollbar-thumb:hover {
  background: #c1086a;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease;
}

/* Grid responsive classes */
@media (min-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-1 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .grid-cols-1 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}




.modal-container {

  --sb-track-color: #e1e3e4;
  --sb-thumb-color: #ffffff;
  --sb-size: 7px;
}


.modal-container::-webkit-scrollbar {
  width: var(--sb-size)
}

.modal-container::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 8px;
}

.modal-container::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 8px;

}

@supports not selector(::-webkit-scrollbar) {
  .modal-container {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}
</style>