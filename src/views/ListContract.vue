<template>
  <div class="w-full h-full bg-gray-50">
       <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl max-h-[95vh] overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Aperçu du contrat</h2>
            <button @click="toggleOpenModal()" class="text-gray-400 hover:text-gray-600">
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          
          <div class="overflow-y-auto max-h-[calc(95vh-120px)]">
            <ContractPreview 
              :clauses="[]"
              title="Demo Preview"
              :companyData="companyData"
              :UserData="userData"
            />
          </div>
        </div>
      </div>
    </AppModal>
    <div class="p-6 mx-auto max-w-7xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Gestion des contrats</h1>
          <p class="mt-1 text-gray-600">Gérez vos contrats créés, envoyés et signés</p>
        </div>
        <button
          @click="createNewContract"
          class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
        >
          + Nouveau contrat
        </button>
      </div>

      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.key
                  ? 'border-[#db147f] text-[#db147f]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.label }}
              <span 
                :class="[
                  'ml-2 py-0.5 px-2 rounded-full text-xs',
                  activeTab === tab.key
                    ? 'bg-[#db147f] text-white'
                    : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ getContractCount(tab.key) }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="flex items-center gap-4 mb-6">
        <div class="flex-1 max-w-md">
          <div class="relative">
            <SearchIcon class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un contrat..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            />
          </div>
        </div>
      </div>

      <!-- Contracts Grid -->
      <div v-if="filteredContracts.length === 0" class="py-12 text-center">
        <FileTextIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 class="mb-2 text-lg font-medium text-gray-900">
          {{ getEmptyStateMessage() }}
        </h3>
        <p class="mb-6 text-gray-500">
          {{ getEmptyStateDescription() }}
        </p>
        <button
          v-if="activeTab === 'all'"
          @click="createNewContract"
          class="px-4 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
        >
          Créer votre premier contrat
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="contract in filteredContracts"
          :key="contract.id"
          class="transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
          @click="viewContract(contract)"
        >
          <!-- Contract Card -->
          <div class="p-6">
            <!-- Header with status -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
                  {{ contract.title }}
                </h3>
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    getStatusClasses(contract.status)
                  ]"
                >
                  {{ getStatusLabel(contract.status) }}
                </span>
              </div>
              <div class="ml-4">
                <button
                  @click.stop="toggleContractMenu(contract.id)"
                  class="p-1 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100"
                >
                  <MoreVerticalIcon class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Description -->
            <p class="mb-4 text-sm text-gray-600 line-clamp-3">
              {{ contract.textDescription || 'Aucune description disponible' }}
            </p>

            <!-- Footer -->
            <div class="flex items-center justify-between text-xs text-gray-500">
              <div class="flex items-center">
                <CalendarIcon class="w-3 h-3 mr-1" />
                {{ formatDate(contract.createdAt) }}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 mt-4">
              <button
                @click.stop="GoToviewContract(contract)"
                class="flex-1 px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Voir
              </button>
            </div>
          </div>

        </div>
      </div>

   
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { 
  FileTextIcon, 
  SearchIcon, 
  CalendarIcon,  
  MoreVerticalIcon,
  XIcon,
  PlusIcon
} from 'lucide-vue-next'
import { useContractStore } from '@/stores/useContractStore'

import AppModal from '@/components/globales/AppModal.vue'
import ContractPreview from './ContractPreview.vue'

const contractStore = useContractStore()
const router=useRouter()

// Reactive data
const activeTab = ref('all')
const searchQuery = ref('')
const sortBy = ref('date')
const currentPage = ref(1)
const itemsPerPage = ref(12)
const activeContractMenu = ref(null)



const isModalOpen = ref(false);

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
  console.log("value");
  
};


// Tabs configuration
const tabs = ref([
  { key: 'all', label: 'Tous les contrats' },
  { key: 'signed', label: 'Signés' }
])

// Sample contracts data - À remplacer par des données réelles
const contracts = ref([
  {
    id: 1,
    title: 'Contrat de travail CDI - Développeur Frontend',
    textDescription: 'Contrat à durée indéterminée pour un poste de développeur frontend spécialisé en Vue.js et React. Le candidat rejoindra notre équipe technique pour développer des applications web modernes.',
    status: 'draft',
    createdAt: new Date('2024-01-15'),
    userData: {
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com'
    }
  },
  {
    id: 2,
    title: 'Contrat de prestation - Consultant Marketing',
    textDescription: 'Contrat de prestation de services pour une mission de consulting en marketing digital. Durée de 6 mois avec possibilité de renouvellement.',
    status: 'sent',
    createdAt: new Date('2024-01-10'),
    userData: {
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@email.com'
    }
  },
  {
    id: 3,
    title: 'Contrat de stage - Assistant RH',
    textDescription: 'Stage de 6 mois au sein du département des ressources humaines. Le stagiaire participera aux processus de recrutement et à la gestion administrative.',
    status: 'signed',
    createdAt: new Date('2024-01-05'),
    userData: {
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@email.com'
    }
  },
  {
    id: 4,
    title: 'Contrat freelance - Designer UX/UI',
    textDescription: 'Mission freelance pour la refonte complète de l\'interface utilisateur d\'une application mobile. Collaboration étroite avec l\'équipe produit.',
    status: 'draft',
    createdAt: new Date('2024-01-20'),
    userData: {
      firstName: 'Sophie',
      lastName: 'Bernard',
      email: 'sophie.bernard@email.com'
    }
  },
  {
    id: 5,
    title: 'Contrat CDD - Chef de projet',
    textDescription: 'Contrat à durée déterminée de 12 mois pour piloter le lancement d\'un nouveau produit. Gestion d\'équipe et coordination avec les parties prenantes.',
    status: 'sent',
    createdAt: new Date('2024-01-12'),
    userData: {
      firstName: 'Thomas',
      lastName: 'Petit',
      email: 'thomas.petit@email.com'
    }
  }
])

