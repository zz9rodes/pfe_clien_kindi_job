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
          class="w-full pl-3 pr-3 leading-5 placeholder-gray-500 border-none outline-none"
          v-model="searchQuery"
          @input="HandleGlobalSearch"
        />
      </div>

      <div class="flex items-center justify-center flex-1 h-full">
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
  <div class="h-screen">
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
        <!-- Company Selector Section -->
        <div class="px-2 mt-1">
          <!-- Expanded State - Full Dropdown -->
          <div 
            v-if="isExpanded" 
            class="transition-all duration-300 ease-in-out opacity-100"
          >
            <CustomSelect
              v-model="activeCompanies"
              :options="listComapnies"
              option-label="title"
              option-value="id"
              placeholder="Select Company"
              :disabled="false"
              :searchable="false"
              :clearable="false"
              class="w-full"
            />
            <!-- {{ activeCompanies }} -->
          </div>

          <!-- Collapsed State - Company Avatar/Icon -->
          <div 
            v-else 
            class="relative transition-all duration-300 ease-in-out group"
          >
            <div 
              class="flex items-center justify-center w-12 h-12 mx-auto bg-gradient-to-br from-[#db147f] to-[#e4097f] rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-200"
              @click="toggleCompanyDropdown"
            >
              <span class="text-lg font-bold text-white">
                {{ getCompanyInitials(selectedCompanyName) }}
              </span>
            </div>

            <!-- Tooltip for collapsed state -->
            <div
              class="absolute z-50 px-3 py-2 ml-2 text-sm text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-900 rounded-lg shadow-lg opacity-0 pointer-events-none left-full top-1/2 group-hover:opacity-100 whitespace-nowrap"
            >
              {{ selectedCompanyName || 'Select Company' }}
              <div
                class="absolute left-0 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent top-1/2 border-r-gray-900"
              ></div>
            </div>

            <!-- Dropdown for collapsed state -->
            <div
              v-if="showCompanyDropdown"
              class="absolute left-full top-0 ml-2 z-50 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[200px] py-2"
            >
              <div class="px-3 py-2 border-b border-gray-100">
                <span class="text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Select Company
                </span>
              </div>
              <div class="overflow-y-auto max-h-60">
                <div
                  v-for="company in listComapnies"
                  :key="company.id"
                  @click="selectCompany(company)"
                  class="flex items-center px-3 py-2 transition-colors duration-150 cursor-pointer hover:bg-gray-50"
                >
                  <div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#db147f] to-[#e4097f] rounded-md mr-3">
                    <span class="text-sm font-medium text-white">
                      {{ getCompanyInitials(company.title) }}
                    </span>
                  </div>
                  <span class="text-sm font-medium text-gray-900">
                    {{ company.title }}
                  </span>
                  <div 
                    v-if="activeCompanies === company.slug"
                    class="ml-auto w-2 h-2 bg-[#db147f] rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Separator -->
        <div class="mx-2 mb-3"></div>

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
                <div class="flex items-center justify-center flex-shrink-0 w-6 h-6">
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
                    isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2',
                  ]"
                >
                  <span class="text-sm whitespace-nowrap">{{ item.title }}</span>
                </div>
              </RouterLink>

              <div
                v-if="!isExpanded"
                class="absolute z-50 px-2 py-1 ml-2 text-sm text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-900 rounded opacity-0 pointer-events-none left-full top-1/2 group-hover:opacity-100 whitespace-nowrap"
              >
                {{ item.title }}
                <div
                  class="absolute left-0 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent top-1/2 border-r-gray-900"
                ></div>
              </div>
            </div>
          </div>
        </nav>
        <div
          class="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-200"
        >
          <div class="relative group">
            <router-link
              :to="{ name: 'profile' }"
              class="flex items-center px-3 py-3 text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-50 hover:text-gray-900"
            >
              <!-- User Avatar -->
              <div
                class="flex items-center justify-center flex-shrink-0 w-6 h-6"
              >
                <img
                  src="/src/assets/logo.svg"
                  alt="Profile"
                  class="w-6 h-6 rounded-full"
                />
              </div>

              <!-- User Info -->
              <div
                :class="[
                  'ml-3 transition-all duration-300 ease-in-out',
                  isExpanded
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2',
                ]"
              >
                <div class="text-sm font-medium whitespace-nowrap">
                  John Doe
                </div>
              </div>
            </router-link>

            <!-- Profile Tooltip -->
            <div
              v-if="!isExpanded"
              class="absolute z-50 px-2 py-1 ml-2 text-sm text-white transition-opacity duration-200 transform -translate-y-1/2 bg-gray-900 rounded opacity-0 pointer-events-none left-full top-1/2 group-hover:opacity-100 whitespace-nowrap"
            >
              Profile
              <div
                class="absolute left-0 transform -translate-x-1 -translate-y-1/2 border-4 border-transparent top-1/2 border-r-gray-900"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Le Menu Pour Les Screen Mobile -->
      <div class="p-1 sm:hidden">
        <nav
          class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 sm:hidden"
        >
          <div class="flex items-center justify-around h-16 gap-2 px-2">
            <RouterLink
              v-for="(item, index) in filteredMobileMenuItems"
              :key="item.title"
              :to="getMobileRouteLink(item)"
              @click="setActiveMobileItem(index)"
              :class="[
                'flex flex-col items-center justify-center rounded-md flex-1 py-2 transition-colors duration-200',
                item.active ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : '',
              ]"
              class="flex items-center justify-center flex-1 gap-1 px-2 py-2 text-sm font-medium rounded-md cursor-pointer"
            >
              <div class="relative">
                <component :is="item.icon" class="w-6 h-5" />
              </div>
            </RouterLink>

            <button
              @click="toggleUserMenu"
              class="flex flex-col items-center justify-center flex-1 py-2 text-gray-400"
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
            class="fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-out transform bg-white shadow-xl rounded-t-2xl"
          >
            <div class="flex justify-center pt-3 pb-2">
              <div class="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            <div class="px-4 py-4 overflow-y-auto max-h-96">
              <!-- Company Selector Section for Mobile -->
              <div class="pb-4 mb-6 border-b border-gray-100">
                <!-- <div class="mb-3">
                  <span class="text-xs font-medium tracking-wide text-gray-500 uppercase">
                    Company
                  </span>
                </div> -->
                
                <!-- Current Selected Company Display -->
                <div class="mb-3">
                  <div class="flex items-center p-3 bg-gradient-to-r from-[#db147f] to-[#e4097f] rounded-lg shadow-sm">
                    <div class="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-lg bg-opacity-20">
                      <span class="text-lg font-bold text-white">
                        {{ getCompanyInitials(selectedCompanyName) }}
                      </span>
                    </div>
                    <div class="flex-1">
                      <span class="font-medium text-white">
                        {{ selectedCompanyName || 'No Company Selected' }}
                      </span>
                      <div class="text-xs text-white text-opacity-80">
                        Current active company
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Company Selection List -->
                <div class="space-y-2">
                  <div class="mb-2 text-sm font-medium text-gray-700">
                    Switch Company:
                  </div>
                  <div class="grid gap-2">
                    <div
                      v-for="company in listComapnies"
                      :key="company.id"
                      @click="selectCompanyMobile(company)"
                      :class="[
                        'flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200',
                        activeCompanies === company.id 
                          ? 'border-[#db147f] bg-[#fff0fb]' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      ]"
                    >
                      <div class="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-[#db147f] to-[#e4097f] rounded-md mr-3">
                        <span class="text-sm font-medium text-white">
                          {{ getCompanyInitials(company.title) }}
                        </span>
                      </div>
                      <div class="flex-1">
                        <span class="text-sm font-medium text-gray-900">
                          {{ company.title }}
                        </span>
                      </div>
                      <div 
                        v-if="activeCompanies === company.id"
                        class="w-5 h-5 bg-[#db147f] rounded-full flex items-center justify-center"
                      >
                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Menu Items -->
              <div class="space-y-2">
                <RouterLink
                  v-for="item in filteredOverlayMenuItems"
                  :key="item.title"
                  :to="getOverlayRouteLink(item)"
                  @click="toggleUserMenu"
                  class="flex items-center px-4 py-2 transition-colors duration-200 rounded-lg hover:bg-gray-50"
                >
                  <div class="flex items-center justify-center w-8 h-8 mr-3">
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
              
              <!-- Profile Link -->
              <a
                href="/profile"
                @click="toggleUserMenu"
                class="flex items-center px-4 py-2 pt-4 mt-4 transition-colors duration-200 border-t border-gray-100 rounded-lg hover:bg-gray-50"
              >
                <div class="flex items-center justify-center w-8 h-8 mr-3">
                  <img
                    src="/src/assets/logo.svg"
                    alt="Profile"
                    class="w-6 h-6 rounded-full"
                  />
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
import { ref, computed, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import accountHeader from "@/components/accountDashboard/accountHeader.vue";
import AppModal from "@/components/globales/AppModal.vue";
import AppOvarleyBottom from "@/components/globales/AppOvarleyBottom.vue";
import {
  Menu,
  Home,
  Cherry,
  MessageCircleMore,
  BarChart3,
  Users,
  FileText,
  FolderClosed,
  Signature,
  BookOpenText,
  BriefcaseBusiness,
  MailQuestionIcon,
  BlindsIcon,
  MailIcon
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

const auth = useAuthStore();

const accountType = ref('');
const companyId = ref('');

const listComapnies = ref([])

const activeCompanies = ref(null)

// Computed pour obtenir le nom de la compagnie sélectionnée
const selectedCompanyName = computed(() => {
  if (!activeCompanies.value) return null;
  const company = listComapnies.value.find(c => c.id === activeCompanies.value);
  return company ? company.title : null;
});

// Fonction pour obtenir les initiales d'une compagnie
const getCompanyInitials = (companyName) => {
  if (!companyName) return '?';
  return companyName
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
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

// Fermer le dropdown quand on clique ailleurs
const handleClickOutside = (event) => {
  if (!event.target.closest('#desktopSideBar')) {
    showCompanyDropdown.value = false;
  }
};

// Fonction pour sélectionner une compagnie depuis le mobile
const selectCompanyMobile = (company) => {
  activeCompanies.value = company.id;
  // Optionnel: fermer l'overlay après sélection
  // toggleUserMenu();
};

const fetchGuestsForAccount = async () => {
   try {
      const response = await auth.api('GET', '/accounts/guest/list', null, false);

      if (response.success) {
         console.log(response.data);
         
         if (Array.isArray(response.data)) {
            const companies = response.data.map(guest => ({
               id: guest.company.slug,
               title: guest.company.activeDetails.name
            }));
            
            // Assuming listComapnies.values is defined and should be updated
            listComapnies.value.push(...companies);
         }
      }
   } catch (error) {
      console.error('An error occurred:', error);
   }
};



onMounted(() => {
  accountType.value = auth?.user?.account?.accountType;
  console.log(auth.userCompany);
  companyId.value = accountType.value === 'companies' ? auth.userCompany?.companies?.[0]?.slug : null;
  
  // Sélectionner la première compagnie par défaut
  if (listComapnies.value.length > 0) {
    activeCompanies.value = listComapnies.value[0].id;
  }
  
  // Ajouter l'event listener pour fermer le dropdown
  document.addEventListener('click', handleClickOutside);

  fetchGuestsForAccount()
});

// Définition des menus de base (sans les liens dynamiques)
const baseMenuItems = [
  {
    icon: Home,
    title: "Dashboard",
    routeName: "home",
    active: true,
    badge: null,
    isCompanie: false,
  },
  {
    icon: MailIcon,
    title: "Invitations",
    routeName: "list_companie_invitations",
    active: false,
    badge: null,
    isCompanie: false,
  },
  {
    icon: BlindsIcon,
    title: " Projects",
    routeName: "guest_list_projects",
    active: false,
    badge: null,
    isCompanie: false,
    isGuest: true,
  },
  {
    icon: BookOpenText,
    title: "Contract ",
    routeName: "contract_list",
    active: false,
    badge: null,
    isCompanie: true,
  },
  {
    icon: Signature,
    title: "My Contracts",
    routeName: "list_agrement",
    active: false,
    badge: null,
    isCompanie: false,
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Offers",
    routeName: "companie_list_jobs",
    active: false,
    badge: null,
    isCompanie: true,
  },
  {
    icon: MailQuestionIcon,
    title: "My Applications",
    routeName: "my_applications",
    active: false,
    badge: 3,
    isCompanie: false,
  },
  {
    icon: FolderClosed,
    title: "Company Projects",
    routeName: "list_projects",
    active: false,
    badge: null,
    isCompanie: true,
  },
  {
    icon: Users,
    title: "Team Management",
    routeName: "team_members",
    active: false,
    badge: null,
    isCompanie: true,
  }
];


const baseMobileMenuItems = [
  {
    icon: Home,
    title: "Dashboard",
    routeName: "home",
    active: true,
    badge: null,
    isCompanie: false,
  },
  {
    icon: MailQuestionIcon,
    title: "Applies",
    routeName: "my_applications",
    active: false,
    badge: 3,
    isCompanie: false,
  },
  {
    icon: BlindsIcon,
    title: "Works Projects",
    routeName: "guest_list_projects",
    active: false,
    badge: null,
    isCompanie: false,
    isGuest: true,
  },
];

const baseOverlayMenuItems = [
  {
    icon: BookOpenText,
    title: "Contracts",
    routeName: "contract_list",
    active: false,
    badge: null,
    isCompanie: true,
  },
   {
    icon: MailIcon,
    title: "Invitations",
    routeName: "list_companie_invitations",
    active: false,
    badge: null,
    isCompanie: false,
  },
  {
    icon: BriefcaseBusiness,
    title: "Jobs",
    routeName: "companie_list_jobs",
    active: false,
    badge: null,
    isCompanie: true,
  },
  {
    icon: Signature,
    title: "Signed Contracts",
    routeName: "list_agrement",
    active: false,
    badge: null,
    isCompanie: false,
  },
  {
    icon: FolderClosed,
    title: "Projects",
    routeName: "home",
    active: false,
    badge: null,
    isCompanie: true,
  },
  {
    icon: FileText,
    title: "Reviews",
    routeName: "home",
    active: false,
    badge: null,
    isCompanie: false,
  },
  {
    icon: BlindsIcon,
    title: "Works Projects",
    routeName: "guest_list_projects",
    active: false,
    badge: null,
    isCompanie: false,
    isGuest: true,
  },
  {
    icon: Users,
    title: "Team Management",
    routeName: "team_members",
    active: false,
    badge: null,
    isCompanie: true,
  },
];

// Fonction pour générer le lien de route avec les paramètres appropriés
const getRouteLink = (item) => {
  if(item.isGuest && activeCompanies.value){
     return {
      name: item.routeName,
      params: { companyId: activeCompanies.value } // Utiliser activeCompanies.value au lieu de companyId.value
    };
  }

  if (item.isCompanie && companyId.value) {
    return {
      name: item.routeName,
      params: { companyId: companyId.value }
    };
  }
  return { name: item.routeName };
};

const getMobileRouteLink = (item) => {
  if(item.isGuest && activeCompanies.value){
     return {
      name: item.routeName,
      params: { companyId: activeCompanies.value }
    };
  }

  if (item.isCompanie && companyId.value) {
    return {
      name: item.routeName,
      params: { companyId: companyId.value }
    };
  }
  return { name: item.routeName };
};

const getOverlayRouteLink = (item) => {
  if(item.isGuest && activeCompanies.value){
     return {
      name: item.routeName,
      params: { companyId: activeCompanies.value }
    };
  }

  if (item.isCompanie && companyId.value) {
    return {
      name: item.routeName,
      params: { companyId: companyId.value }
    };
  }
  return { name: item.routeName };
};

// Fonction pour vérifier si un menu peut être affiché
const menuCanBeShow = (item) => {
  // Si c'est un menu pour les compagnies et que l'utilisateur n'est pas une compagnie ou n'a pas de companyId
  if (item.isCompanie && (accountType.value !== 'companies' || !companyId.value)) {
    return false
  }

  // Si c'est un menu pour les invités et qu'aucune compagnie n'est sélectionnée
  if (item.isGuest && !activeCompanies.value) {
    return false
  }

  // Si c'est un menu pour les invités mais que l'utilisateur est propriétaire d'une compagnie
  if (item.isGuest && accountType.value === 'companies') {
    return false
  }

  return true;
};

// Computed properties pour filtrer les menus
const filteredMenuItems = computed(() => {
  return baseMenuItems.filter(item => menuCanBeShow(item));
});

const filteredMobileMenuItems = computed(() => {
  return baseMobileMenuItems.filter(item => menuCanBeShow(item));
});

const filteredOverlayMenuItems = computed(() => {
  return baseOverlayMenuItems.filter(item => menuCanBeShow(item));
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
    showCompanyDropdown.value = false; // Fermer le dropdown quand on quitte la sidebar
  });
};

const setActiveItem = (index) => {
  const filteredItems = filteredMenuItems.value;
  baseMenuItems.forEach((item, i) => {
    item.active = false;
  });
  
  if (filteredItems[index]) {
    const originalIndex = baseMenuItems.findIndex(item => item.title === filteredItems[index].title);
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
    const originalIndex = baseMobileMenuItems.findIndex(item => item.title === filteredItems[index].title);
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