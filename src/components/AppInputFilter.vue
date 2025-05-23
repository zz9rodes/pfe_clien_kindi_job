<template>
          <div class="container px-4 mx-auto mt-8">
        <div class="overflow-hidden bg-gray-100 rounded-3xl">
          <div class="flex flex-col-reverse ">
            <div class="w-full p-8 lg:p-12">
             
             <div class="flex flex-wrap gap-2 mb-8">
                <button class="bg-[#e4097f] text-white px-4 py-2 rounded-full text-sm font-medium">
                  All Job Types
                </button>
                <button
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full">
                 Full Time
                </button>
                <button
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full">
                  Intership
                </button>
                <button
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full">
                  Freelance
                </button>
                <button
                  class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full">
                  <MoreHorizontalIcon class="w-4 h-4" />
                </button>
              </div> 
              <div class="mb-6">
                <h1 class="flex-1 mb-8 font-bold text-7xl" v-if="showTitle">
                <span class="text-[#e4097f]">KindiJob</span> <span class="text-[#00a3e0]">search</span>
              </h1>
                <form class="flex" @submit.prevent="HandleFilter">
                  <input @input="HandleChangeSearchValue(searchQuery)" v-model="searchQuery" placeholder="Search childcare by postcode, suburb or centre name"
                    class="rounded-l-full rounded-r-none border border-gray-300 border-r-0 h-14 pl-6 pr-4 text-base w-full focus:outline-none focus:ring-2 focus:ring-[#e4097f]" />
                  <button class="rounded-l-none rounded-r-full bg-[#e4097f] hover:bg-[#c8076f] h-14 px-6 text-white">
                    <SearchIcon class="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

 <script setup>
import { ref ,defineProps,defineEmits} from 'vue';
import { MapPinIcon, MoreHorizontalIcon, SearchIcon } from 'lucide-vue-next';

const emit = defineEmits(['searchvalue-changed'])

const searchQuery=ref('')

const props=defineProps({
    showTitle:{
        type: Boolean,
        default:true,
    }
})

const HandleChangeSearchValue=(data)=>{
  emit('searchvalue-changed',searchQuery.value)
}


const HandleFilter=(data)=>{
  emit('filter')
}

</script> 

<!-- <script setup>
const props = withDefaults(defineProps({
  showTitle: Boolean
}), {
  showTitle: true
})
</script> -->
