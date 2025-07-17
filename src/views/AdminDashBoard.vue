<template>
  <AppModal
    @closeModal="toggleOpenModal"
    :isOpen="isModalOpen"
    :isLoader="false"
  >
    <div
      class="mx-3 bg-white rounded-md flex flex-col w-96 min-h-52 shadow-lg max-h-[70vh] overflow-y-auto modal-container"
    >
      <div
        class="relative py-2 justify-center items-center w-[200px ] border border-gray-300 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:border-[#e4097f]"
      >
        <input
          type="text"
          placeholder="What do you  looking for today?"
          class="pr-3 pl-3 w-full leading-5 placeholder-gray-500 border-none outline-none"
          v-model="searchQuery"
          @input="HandleGlobalSearch"
        />
      </div>

      <div class="flex flex-1 justify-center items-center h-full">
        <div v-if="isSearchLoading">
          <svg
            class="container"
            x="0px"
            viewBox="0 0 37 37"
            height="37"
            width="37"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              class="track"
              fill="none"
              stroke-width="5"
              pathLength="100"
              d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
            ></path>
            <path
              class="car"
              fill="none"
              stroke-width="5"
              pathLength="100"
              d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"
            ></path>
          </svg>
        </div>
        <div v-else>Not Found Result</div>
      </div>
    </div>
  </AppModal>
  <accountHeader @open-search-modal="toggleOpenModal" />
  <div class="pt-2 h-screen">
    <div class="flex h-full">
      <div
        id="desktopSideBar"
        :class="[
          ' shadow-lg   transition-all duration-300 ease-in relative z-[10] hidden sm:block  pt-[60px]',
          isExpanded ? 'w-48' : 'w-16',
        ]"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >




        <nav class="px-2">
          <div class="space-y-2">
            <div
              v-for="(item, index) in filteredMenuItems"
              :key="item.title"
              class="relative font-bold group"
            >
              <RouterLink
                :to="getRouteLink(item)"
                :class="[
                  'flex items-center px-3 py-2 rounded-md transition-all duration-200 relative overflow-hidden',
                  item.active ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : '',
                ]"
                @click="setActiveItem(index)"
              >
                <div
                  class="flex flex-shrink-0 justify-center items-center w-6 h-6"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      'h-4 w-4 group-hover:h-4 group-hover:w-4 transition-colors duration-200',
                      item.active ? 'text-[#db147f] h-5 w-5' : '',
                    ]"
                  />
                </div>
                <div
                  :class="[
                    'ml-3 transition-all duration-300 ease-in-out',
                    isExpanded
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2',
                  ]"
                >
                  <span class="text-sm whitespace-nowrap">{{
                    item.title
                  }}</span>
                </div>
              </RouterLink>

              <div
                v-if="!isExpanded"
                class="absolute top-1/2 left-full z-50 px-2 py-1 ml-2 text-sm text-white whitespace-nowrap bg-gray-900 rounded opacity-0 transition-opacity duration-200 transform -translate-y-1/2 pointer-events-none group-hover:opacity-100"
              >
                {{ item.title }}
                <div
                  class="absolute left-0 top-1/2 border-4 border-transparent transform -translate-x-1 -translate-y-1/2 border-r-gray-900"
                ></div>
              </div>
            </div>
          </div>
        </nav>

        <!-- Desktop User Profile Section with Dropdown -->
        <div class="absolute right-0 bottom-0 left-0 p-2 border-t border-gray-200">
          <div class="relative group">
            <!-- User Profile Button -->
            <button
              @click="toggleUserDropdown"
              class="flex items-center px-3 py-3 w-full text-gray-600 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
            >
              <!-- User Avatar -->
              <div class="flex flex-shrink-0 justify-center items-center w-6 h-6">
                <img
                  :src="userDetail.avatarUrl"
                  alt="Profile"
                  class="w-6 h-6 rounded-full"
                />
              </div>

              <!-- User Info -->
              <div
                :class="[
                  'ml-3 transition-all duration-300 ease-in-out flex-1 text-left',
                  isExpanded
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2',
                ]"
              >
                <div class="text-sm font-medium whitespace-nowrap">
                  {{ userDetail.fullName }}
                </div>
                <div class="text-xs text-gray-500 whitespace-nowrap">
                  {{ userDetail.email }}
                </div>
              </div>

              <!-- Dropdown Arrow (only when expanded) -->
              <svg 
                v-if="isExpanded"
                class="flex-shrink-0 w-4 h-4 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': isUserDropdownOpen }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Desktop User Dropdown Menu -->
            <Transition name="dropdown">
              <div
                v-if="isUserDropdownOpen && isExpanded"
                class="absolute right-0 left-0 bottom-full z-50 py-2 mb-2 bg-white rounded-lg border border-gray-200 shadow-lg"
              >
                <!-- Menu Items -->
                <div class="py-1">
                  <button
                    @click="GotoViewProfile"
                    class="flex items-center px-4 py-2 w-full text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <svg class="mr-3 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mon Profil
                  </button>
                  
                  <button
                    @click="goToDashboard"
                    class="flex items-center px-4 py-2 w-full text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <svg class="mr-3 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                    </svg>
                    Dashboard
                  </button>
                </div>

                <!-- Logout Section -->
                <div class="py-1 border-t border-gray-100">
                  <button
                    @click="handleLogout"
                    class="flex items-center px-4 py-2 w-full text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <svg class="mr-3 w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Se déconnecter
                  </button>
                </div>
              </div>
            </Transition>

            <!-- Profile Tooltip (when collapsed) -->
            <div
              v-if="!isExpanded"
              class="absolute top-1/2 left-full z-50 px-2 py-1 ml-2 text-sm text-white whitespace-nowrap bg-gray-900 rounded opacity-0 transition-opacity duration-200 transform -translate-y-1/2 pointer-events-none group-hover:opacity-100"
            >
              {{ userDetail.fullName }}
              <div
                class="absolute left-0 top-1/2 border-4 border-transparent transform -translate-x-1 -translate-y-1/2 border-r-gray-900"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Le Menu Pour Les Screen Mobile -->
      <div class="p-1 sm:hidden">
        <nav
          class="fixed right-0 bottom-0 left-0 z-40 bg-white border-t border-gray-200 sm:hidden"
        >
          <div class="flex gap-2 justify-around items-center px-2 h-16">
            <RouterLink
              v-for="(item, index) in filteredMobileMenuItems"
              :key="item.title"
              :to="getMobileRouteLink(item)"
              @click="setActiveMobileItem(index)"
              :class="[
                'flex flex-col items-center justify-center rounded-md flex-1 py-2 transition-colors duration-200',
                item.active ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : '',
              ]"
              class="flex flex-1 gap-1 justify-center items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
            >
              <div class="relative">
                <component :is="item.icon" class="w-6 h-5" />
              </div>
            </RouterLink>

            <button
              @click="toggleUserMenu"
              class="flex flex-col flex-1 justify-center items-center py-2 text-gray-400"
            >
              <Menu
                class="w-5 h-6 transition-colors duration-200 group-hover:h-4 group-hover:w-4"
              />
            </button>
          </div>
        </nav>
      </div>

      <!-- Section Du Contenue Principal -->
      <RouterView class="pt-[70px] pb-[100px] sm:pb-0 overflow-auto main-frame">
      </RouterView>

      <AppOvarleyBottom @close-modal="toggleUserMenu" :isOpen="isUserMenuOpen">
        <div class="">
          <div
            class="fixed right-0 bottom-0 left-0 bg-white rounded-t-2xl shadow-xl transition-transform duration-300 ease-out transform"
          >
            <div class="flex justify-center pt-3 pb-2">
              <div class="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            <div class="overflow-y-auto px-4 py-4 max-h-96">

              <!-- Menu Items -->
              <div class="space-y-2">
                <RouterLink
                  v-for="item in filteredOverlayMenuItems"
                  :key="item.title"
                  :to="getOverlayRouteLink(item)"
                  @click="toggleUserMenu"
                  class="flex items-center px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-50"
                >
                  <div class="flex justify-center items-center mr-3 w-8 h-8">
                    <component :is="item.icon" class="w-5 h-5 text-gray-600" />
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{
                    item.title
                  }}</span>
                  <div v-if="item.badge" class="ml-auto">
                    <span
                      class="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#db147f] rounded-full"
                    >
                      {{ item.badge }}
                    </span>
                  </div>
                </RouterLink>
              </div>

              <!-- Mobile User Profile Section -->
              <div class="pt-4 mt-4 border-t border-gray-100">
                <!-- User Info Header -->
                <div class="flex gap-3 items-center p-3 mb-4 bg-gray-50 rounded-lg">
                  <img
                    :src="userDetail.avatarUrl"
                    alt="Profile"
                    class="object-cover w-12 h-12 rounded-full border border-slate-300"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ userDetail.fullName }}</p>
                    <p class="text-xs text-gray-500">{{ userDetail.email }}</p>
                  </div>
                </div>

                <!-- Mobile User Menu Items -->
                <div class="space-y-2">
                  <button
                    @click="GotoViewProfile"
                    class="flex items-center px-4 py-3 w-full text-sm text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
                  >
                    <svg class="mr-3 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Mon Profil
                  </button>
                  
                  <button
                    @click="goToDashboard"
                    class="flex items-center px-4 py-3 w-full text-sm text-gray-700 rounded-lg transition-colors hover:bg-gray-50"
                  >
                    <svg class="mr-3 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                    </svg>
                    Dashboard
                  </button>

                  <!-- Mobile Logout Button -->
                  <button
                    @click="handleLogout"
                    class="flex items-center px-4 py-3 pt-4 mt-4 w-full text-sm text-red-600 rounded-lg border-t border-gray-200 transition-colors hover:bg-red-50"
                  >
                    <svg class="mr-3 w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Se déconnecter
                  </button>
                </div>
              </div>
            </div>

            <div class="h-6 bg-white"></div>
          </div>
        </div>
      </AppOvarleyBottom>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import accountHeader from "@/components/accountDashboard/accountHeader.vue";
