

<template>
  <header class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 py-3 py-4 bg-white border-b border-gray-200 bg-opacity-90 backdrop-blur-sm">
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
        <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium transition-colors">
          Rechercher
        </a>
        <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium flex items-center transition-colors">
          Emplois
          <span class="ml-1 bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full">Nouveau!</span>
        </a>
        <a href="#" class="text-gray-700 hover:text-[#e4097f] text-sm font-medium transition-colors">
          À propos de nous
        </a>
      </nav>

      <div class="items-center hidden space-x-4 md:flex">
        <button v-if="!isAuthentified" class="bg-[#00a3e0] hover:bg-[#0090c7] text-white text-sm font-medium px-4 py-2 rounded transition-colors">
          Votre compte - C'est gratuit
        </button>
        <button v-if="!isAuthentified" class="bg-[#e4097f] hover:bg-[#c8076f] text-white text-sm font-medium px-4 py-2 rounded transition-colors">
          Se connecter
        </button>
        
        <a href="#" v-if="isAuthentified" class="text-gray-600 hover:text-[#e4097f] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </a>
      </div>

      <button 
        @click="toggleMobileMenu" 
        class="flex items-center justify-center w-8 h-8 text-gray-700 md:hidden hover:text-[#e4097f] transition-colors"
        aria-label="Basculer le menu mobile"
      >
        <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

   
      <div v-if="isMobileMenuOpen" class="bg-white border-t border-gray-200 shadow-lg md:hidden">
        <h1 class="text-4xl">
          Hello les chiens
        </h1>
        <div class="container px-4 py-4 mx-auto space-y-4">
          <nav class="space-y-3">
            <a 
              href="#" 
              @click="closeMobileMenu"
              class="block text-gray-700 hover:text-[#e4097f] text-sm font-medium py-2 transition-colors"
            >
              Rechercher
            </a>
            <a 
              href="#" 
              @click="closeMobileMenu"
              class="block text-gray-700 hover:text-[#e4097f] text-sm font-medium py-2 transition-colors"
            >
              <div class="flex items-center">
                Emplois
                <span class="ml-2 bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full">Nouveau!</span>
              </div>
            </a>
            <a 
              href="#" 
              @click="closeMobileMenu"
              class="block text-gray-700 hover:text-[#e4097f] text-sm font-medium py-2 transition-colors"
            >
              À propos de nous
            </a>
          </nav>

          <div class="pt-4 border-t border-gray-100">
            <div v-if="!isAuthentified" class="space-y-3">
              <button 
                @click="closeMobileMenu"
                class="w-full bg-[#00a3e0] hover:bg-[#0090c7] text-white text-sm font-medium px-4 py-3 rounded transition-colors"
              >
                Votre compte - C'est gratuit
              </button>
              <button 
                @click="closeMobileMenu"
                class="w-full bg-[#e4097f] hover:bg-[#c8076f] text-white text-sm font-medium px-4 py-3 rounded transition-colors"
              >
                Se connecter
              </button>
            </div>
            
            <div v-if="isAuthentified" class="flex items-center justify-center">
              <a 
                href="#" 
                @click="closeMobileMenu"
                class="flex items-center space-x-2 text-gray-600 hover:text-[#e4097f] transition-colors py-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="text-sm font-medium">Profil</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen" 
        @click="closeMobileMenu"
        class="fixed inset-0 z-40 bg-black bg-opacity-25 md:hidden"
      ></div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isAuthentified = ref(false)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

</script>

<style scoped>
.md\:hidden {
  position: relative;
  z-index: 50;
}

* {
  transition: all 0.2s ease;
}

button:focus,
a:focus {
  outline: 2px solid #e4097f;
  outline-offset: 2px;
}

body.menu-open {
  overflow: hidden;
}
</style>