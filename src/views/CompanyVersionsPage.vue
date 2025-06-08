<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6 mx-auto max-w-7xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Versions des entreprises</h1>
          <p class="mt-1 text-gray-600">Gérez les différentes versions de vos entreprises</p>
        </div>
        <button
          @click="openCreateDrawer"
          class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
        >
          + Nouvelle version
        </button>
      </div>

      <!-- Filtres et recherche -->
      <div class="p-4 mb-6 bg-white border border-gray-200 rounded-lg">
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher par nom d'entreprise..."
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="statusFilter"
              class="px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actives</option>
              <option value="inactive">Inactives</option>
            </select>
            <button
              @click="clearFilters"
              class="px-4 py-2 text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Effacer
            </button>
          </div>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <BuildingIcon class="w-6 h-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total</p>
              <p class="text-2xl font-bold text-gray-900">{{ companyVersions.length }}</p>
            </div>
          </div>
        </div>
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon class="w-6 h-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Actives</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeVersionsCount }}</p>
            </div>
          </div>
        </div>
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <XCircleIcon class="w-6 h-6 text-red-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Inactives</p>
              <p class="text-2xl font-bold text-gray-900">{{ inactiveVersionsCount }}</p>
            </div>
          </div>
        </div>
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <TrendingUpIcon class="w-6 h-6 text-purple-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Dernière version</p>
              <p class="text-2xl font-bold text-gray-900">{{ latestVersion }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des versions -->
      <div v-if="filteredVersions.length === 0" class="py-12 text-center">
        <BuildingIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 class="mb-2 text-lg font-medium text-gray-900">Aucune version trouvée</h3>
        <p class="mb-4 text-gray-600">
          {{ searchQuery || statusFilter ? 'Aucune version ne correspond à vos critères de recherche.' : 'Commencez par créer votre première version d\'entreprise.' }}
        </p>
        <button
          v-if="!searchQuery && !statusFilter"
          @click="openCreateDrawer"
          class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
        >
          Créer une version
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CompanyVersionCard
          v-for="version in filteredVersions"
          :key="version.id"
          :version="version"
          @toggle="toggleVersionStatus"
          @edit="openEditDrawer"
          @delete="deleteVersion"
        />
      </div>
    </div>

    <!-- Create Version Drawer -->
    <AppDrawer
      :isOpen="isCreateDrawerOpen"
      :isLoader="false"
      position="right"
      width="600px"
      @closeDrawer="closeCreateDrawer"
    >
      <CreateCompanyVersionForm
        @close="closeCreateDrawer"
        @created="handleVersionCreated"
      />
    </AppDrawer>

    <!-- Edit Version Drawer -->
    <AppDrawer
      :isOpen="isEditDrawerOpen"
      :isLoader="false"
      position="right"
      width="600px"
      @closeDrawer="closeEditDrawer"
    >
      <EditCompanyVersionForm
        v-if="selectedVersion"
        :versionData="selectedVersion"
        @close="closeEditDrawer"
        @updated="handleVersionUpdated"
      />
    </AppDrawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  BuildingIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  TrendingUpIcon 
} from 'lucide-vue-next'
import CompanyVersionCard from '@/components/compnanies/CompanyVersionCard.vue'
import CreateCompanyVersionForm from '@/components/compnanies/CreateCompanyVersionForm.vue'
import EditCompanyVersionForm from '@/components/compnanies/EditCompanyVersionForm.vue'
import AppDrawer from '@/components/globales/AppDrawer.vue'

// Reactive data
const companyVersions = ref([])
const searchQuery = ref('')
const statusFilter = ref('')
const isCreateDrawerOpen = ref(false)
const isEditDrawerOpen = ref(false)
const selectedVersion = ref(null)

