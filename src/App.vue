<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <!-- <div class="min-h-[100vh] font-suse bg-gradient-to-l from-blue-100 to-90%"> -->
  <!-- <NavBar/>
    <FlocoNeige/> -->
  <!-- <div class="px-4 pb-5 pt-28 sm:pb-0 sm:px-12 main"> -->
  <!-- <header class="w-full py-4 border-b border-gray-200">
    <div class="container flex items-center justify-between px-4 mx-auto">
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <div class="relative">
            <span class="text-[#e4097f] font-bold text-2xl tracking-tight">KINDI</span>
            <div class="inline-flex items-center">
              <span class="text-[#00a3e0] font-bold text-2xl tracking-tight">CARE</span>
              <div class="absolute -top-1 right-0 w-4 h-4 bg-[#00a3e0] rounded-full"></div>
            </div>
          </div>
        </a>
      </div>

      <nav class="items-center hidden space-x-8 lg:flex">
        <a href="#" class="text-gray-700 hover:text-[#e4097f] font-medium">
          Search
        </a>
        <a href="#" class="text-gray-700 hover:text-[#e4097f] font-medium flex items-center">
          Jobs
          <span class="ml-1 bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full">New!</span>
        </a>
        <a href="#" class="text-gray-700 hover:text-[#e4097f] font-medium">
          Subsidy Calculator
        </a>
        <a href="#" class="text-gray-700 hover:text-[#e4097f] font-medium">
          Hints, Tips & Stories
        </a>
        <a href="#" class="text-gray-700 hover:text-[#e4097f] font-medium">
          Awards
        </a>
        <button class="text-gray-700 hover:text-[#e4097f]">
          <MoreHorizontalIcon class="w-5 h-5" />
        </button>
      </nav>

      <div class="flex items-center space-x-4">
        <a href="#" class="text-gray-600 hover:text-[#e4097f]">
          <MailIcon class="w-5 h-5" />
        </a>
        <button class="bg-[#00a3e0] hover:bg-[#0090c7] text-white text-sm font-medium px-4 py-2 rounded">
          Claim Your Centre - It's Free
        </button>
        <button class="bg-[#e4097f] hover:bg-[#c8076f] text-white text-sm font-medium px-4 py-2 rounded">
          Log In
        </button>
      </div>
    </div>
  </header> -->
 <AppHeader/>
  <RouterView class="" />
  <!-- </div> -->
  <!-- </div> -->
   <AppFooter/>
    
</template>
<style scoped></style>
