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
              placeholder="Ex : Développement application mobile"
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
                  {{ priority.label }}
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
                {{ manager.firstName }} 
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
                {{ job.title }} 
              </option>
            </select>
          </div>
        </div>

        <!-- Gestion des fichiers -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Documents du projet</h3>
            <span class="text-sm text-gray-500">{{ projectData.files.length }}/3 fichiers</span>
          </div>

          <!-- Zone de sélection de fichiers -->
          <div class="space-y-4">
            <!-- Bouton de sélection multiple -->
            <div class="flex items-center gap-3">
              <input
                ref="fileInput"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.mp4,.avi,.mov,.docx"
                @change="handleMultipleFileSelection"
                class="hidden"
              />
              <button
                type="button"
                @click="$refs.fileInput.click()"
                :disabled="projectData.files.length >= 3"
                class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <UploadIcon class="w-4 h-4" />
                Sélectionner des fichiers
              </button>
              <p class="text-sm text-gray-500">
                Maximum 3 fichiers (PDF, Images, Vidéos, DOCX)
              </p>
            </div>

            <!-- Zone de glisser-déposer
            <div
              @drop="handleFileDrop"
              @dragover.prevent
              @dragenter.prevent
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                isDragOver ? 'border-[#db147f] bg-pink-50' : 'border-gray-300'
              ]"
              @dragenter="isDragOver = true"
              @dragleave="isDragOver = false"
            >
              <UploadCloudIcon class="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p class="mb-2 text-lg font-medium text-gray-900">
                Glissez et déposez vos fichiers ici
              </p>
              <p class="text-sm text-gray-500">
                ou cliquez sur "Sélectionner des fichiers" ci-dessus
              </p>
            </div> -->
          </div>

          <!-- Liste des fichiers sélectionnés -->
          <div v-if="projectData.files.length > 0" class="space-y-3">
            <h4 class="text-sm font-medium text-gray-900">Fichiers sélectionnés :</h4>
            <div class="space-y-2">
              <div
                v-for="(file, index) in projectData.files"
                :key="index"
                class="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
              >
                <div class="flex items-center gap-3">
                  <div class="flex-shrink-0">
                    <FileTextIcon v-if="isDocumentFile(file.type)" class="w-8 h-8 text-blue-500" />
                    <ImageIcon v-else-if="isImageFile(file.type)" class="w-8 h-8 text-green-500" />
                    <VideoIcon v-else-if="isVideoFile(file.type)" class="w-8 h-8 text-purple-500" />
                    <FileIcon v-else class="w-8 h-8 text-gray-500" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">
                      {{ file.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ formatFileSize(file.size) }} • {{ file.type || 'Type inconnu' }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <!-- Indicateur de statut d'upload -->
                  <div v-if="file.uploading" class="flex items-center gap-2">
                    <div class="w-4 h-4 border-2 border-[#db147f] border-t-transparent rounded-full animate-spin"></div>
                    <span class="text-xs text-gray-500">{{ file.uploadProgress }}%</span>
                  </div>
                  <CheckCircleIcon v-else-if="file.uploaded" class="w-5 h-5 text-green-500" />
                  
                  <!-- Bouton de suppression -->
                  <button
                    type="button"
                    @click="removeFile(index)"
                    class="p-1 text-gray-400 transition-colors hover:text-red-500"
                  >
                    <XIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- État vide -->
          <div v-else class="p-8 text-center text-gray-500 border-2 border-gray-200 border-dashed rounded-lg">
            <FolderIcon class="w-8 h-8 mx-auto mb-4 text-gray-300" />
            <p class="mb-2 text-lg font-medium text-gray-400">Aucun fichier ajouté</p>
            <p class="text-sm text-gray-400">
              Ajoutez des documents pour enrichir votre projet
            </p>
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
        :disabled="isSaving || isUploading"
        class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="isSaving" class="flex items-center gap-2">
          <div class="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          Création...
        </span>
        <span v-else>Créer le projet</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  XIcon, 
  FileIcon, 
  UploadIcon, 
  UploadCloudIcon, 
  FileTextIcon, 
  ImageIcon, 
  FolderIcon,
  CheckCircleIcon,
  VideoIcon
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { AppwriteuploadFile } from '@/app_write/files'
import { Notyf } from 'notyf'

// Emits
const emit = defineEmits(['close', 'created'])

// Reactive data
const isSaving = ref(false)
const isUploading = ref(false)
const isDragOver = ref(false)
const route = useRoute()
const auth = useAuthStore()
const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 })

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
  { value: 'open', label: 'Ouvert' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'completed', label: 'Terminé' },
  { value: 'closed', label: 'Fermé' }
])

const priorities = ref([
  { value: 'HIGH', label: 'Haute' },
  { value: 'MEDIUM', label: 'Moyenne' },
  { value: 'LOW', label: 'Basse' },
])

// Data from API
const managers = ref([])
const jobs = ref([])

// Computed properties
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// File management methods
const handleMultipleFileSelection = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

const handleFileDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

