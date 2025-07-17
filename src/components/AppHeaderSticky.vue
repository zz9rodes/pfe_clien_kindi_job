<template>
  <AppModal
    @closeModal="toggleOpenModal"
    :isOpen="isModalOpen"
    :isLoader="false"
  >
    <sendRegistrationEmail @close="toggleOpenModal()" />
  </AppModal>
  
  <header
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white bg-opacity-90 backdrop-blur-sm"
  >
    <div class="container flex items-center justify-between px-4 mx-auto">
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <div class="relative">
            <span
              class="text-[#e4097f] font-bold text-2xl tracking-tight font-nunito"
              >KINDI🎁</span
            >
            <div class="inline-flex items-center">
              <span
                class="text-[#00a3e0] font-nunito font-bold text-2xl tracking-tight"
                >JOB
              </span>
              <div
                class="absolute -top-1 right-0 w-3 h-3 bg-[#00a3e0] rounded-full"
              ></div>
            </div>
          </div>
        </a>
      </div>

      <nav class="items-center hidden space-x-6 md:flex">
        <router-link
          :to="{ name: 'companies' }"
          class="text-gray-700 hover:text-[#e4097f] text-sm font-medium transition-colors"
        >
          Entreprises
        </router-link>
        <router-link
          :to="{ name: 'jobs' }"
          class="text-gray-700 hover:text-[#e4097f] text-sm font-medium flex items-center transition-colors"
        >
          Emplois
          <span
            class="ml-1 bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full"
            >Nouveau!</span
          >
        </router-link>
        <router-link
          :to="{ name: 'freelancers' }"
          href="#"
          class="text-gray-700 hover:text-[#e4097f] text-sm font-medium transition-colors"
        >
          Talents
        </router-link>
      </nav>

      <div class="items-center hidden space-x-4 md:flex">
        <button
          v-if="!isAuthentified"
          @click="toggleOpenModal"
          class="bg-[#00a3e0] hover:bg-[#0090c7] text-white text-sm font-medium px-4 py-2 rounded transition-colors"
        >
          Votre compte - C'est gratuit
        </button>
        <button
          v-if="!isAuthentified"
          class="bg-[#e4097f] hover:bg-[#c8076f] text-white text-sm font-medium rounded transition-colors"
        >
          <router-link
            :to="{ name: 'login' }"
            class="flex items-center w-full h-full gap-1 px-4 py-2"
          >
            Se connecter
          </router-link>
        </button>

        <div v-if="isAuthentified" class="relative">
          <button
            @click="toggleUserDropdown"
            class="flex items-center gap-3 p-1 transition-colors rounded-lg hover:bg-gray-50"
          >
            <img
              class="h-[40px] w-[40px] rounded-full border border-slate-300 object-cover"
              :src="userDetail.avatarUrl"
              :alt="userDetail.fullNamde"
            />
            <div class="hidden text-left lg:block">
              <p class="text-sm font-medium text-gray-900">{{ userDetail.fullNamde }}</p>
              <p class="text-xs text-gray-500">{{ userDetail.email }}</p>
            </div>
            <svg 
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': isUserDropdownOpen }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Desktop Dropdown Menu -->
          <Transition name="dropdown">
            <div
              v-if="isUserDropdownOpen"
              class="absolute right-0 z-50 w-64 py-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <!-- User Info Header -->
              <div class="px-4 py-3 border-b border-gray-100">
                <div class="flex items-center gap-3">
                  <img
                    class="object-cover w-10 h-10 border rounded-full border-slate-300"
                    :src="userDetail.avatarUrl"
                    :alt="userDetail.fullNamde"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ userDetail.fullNamde }}</p>
                    <p class="text-xs text-gray-500">{{ userDetail.email }}</p>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <div class="py-1" >
                <button
                  @click="GotoViewProfile"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mon Profil
                </button>
                
                <button
                  @click="goToDashboard"
                  class="flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                  </svg>
                  Tableau de bord
                </button>

               
              </div>

              <!-- Logout Section -->
              <div  class="py-1 border-t border-gray-100">
                <button
                  @click="handleLogout"
                  class="flex items-center w-full px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <svg class="w-4 h-4 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Se déconnecter
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <button
      @click="toggleMobileMenu"
      class="text-gray-600 transition-colors md:hidden hover:text-[#e4097f]"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          v-if="!isMobileMenuOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </header>

  <!-- Mobile Menu -->
  <Transition name="fade">
    <div
      v-if="isMobileMenuOpen"
      @click.self="toggleMobileMenu"
      class="fixed inset-0 z-40 pt-12 md:hidden bg-bacdrop_modal bg-opacity-90 backdrop-blur-sm"
    >
      <div class="px-8 py-4 space-y-4 bg-white">
        <nav class="space-y-3">
          <router-link
            @click="toggleMobileMenu"
            :to="{ name: 'companies' }"
            class="block text-gray-700 hover:text-[#e4097f] text-sm font-medium py-2 transition-colors"
          >
            Entreprises
          </router-link>
          <router-link
            @click="toggleMobileMenu"
            :to="{ name: 'jobs' }"
            class="text-gray-700 hover:text-[#e4097f] text-sm font-medium flex items-center transition-colors"
          >
            Emplois
            <span
              class="ml-1 bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full"
              >Nouveau!</span
            >
          </router-link>
          <router-link
            @click="toggleMobileMenu"
            :to="{ name: 'freelancers' }"
            href="#"
            class="block text-gray-700 hover:text-[#e4097f] text-sm font-medium py-2 transition-colors"
          >
            Talents
          </router-link>
        </nav>

        <div class="pt-4 border-t border-gray-100">
          <div v-if="!isAuthentified" class="space-y-3">
            <button
              @click="toggleOpenModal"
              class="w-full bg-[#00a3e0] hover:bg-[#0090c7] text-white text-sm font-medium px-4 py-2 rounded transition-colors"
            >
              Votre compte - C'est gratuit
            </button>
            <button
              @click="closeMobileMenu"
              class="w-full bg-[#e4097f] hover:bg-[#c8076f] text-white text-sm font-medium rounded transition-colors"
            >
              <router-link
                :to="{ name: 'login' }"
                class="flex items-center justify-center h-full min-w-full gap-1 px-4 py-2"
              >
                Se connecter
              </router-link>
            </button>
          </div>

          <!-- Mobile User Section -->
          <div v-if="isAuthentified" class="space-y-4">
            <!-- User Info -->
            <div class="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <img
                class="object-cover w-12 h-12 border rounded-full border-slate-300"
                :src="userDetail.avatarUrl"
                :alt="userDetail.fullNamde"
              />
              <div>
                <p class="text-sm font-medium text-gray-900">{{ userDetail.fullNamde }}</p>
                <p class="text-xs text-gray-500">{{ userDetail.email }}</p>
              </div>
            </div>

            <!-- Mobile Menu Items -->
            <div class="space-y-2">
              <button
                @click="GotoViewProfile"
                class="flex items-center w-full px-4 py-3 text-sm text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
              >
                <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mon Profil
              </button>
              
              <button
                @click="goToDashboard"
                class="flex items-center w-full px-4 py-3 text-sm text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
              >
                <svg class="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                </svg>
                Tableau de bord
              </button>



              <!-- Mobile Logout Button -->
              <button
                @click="handleLogout"
                class="flex items-center w-full px-4 py-3 pt-4 mt-4 text-sm text-red-600 transition-colors border-t border-gray-200 rounded-lg hover:bg-red-50"
              >
                <svg class="w-5 h-5 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import router from "@/router";
