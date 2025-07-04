<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Modifier le projet</h2>
        <p class="text-sm text-gray-600">Modifiez les informations du projet</p>
      </div>
      <button
        @click="$emit('close')"
        class="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-100"
      >
        <XIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Form Content -->
    <div class="flex-1 p-6 overflow-y-auto">
      <!-- Messages d'erreur/succès -->
      <div v-if="errorMessage" class="p-4 mb-4 border border-red-200 rounded-lg bg-red-50">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <div v-if="successMessage" class="p-4 mb-4 border border-green-200 rounded-lg bg-green-50">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-800">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="updateProject" class="space-y-6">
        <!-- Informations générales -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Informations générales</h3>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">
              Nom du projet *
            </label>
            <input
              v-model="localProjectData.name"
              type="text"
              placeholder="Ex: Développement application mobile"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              :class="{ 'border-red-300': errors.name }"
              required
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="localProjectData.description"
              placeholder="Décrivez brièvement le projet..."
              rows="3"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              :class="{ 'border-red-300': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Objectif</label>
            <textarea
              v-model="localProjectData.objectif"
              placeholder="Définissez l'objectif principal du projet..."
              rows="2"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            ></textarea>
          </div>
        </div>

        <!-- Configuration -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Configuration</h3>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Statut *</label>
              <select
                v-model="localProjectData.status"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                :class="{ 'border-red-300': errors.status }"
                required
              >
                <option value="">Sélectionner un statut</option>
                <option v-for="status in projectStatuses" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
              <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Priorité *</label>
              <select
                v-model="localProjectData.priority"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                :class="{ 'border-red-300': errors.priority }"
                required
              >
                <option value="">Sélectionner une priorité</option>
                <option v-for="priority in priorities" :key="priority.value" :value="priority.value">
                  {{ priority.label }}
                </option>
              </select>
              <p v-if="errors.priority" class="mt-1 text-sm text-red-600">{{ errors.priority }}</p>
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Date de début *</label>
            <input
              v-model="formattedStartDate"
              type="date"
              class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              :class="{ 'border-red-300': errors.start }"
              required
            />
            <p v-if="errors.start" class="mt-1 text-sm text-red-600">{{ errors.start }}</p>
          </div>
        </div>

        <!-- Assignation -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Assignation</h3>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Manager *</label>
            <select
              v-model="localProjectData.managerId"
              class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              :class="{ 'border-red-300': errors.managerId }"
              required
            >
              <option value="">Sélectionner un manager</option>
              <option v-for="member in membersList" :key="member.id" :value="member.id">
                {{ member.firstName }} {{ member.lastName }}
              </option>
            </select>
            <p v-if="errors.managerId" class="mt-1 text-sm text-red-600">{{ errors.managerId }}</p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Offre d'emploi liée</label>
            <div class="relative">
              <select
                disabled
                v-model="localProjectData.jobId"
                class="w-full px-3 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
              >
                <option :value="localProjectData.job?.id">
                  {{ localProjectData.job?.title || 'Aucune offre liée' }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
            </div>
            <p class="mt-1 text-xs text-gray-500">L'offre d'emploi ne peut pas être modifiée après la création du projet.</p>
          </div>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
      <button
        type="button"
        @click="$emit('close')"
        class="px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
        :disabled="isSaving"
      >
        Annuler
      </button>
      <button
        @click="updateProject"
        :disabled="isSaving || !isFormValid"
        class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSaving" class="flex items-center">
          <svg class="w-4 h-4 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Mise à jour...
        </span>
        <span v-else>Mettre à jour</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { XIcon } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  projectData: {
    type: Object,
    required: true
  },
  membersList: {
    type: Array,
    required: false,
    default: () => []
  }
})

const emit = defineEmits(['close', 'updated'])

const route = useRoute()
const auth = useAuthStore()

const isSaving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const errors = ref({})

// Options data
const projectStatuses = ref([
  { value: 'open', label: 'open' },
  { value: 'in_progress', label: 'in progress' },
  { value: 'completed', label: 'completed' },
  { value: 'closed', label: 'closed' }
])