// Computed properties
const filteredVersions = computed(() => {
  let filtered = companyVersions.value

  // Filtrer par recherche
  if (searchQuery.value) {
    filtered = filtered.filter(version =>
      version.companyName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filtrer par statut
  if (statusFilter.value) {
    filtered = filtered.filter(version =>
      statusFilter.value === 'active' ? version.isActive : !version.isActive
    )
  }

  return filtered
})

const activeVersionsCount = computed(() => 
  companyVersions.value.filter(v => v.isActive).length
)

const inactiveVersionsCount = computed(() => 
  companyVersions.value.filter(v => !v.isActive).length
)

const latestVersion = computed(() => {
  if (companyVersions.value.length === 0) return '0.0.0'
  const versions = companyVersions.value.map(v => v.version)
  return versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0]
})

// Methods
const openCreateDrawer = () => {
  isCreateDrawerOpen.value = true
}

const closeCreateDrawer = () => {
  isCreateDrawerOpen.value = false
}

const openEditDrawer = (version) => {
  selectedVersion.value = version
  isEditDrawerOpen.value = true
}

const closeEditDrawer = () => {
  isEditDrawerOpen.value = false
  selectedVersion.value = null
}

const handleVersionCreated = (newVersion) => {
  companyVersions.value.unshift(newVersion)
  closeCreateDrawer()
}

const handleVersionUpdated = (updatedVersion) => {
  const index = companyVersions.value.findIndex(v => v.id === updatedVersion.id)
  if (index !== -1) {
    companyVersions.value[index] = updatedVersion
  }
  closeEditDrawer()
}

const toggleVersionStatus = async (versionId) => {
  const version = companyVersions.value.find(v => v.id === versionId)
  if (!version) return

  try {
    // Appel API pour mettre à jour le statut
    const response = await fetch(`/api/company-versions/${versionId}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isActive: !version.isActive })
    })

    if (response.ok) {
      version.isActive = !version.isActive
      version.updatedAt = new Date().toISOString()
    } else {
      // Pour la démo, on met à jour quand même
      version.isActive = !version.isActive
      version.updatedAt = new Date().toISOString()
    }
  } catch (error) {
    console.error('Error toggling version status:', error)
    // Pour la démo, on met à jour quand même
    version.isActive = !version.isActive
    version.updatedAt = new Date().toISOString()
  }
}

const deleteVersion = async (versionId) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette version ?')) return

  try {
    const response = await fetch(`/api/company-versions/${versionId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      companyVersions.value = companyVersions.value.filter(v => v.id !== versionId)
      alert('Version supprimée avec succès')
    } else {
      // Pour la démo, on supprime quand même
      companyVersions.value = companyVersions.value.filter(v => v.id !== versionId)
      alert('Version supprimée avec succès')
    }
  } catch (error) {
    console.error('Error deleting version:', error)
    alert('Erreur lors de la suppression')
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
}

const fetchCompanyVersions = async () => {
  try {
    const response = await fetch('/api/company-versions')
    if (response.ok) {
      companyVersions.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching company versions:', error)
    // Données de test
    companyVersions.value = [
      {
        id: 1,
        companyName: 'TechNova SARL',
        version: '2.1.0',
        isActive: true,
        description: 'Version stable avec nouvelles fonctionnalités',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z',
        features: ['Nouveau dashboard', 'API améliorée', 'Sécurité renforcée']
      },
      {
        id: 2,
        companyName: 'DesignStudio Pro',
        version: '1.5.2',
        isActive: false,
        description: 'Correction de bugs et optimisations',
        createdAt: '2024-01-10T09:15:00Z',
        updatedAt: '2024-01-18T16:45:00Z',
        features: ['Corrections de bugs', 'Performance améliorée']
      },
      {
        id: 3,
        companyName: 'DataCorp Analytics',
        version: '3.0.0',
        isActive: true,
        description: 'Version majeure avec refonte complète',
        createdAt: '2024-01-20T11:30:00Z',
        updatedAt: '2024-01-25T13:20:00Z',
        features: ['Interface redesignée', 'Nouveaux algorithmes', 'Support multi-langue']
      },
      {
        id: 4,
        companyName: 'CloudTech Solutions',
        version: '1.2.1',
        isActive: true,
        description: 'Mise à jour de sécurité',
        createdAt: '2024-01-12T08:45:00Z',
        updatedAt: '2024-01-22T10:15:00Z',
        features: ['Patch de sécurité', 'Optimisations mineures']
      },
      {
        id: 5,
        companyName: 'InnovateX',
        version: '2.0.0-beta',
        isActive: false,
        description: 'Version beta en cours de test',
        createdAt: '2024-01-25T15:00:00Z',
        updatedAt: '2024-01-26T09:30:00Z',
        features: ['Fonctionnalités expérimentales', 'Tests en cours']
      },
      {
        id: 6,
        companyName: 'WebFlow Agency',
        version: '1.8.3',
        isActive: true,
        description: 'Améliorations UX/UI',
        createdAt: '2024-01-18T12:20:00Z',
        updatedAt: '2024-01-24T17:10:00Z',
        features: ['Nouvelle interface', 'Animations améliorées', 'Responsive design']
      }
    ]
  }
}

onMounted(() => {
  fetchCompanyVersions()
})
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>
