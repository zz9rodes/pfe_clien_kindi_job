<template>
      <AppModal  @closeModal="toggleOpenLoaderModal"
      :isOpen="isLoading"
      :isLoader="true"/>
  <div class="w-full min-h-screen bg-gray-50">
    <div class="p-6 mx-auto max-w-7xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Gestion des Entreprises</h1>
          <p class="text-gray-600">Gérez les demandes et les entreprises confirmées</p>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="mb-6">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button
            @click="activeTab = 'requests'"
            :class="[
              activeTab === 'requests'
                ? 'border-[#db147f] text-[#db147f]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            Demandes d'entreprises
            <span
              :class="[
                activeTab === 'requests'
                  ? 'bg-pink-100 text-[#db147f]'
                  : 'bg-gray-100 text-gray-900',
                'ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium'
              ]"
            >
              {{ companyRequests.length }}
            </span>
          </button>
          <button
            @click="activeTab = 'companies'"
            :class="[
              activeTab === 'companies'
                ? 'border-[#db147f] text-[#db147f]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            Entreprises confirmées
            <span
              :class="[
                activeTab === 'companies'
                  ? 'bg-pink-100 text-[#db147f]'
                  : 'bg-gray-100 text-gray-900',
                'ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium'
              ]"
            >
              {{ confirmedCompanies.length }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Filtres et recherche -->
      <AppInputFiltercompanies 
        class="my-4" 
        :filters="searchFilters"  
        :results-count="currentTabData.length" 
      />

      <!-- Company Requests Tab -->
      <div v-if="activeTab === 'requests'" class="container grid grid-cols-1 gap-6 px-4 mx-auto mt-8 md:grid-cols-2 lg:grid-cols-3">
        <CompanyRequestCard 
          v-for="request in filteredRequests" 
          :key="request.id" 
          :request="request"
          @edit="openEditDrawer"
        />
        <div v-if="filteredRequests.length === 0" class="py-12 text-center col-span-full">
          <div class="text-gray-500">
            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune demande trouvée</h3>
            <p class="mt-1 text-sm text-gray-500">Aucune demande d'entreprise ne correspond à vos critères de recherche.</p>
          </div>
        </div>
      </div>

      <!-- Confirmed Companies Tab -->
      <div v-if="activeTab === 'companies'" class="container grid grid-cols-1 gap-6 px-4 mx-auto mt-8 md:grid-cols-2 lg:grid-cols-3">
        <CompanyVersionCard 
          v-for="company in filteredCompanies" 
          :key="company.id" 
          :version="company"
          @toggle="toggleCompanyStatus" 
          @edit="openEditDrawer"
        />
        <div v-if="filteredCompanies.length === 0" class="py-12 text-center col-span-full">
          <div class="text-gray-500">
            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune entreprise trouvée</h3>
            <p class="mt-1 text-sm text-gray-500">Aucune entreprise confirmée ne correspond à vos critères de recherche.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CompanyVersionCard from '@/components/compnanies/CompanyVersionCard.vue'
import CompanyRequestCard from '@/components/compnanies/CompanyRequestCard.vue'
import AppInputFiltercompanies from '@/components/AppInputFiltercompanies.vue'
import { useAuthStore } from '@/stores/auth'
import AppModal from '@/components/globales/AppModal.vue'

// Reactive data
const activeTab = ref('requests')
const companyRequests = ref([])
const confirmedCompanies = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const isEditDrawerOpen = ref(false)
const selectedVersion = ref(null)
const isLoading=ref(false)


const searchFilters = ref({
  keywords: '',
  location: '',
  language: ''
});

const auth = useAuthStore()

// Computed properties
const currentTabData = computed(() => {
  return activeTab.value === 'requests' ? companyRequests.value : confirmedCompanies.value
})

const toggleOpenLoaderModal = () => {
  isLoading.value = !isLoading.value;
};

const filteredRequests = computed(() => {
  let filtered = companyRequests.value

  // Filtrer par recherche
  if (searchFilters.value.keywords) {
    filtered = filtered.filter(request =>
      request.companyName?.toLowerCase().includes(searchFilters.value.keywords.toLowerCase()) ||
      request.description?.toLowerCase().includes(searchFilters.value.keywords.toLowerCase())
    )
  }

  // Filtrer par localisation
  if (searchFilters.value.location) {
    filtered = filtered.filter(request =>
      request.location?.toLowerCase().includes(searchFilters.value.location.toLowerCase())
    )
  }

  return filtered
})

const filteredCompanies = computed(() => {
  let filtered = confirmedCompanies.value

  // Filtrer par recherche
  if (searchFilters.value.keywords) {
    filtered = filtered.filter(company =>
      company.companyName?.toLowerCase().includes(searchFilters.value.keywords.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchFilters.value.keywords.toLowerCase())
    )
  }

  // Filtrer par localisation
  if (searchFilters.value.location) {
    filtered = filtered.filter(company =>
      company.location?.toLowerCase().includes(searchFilters.value.location.toLowerCase())
    )
  }

  // Filtrer par statut
  if (statusFilter.value) {
    filtered = filtered.filter(company =>
      statusFilter.value === 'active' ? company.isActive : !company.isActive
    )
  }

  return filtered
})

// Methods
const openEditDrawer = (item) => {
  selectedVersion.value = item
  isEditDrawerOpen.value = true
}


const fetchCompanyRequests = async () => {
  toggleOpenLoaderModal()
  try {
    const response = await auth.api('GET', '/company_request/all', {}, false)
    console.log('Company requests:', response)
    
    if (response.success && response.data) {
      companyRequests.value = response.data.request
      confirmedCompanies.value=response.data.companies
    }
  } catch (error) {
    console.error('Error fetching company requests:', error)
  }
  finally{
    toggleOpenLoaderModal()
  }
}

onMounted(() => {
  fetchCompanyRequests()
})
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