// Computed properties
const filteredContracts = computed(() => {
  let filtered = contracts.value

  // Filter by tab
  if (activeTab.value !== 'all') {
    filtered = filtered.filter(contract => contract.status === activeTab.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(contract => 
      contract.title.toLowerCase().includes(query) ||
      contract.textDescription.toLowerCase().includes(query) ||
      `${contract.userData.firstName} ${contract.userData.lastName}`.toLowerCase().includes(query)
    )
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'status':
        return a.status.localeCompare(b.status)
      case 'date':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return filtered
})



const getContractCount = (status) => {
  if (status === 'all') {
    return contracts.value.length
  }
  return contracts.value.filter(contract => contract.status === status).length
}

const getStatusClasses = (status) => {
  switch (status) {
    case 'signed':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'signed':
      return 'Signé'
    default:
      return ''
  }
}

const getEmptyStateMessage = () => {
  switch (activeTab.value) {
    case 'signed':
      return 'Aucun contrat signé'
    default:
      return 'Aucun contrat'
  }
}

const getEmptyStateDescription = () => {
  switch (activeTab.value) {
    case 'signed':
      return 'Vous n\'avez pas encore de contrats signés.'
    default:
      return 'Commencez par créer votre premier contrat.'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const toggleContractMenu = (contractId) => {
  activeContractMenu.value = activeContractMenu.value === contractId ? null : contractId
}

const createNewContract = () => {
  router.push({name:"contract_creator"})
}

const viewContract = (contract) => {
  contractStore.setContract(contract)

}

const sampleContract = ref({
  id: 1,
  title: 'Contrat de travail CDI - Développeur Frontend null',
  textDescription: 'Contrat à durée indéterminée pour un poste de développeur frontend spécialisé en Vue.js et React. Le candidat rejoindra notre équipe technique pour développer des applications web modernes et participer à l\'innovation technologique de l\'entreprise.',
  articlesAndClauses: [
    {
      title: 'Objet du contrat',
      text: 'Le présent contrat a pour objet l\'embauche de {{AccountFirstName}} {{AccountLastName}} en qualité de {{Position}} au sein de {{CompanieName}}.',
      items: [
        'Développement d\'applications web avec Vue.js et React',
        'Collaboration avec l\'équipe UX/UI',
        'Participation aux code reviews et à l\'amélioration continue'
      ]
    },
    {
      title: 'Rémunération',
      text: 'Le salaire brut annuel est fixé à {{Salary}}, payable en 12 mensualités.',
      items: [
        'Salaire versé le dernier jour ouvrable du mois',
        'Révision annuelle selon les performances',
        'Primes variables selon les objectifs atteints'
      ]
    },
    {
      title: 'Durée et période d\'essai',
      text: 'Le contrat prend effet le {{StartDate}}. Une période d\'essai de 3 mois est prévue.',
      items: []
    }
  ],
  status: 'draft',
  createdAt: '2024-01-15T10:00:00Z'
})


const GoToviewContract = (contract) => {
  contractStore.setContract(sampleContract.value)
  console.log(contractStore.contractData)
  router.push({name:'update_contract'})
}

const editContract = (contract) => {
  console.log('Modifier le contrat:', contract)
  alert(`Modifier le contrat: ${contract.title}`)
}


const handleClickOutside = (e) => {
  if (activeContractMenu.value && !e.target.closest('.relative')) {
    activeContractMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})



// 


// Company data
const companyData = ref({
  CompanyName: 'TechNova SARL',
  LogoUrl: 'https://i.pinimg.com/736x/0c/62/d9/0c62d97e0c074b9f68e307810ae78be0.jpg',
  city: 'Douala',
  country: 'Cameroon',
  languageAttachment: 'fr',
  RegisteredNumber: 'RC/DLA/2023/B/12987',
  admin: {
    name: "Ze Baby"
  }
});


// User data - informations du contractant
const userData = ref({
  email: 'jean.kamga@example.com',
  firstName: 'Jean',
  lastName: 'Kamga',
  phoneNumber: '+237694123456',
});


</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