const processFiles = async (files) => {
  // Vérifier la limite de fichiers
  const remainingSlots = 3 - projectData.value.files.length
  const filesToProcess = files.slice(0, remainingSlots)

  if (files.length > remainingSlots) {
    notyf.error(`Vous ne pouvez ajouter que ${remainingSlots} fichier(s) supplémentaire(s).`)
  }

  for (const file of filesToProcess) {
    // Vérifier la taille du fichier (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      notyf.error(`Le fichier "${file.name}" est trop volumineux (max 10MB).`)
      continue
    }

    // Vérifier le type de fichier
    if (!isValidFileType(file)) {
      notyf.error(`Le fichier "${file.name}" n'est pas un type de fichier accepté.`)
      continue
    }

    // Créer l'objet fichier avec le type formaté
    const fileObj = {
      name: file.name,
      size: file.size,
      type: formatFileType(file.type),
      file: file,
      uploading: false,
      uploaded: false,
      uploadProgress: 0,
      url: null
    }

    projectData.value.files.push(fileObj)

    // Upload vers Appwrite
    await uploadFile(fileObj)
  }
}

const uploadFile = async (fileObj) => {
  fileObj.uploading = true
  isUploading.value = true

  try {
    // Upload vers Appwrite
    const data = await AppwriteuploadFile(fileObj.file)

    if (data.isCreate) {
      // Construire l'URL comme dans accountDetail.vue
      const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL
      const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID
      const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID

      fileObj.url = `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`
      fileObj.uploaded = true
      fileObj.uploadProgress = 100
      
      notyf.success(`Fichier ${fileObj.name} uploadé avec succès`)
    } else {
      console.error('Erreur upload:', data.message)
      notyf.error(data.message || `Erreur lors de l'upload de ${fileObj.name}`)
      
      // Retirer le fichier de la liste en cas d'erreur
      const index = projectData.value.files.findIndex(f => f.name === fileObj.name)
      if (index > -1) {
        projectData.value.files.splice(index, 1)
      }
    }
    
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    notyf.error(`Erreur lors de l'upload de ${fileObj.name}`)
    
    // Retirer le fichier de la liste en cas d'erreur
    const index = projectData.value.files.findIndex(f => f.name === fileObj.name)
    if (index > -1) {
      projectData.value.files.splice(index, 1)
    }
  } finally {
    fileObj.uploading = false
    isUploading.value = projectData.value.files.some(f => f.uploading)
  }
}

const removeFile = (index) => {
  const file = projectData.value.files[index]
  if (file.url && file.url.startsWith('blob:')) {
    URL.revokeObjectURL(file.url)
  }
  projectData.value.files.splice(index, 1)
}

// Utility functions
const isValidFileType = (file) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/pdf',
    'video/mp4',
    'video/avi',
    'video/quicktime',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
  ]
  
  return allowedTypes.includes(file.type)
}

const formatFileType = (mimeType) => {
  const typeMap = {
    'image/jpeg': 'image',
    'image/jpg': 'image',
    'image/png': 'image',
    'application/pdf': 'pdf',
    'video/mp4': 'video',
    'video/avi': 'video',
    'video/quicktime': 'video',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
  }
  
  return typeMap[mimeType] || 'unknown'
}

const isDocumentFile = (type) => {
  return type && (
    type.includes('pdf') ||
    type.includes('document') ||
    type.includes('text') ||
    type.includes('spreadsheet') ||
    type.includes('presentation')
  )
}

const isImageFile = (type) => {
  return type && type.startsWith('image/')
}

const isVideoFile = (type) => {
  return type && type.startsWith('video/')
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// API methods
const fetchManagers = async () => {
  try {
    const companyId = route.params.companyId
    const response = await auth.api('GET', `/companies/${companyId}/guests`, null, false)
    if (response.success) {
      response.data.forEach((guest) => {
        if(guest.accept){
            let manager = {
          id: guest?.id,
          firstName: guest?.account?.firstName + " " + guest?.account?.lastName || "",
         }
          managers.value.push(manager)
        }
      
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchJobs = async () => {
  try {
    const companyId = route.params.companyId
    const response = await auth.api('GET', `/extern/companies/${companyId}/jobs/all`, null, false)
    
    if (response.success) {
      jobs.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching jobs:', error)
  }
}

const createProject = async () => {
  isSaving.value = true
  
  try {
    const companyId = route.params.companyId

    // Préparer les données du projet avec les URLs des fichiers
    const projectDataToSend = {
      ...projectData.value,
      files: projectData.value.files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.url
      }))
    }

    const response = await auth.api(
      "POST",
      `/companies/${companyId}/projects/create`,
      projectDataToSend,
      true
    )

    if (response.success) {
      console.log('Project created:', response.data)
      notyf.success('Projet créé avec succès !')
      emit('created', response.data)
      emit('close')
      window.location.reload()
    } else {
      notyf.error(response.message || 'Erreur lors de la création du projet')
    }
  } catch (error) {
    console.error('Error creating project:', error)
    notyf.error('Erreur lors de la création du projet')
  } finally {
    isSaving.value = false
  }
}

// Initialize data on mount
onMounted(() => {
  fetchManagers()
  fetchJobs()
  projectData.value.start = today.value
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