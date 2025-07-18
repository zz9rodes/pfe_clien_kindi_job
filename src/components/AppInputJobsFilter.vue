<template>
  <div class="container px-4 mx-auto mt-8">
    <div class="relative shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
      <!-- Background Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-4 -right-4 w-24 h-24 bg-[#e4097f]/10 rounded-full blur-xl"></div>
        <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-[#00a3e0]/10 rounded-full blur-xl"></div>
      </div>

      <div class="relative flex flex-col-reverse">
        <div class="w-full p-4 lg:p-8">
          <!-- Categories Filter - Desktop -->
          <div class="flex-wrap hidden gap-3 mb-8 lg:flex">
            <TransitionGroup name="category" tag="div" class="flex flex-wrap gap-3">
              <button 
                v-for="(category, index) in categories" 
                :key="category.id"
                @click="handleCategoryClick(category)"
                :class="[
                  'group relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105',
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#e4097f] to-[#c8076f] text-white shadow-lg shadow-[#e4097f]/25'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-[#e4097f] hover:text-[#e4097f] hover:shadow-md'
                ]"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <component 
                  :is="category.icon" 
                  class="inline-block w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12"
                />
                {{ category.name }}
                
                <!-- Active indicator -->
                <div 
                  v-if="activeCategory === category.id"
                  class="absolute w-2 h-2 transform -translate-x-1/2 bg-white rounded-full -bottom-1 left-1/2 animate-pulse"
                ></div>
              </button>
            </TransitionGroup>
            
            <button 
              @click="showMoreCategories = !showMoreCategories"
              class="group px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:border-[#e4097f] hover:text-[#e4097f] transition-all duration-300 hover:scale-105"
            >
              <MoreHorizontalIcon class="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          <!-- Main Content -->
          <div class="space-y-6">
            <!-- Title with Animation -->
            <h1 
              v-if="showTitle" 
              class="flex-1 mb-8 text-3xl font-bold lg:text-7xl animate-fade-in"
            >
              <span class="text-[#e4097f] animate-pulse">KindiJob</span> 
              <span class="text-[#00a3e0] ml-2">search</span>
            </h1>

            <!-- Search Form -->
            <form 
              class="relative flex flex-col gap-3 sm:gap-0 sm:flex-row group" 
              @submit.prevent="updateFilters"
            >
              <!-- Keywords Input -->
              <div class="relative flex-1">
                <input 
                  v-model="localFilters.keywords" 
                  @focus="isKeywordsFocused = true"
                  @blur="isKeywordsFocused = false"
                  placeholder="Search by job title, industry, or skills"
                  class="w-full h-12 lg:h-14 pl-6 pr-4 text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-full rounded-r-full sm:rounded-r-none border-r-0 sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f] transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
                
                <!-- Loading indicator -->
                <div 
                  v-if="isLoading"
                  class="absolute transform -translate-y-1/2 right-4 top-1/2"
                >
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-[#e4097f]"></div>
                </div>
              </div>
             
              <!-- Search Button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="group relative h-12 lg:h-14 px-6 mr-3 bg-gradient-to-r from-[#e4097f] to-[#c8076f] hover:from-[#c8076f] hover:to-[#a8065f] text-white rounded-r-full sm:rounded-l-none rounded-l-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <SearchIcon class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                
                <!-- Ripple effect -->
                <div class="absolute inset-0 overflow-hidden rounded-r-full">
                  <div class="absolute inset-0 transition-opacity duration-300 bg-white opacity-0 group-hover:opacity-20"></div>
                </div>
              </button>

              <!-- Mobile Filter Toggle -->
              <button
                v-if="showToggleModal"
                @click="HandleOpenModal"
                type="button"
                class="group lg:hidden relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#e4097f] to-[#c8076f] rounded-full border border-gray-300 dark:border-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  class="text-white transition-transform duration-300 group-hover:rotate-45"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
            </form>

            <!-- Mobile Categories -->
            <div class="flex gap-2 overflow-x-auto lg:hidden scrollbar-hide">
              <button 
                v-for="category in categories.slice(0, 4)" 
                :key="category.id"
                @click="handleCategoryClick(category)"
                :class="[
                  'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#e4097f] to-[#c8076f] text-white'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700Coronavirus border border-gray-300 dark:border-gray-600'
                ]"
              >
                <component :is="category.icon" class="inline-block w-4 h-4 mr-2" />
                {{ category.name }}
              </button>
            </div>

            <!-- Quick Stats -->
            <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{{ stats.activeJobs }}+ Active Jobs</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>{{ stats.companies }}+ Companies</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Updated {{ stats.lastUpdate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { 
  MapPinIcon, 
  MoreHorizontalIcon, 
  SearchIcon,
  BriefcaseIcon,
  ClockIcon,
  UserIcon,
  GraduationCapIcon
} from 'lucide-vue-next';

const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  showToggleModal: {
    type: Boolean,
    default: false
  },
  filters: {
    type: Object,
    default: () => ({
      keywords: '',
      location: '',
      jobType: '',
      salary: { min: 0, max: Infinity, isFiltered: false }
    })
  }
});

const emit = defineEmits(['searchvalue-changed', 'filter', 'open-modal', 'update:filters']);

const localFilters = ref({
  keywords: props.filters.keywords,
});
const activeCategory = ref('all');
const isKeywordsFocused = ref(false);
const isLoading = ref(false);
const showMoreCategories = ref(false);
const currentPlaceholderIndex = ref(0);

const categories = ref([
  { id: 'all', name: 'Tous les types d\'emploi', icon: BriefcaseIcon },
  { id: 'cdi', name: 'CDI', icon: ClockIcon },
  { id: 'internship', name: 'Stage', icon: GraduationCapIcon },
  { id: 'freelance', name: 'Freelance', icon: UserIcon }
]);

const placeholders = [
  'Recherchez par intitulé de poste, secteur ou compétences',
  'Trouvez l\'emploi de vos rêves...',
  'Recherchez par entreprise, rôle ou lieu',
  'Découvrez de nouvelles opportunités'
];

const stats = ref({
  activeJobs: '2,5K',
  companies: '500',
  lastUpdate: 'il y a 2 heures'
});

const currentPlaceholder = computed(() => {
  return placeholders[currentPlaceholderIndex.value];
});



// watch(() => props.filters, (newFilters) => {
//   localFilters.value = { ...newFilters, salary: { ...newFilters.salary } };
// }, { immediate: true, deep: true });

watch(localFilters, () => {
  updateFilters();
}, { deep: true });

const updateFilters = () => {
  emit('update:filters',localFilters.value );
};



const HandleOpenModal = () => {
  emit('open-modal');
};

const handleCategoryClick = (category) => {
  activeCategory.value = category.id;
  localFilters.value.jobType = category.id !== 'all' ? category.name.toLowerCase() : '';
  updateFilters();
};


</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.category-enter-active,
.category-leave-active {
  transition: all 0.3s ease;
}

.category-enter-from,
.category-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}
</style>