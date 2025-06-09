<template>
  <div class="w-full">
     <!-- Formulaire de création/modification -->
    <div v-if="showFormCreateCompanie" class="w-full mt-4">
      <FormCreateOrUpdateCompanie
        :versionData="selectedVersion"
        :isVersion="isVersionMode"
        @close-form="closeForm"
        @version-saved="handleVersionSaved"
      />
    </div>
    <div v-else class="min-h-screen bg-gray-50">
      <div class="p-6 mx-auto max-w-7xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <button @click="goBack" class="flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeftIcon class="w-5 h-5 mr-1" />
            Back
          </button>
          <button
            @click="OpenCreateNewVersionForm"
            class="px-4 py-2 font-medium text-white bg-[#db147f] rounded-lg hover:bg-[#c41370] transition-colors"
          >
            <Plus class="inline-block w-4 h-4 mr-1" />
            New Vwesion
          </button>
        </div>

        <!-- Title -->
        <div class="mb-6">
          <h1 class="text-xl font-bold text-gray-900">Companie Versions</h1>
        </div>

        <div class="overflow-auto bg-white border border-gray-200 rounded-lg">
          <div class="grid grid-cols-5 border-b border-gray-200 7">
            <div class="px-6 py-3 text-sm font-bold text-gray-700">Name</div>
            <div class="px-6 py-3 text-sm font-bold text-left text-gray-700">Version</div>
            <div class="px-6 py-3 text-sm font-bold text-left text-gray-700">Last updated</div>
            <div class="flex items-center justify-center px-6 py-3 font-bold text-left text-gray-700">Status</div>
            <div class="px-6 py-3 text-sm font-bold text-center text-gray-700">Actions</div>
          </div>

          <div v-for="version in versions" :key="version.id" class="grid grid-cols-5 border-b border-gray-200">
            <div class="px-6 py-4 text-sm font-bold text-gray-900">{{ version.name }}</div>
            <div class="px-6 py-4 text-sm text-gray-900">{{ version.version }}</div>
            <div class="px-6 py-4 text-sm text-gray-500">{{ version.lastUpdated }}</div>
            <div class="flex items-center justify-center px-6 py-4">
              <div class="flex items-center">
                <span 
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    !version.status ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' : 'bg-[#fff0fb] text-[#db147f] shadow-sm'
                  ]"
                >
                  {{ version.status ? "Activated" : "Unactive" }} 
                </span>
              </div>
            </div>
            <div class="flex items-center justify-center px-6 py-4">
              <div class="relative">
                <button 
                  @click="toggleActionMenu(version.id)"
                  class="p-1 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
                >
                  <MoreVerticalIcon class="w-5 h-5" />
                </button>
                
                <!-- Dropdown Menu -->
                <div 
                  v-if="activeActionMenu === version.id"
                  class="absolute right-0 z-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg top-8"
                >
                  <div class="py-1">
                    <button
                      @click="editVersion(version)"
                      class="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    >
                      <EditIcon class="w-4 h-4 mr-2" />
                      Modifier
                    </button>
                    <button
                      @click="toggleVersionStatus(version)"
                      class="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                    >
                      <ToggleLeftIcon v-if="!version.status" class="w-4 h-4 mr-2" />
                      <ToggleRightIcon v-else class="w-4 h-4 mr-2" />
                      {{ version.status ? 'Désactiver' : 'Activer' }}
                    </button>
                    <button
                      @click="deleteVersion(version)"
                      class="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon class="w-4 h-4 mr-2" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { 
  ChevronLeftIcon, 
  EditIcon, 
  MoreVerticalIcon, 
  Plus, 
  ToggleLeftIcon, 
  ToggleRightIcon, 
  TrashIcon 
} from 'lucide-vue-next'
import FormCreateOrUpdateCompanie from '@/components/profile/FormCreateOrUpdateCompanie.vue'

// États réactifs
const showFormCreateCompanie = ref(false)
const selectedVersion = ref(null)
const isVersionMode = ref(false)
const activeActionMenu = ref(null)

