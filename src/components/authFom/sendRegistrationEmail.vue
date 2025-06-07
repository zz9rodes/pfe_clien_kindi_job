<template>
  <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
    <sendRegistrationEmail @close="toggleOpenModal()" />
  </AppModal>
  <div class="bg-white mx-3 rounded-md w-96 shadow-lg max-h-[80vh] overflow-y-auto modal-container">
    <!-- Header -->
    <div class="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-100">
      <div class="flex items-center gap-4">
        <h3 class="text-xl font-bold text-gray-900">Registration Email</h3>
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
        <label for="account_type" class="block mb-3 text-sm font-medium text-gray-700">
          Account Type : <span class="text-red-500">*</span>
        </label>
        <div class="flex flex-wrap gap-2 mb-4">
          <button v-for="category in categories" :key="category" @click="handleCategoryClick(category)" :class="[
            'px-4 py-2 rounded-full text-sm font-medium',
            activeCategory === category
              ? 'bg-[#e4097f] text-white'
              : 'text-gray-700 bg-white border border-gray-300'
          ]">
            {{ category }}
          </button>
        </div>

        <div class="space-y-6 ">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <input id="email" v-model="email" type="email" placeholder="example-mail@demo.com"
              class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e4097f] outline-none"
              required />
          </div>
        </div>

      </div>
      <div class="pt-6 mt-6 border-t border-gray-100">
        <button @click="handleSubmit"
          class="w-full bg-[#e4097f] text-white py-2 px-6 rounded-md font-semibold hover:shadow-lg hover:scale transition-all duration-200 flex items-center justify-center gap-2">
          Send Email
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const categories = ['companies', 'personnal'];
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router';
import AppModal from '../globales/AppModal.vue';


const auth = useAuthStore()
const router=useRouter()

const emit = defineEmits(['close'])

const activeCategory = ref(categories[0])
const email = ref('')

const isModalOpen = ref(false);

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const handleSubmit = async () => {


  const payloadData = {
    email: email.value,
    accountType: activeCategory.value
  }
  const data = await auth.api('post','/auth/users/user_request', payloadData)
  
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