import AppModal from "@/components/globales/AppModal.vue";
import AppOvarleyBottom from "@/components/globales/AppOvarleyBottom.vue";
import {
  Menu,
  Home,
  Users,
  FileText,
  FolderClosed,
  Signature,
  BookOpenText,
  BriefcaseBusiness,
  MailQuestionIcon,
  BlindsIcon,
  MailIcon,
  Building2,
  User2Icon,
  Users2Icon,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import CustomSelect from "@/components/globales/CustomSelect.vue";

// État de la sidebar
const isExpanded = ref(false);
const hoverTimeout = ref(null);
const searchQuery = ref("");
const isSearchLoading = ref(false);
const isModalOpen = ref(false);
const isUserMenuOpen = ref(false);
const showCompanyDropdown = ref(false);
const isUserDropdownOpen = ref(false); // Added for desktop user dropdown

const auth = useAuthStore();
const router = useRouter();

const accountType = ref("");
const companyId = ref("");
const userDetail = {
  avatarUrl: auth.user.account.avatarUrl,
  fullName: auth.user.account.firstName + " " + auth.user.account.lastName,
  email: auth.user.email
}

const listComapnies = ref([]);
const activeCompanies = ref(null);

// Computed pour obtenir le nom de la compagnie sélectionnée
const selectedCompanyName = computed(() => {
  if (!activeCompanies.value) return null;
  const company = listComapnies.value.find(
    (c) => c.id === activeCompanies.value
  );
  return company ? company.title : null;
});

// Fonction pour obtenir les initiales d'une compagnie
const getCompanyInitials = (companyName) => {
  if (!companyName) return "?";
  return companyName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

// User dropdown functions
const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};

const GotoViewProfile = () => {
  isUserDropdownOpen.value = false;
  isUserMenuOpen.value = false;
  router.push({ name: "admin_profile_details" });
};

const goToDashboard = () => {
  isUserDropdownOpen.value = false;
  isUserMenuOpen.value = false;
  router.push({ name: "admin_dashboard" });
};

const handleLogout = async () => {
  try {
    await auth.logout();
    isUserDropdownOpen.value = false;
    isUserMenuOpen.value = false;
    router.push({ name: "login" });
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

// Fonction pour sélectionner une compagnie
const selectCompany = (company) => {
  activeCompanies.value = company.id;
  showCompanyDropdown.value = false;
};

// Fonction pour toggle le dropdown des compagnies
const toggleCompanyDropdown = () => {
  showCompanyDropdown.value = !showCompanyDropdown.value;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('#desktopSideBar')) {
    showCompanyDropdown.value = false;
    isUserDropdownOpen.value = false;
  }
};

// Fonction pour sélectionner une compagnie depuis le mobile
const selectCompanyMobile = (company) => {
  activeCompanies.value = company.id;
};

const fetchGuestsForAccount = async () => {
  try {
    const response = await auth.api("GET", "/accounts/guest/list", null, false);

    if (response.success) {
      console.log(response.data);

      if (Array.isArray(response.data)) {
        const companies = response.data.map((guest) => ({
          id: guest.company.slug,
          title: guest.company.activeDetails.name,
        }));

        listComapnies.value.push(...companies);
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

onMounted(() => {
  accountType.value = auth?.user?.account?.accountType;
  console.log(auth.userCompany);
  companyId.value =
    accountType.value === "companies"
      ? auth.userCompany?.companies?.[0]?.slug
      : null;

  // Sélectionner la première compagnie par défaut
  if (listComapnies.value.length > 0) {
    activeCompanies.value = listComapnies.value[0].id;
  }

  // Ajouter l'event listener pour fermer le dropdown
  document.addEventListener("click", handleClickOutside);

  fetchGuestsForAccount();
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Définition des menus de base (admin)
const baseMenuItems = [
  {
    icon: Home,
    title: "Accueil",
    routeName: "admin_dashboard",
    active: true,
    badge: null,
    isCompanie: false,
  },
  {
    icon: Users2Icon,
    title: "Utilisateurs",
    routeName: "admin_users",
    active: false,
    badge: 3,
    isCompanie: false,
  },
  {
    icon: Building2,
    title: "Sociétés",
    routeName: "admin_companies",
    active: false,
    badge: null,
    isCompanie: false,
  }
];

const baseMobileMenuItems = [
  {
    icon: Home,
    title: "Accueil",
    routeName: "admin_dashboard",
    active: true,
    badge: null,
    isCompanie: false,
  },
  {
    icon: Users2Icon,
    title: "Utilisateurs",
    routeName: "admin_users",
    active: false,
    badge: 3,
    isCompanie: false,
  },
  {
    icon: Building2,
    title: "Sociétés",
    routeName: "admin_companies",
    active: false,
    badge: null,
    isCompanie: false,
  }
];

const baseOverlayMenuItems = [
  // Ajouter ici si besoin d'autres menus overlay
];

// Fonction pour générer le lien de route avec les paramètres appropriés
const getRouteLink = (item) => {
  if (item.isGuest && activeCompanies.value) {
    return {
      name: item.routeName,
      params: { companyId: activeCompanies.value },
    };
  }

  if (item.isCompanie && companyId.value) {
    return {
      name: item.routeName,
      params: { companyId: companyId.value },
    };
  }
  return { name: item.routeName };
};

const getMobileRouteLink = (item) => {
  if (item.isGuest && activeCompanies.value) {
    return {
      name: item.routeName,
      params: { companyId: activeCompanies.value },
    };
  }

  if (item.isCompanie && companyId.value) {
    return {
      name: item.routeName,
      params: { companyId: companyId.value },
    };
  }
  return { name: item.routeName };
};

const getOverlayRouteLink = (item) => {
  if (item.isGuest && activeCompanies.value) {
    return {
      name: item.routeName,
      params: { companyId: activeCompanies.value },
    };
  }

  if (item.isCompanie && companyId.value) {
    return {
      name: item.routeName,
      params: { companyId: companyId.value },
    };
  }
  return { name: item.routeName };
};

// Fonction pour vérifier si un menu peut être affiché
const menuCanBeShow = (item) => {
  if (
    item.isCompanie &&
    (accountType.value !== "companies" || !companyId.value)
  ) {
    return false;
  }

  if (item.isGuest && !activeCompanies.value) {
    return false;
  }

  if (item.isGuest && accountType.value === "companies") {
    return false;
  }

  return true;
};

// Computed properties pour filtrer les menus
const filteredMenuItems = computed(() => {
  return baseMenuItems.filter((item) => menuCanBeShow(item));
});

const filteredMobileMenuItems = computed(() => {
  return baseMobileMenuItems.filter((item) => menuCanBeShow(item));
});

const filteredOverlayMenuItems = computed(() => {
  return baseOverlayMenuItems.filter((item) => menuCanBeShow(item));
});

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
    showCompanyDropdown.value = false;
    isUserDropdownOpen.value = false;
  });
};

const setActiveItem = (index) => {
  const filteredItems = filteredMenuItems.value;
  baseMenuItems.forEach((item, i) => {
    item.active = false;
  });

  if (filteredItems[index]) {
    const originalIndex = baseMenuItems.findIndex(
      (item) => item.title === filteredItems[index].title
    );
    if (originalIndex !== -1) {
      baseMenuItems[originalIndex].active = true;
    }
  }
};

const setActiveMobileItem = (index) => {
  const filteredItems = filteredMobileMenuItems.value;
  baseMobileMenuItems.forEach((item, i) => {
    item.active = false;
  });

  if (filteredItems[index]) {
    const originalIndex = baseMobileMenuItems.findIndex(
      (item) => item.title === filteredItems[index].title
    );
    if (originalIndex !== -1) {
      baseMobileMenuItems[originalIndex].active = true;
    }
  }
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
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

/* Dropdown animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  transform-origin: bottom left;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
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

.main-frame,
.modal-container {
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
