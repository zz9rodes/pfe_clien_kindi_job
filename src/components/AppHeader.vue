<template>
    <header class="w-full py-3 border-b border-gray-200">
      <div class="container flex items-center justify-between px-4 mx-auto">
        <div class="flex items-center">
          <a href="/" class="flex items-center">
            <div class="relative">
              <span class="text-[#e4097f] font-bold text-2xl tracking-tight font-nunito">KINDI🎁</span>
              <div class="inline-flex items-center">
                <span class="text-[#00a3e0] font-nunito font-bold text-2xl tracking-tight">JOB </span>
                <div class="absolute -top-1 right-0 w-3 h-3 bg-[#00a3e0] rounded-full"></div>
              </div>
            </div>
          </a>
        </div>

        <nav class="items-center hidden space-x-6 md:flex">
          <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium">
            Search
          </a>
          <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium flex items-center">
            Jobs
            <span class="ml-1 bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full">New!</span>
          </a>
       
          
          <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium">
            About Us
          </a>
        </nav>

         <div class="flex items-center space-x-4">
          
          <button v-if="!isAuthentified" class="bg-[#00a3e0] hover:bg-[#0090c7] text-white text-sm font-medium px-4 py-2 rounded">
            Your Account - It's Free
          </button>
          <button  v-if="!isAuthentified" class="bg-[#e4097f] hover:bg-[#c8076f] text-white text-sm font-medium px-4 py-2 rounded">
            Log In
          </button>

            <a href="#"  v-if="isAuthentified" class="text-gray-600 hover:text-[#e4097f]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </a>
        </div>
      </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';

const isAuthentified=ref(false)
</script>