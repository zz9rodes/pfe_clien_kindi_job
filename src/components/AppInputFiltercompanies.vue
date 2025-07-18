<template>
  <div class="container px-1 mx-auto mt-8">
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
                  'group relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105',
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
          </div>

          <!-- Main Content -->
          <div class="space-y-6">
            <!-- Title with Animation -->
            <h1 
              v-if="showTitle" 
              class="flex-1 mb-8 text-xl font-bold lg:text-2xl animate-fade-in"
            >
              <span class="text-[#e4097f] animate-pulse">Discover</span> 
              <span class="text-[#00a3e0] ml-2">Companies</span>
            </h1>

            <!-- Search Form -->
            <form 
              class="relative flex flex-col gap-3 sm:gap-0 sm:flex-row group" 
              @submit.prevent="handleFilter"
            >
              <!-- Keywords Input -->
              <div class="relative flex-1">
                <input 
                  v-model="localFilters.keywords" 
                  @input="updateFilters"
                  @focus="isKeywordsFocused = true"
                  @blur="isKeywordsFocused = false"
                  placeholder="Search by company name or industry"
                  class="w-full h-8 lg:h-10 pl-6 pr-4 text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-full rounded-r-full sm:rounded-r-none border-r-0 sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f] transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
                
                               
              </div>

              <!-- Location Input -->
              <div class="relative flex-1">
                <input 
                  v-model="localFilters.location" 
                  @input="updateFilters"
                  placeholder="City, state or country"
                  class="w-full h-8 lg:h-10 pl-6 pr-4 text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-full rounded-r-full sm:rounded-r-none sm:rounded-l-none border-r-0 sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f] transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
                <MapPinIcon class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
              </div>

             

              <!-- Search Button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="group relative h-8 lg:h-10 px-6 mr-3 bg-gradient-to-r from-[#e4097f] to-[#c8076f] hover:from-[#c8076f] hover:to-[#a8065f] text-white rounded-r-full sm:rounded-l-none rounded-l-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <SearchIcon class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                
                <!-- Ripple effect -->
                <div class="absolute inset-0 overflow-hidden rounded-r-full">
                  <div class="absolute inset-0 transition-opacity duration-300 bg-white opacity-0 group-hover:opacity-20"></div>
                </div>
              </button>
            </form>

            <!-- Mobile Categories -->
            <div class="flex gap-2 overflow-x-auto lg:hidden scrollbar-hide">
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="handleCategoryClick(category)"
                :class="[
                  'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#e4097f] to-[#c8076f] text-white'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600'
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
                <span>{{ resultsCount || 0 }} Companies Found</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>{{ stats.openPositions }}+ Open Positions</span>
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
import { ref, watch } from 'vue';
import { 
  MapPinIcon, 
  SearchIcon,
  BuildingIcon,
  CodeIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  MegaphoneIcon,
  BriefcaseIcon,
  XIcon
} from 'lucide-vue-next';

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      keywords: '',
      location: '',
      language: ''
    })
  },
  resultsCount: {
    type: Number,
    default: null
  },
  showTitle: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(['update:filters', 'search']);

const localFilters = ref({
  keywords: props.filters.keywords,
  location: props.filters.location,
});

const activeCategory = ref(null);
const isKeywordsFocused = ref(false);
const isLoading = ref(false);

const categories = ref([
  { id: 'technology', name: 'Technology', icon: CodeIcon },
  { id: 'ecommerce', name: 'Ecommerce', icon: ShoppingCartIcon },
  { id: 'business', name: 'Business', icon: BriefcaseIcon },
  { id: 'marketing', name: 'Marketing', icon: MegaphoneIcon }
]);

const searchSuggestions = ref([
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing'
]);

const stats = ref({
  activeCompanies: '800',
  openPositions: '3.2K',
  lastUpdate: '30 minutes ago'
});

watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters };
}, { immediate: true, deep: true });

const updateFilters = () => {
  emit('update:filters', { ...localFilters.value });
};

const handleFilter = () => {
  isLoading.value = true;
  emit('search', {
    ...localFilters.value,
    category: activeCategory.value
  });
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
};

const handleCategoryClick = (category) => {
  activeCategory.value = activeCategory.value === category.id ? null : category.id;
  localFilters.value.keywords = activeCategory.value ? category.name : '';
  updateFilters();
};

const selectSuggestion = (suggestion) => {
  localFilters.value.keywords = suggestion;
  isKeywordsFocused.value = false;
  updateFilters();
};
</script>

<style scoped>
/* Hide scrollbar for mobile categories */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Animations */
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

/* Category transitions */
.category-enter-active,
.category-leave-active {
  transition: all 0.3s ease;
}

.category-enter-from,
.category-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* Dropdown transitions */
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