const versions = ref([
  {
    id: 1,
    name: 'Orange CRM Solutions',
    version: '1.7',
    lastUpdated: '02/10/2024 16:30',
    status: true,
    industry: 'Technology & Software',
    description: 'Leading CRM solutions provider specializing in customer relationship management and business automation tools.',
    email: 'contact@orangecrm.com',
    phoneNumber: '+33 1 45 67 89 12',
    address: '123 Avenue des Champs-Élysées, 75008 Paris, France',
    firstLangage: 'French',
    country: 'France',
    city: 'Paris',
    avatarUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center',
    coverUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=200&fit=crop&crop=center',
    socialStatus: 'SAS (Société par Actions Simplifiée)',
    registrationNumber: 'RCS Paris 123 456 789',
    certificateOfIncorporation: 'https://example.com/certificates/orange-crm-cert.pdf',
    isActive: true
  },
  {
    id: 2,
    name: 'Orange Digital Services',
    version: '1.6',
    lastUpdated: '21/08/2024 13:45',
    status: false,
    industry: 'Digital Marketing',
    description: 'Comprehensive digital marketing and web development services for modern businesses.',
    email: 'info@orangedigital.fr',
    phoneNumber: '+33 1 42 33 44 55',
    address: '45 Rue de Rivoli, 75001 Paris, France',
    firstLangage: 'French',
    country: 'France',
    city: 'Paris',
    avatarUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=200&fit=crop&crop=center',
    coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=200&fit=crop&crop=center',
    socialStatus: 'SARL (Société à Responsabilité Limitée)',
    registrationNumber: 'RCS Paris 987 654 321',
    certificateOfIncorporation: 'https://example.com/certificates/orange-digital-cert.pdf',
    isActive: false
  },
  {
    id: 3,
    name: 'Orange Analytics Pro',
    version: '1.5',
    lastUpdated: '07/02/2024 12:20',
    status: false,
    industry: 'Data Analytics',
    description: 'Advanced data analytics and business intelligence solutions for enterprise clients.',
    email: 'analytics@orangepro.com',
    phoneNumber: '+33 1 56 78 90 12',
    address: '78 Boulevard Saint-Germain, 75005 Paris, France',
    firstLangage: 'English',
    country: 'France',
    city: 'Paris',
    avatarUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop&crop=center',
    coverUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=200&fit=crop&crop=center',
    socialStatus: 'SA (Société Anonyme)',
    registrationNumber: 'RCS Paris 456 789 123',
    certificateOfIncorporation: 'https://example.com/certificates/orange-analytics-cert.pdf',
    isActive: false
  },
  {
    id: 4,
    name: 'Orange Cloud Systems',
    version: '1.4',
    lastUpdated: '19/12/2023 17:15',
    status: false,
    industry: 'Cloud Computing',
    description: 'Secure cloud infrastructure and hosting solutions for businesses of all sizes.',
    email: 'cloud@orangesystems.fr',
    phoneNumber: '+33 1 34 56 78 90',
    address: '156 Rue de la Paix, 75002 Paris, France',
    firstLangage: 'French',
    country: 'France',
    city: 'Paris',
    avatarUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=200&fit=crop&crop=center',
    coverUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=200&fit=crop&crop=center',
    socialStatus: 'SAS (Société par Actions Simplifiée)',
    registrationNumber: 'RCS Paris 789 123 456',
    certificateOfIncorporation: 'https://example.com/certificates/orange-cloud-cert.pdf',
    isActive: false
  },
  {
    id: 5,
    name: 'Orange Mobile Solutions',
    version: '1.3',
    lastUpdated: '19/12/2023 10:30',
    status: false,
    industry: 'Mobile Development',
    description: 'Innovative mobile application development and mobile-first solutions.',
    email: 'mobile@orangesolutions.com',
    phoneNumber: '+33 1 67 89 01 23',
    address: '89 Avenue Montaigne, 75008 Paris, France',
    firstLangage: 'French',
    country: 'France',
    city: 'Paris',
    avatarUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop&crop=center',
    coverUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=200&fit=crop&crop=center',
    socialStatus: 'SARL (Société à Responsabilité Limitée)',
    registrationNumber: 'RCS Paris 321 654 987',
    certificateOfIncorporation: 'https://example.com/certificates/orange-mobile-cert.pdf',
    isActive: false
  },
  {
    id: 6,
    name: 'Orange E-commerce Hub',
    version: '1.2',
    lastUpdated: '18/12/2023 23:10',
    status: false,
    industry: 'E-commerce',
    description: 'Complete e-commerce platform solutions and online marketplace development.',
    email: 'ecommerce@orangehub.fr',
    phoneNumber: '+33 1 78 90 12 34',
    address: '234 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
    firstLangage: 'French',
    country: 'France',
    city: 'Paris',
    avatarUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop&crop=center',
    coverUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=200&fit=crop&crop=center',
    socialStatus: 'SAS (Société par Actions Simplifiée)',
    registrationNumber: 'RCS Paris 654 987 321',
    certificateOfIncorporation: 'https://example.com/certificates/orange-ecommerce-cert.pdf',
    isActive: false
  },
  {
    id: 7,
    name: 'Orange Security Services',
    version: '1.1',
    lastUpdated: '15/12/2023 18:45',
    status: false,
    industry: 'Cybersecurity',
    description: 'Comprehensive cybersecurity solutions and IT security consulting services.',
    email: 'security@orangeprotect.com',
    phoneNumber: '+33 1 89 01 23 45',
    address: '67 Boulevard Haussmann, 75009 Paris, France',
    firstLangage: 'English',
    country: 'France',
    city: 'Paris',
    avatarUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop&crop=center',
    coverUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=200&fit=crop&crop=center',
    socialStatus: 'SA (Société Anonyme)',
    registrationNumber: 'RCS Paris 147 258 369',
    certificateOfIncorporation: 'https://example.com/certificates/orange-security-cert.pdf',
    isActive: false
  },
  {
    id: 8,
    name: 'Orange Consulting Group',
    version: '1.0',
    lastUpdated: '21/11/2023 12:30',
    status: false,
    industry: 'Business Consulting',
    description: 'Strategic business consulting and digital transformation advisory services.',
    email: 'consulting@orangegroup.fr',
    phoneNumber: '+33 1 90 12 34 56',
    address: '12 Place Vendôme, 75001 Paris, France',
    firstLangage: 'French',
    country: 'France',
    city: 'Paris',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=center',
    coverUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=200&fit=crop&crop=center',
    socialStatus: 'SAS (Société par Actions Simplifiée)',
    registrationNumber: 'RCS Paris 963 852 741',
    certificateOfIncorporation: 'https://example.com/certificates/orange-consulting-cert.pdf',
    isActive: false
  }
])