const priorities = ref([
  { value: 'HIGH', label: 'high' },
  { value: 'MEDIUM', label: 'medium' },
  { value: 'LOW', label: 'low' },
])

const localProjectData = ref({
  id: props.projectData.id,
  name: props.projectData.name || '',
  description: props.projectData.description || '',
  status: props.projectData.status || '',
  priority: props.projectData.priority || '',
  start: props.projectData.start || '',
  objectif: props.projectData.objectif || '',
  managerId: props.projectData.managerId || props.projectData.manager?.id,
  jobId: props.projectData.jobId || props.projectData.job?.id,
  manager: props.projectData.manager,
  job: props.projectData.job,
  slug: props.projectData.slug
})

// Computed pour la date formatée
const formattedStartDate = computed({
  get() {
    if (!localProjectData.value.start) return ''
    if (/^\d{4}-\d{2}-\d{2}$/.test(localProjectData.value.start)) {
      return localProjectData.value.start
    }
    const date = new Date(localProjectData.value.start)
    if (isNaN(date.getTime())) return ''
    return date.toISOString().split('T')[0]
  },
  set(value) {
    localProjectData.value.start = value || ''
    // Effacer l'erreur de date si elle existe
    if (errors.value.start) {
      delete errors.value.start
    }
  }
})

// Validation du formulaire
const isFormValid = computed(() => {
  return localProjectData.value.name &&
         localProjectData.value.status &&
         localProjectData.value.priority &&
         localProjectData.value.start &&
         localProjectData.value.managerId &&
         Object.keys(errors.value).length === 0
})

// Fonction de validation
const validateForm = () => {
  errors.value = {}

  if (!localProjectData.value.name?.trim()) {
    errors.value.name = 'Le nom du projet est requis'
  }

  if (!localProjectData.value.status) {
    errors.value.status = 'Le statut est requis'
  }

  if (!localProjectData.value.priority) {
    errors.value.priority = 'La priorité est requise'
  }

  if (!localProjectData.value.start) {
    errors.value.start = 'La date de début est requise'
  }

  if (!localProjectData.value.managerId) {
    errors.value.managerId = 'Le manager est requis'
  }

  return Object.keys(errors.value).length === 0
}

// Fonction de mise à jour du projet
const updateProject = async () => {
  // Réinitialiser les messages
  errorMessage.value = ''
  successMessage.value = ''

  // Valider le formulaire
  if (!validateForm()) {
    errorMessage.value = 'Veuillez corriger les erreurs dans le formulaire'
    return
  }

  isSaving.value = true
  
  try {
    const updateData = {
      name: localProjectData.value.name.trim(),
      description: localProjectData.value.description?.trim() || '',
      status: localProjectData.value.status,
      priority: localProjectData.value.priority,
      start: formattedStartDate.value,
      objectif: localProjectData.value.objectif?.trim() || '',
      managerId: localProjectData.value.managerId,
      jobId: localProjectData.value.jobId,
    }
    
    const companyId = route.params.companyId
    
    const response = await auth.api(
      "PUT",
      `/companies/${companyId}/projects/${localProjectData.value.slug}/update`,
      updateData,
      true
    )   

    if (response.success) {
      successMessage.value = 'Projet mis à jour avec succès !'
      emit('updated', response.data)
      
      // Fermer le modal après un délai
      setTimeout(() => {
        emit('close')
      }, 1500)
      
      window.location.reload()
    } else {
      throw new Error(response.message || 'Erreur lors de la mise à jour')
    }
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error)
    errorMessage.value = error.message || 'Une erreur est survenue lors de la mise à jour du projet'
  } finally {
    isSaving.value = false
  }
}

// Watchers pour effacer les erreurs lors de la saisie
watch(() => localProjectData.value.name, () => {
  if (errors.value.name) delete errors.value.name
})

watch(() => localProjectData.value.status, () => {
  if (errors.value.status) delete errors.value.status
})

watch(() => localProjectData.value.priority, () => {
  if (errors.value.priority) delete errors.value.priority
})

watch(() => localProjectData.value.managerId, () => {
  if (errors.value.managerId) delete errors.value.managerId
})
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>