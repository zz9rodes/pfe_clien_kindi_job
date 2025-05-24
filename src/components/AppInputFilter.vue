<template>
  <div class="container px-4 mx-auto mt-8">
    <div class="overflow-hidden bg-gray-100 rounded-3xl">
      <div class="flex flex-col-reverse">
        <div class="w-full p-4 lg:p-8 ">
          <div class="flex-wrap hidden gap-2 mb-8 lg:flex">
            <button v-for="category in categories" :key="category" @click="handleCategoryClick(category)" :class="[
              'px-4 py-2 rounded-full text-sm font-medium',
              activeCategory === category
                ? 'bg-[#e4097f] text-white'
                : 'text-gray-700 bg-white border border-gray-300'
            ]">
              {{ category }}
            </button>
            <button class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full">
              <MoreHorizontalIcon class="w-4 h-4" />
            </button>
          </div>
          <div class="">
            <h1 class="flex-1 mb-8 text-3xl font-bold lg:text-7xl" v-if="showTitle">
              <span class="text-[#e4097f]">KindiJob</span> <span class="text-[#00a3e0]">search</span>
            </h1>
            <form class="flex" @submit.prevent="handleFilter">
              <input v-model="searchQuery" @input="handleChangeSearchValue"
                placeholder="Search childcare by postcode, suburb or centre name"
                class="rounded-l-full rounded-r-none border border-gray-300 border-r-0 lg:h-14 pl-6 pr-4 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#e4097f] h-12" />
              <button
                class="rounded-l-none mr-3  lg:h-14  h-12 rounded-r-full bg-[#e4097f] hover:bg-[#c8076f]  px-6 text-white">
                <SearchIcon class="w-5 h-5" />
              </button>
              <div v-if="showToggleModal"
              @click="HandleOpenModal"
                class="rounded-full lg:hidden  cursor-pointer flex items-center    border border-gray-300 border-r-0   text-base  focus:outline-none focus:ring-2 focus:ring-[#e4097f] size-12 bg-[#e4097f] ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="lucide lucide-plus-icon hover:rotate-45 lucide-plus flex-1 justify-end text-white transition-transform group-hover:text-[#e4097f]">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { MapPinIcon, MoreHorizontalIcon, SearchIcon } from 'lucide-vue-next';

const emit = defineEmits(['searchvalue-changed', 'filter']);

const searchQuery = ref('');
const activeCategory = ref('All Job Types');

const categories = ['All Job Types', 'Full Time', 'Intership', 'Freelance'];

const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  showToggleModal: {
    type: Boolean,
    default: false
  }
});

const handleChangeSearchValue = () => {
  emit('searchvalue-changed', searchQuery.value);
};

const handleFilter = () => {
  emit('filter');
};

const HandleOpenModal=()=>{
    emit('open-modal');
}

const handleCategoryClick = (category) => {
  activeCategory.value = category;
  searchQuery.value = category;
  emit('searchvalue-changed', searchQuery.value);
};
</script>