import AppModal from "./globales/AppModal.vue";
import sendRegistrationEmail from "./authFom/sendRegistrationEmail.vue";
import { useAuthStore } from "@/stores/auth";

const isMobileMenuOpen = ref(false);
const isModalOpen = ref(false);
const isUserDropdownOpen = ref(false);
const auth = useAuthStore();

const userDetail = ref({
  email: auth.user?.email || '',
  avatarUrl: auth.user?.account?.avatarUrl || '/default-avatar.png',
  fullNamde: (auth.user?.account?.firstName || '') + " " + (auth.user?.account?.lastName || ''),
});

const isAuthentified = auth.isAuthentificated();

const GotoViewProfile = () => {
  isUserDropdownOpen.value = false;
  isMobileMenuOpen.value = false;
  if(auth.user.account.accountType=='companies'){
      router.push({ name: "profile_companies" });

      return
  }
  else{
      router.push({ name: "profile" });
      return
  }
};

const goToDashboard = () => {
  isUserDropdownOpen.value = false;
  isMobileMenuOpen.value = false;
  router.push({ name: "home" });
  if(auth.user.isAdmin){
    router.push({name:'admin_dashboard'})
    return
  }
  
  if(auth.user.account.accountType=='companies'){
      router.push({ name: "profile_companies" });

      return
  }
  else{
      router.push({ name: "user_dashboard" });
      return
  }
};

const goToSettings = () => {
  isUserDropdownOpen.value = false;
  isMobileMenuOpen.value = false;
  router.push({ name: "settings" });
};

const handleLogout = async () => {
  try {
    await auth.logout();
    isUserDropdownOpen.value = false;
    isMobileMenuOpen.value = false;
    router.push({ name: "login" });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

const toggleOpenModal = () => {
  isMobileMenuOpen.value = false;
  isModalOpen.value = !isModalOpen.value;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  isUserDropdownOpen.value = false;
};

const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isUserDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  transform-origin: top right;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}
</style>