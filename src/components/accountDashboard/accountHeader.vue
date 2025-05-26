<template>
  <header class="fixed top-0 left-0 right-0 z-50 px-6 py-1 bg-white border-b border-gray-200">
    <div class="flex items-center justify-between">
      <div class="relative flex-[1]">
        <div class="hidden sm:block">
          <span class="text-[#e4097f] font-bold text-xl tracking-tight font-nunito">KINDI🎁</span>
          <div class="inline-flex items-center">
            <span class="text-[#00a3e0] font-nunito font-bold text-xl tracking-tight">JOB
            </span>
          </div>
        </div>

        <div class="block sm:hidden">
          <span class="text-[#e4097f] font-bold text-xl tracking-tight font-nunito">K🎁</span>
          <div class="inline-flex items-center">
            <span class="text-[#00a3e0] font-nunito font-bold text-xl tracking-tight">J
            </span>
          </div>
        </div>
      </div>
      <!-- Menu -->

      <!-- Search bar and Tools -->
      <div class="flex items-center justify-end sm:gap-5  gap-3 p-1 flex-[3] ">
        <div v-for="(item, index) in HeaderMenu" :key="item.title" class="relative ">
          <a :href="item.link" :class="[
            'flex items-center px-1 py-2 rounded-md transition-all duration-200 relative overflow-hidden',
            item.active ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : '',
          ]" @click="setActiveItem(index)">
            <div class="flex items-center justify-center flex-shrink-0 w-6 h-6">
              <component :is="item.icon" :class="[
                'h-4 w-4  transition-colors duration-200',
                item.active ? 'text-[#db147f] h-5 w-5' : '',
              ]" />
            </div>
            <div class="hidden transition-all duration-300 ease-in-out sm:block">
              <span class="text-sm font-bold whitespace-nowrap">
                {{ item.title }}
              </span>
            </div>
          </a>
        </div>
        <!--  -->
        <div @click="handleOpenSearchModal"
          class="relative py-2 justify-center items-center hidden  lg:flex     bg-white border border-gray-300 rounded-xl focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:border-[#e4097f] ">
          <span class="ml-2 text-gray-400">What do you looking for today?</span>
          <div class="inset-y-0 right-0 flex items-center px-3 cursor-pointer ">
            <Search class="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div @click="handleOpenSearchModal"
          class="relative py-2 justify-center items-center lg:hidden   flex bg-white border border-gray-300 rounded-xl focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:border-[#e4097f] ">
          <div class="inset-y-0 right-0 flex items-center px-3 cursor-pointer ">
            <Search class="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <!-- Notifications -->
        <button
          class="relative p-1 text-gray-400 rounded-full hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:ring-offset-2">
          <Bell class="w-5 h-5" />
          <span class="absolute top-0 right-0 block w-2 h-2 bg-red-400 rounded-full ring-2 ring-white"></span>
        </button>

        <!-- <button
          class="relative p-1 text-gray-400 rounded-full hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:ring-offset-2">
          <MessageSquare class="w-5 h-5" />
        </button>

        <div class="relative">
          <button
            class="flex items-center p-1 space-x-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <div class="relative">
              <img class="w-8 h-8 rounded-full" src="/src/assets/image.png" alt="User avatar" />
              <span class="absolute top-0 right-0 block w-2 h-2 bg-red-400 rounded-full ring-2 ring-white"></span>
            </div>
          </button>
        </div> -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import {
  Bell,
  Search,
  MessageCircleMore,
  NewspaperIcon,
  BadgeJapaneseYenIcon
} from 'lucide-vue-next'



const emits = defineEmits()


const HeaderMenu = ref([
  {
    icon: BadgeJapaneseYenIcon,
    title: "Browse Jobs Offers",
    link: "#",
    active: true,
    badge: null,
  },
  {
    icon: NewspaperIcon,
    title: "News",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: MessageCircleMore,
    title: "Chat",
    link: "#",
    active: false,
    badge: null,
  }
])

const setActiveItem = (index) => {
  HeaderMenu.value.forEach((item, i) => {
    item.active = i === index;
  });
};

const handleOpenSearchModal = () => {

  emits('open-search-modal')
}
</script>