// Méthodes
const goBack = () => {
  console.log('Go back')
  // Implémentation de la navigation retour
}

const OpenCreateNewVersionForm = () => {
  // Trouver la version draft (la première avec status true ou la plus récente)
  isVersionMode.value = true
  showFormCreateCompanie.value = true
  activeActionMenu.value = null
}

const editVersion = (version) => {
  selectedVersion.value = version
  isVersionMode.value = true
  showFormCreateCompanie.value = true
  activeActionMenu.value = null
}

const toggleVersionStatus = (version) => {
  version.status = !version.status
  version.lastUpdated = new Date().toLocaleDateString('fr-FR') + ' ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  activeActionMenu.value = null
}

const deleteVersion = (version) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer la version ${version.version} ?`)) {
    const index = versions.value.findIndex(v => v.id === version.id)
    if (index !== -1) {
      versions.value.splice(index, 1)
    }
  }
  activeActionMenu.value = null
}

const toggleActionMenu = (versionId) => {
  activeActionMenu.value = activeActionMenu.value === versionId ? null : versionId
}

const closeForm = () => {
  showFormCreateCompanie.value = false
  selectedVersion.value = null
  isVersionMode.value = false
}

const handleVersionSaved = (savedVersion) => {
  if (isVersionMode.value) {
    // Mettre à jour la version existante
    const index = versions.value.findIndex(v => v.id === savedVersion.id)
    if (index !== -1) {
      versions.value[index] = { ...savedVersion }
    }
  } else {
    // Ajouter une nouvelle version
    versions.value.unshift(savedVersion)
  }
  closeForm()
}

// Fermer le menu d'actions quand on clique ailleurs
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    activeActionMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.grid-cols-5 {
  grid-template-columns: 1.5fr 0.8fr 1.5fr 1fr 0.8fr;
}
</style>
