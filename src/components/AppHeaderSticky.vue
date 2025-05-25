<template>
  <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
    <sendRegistrationEmail @close="toggleOpenModal" />
  </AppModal>
  <header
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white bg-opacity-90 backdrop-blur-sm">
    <div class="container flex items-center justify-between px-4 mx-auto">
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <div class="relative">
            <span class="text-[#e4097f] font-bold text-2xl tracking-tight font-nunito">KINDI🎁</span>
            <div class="inline-flex items-center">
              <span class="text-[#00a3e0] font-nunito font-bold text-2xl tracking-tight">JOB
              </span>
              <div class="absolute -top-1 right-0 w-3 h-3 bg-[#00a3e0] rounded-full"></div>
            </div>
          </div>
        </a>
      </div>

      <nav class="items-center hidden space-x-6 md:flex">
        <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium transition-colors">
          Search
        </a>
        <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium flex items-center transition-colors">
          Jobs
          <span class="ml-1 bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full">New!</span>
        </a>
        <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium transition-colors">
          About Us
        </a>
      </nav>

      <div class="items-center hidden space-x-4 md:flex">
        <button v-if="!isAuthentified" @click="toggleOpenModal"
          class="bg-[#00a3e0] hover:bg-[#0090c7] text-white text-sm font-medium px-4 py-2 rounded transition-colors">
          Your Account - It's Free
        </button>
        <button v-if="!isAuthentified"
          class="bg-[#e4097f] hover:bg-[#c8076f] text-white text-sm font-medium rounded transition-colors">
          <router-link :to="{ name: 'login' }" class="flex items-center w-full h-full gap-1 px-4 py-2">
            Log In
          </router-link>
        </button>

        <a href="#" v-if="isAuthentified" class="text-gray-600 hover:text-[#e4097f] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>
      </div>
    </div>

    <button @click="toggleMobileMenu" class="text-gray-600 transition-colors md:hidden hover:text-[#e4097f]">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </header>

  <Transition name="fade">
    <div v-if="isMobileMenuOpen" @click.self="toggleMobileMenu"
      class="fixed inset-0 z-40 pt-12 md:hidden bg-bacdrop_modal bg-opacity-90 backdrop-blur-sm">
      <div class="px-8 py-4 space-y-4 bg-white">
        <nav class="space-y-3">
          <a href="#" @click="closeMobileMenu"
            class="block text-gray-700 hover:text-[#e4097f] text-sm font-medium py-2 transition-colors">
            Search
          </a>
          <a href="#" @click="closeMobileMenu"
            class="block text-gray-700 hover:text-[#e4097f] text-sm font-medium py-2 transition-colors">
            <div class="flex items-center">
              Jobs
              <span class="ml-2 bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full">New!</span>
            </div>
          </a>
          <a href="#" @click="closeMobileMenu"
            class="block text-gray-700 hover:text-[#e4097f] text-sm font-medium py-2 transition-colors">
            About Us
          </a>
        </nav>

        <div class="pt-4 border-t border-gray-100">
          <div v-if="!isAuthentified" class="space-y-3">
            <button @click="toggleOpenModal"
              class="w-full bg-[#00a3e0] hover:bg-[#0090c7] text-white text-sm font-medium px-4 py-2 rounded transition-colors">
              Your Account - It's Free
            </button>
            <button @click="closeMobileMenu"
              class="w-full bg-[#e4097f] hover:bg-[#c8076f] text-white text-sm font-medium  rounded transition-colors">
              <router-link :to="{ name: 'login' }"
                class="flex items-center justify-center h-full min-w-full gap-1 px-4 py-2">
                Log In
              </router-link>
            </button>
          </div>

          <div v-if="isAuthentified" class="flex items-center justify-center">
            <a href="#" @click="closeMobileMenu"
              class="flex items-center space-x-2 text-gray-600 hover:text-[#e4097f] transition-colors py-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span class="text-sm font-medium">Profile</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import router from "@/router";
import AppModal from "./globales/AppModal.vue";
import sendRegistrationEmail from "./authFom/sendRegistrationEmail.vue";

const isMobileMenuOpen = ref(false);
const isModalOpen = ref(false);

const toggleOpenModal = () => {
  isMobileMenuOpen.value = false
  isModalOpen.value = !isModalOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>
