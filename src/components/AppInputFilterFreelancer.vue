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
              <span class="text-[#e4097f] animate-pulse">Find</span> 
              <span class="text-[#00a3e0] ml-2">Talents</span>
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
                  @input="updateFilters"
                  @focus="isKeywordsFocused = true"
                  @blur="isKeywordsFocused = false"
                  placeholder="Search by skills, expertise, or freelancer name"
                  class="w-full h-12 lg:h-14 pl-6 pr-4 text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-full rounded-r-full sm:rounded-r-none border-r-0 sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f] transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
                
                <!-- Search suggestions dropdown -->
                <!-- <Transition name="dropdown">
                  <div 
                    v-if="isKeywordsFocused && searchSuggestions.length > 0"
                    class="absolute left-0 right-0 z-50 mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg top-full dark:bg-gray-700 dark:border-gray-600 max-h-60"
                  >
                    <div 
                      v-for="(suggestion, index) in searchSuggestions" 
                      :key="index"
                      @click="selectSuggestion(suggestion)"
                      class="flex items-center gap-3 px-4 py-3 transition-colors duration-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <SearchIcon class="w-4 h-4 text-gray-400" />
                      <span class="text-gray-700 dark:text-gray-300">{{ suggestion }}</span>
                    </div>
                  </div>
                </Transition> -->

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
                <span>{{ stats.activeFreelancers }}+ Active Freelancers</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>{{ stats.skills }}+ Skills Available</span>
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
  MoreHorizontalIcon, 
  SearchIcon,
  BriefcaseIcon,
  CodeIcon,
  PaintbrushIcon,
  CameraIcon
} from 'lucide-vue-next';

const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  filters: {
    type: Object,
    default: () => ({
      keywords: ''
    })
  }
});

const emit = defineEmits(['update:filters', 'search']);

const localFilters = ref({
  keywords: props.filters.keywords
});
const activeCategory = ref(null);
const isKeywordsFocused = ref(false);
const isLoading = ref(false);
const showMoreCategories = ref(false);
const currentPlaceholderIndex = ref(0);

const categories = ref([
  { id: 'development', name: 'Development', icon: CodeIcon },
  { id: 'design', name: 'Design', icon: PaintbrushIcon },
  { id: 'photography', name: 'Photography', icon: CameraIcon },
  { id: 'writing', name: 'Writing', icon: BriefcaseIcon }
]);

const searchSuggestions = ref([
  'Web Developer',
  'Graphic Designer',
  'Photographer',
  'Content Writer'
]);

const placeholders = [
  'Search by skills, expertise, or freelancer name',
  'Find the perfect talent...',
  'Search by role or location',
  'Discover skilled freelancers'
]

const stats = ref({
  activeFreelancers: '1.2K',
  skills: '150',
  lastUpdate: '1 hour ago'
});

const currentPlaceholder = computed(() => {
  return placeholders[currentPlaceholderIndex.value];
});

onMounted(() => {
  setInterval(() => {
    currentPlaceholderIndex.value = (currentPlaceholderIndex.value + 1) % placeholders.length;
  }, 3000);
});

watch(() => props.filters.keywords, (newKeywords) => {
  localFilters.value.keywords = newKeywords;
}, { immediate: true });

const updateFilters = () => {
  emit('update:filters', { keywords: localFilters.value.keywords });
};

const handleCategoryClick = (category) => {
  activeCategory.value = category.id;
  localFilters.value.keywords = category.name;
  updateFilters();
};

const selectSuggestion = (suggestion) => {
  localFilters.value.keywords = suggestion;
  isKeywordsFocused.value = false;
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