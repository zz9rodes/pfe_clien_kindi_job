<template>
  <div class="sticky w-64 p-6 mx-2 bg-white border border-gray-100 shadow-lg ounded-xl top-6">
    <div class="flex items-center justify-between mb-8">
      <h3 class="text-xl font-bold text-gray-900">Filter Jobs</h3>
      <div class="flex items-center space-x-2">
        <!-- Badge showing total active filters -->
        <span v-if="activeFiltersCount > 0" class="bg-[#e4097f] text-[8px] text-white px-2 py-1 rounded-full size-[18px] flex justify-center items-center">
          {{ activeFiltersCount }}
        </span>
        <button @click="clearAllFilters"
          class="text-sm text-[#00a3e0] hover:text-[#00a3e0]/80 font-medium transition-colors">
          Clear All
        </button>
      </div>
    </div>

    <div class="mb-6">
      <button @click="toggleSection('location')" class="flex items-center justify-between w-full mb-4 group">
        <h4 class="font-semibold text-gray-900 group-hover:text-[#e4097f] transition-colors">Location</h4>
        <div class="flex items-center">
          <span v-if="dataFilter.filters.location.length > 0" class="bg-[#e4097f] text-white text-[8px] px-2 py-1 rounded-full size-[18px] flex justify-center items-center mr-2">
            {{ dataFilter.filters.location.length }}
          </span>

          <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-45': dataFilter.expandedSections.location }" width="16"
            height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus-icon lucide-plus text-gray-400 transition-transform group-hover:text-[#e4097f]">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </button>
      <div v-if="dataFilter.expandedSections.location" class="pl-2 space-y-3">
        <label v-for="location in dataFilter.locations.slice(0, 5)" :key="location.id"
          class="flex items-center justify-between cursor-pointer group">
          <div class="flex items-center">
            <div class="relative">
              <input type="checkbox" :value="location.id" v-model="dataFilter.filters.location" class="sr-only" />
              <div
                class="w-4 h-4 border border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-[#e4097f]"
                :class="{ 'bg-[#e4097f] border-[#e4097f]': dataFilter.filters.location.includes(location.id) }">
                <svg v-if="dataFilter.filters.location.includes(location.id)" class="w-3 h-3 text-white" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{{ location.name }}</span>
          </div>
        </label>
        <button class="text-[#00a3e0] text-sm font-medium hover:text-[#00a3e0]/80 transition-colors">
          +{{ dataFilter.locations.length - 5 }} more locations
        </button>
      </div>
    </div>

    <div class="mb-6">
      <button @click="toggleSection('category')" class="flex items-center justify-between w-full mb-4 group">
        <h4 class="font-semibold text-gray-900 group-hover:text-[#e4097f] transition-colors">Category</h4>
        <div class="flex items-center">
          <span v-if="dataFilter.filters.category.length > 0" class="bg-[#e4097f] text-white text-[8px] px-2 py-1 rounded-full size-[18px] flex justify-center items-center mr-2">
            {{ dataFilter.filters.category.length }}
          </span>

          <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-45': dataFilter.expandedSections.category }" width="16"
            height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus-icon lucide-plus text-gray-400 transition-transform group-hover:text-[#e4097f]">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </button>
      <div v-if="dataFilter.expandedSections.category" class="pl-2 space-y-3">
        <label v-for="category in dataFilter.categories.slice(0, 5)" :key="category.id"
          class="flex items-center justify-between cursor-pointer group">
          <div class="flex items-center">
            <div class="relative">
              <input type="checkbox" :value="category.id" v-model="dataFilter.filters.category" class="sr-only" />
              <div
                class="w-4 h-4 border border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-[#e4097f]"
                :class="{ 'bg-[#e4097f] border-[#e4097f]': dataFilter.filters.category.includes(category.id) }">
                <svg v-if="dataFilter.filters.category.includes(category.id)" class="w-3 h-3 text-white" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{{ category.name }}</span>
          </div>
        </label>
        <button class="text-[#00a3e0] text-sm font-medium hover:text-[#00a3e0]/80 transition-colors">
          +10 more categories
        </button>
      </div>
    </div>

    <div class="mb-6">
      <button @click="toggleSection('salary')" class="flex items-center justify-between w-full mb-4 group">
        <h4 class="font-semibold text-gray-900 group-hover:text-[#e4097f] transition-colors">Salary Range</h4>
        <div class="flex items-center">
          <span v-if="isSalaryFiltered" class="bg-[#e4097f] text-white text-[8px] px-2 py-1 rounded-full size-[18px] flex justify-center items-center mr-2">
            1
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-45': dataFilter.expandedSections.salary }" width="16" height="16"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus-icon lucide-plus text-gray-400 transition-transform group-hover:text-[#e4097f]">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </button>
      <div v-if="dataFilter.expandedSections.salary" class="pl-2 space-y-4">
        <div class="bg-gradient-to-r from-[#e4097f]/10 to-[#00a3e0]/10 p-4 rounded-xl">
          <div class="flex justify-between mb-2 text-sm text-gray-600">
            <span>${{ formatSalary(dataFilter.filters.salary.min) }}</span>
            <span>${{ formatSalary(dataFilter.filters.salary.max) }}</span>
          </div>

          <div class="relative mb-4">
            <div class="h-2 bg-gray-200 rounded-full"></div>
            <div class="absolute top-0 h-2 rounded-full bg-[#00a3e0]"
              :style="{ left: (dataFilter.filters.salary.min / dataFilter.salaryRange.max * 100) + '%', width: ((dataFilter.filters.salary.max - dataFilter.filters.salary.min) / dataFilter.salaryRange.max * 100) + '%' }">
            </div>
            <input type="range" :min="dataFilter.salaryRange.min" :max="dataFilter.salaryRange.max" v-model="dataFilter.filters.salary.min"
              class="absolute top-0 w-full h-2 opacity-0 cursor-pointer" />
            <input type="range" :min="dataFilter.salaryRange.min" :max="dataFilter.salaryRange.max" v-model="dataFilter.filters.salary.max"
              class="absolute top-0 w-full h-2 opacity-0 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <button @click="toggleSection('jobType')" class="flex items-center justify-between w-full mb-4 group">
        <h4 class="font-semibold text-gray-900 group-hover:text-[#e4097f] transition-colors">Job Type</h4>
        <div class="flex items-center">
          <span v-if="dataFilter.filters.jobType.length > 0" class="bg-[#e4097f] text-white text-[8px] px-2 py-1 rounded-full size-[18px] flex justify-center items-center mr-2">
            {{ dataFilter.filters.jobType.length }}
          </span>
          <svg :class="{ 'rotate-[45deg]': dataFilter.expandedSections.jobType }" xmlns="http://www.w3.org/2000/svg" width="16"
            height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus-icon lucide-plus text-gray-400 transition-transform group-hover:text-[#e4097f]">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </button>
      <div v-if="dataFilter.expandedSections.jobType" class="pl-2 space-y-3">
        <div v-for="jobType in dataFilter.jobTypes" :key="jobType.id" class="flex items-center justify-between group">
          <div class="flex items-center">
            <span class="text-sm text-gray-700 group-hover:text-gray-900">{{ jobType.name }}</span>
            <span class="px-2 py-1 ml-2 text-[8px] text-gray-400 bg-gray-100 rounded-full">{{ jobType.count }}</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" :value="jobType.id" v-model="dataFilter.filters.jobType" class="sr-only peer" />
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a3e0]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#e4097f]  shadow-sm">
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <button @click="toggleSection('gender')" class="flex items-center justify-between w-full mb-4 group">
        <h4 class="font-semibold text-gray-900 group-hover:text-[#e4097f] transition-colors">Gender</h4>
        <div class="flex items-center">
          <span v-if="dataFilter.filters.gender.length > 0" class="bg-[#e4097f] text-white text-[8px] px-2 py-1 rounded-full size-[18px] flex justify-center items-center mr-2">
            {{ dataFilter.filters.gender.length }}
          </span>
          <svg :class="{ 'rotate-[45deg]': dataFilter.expandedSections.gender }" xmlns="http://www.w3.org/2000/svg" width="16"
            height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-plus-icon lucide-plus text-gray-400 transition-transform group-hover:text-[#e4097f]">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </div>
      </button>
      <div v-if="dataFilter.expandedSections.gender" class="pl-2 space-y-3">
        <label v-for="gender in dataFilter.genders" :key="gender.id"
          class="flex items-center justify-between cursor-pointer group">
          <div class="flex items-center">
            <div class="relative">
              <input type="checkbox" :value="gender.id" v-model="dataFilter.filters.gender" class="sr-only" />
              <div
                class="w-4 h-4 border border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-[#e4097f]"
                :class="{ 'bg-[#e4097f] border-[#e4097f]': dataFilter.filters.gender.includes(gender.id) }">
                <svg v-if="dataFilter.filters.gender.includes(gender.id)" class="w-3 h-3 text-white" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{{ gender.name }}</span>
          </div>
        </label>
      </div>
    </div>

    <!-- Active Filters Summary -->
    <div v-if="activeFiltersCount > 0" class="p-4 mb-6 bg-gray-50 rounded-xl">
      <h5 class="mb-2 text-sm font-semibold text-gray-700">Filtres actifs ({{ activeFiltersCount }})</h5>
      <div class="flex flex-wrap gap-2">
        <span v-for="filter in activeFiltersList" :key="filter.key" 
          class="inline-flex items-center px-2 py-1 bg-[#e4097f] text-white text-[8px] rounded-full">
          {{ filter.label }}
          <button @click="removeFilter(filter.type, filter.value)" class="ml-1 hover:bg-white/20 rounded-full p-0.5">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      </div>
    </div>

    <div class="pt-6 border-t border-gray-100">
      <button @click="applyFilters"
        class="w-full bg-[#e4097f] text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center">
        <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Apply ({{ activeFiltersCount }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Define props
const props = defineProps({
  // Receive activeFilters as a prop from parent component
  initialActiveFilters: {
    type: Object,
    default: () => ({
      location: [],
      category: [],
      salary: {
        min: 30000,
        max: 70000,
        isFiltered: false
      },
      jobType: [],
      gender: [],
      levelExperience: [],
      searchQuery: ''
    })
  }
})

// Define emits
const emit = defineEmits(['filters-changed'])

const searchQuery = ref(props.initialActiveFilters.searchQuery || '')
const dataFilter = ref({
  expandedSections: {
    location: true,
    category: true,
    salary: true,
    jobType: true,
    gender: false,
    levelExperience: true
  },
  filters: {
    location: props.initialActiveFilters.location || [],
    category: props.initialActiveFilters.category || [],
    salary: {
      min: props.initialActiveFilters.salary?.min || 30000,
      max: props.initialActiveFilters.salary?.max || 70000
    },
    jobType: props.initialActiveFilters.jobType || [],
    gender: props.initialActiveFilters.gender || [],
    levelExperience: props.initialActiveFilters.levelExperience || []
  },
  salaryRange: {
    min: 0,
    max: 150000
  },
  locations: [
    { id: 'paris', name: 'Paris', count: 1546 },
    { id: 'london', name: 'London', count: 1203 },
    { id: 'newyork', name: 'New York', count: 987 },
    { id: 'berlin', name: 'Berlin', count: 756 },
    { id: 'tokyo', name: 'Tokyo', count: 543 },
    { id: 'sydney', name: 'Sydney', count: 432 },
    { id: 'toronto', name: 'Toronto', count: 321 }
  ],
  categories: [
    { id: 'childcare', name: 'Childcare Worker', count: 1546 },
    { id: 'teacher', name: 'Early Childhood Teacher', count: 1203 },
    { id: 'assistant', name: 'Teaching Assistant', count: 987 },
    { id: 'coordinator', name: 'Program Coordinator', count: 756 },
    { id: 'director', name: 'Center Director', count: 543 },
    { id: 'nurse', name: 'Childcare Nurse', count: 432 },
    { id: 'cook', name: 'Kitchen Staff', count: 321 }
  ],
  jobTypes: [
    { id: 'fulltime', name: 'Full Time', count: 1546 },
    { id: 'parttime', name: 'Part Time', count: 1203 },
    { id: 'casual', name: 'Casual', count: 987 },
  ],
  genders: [
    { id: 'female', name: 'Female Preferred', count: 1789 },
    { id: 'male', name: 'Male Preferred', count: 1667 }
  ]
})

// Computed property that generates the active filters object
const activeFilters = computed(() => {
  const filters = dataFilter.value.filters
  return {
    location: filters.location,
    category: filters.category,
    salary: {
      min: filters.salary.min,
      max: filters.salary.max,
      isFiltered: filters.salary.min !== dataFilter.value.salaryRange.min || 
                   filters.salary.max !== dataFilter.value.salaryRange.max
    },
    jobType: filters.jobType,
    gender: filters.gender,
    levelExperience: filters.levelExperience,
    searchQuery: searchQuery.value
  }
})

// Computed property to count active filters
const activeFiltersCount = computed(() => {
  let count = 0
  const filters = activeFilters.value
  
  count += filters.location.length
  count += filters.category.length
  count += filters.salary.isFiltered ? 1 : 0
  count += filters.jobType.length
  count += filters.gender.length
  count += filters.levelExperience.length
  count += filters.searchQuery ? 1 : 0
  
  return count
})

// Computed property to check if salary is filtered
const isSalaryFiltered = computed(() => {
  return dataFilter.value.filters.salary.min !== dataFilter.value.salaryRange.min || 
         dataFilter.value.filters.salary.max !== dataFilter.value.salaryRange.max
})

// Computed property to get active filters list for display
const activeFiltersList = computed(() => {
  const list = []
  const filters = dataFilter.value.filters
  
  // Location filters
  filters.location.forEach(locationId => {
    const location = dataFilter.value.locations.find(l => l.id === locationId)
    if (location) {
      list.push({
        key: `location-${locationId}`,
        type: 'location',
        value: locationId,
        label: location.name
      })
    }
  })
  
  // Category filters
  filters.category.forEach(categoryId => {
    const category = dataFilter.value.categories.find(c => c.id === categoryId)
    if (category) {
      list.push({
        key: `category-${categoryId}`,
        type: 'category',
        value: categoryId,
        label: category.name
      })
    }
  })
  
  // Salary filter
  if (isSalaryFiltered.value) {
    list.push({
      key: 'salary',
      type: 'salary',
      value: 'salary',
      label: `$${formatSalary(filters.salary.min)} - $${formatSalary(filters.salary.max)}`
    })
  }
  
  // Job type filters
  filters.jobType.forEach(jobTypeId => {
    const jobType = dataFilter.value.jobTypes.find(jt => jt.id === jobTypeId)
    if (jobType) {
      list.push({
        key: `jobType-${jobTypeId}`,
        type: 'jobType',
        value: jobTypeId,
        label: jobType.name
      })
    }
  })
  
  // Gender filters
  filters.gender.forEach(genderId => {
    const gender = dataFilter.value.genders.find(g => g.id === genderId)
    if (gender) {
      list.push({
        key: `gender-${genderId}`,
        type: 'gender',
        value: genderId,
        label: gender.name
      })
    }
  })
  
  return list
})

// Watch for changes in activeFilters and emit automatically
watch(activeFilters, (newFilters) => {
  emit('filters-changed', newFilters)
}, { deep: true })

// Helper function to format salary
const formatSalary = (amount) => {
  return new Intl.NumberFormat('en-US').format(amount)
}

// Function to remove individual filter
const removeFilter = (type, value) => {
  switch (type) {
    case 'location':
      dataFilter.value.filters.location = dataFilter.value.filters.location.filter(id => id !== value)
      break
    case 'category':
      dataFilter.value.filters.category = dataFilter.value.filters.category.filter(id => id !== value)
      break
    case 'salary':
      dataFilter.value.filters.salary.min = dataFilter.value.salaryRange.min
      dataFilter.value.filters.salary.max = dataFilter.value.salaryRange.max
      break
    case 'jobType':
      dataFilter.value.filters.jobType = dataFilter.value.filters.jobType.filter(id => id !== value)
      break
    case 'gender':
      dataFilter.value.filters.gender = dataFilter.value.filters.gender.filter(id => id !== value)
      break
  }
}

// Fixed toggle function
const toggleSection = (section) => {
  dataFilter.value.expandedSections[section] = !dataFilter.value.expandedSections[section]
}

const clearAllFilters = () => {
  dataFilter.value.filters = {
    location: [],
    category: [],
    salary: {
      min: dataFilter.value.salaryRange.min,
      max: dataFilter.value.salaryRange.max
    },
    jobType: [],
    gender: [],
    levelExperience: []
  }
  searchQuery.value = ''
}

const applyFilters = () => {
  emit('filters-changed', activeFilters.value)
}
</script>

<style scoped>
/* Custom scrollbar for the filter container */
.filter-container::-webkit-scrollbar {
  width: 4px;
}

.filter-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.filter-container::-webkit-scrollbar-thumb {
  background: #e4097f;
  border-radius: 2px;
}

.filter-container::-webkit-scrollbar-thumb:hover {
  background: #c1086a;
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease;
}
</style>