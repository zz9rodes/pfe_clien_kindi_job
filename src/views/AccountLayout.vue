<template>
  <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
    <div
      class="bg-white mx-3 rounded-md flex flex-col w-96 min-h-52 shadow-lg max-h-[70vh] overflow-y-auto modal-container">
      <div
        class="relative py-2 justify-center items-center w-[200px ] border border-gray-300 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:border-[#e4097f]">
        <input type="text" placeholder="What do you  looking for today?"
          class="w-full pl-3 pr-3 leading-5 placeholder-gray-500 border-none outline-none" v-model="searchQuery"
          @input="HandleGlobalSearch" />
      </div>

      <div class="flex items-center justify-center flex-1 h-full">
        <div v-if="isSearchLoading">
          <svg class="container" x="0px" y="0px" viewBox="0 0 37 37" height="37" width="37"
            preserveAspectRatio="xMidYMid meet">
            <path class="track" fill="none" stroke-width="5" pathLength="100"
              d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5">
            </path>
            <path class="car" fill="none" stroke-width="5" pathLength="100"
              d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5">
            </path>
          </svg>
        </div>
        <div v-else>Not Found Result</div>
      </div>
    </div>
  </AppModal>
  <accountHeader @open-search-modal="toggleOpenModal" />
  <div class="h-screen">
    <div class="flex h-full">
      <div id="desktopSideBar" :class="[
        ' shadow-lg   transition-all duration-300 ease-in relative z-[10] hidden sm:block  pt-[60px]',
        isExpanded ? 'w-48' : 'w-16',
      ]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <nav class="px-2 mt-3">
          <div class="space-y-2">
            <div v-for="(item, index) in menuItems" :key="item.title" class="relative font-bold group">
              <a :href="item.link" :class="[
                'flex items-center px-3 py-2 rounded-md transition-all duration-200 relative overflow-hidden',
                item.active ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : '',
              ]" @click="setActiveItem(index)">
                <div class="flex items-center justify-center flex-shrink-0 w-6 h-6">
                  <component :is="item.icon" :class="[
                    'h-4 w-4 group-hover:h-4 group-hover:w-4 transition-colors duration-200',
                    item.active ? 'text-[#db147f] h-5 w-5' : '',
                  ]" />
                </div>
                <div :class="[
                  'ml-3 transition-all duration-300 ease-in-out',
                  isExpanded
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2',
                ]">
                  <span class="text-sm whitespace-nowrap">
                    {{ item.title }}
                  </span>
                </div>
              </a>

              <div v-if="!isExpanded"
                class="absolute z-50 px-2 py-1 ml-2 text-sm text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-900 rounded opacity-0 pointer-events-none left-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
                {{ item.title }}
                <div
                  class="absolute left-0 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent top-1/2 border-r-gray-900">
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div class="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-200">
          <div class="relative group">
            <router-link :to="{ name: 'profile' }"
              class="flex items-center px-3 py-3 text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-50 hover:text-gray-900">
              <!-- User Avatar -->
              <div class="flex items-center justify-center flex-shrink-0 w-6 h-6">
                <img src="/src/assets/logo.svg" alt="Profile" class="w-6 h-6 rounded-full" />
              </div>

              <!-- User Info -->
              <div :class="[
                'ml-3 transition-all duration-300 ease-in-out',
                isExpanded
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2',
              ]">
                <div class="text-sm font-medium whitespace-nowrap">
                  John Doe
                </div>
              </div>
            </router-link>

            <!-- Profile Tooltip -->
            <div v-if="!isExpanded"
              class="absolute z-50 px-2 py-1 ml-2 text-sm text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-900 rounded opacity-0 pointer-events-none left-full top-1/2 group-hover:opacity-100 whitespace-nowrap">
              Profile
              <div
                class="absolute left-0 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent top-1/2 border-r-gray-900">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Le Menu Pour Les  Screen  Mobile  -->
      <div class="p-1 sm:hidden">
        <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 sm:hidden">
          <div class="flex items-center justify-around h-16 gap-2 px-2">
            <button v-for="(item, index) in MoibilemenuItems" :key="item.title" @click="setActiveMobileItem(index)"
              :class="[
                'flex flex-col items-center   justify-center rounded-md flex-1 py-2 transition-colors duration-200',
                item.active ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : '',
              ]"
              class="flex items-center justify-center flex-1 gap-1 px-2 py-2 text-sm font-medium rounded-md cursor-pointer">
              <div class="relative">
                <component :is="item.icon" class="w-6 h-5" />
              </div>
            </button>

            <button @click="toggleUserMenu" class="flex flex-col items-center justify-center flex-1 py-2 text-gray-400">
              <Menu class="w-5 h-6 transition-colors duration-200 group-hover:h-4 group-hover:w-4" />
            </button>
          </div>
        </nav>
      </div>

      <!-- Section Du Contenue Principal -->
      <RouterView class="pt-[70px] pb-[100px] sm:pb-0  overflow-auto main-frame ">
      </RouterView>

      <AppOvarleyBottom @close-modal="toggleUserMenu" :isOpen="isUserMenuOpen">
        <div class="">
          <div
            class="fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-out transform bg-white shadow-xl rounded-t-2xl">
            <div class="flex justify-center pt-3 pb-2">
              <div class="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            <div class="px-4 py-4 overflow-y-auto max-h-96">
              <div class="space-y-2">
                <a v-for="item in OvarleyMenuItems" :key="item.title" :href="item.link" @click="toggleUserMenu"
                  class="flex items-center px-4 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50">
                  <div class="flex items-center justify-center w-8 h-8 mr-3">
                    <component :is="item.icon" class="w-5 h-5 text-gray-600" />
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{
                    item.title
                  }}</span>
                  <div v-if="item.badge" class="ml-auto">
                    <span
                      class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#db147f] rounded-full">
                      {{ item.badge }}
                    </span>
                  </div>
                </a>
              </div>
              <a href="/profile" @click="toggleUserMenu"
                class="flex items-center px-4 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50">
                <div class="flex items-center justify-center w-8 h-8 mr-3">
                  <img src="/src/assets/logo.svg" alt="Profile" class="w-6 h-6 rounded-full" />
                </div>
                <span class="text-sm font-medium text-gray-900">Profile</span>
              </a>
            </div>

            <div class="h-6 bg-white"></div>
          </div>
        </div>
      </AppOvarleyBottom>
      <!-- Modal Mobile Menu -->
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";
import accountHeader from "@/components/accountDashboard/accountHeader.vue";
import AppModal from "@/components/globales/AppModal.vue";
import AppOvarleyBottom from "@/components/globales/AppOvarleyBottom.vue";
import {
  Menu,
  Home,
  Heart,
  Calendar,
  MessageCircleMore,
  BarChart3,
  Users,
  FileText,
} from "lucide-vue-next";

