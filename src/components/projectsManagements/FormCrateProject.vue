<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Créer un nouveau projet</h2>
        <p class="text-sm text-gray-600">Remplissez les informations pour créer votre projet</p>
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
      <form @submit.prevent="createProject" class="space-y-6">
        <!-- Informations générales -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Informations générales</h3>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Nom du projet *</label>
            <input
              v-model="projectData.name"
              type="text"
              placeholder="Ex: Développement application mobile"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="projectData.description"
              placeholder="Décrivez brièvement le projet..."
              rows="3"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            ></textarea>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Objectif</label>
            <textarea
              v-model="projectData.objectif"
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
                v-model="projectData.status"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              >
                <option value="">Sélectionner un statut</option>
                <option v-for="status in projectStatuses" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Priorité *</label>
              <select
                v-model="projectData.priority"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              >
                <option value="">Sélectionner une priorité</option>
                <option v-for="priority in priorities" :key="priority.value" :value="priority.value">
                  <span :class="priority.colorClass">{{ priority.label }}</span>
                </option>
              </select>
            </div>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Date de début *</label>
            <input
              v-model="projectData.start"
              type="date"
              :min="today"
              class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required
            />
          </div>
        </div>

        <!-- Assignation -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Assignation</h3>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Manager *</label>
            <select
              v-model="projectData.managerId"
              class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required
            >
              <option value="">Sélectionner un manager</option>
              <option v-for="manager in managers" :key="manager.id" :value="manager.id">
                {{ manager.name }} - {{ manager.email }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Offre d'emploi liée</label>
            <select
              v-model="projectData.jobId"
              class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            >
              <option value="">Aucune offre liée</option>
              <option v-for="job in jobs" :key="job.id" :value="job.id">
                {{ job.title }} - {{ job.company }}
              </option>
            </select>
          </div>
        </div>

        <!-- Fichiers -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Fichiers du projet</h3>
            <button
              type="button"
              @click="addFile"
              :disabled="projectData.files.length >= 3"
              class="px-3 py-1 text-sm font-medium text-[#db147f] bg-white border border-[#db147f] rounded-lg hover:bg-[#db147f] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Ajouter un fichier
            </button>
          </div>

          <div v-if="projectData.files.length === 0" class="p-4 text-center text-gray-500 border-2 border-gray-300 border-dashed rounded-lg">
            <FileIcon class="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>Aucun fichier ajouté. Maximum 3 fichiers.</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(file, index) in projectData.files"
              :key="index"
              class="p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center justify-between mb-3">
                <h4 class="font-medium text-gray-900">Fichier {{ index + 1 }}</h4>
                <button
                  type="button"
                  @click="removeFile(index)"
                  class="p-1 text-red-600 hover:text-red-700"
                >
                  <XIcon class="w-4 h-4" />
                </button>
              </div>

              <div class="space-y-3">
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Nom du fichier</label>
                  <input
                    v-model="file.name"
                    type="text"
                    placeholder="Ex: Cahier des charges, Maquettes..."
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  />
                </div>

                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Type de fichier *</label>
                  <select
                    v-model="file.type"
                    class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    required
                  >
                    <option value="">Sélectionner un type</option>
                    <option v-for="type in fileTypes" :key="type.value" :value="type.value">
                      {{ type.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Fichier *</label>
                  <input
                    type="file"
                    @change="handleFileUpload($event, index)"
                    class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    required
                  />
                  <p v-if="file.url" class="mt-1 text-sm text-green-600">
                    ✓ Fichier sélectionné: {{ file.fileName }}
                  </p>
                </div>
              </div>
            </div>
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
      >
        Annuler
      </button>
      <button
        @click="createProject"
        :disabled="isSaving"
        class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSaving ? 'Création...' : 'Créer le projet' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { XIcon, FileIcon } from 'lucide-vue-next'

// Emits
const emit = defineEmits(['close', 'created'])

// Reactive data
const isSaving = ref(false)

// Project data structure
const projectData = ref({
  name: '',
  description: '',
  status: '',
  priority: '',
  start: '',
  objectif: '',
  managerId: null,
  jobId: null,
  files: []
})

// Options data
const projectStatuses = ref([
  { value: 'planning', label: 'Planification' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'on_hold', label: 'En pause' },
  { value: 'completed', label: 'Terminé' },
  { value: 'cancelled', label: 'Annulé' }
])

const priorities = ref([
  { value: 'low', label: 'Faible', colorClass: 'text-green-600' },
  { value: 'medium', label: 'Moyenne', colorClass: 'text-yellow-600' },
  { value: 'high', label: 'Élevée', colorClass: 'text-orange-600' },
  { value: 'urgent', label: 'Urgente', colorClass: 'text-red-600' }
])

const fileTypes = ref([
  { value: 'document', label: 'Document' },
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Vidéo' },
  { value: 'audio', label: 'Audio' },
  { value: 'archive', label: 'Archive' },
  { value: 'other', label: 'Autre' }
])

// Data from API
const managers = ref([])
const jobs = ref([])

// Computed properties
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Methods
const addFile = () => {
  if (projectData.value.files.length < 3) {
    projectData.value.files.push({
      name: '',
      type: '',
      url: '',
      fileName: ''
    })
  }
}

const removeFile = (index) => {
  projectData.value.files.splice(index, 1)
}

const handleFileUpload = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    // Simuler l'upload du fichier
    const formData = new FormData()
    formData.append('file', file)
    
    // Ici vous feriez l'appel API pour uploader le fichier
    // Pour la démo, on simule une URL
    projectData.value.files[index].url = URL.createObjectURL(file)
    projectData.value.files[index].fileName = file.name
    
    console.log('File uploaded:', file.name)
  }
}

const fetchManagers = async () => {
  try {
    // Simuler l'appel API pour récupérer les managers
    const response = await fetch('/api/managers')
    if (response.ok) {
      managers.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching managers:', error)
    // Données de test
    managers.value = [
      { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com' },
      { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com' },
      { id: 3, name: 'Pierre Durand', email: 'pierre.durand@example.com' }
    ]
  }
}

const fetchJobs = async () => {
  try {
    // Simuler l'appel API pour récupérer les jobs
    const response = await fetch('/api/jobs')
    if (response.ok) {
      jobs.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching jobs:', error)
    // Données de test
    jobs.value = [
      { id: 1, title: 'Développeur Frontend', company: 'TechCorp' },
      { id: 2, title: 'Designer UX/UI', company: 'DesignStudio' },
      { id: 3, title: 'Chef de projet', company: 'ProjectCo' }
    ]
  }
}

const createProject = async () => {
  isSaving.value = true
  
  try {
    // Validation côté client
    if (!projectData.value.name || !projectData.value.status || !projectData.value.priority || !projectData.value.start || !projectData.value.managerId) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    // Préparation des données
    const formData = new FormData()
    
    const projectPayload = {
      ...projectData.value,
      files: projectData.value.files.filter(file => file.url && file.type)
    }
    
    formData.append('data', JSON.stringify(projectPayload))
    
    // Ajouter les fichiers au FormData
    projectData.value.files.forEach((file, index) => {
      if (file.url && file.url.startsWith('blob:')) {
        // Récupérer le fichier depuis l'URL blob
        fetch(file.url)
          .then(res => res.blob())
          .then(blob => {
            formData.append(`file_${index}`, blob, file.fileName)
          })
      }
    })

    // Appel API
    const response = await fetch('/api/projects', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Erreur lors de la création (${response.status})`)
    }

    const createdProject = await response.json()
    
    console.log('Project created:', createdProject)
    emit('created', createdProject)
    alert('Projet créé avec succès !')
    
  } catch (error) {
    console.error('Error creating project:', error)
    alert('Erreur lors de la création du projet: ' + error.message)
  } finally {
    isSaving.value = false
  }
}

// Initialize data on mount
onMounted(() => {
  fetchManagers()
  fetchJobs()
  
  // Set default start date to today
  projectData.value.start = today.value
})
</script>

<style scoped>
/* Custom scrollbar for the form content */
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