// État de la sidebar
const isExpanded = ref(false);
const hoverTimeout = ref(null);
const searchQuery = ref("");
const isSearchLoading = ref(false);
const isModalOpen = ref(false);

const isUserMenuOpen = ref(false);

const toggleUserMenu = () => {
  console.log(isUserMenuOpen.value);
  isUserMenuOpen.value = !isUserMenuOpen.value;
};
// Menu items
const menuItems = ref([
  {
    icon: Home,
    title: "Dashboard",
    link: "#",
    active: true,
    badge: null,
  },
  {
    icon: Heart,
    title: "Contracts",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: Calendar,
    title: "Jobs",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: MessageCircleMore,
    title: "Applies",
    link: "#",
    active: false,
    badge: 3,
  },
  {
    icon: Users,
    title: "Projects",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: BarChart3,
    title: "Invoices",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: FileText,
    title: "Reviews",
    link: "#",
    active: false,
    badge: null,
  },
]);

const MoibilemenuItems = ref([
  {
    icon: Home,
    title: "Dashboard",
    link: "#",
    active: true,
    badge: null,
  },
  {
    icon: MessageCircleMore,
    title: "Applies",
    link: "#",
    active: false,
    badge: 3,
  },
  {
    icon: BarChart3,
    title: "Invoices",
    link: "#",
    active: false,
    badge: null,
  },
]);

const OvarleyMenuItems = [
  {
    icon: Heart,
    title: "Contracts",
    link: "#",
    active: false,
    badge: null,
  },
  {
    icon: Calendar,
    title: "Jobs",
    link: "#",
    active: false,
    badge: null,
  },

  {
    icon: Users,
    title: "Projects",
    link: "#",
    active: false,
    badge: null,
  },

  {
    icon: FileText,
    title: "Reviews",
    link: "#",
    active: false,
    badge: null,
  },
];

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const HandleGlobalSearch = () => {
  if (searchQuery.value.length > 2) {
    isSearchLoading.value = true;
    setTimeout(() => {
      isSearchLoading.value = false;
    }, 3000);
  }
};

const handleMouseEnter = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }
  hoverTimeout.value = setTimeout(() => {
    if (!isExpanded.value) {
      isExpanded.value = true;
    }
  });
};

const handleMouseLeave = () => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value);
  }
  hoverTimeout.value = setTimeout(() => {
    isExpanded.value = false;
  });
};

const setActiveItem = (index) => {
  menuItems.value.forEach((item, i) => {
    item.active = i === index;
  });
};

const setActiveMobileItem = (index) => {
  MoibilemenuItems.value.forEach((item, i) => {
    item.active = i === index;
  });
};
</script>

<style scoped>
/* Animations personnalisées */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Smooth transitions pour tous les éléments */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

<style scoped>
.container {
  --uib-size: 37px;
  --uib-color: black;
  --uib-speed: 0.9s;
  --uib-bg-opacity: 0.1;
  height: var(--uib-size);
  width: var(--uib-size);
  transform-origin: center;
  overflow: visible;
}

.car {
  fill: none;
  stroke: var(--uib-color);
  stroke-dasharray: 15, 85;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: travel var(--uib-speed) linear infinite;
  will-change: stroke-dasharray, stroke-dashoffset;
  transition: stroke 0.5s ease;
}

.track {
  stroke: var(--uib-color);
  opacity: var(--uib-bg-opacity);
  transition: stroke 0.5s ease;
}

@keyframes travel {
  0% {
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dashoffset: -100;
  }
}




/*  */




.main-frame {
  --sb-track-color: #ffffff;
  --sb-thumb-color: #ffffff;
  --sb-size: 9px;
}

.main-frame::-webkit-scrollbar {
  width: var(--sb-size);
  display: none;
}

.main-frame::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 3px;
}

.main-frame::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;

}

@supports not selector(::-webkit-scrollbar) {
  .main-frame {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}
</style>
