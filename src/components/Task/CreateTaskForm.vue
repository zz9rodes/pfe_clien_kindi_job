<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Créer une nouvelle tâche</h2>
        <p class="text-sm text-gray-600">Ajoutez les détails de votre nouvelle tâche</p>
      </div>
      <button @click="$emit('close')" class="p-2 text-gray-400 rounded-lg hover:text-gray-600 hover:bg-gray-100">
        <XIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Form Content -->
    <div class="flex-1 p-6 overflow-y-auto">
      <form @submit.prevent="createTask" class="space-y-6">
        <!-- Informations générales -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900">Informations générales</h3>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Nom de la tâche *</label>
            <input v-model="taskData.name" type="text" placeholder="Ex: Développer l'interface utilisateur"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="taskData.description" placeholder="Décrivez la tâche en détail..." rows="3"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"></textarea>
          </div>
        </div>

        <!-- Configuration -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900">Configuration</h3>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Priorité *</label>
              <select v-model="taskData.priority"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required>
                <option value="">Sélectionner une priorité</option>
                <option value="LOW">low</option>
                <option value="MEDIUM">medium</option>
                <option value="HIGH">high</option>
              </select>
            </div>


            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Estimation (jours) *</label>
              <input v-model.number="taskData.estimationTime" type="number" min="1" placeholder="5"
                class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Date de début *</label>
              <input v-model="taskData.startDate" type="date" :min="today"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required />
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Date d'échéance *</label>
              <input v-model="taskData.dueDate" type="date" :min="taskData.startDate || today"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required />
            </div>
          </div>
        </div>

        <!-- Assignation -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900">Assignation</h3>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Assigné à *</label>
            <select v-model="taskData.assigneeId"
              class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required>
              <option value="">Sélectionner un assigné</option>
              <option v-for="member in projectMembers" :key="member.id" :value="member.id">
                {{ member.name }} - {{ member.role }}
              </option>
            </select>
          </div>
        </div>

        <!-- Step Validation -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900">Job Step Validation</h3>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">step Validation (irreverssible)*</label>
            <select v-model="taskData.stepId"
              class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required>
              <option value="">Sélectionner une etapes</option>
              <option v-for="step in steps_validation" :key="step.id" :value="step.id">
                {{ step.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Fichiers joints -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Documents du projet</h3>
            <span class="text-sm text-gray-500">{{ taskData.files.length }}/3 fichiers</span>
          </div>

          <!-- Zone de sélection de fichiers -->
          <div class="space-y-4">
            <!-- Bouton de sélection multiple -->
            <div class="flex items-center gap-3">
              <input ref="fileInput" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.mp4,.avi,.mov,.docx"
                @change="handleMultipleFileSelection" class="hidden" />
              <button type="button" @click="$refs.fileInput.click()" :disabled="taskData.files.length >= 3"
                class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <UploadIcon class="w-4 h-4" />
                Sélectionner des fichiers
              </button>
              <p class="text-sm text-gray-500">
                Maximum 3 fichiers (PDF, Images, Vidéos, DOCX)
              </p>
            </div>
          </div>

          <!-- Liste des fichiers sélectionnés -->
          <div v-if="taskData.files.length > 0" class="space-y-3">
            <h4 class="text-sm font-medium text-gray-900">Fichiers sélectionnés :</h4>
            <div class="space-y-2">
              <div v-for="(file, index) in taskData.files" :key="index"
                class="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
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
                  <div v-if="file.isUploading" class="flex items-center gap-2">
                    <div class="w-4 h-4 border-2 border-[#db147f] border-t-transparent rounded-full animate-spin"></div>
                    <span class="text-xs text-gray-500">{{ file.uploadProgress }}%</span>
                  </div>
                  <CheckCircleIcon v-else-if="file.uploaded" class="w-5 h-5 text-green-500" />

                  <!-- Bouton de suppression -->
                  <button type="button" @click="removeFile(index)"
                    class="p-1 text-gray-400 transition-colors hover:text-red-500">
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

        <!-- Messages d'erreur -->
        <div v-if="errorMessage" class="p-4 border border-red-200 rounded-lg bg-red-50">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>

        <!-- Boutons d'action -->
        <div class="flex items-center justify-end gap-3 pt-4">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
            Annuler
          </button>
          <button @click="createTask" :disabled="isSaving"
            class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isSaving ? 'Création...' : 'Créer la tâche' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { XIcon, PaperclipIcon, FileIcon } from 'lucide-vue-next'
import { AppwriteuploadFile } from '@/app_write/files'
import { Notyf } from 'notyf'


const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 })

// Props
const props = defineProps({
  projectId: {
    type: [String, Number],
    required: true
  },
  projectMembers: {
    type: Array,
    default: () => []
  },
  steps_validation: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['close', 'created'])

const route = useRoute()
const auth = useAuthStore()

// Reactive data
const isSaving = ref(false)
const selectedFiles = ref([])
const fileInput = ref(null)
const errorMessage = ref('')
const isUploading = ref(false)


const taskData = ref({
  name: '',
  description: '',
  priority: '',
  startDate: '',
  dueDate: '',
  estimationTime: null,
  assigneeId: null,
  stepId: null,
  status: 'create',
  files: []
})



const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})



const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const handleMultipleFileSelection = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

const processFiles = async (files) => {
  // Vérifier la limite de fichiers
  const remainingSlots = 3 - taskData.value.files.length
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

    taskData.value.files.push(fileObj)

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
      const index = taskData.value.files.findIndex(f => f.name === fileObj.name)
      if (index > -1) {
        taskData.value.files.splice(index, 1)
      }
    }

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    notyf.error(`Erreur lors de l'upload de ${fileObj.name}`)

    // Retirer le fichier de la liste en cas d'erreur
    const index = taskData.value.files.findIndex(f => f.name === fileObj.name)
    if (index > -1) {
      taskData.value.files.splice(index, 1)
    }
  } finally {
    fileObj.uploading = false
    isUploading.value = taskData.value.files.some(f => f.uploading)
  }
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

const createTask = async () => {
  errorMessage.value = ''
  isSaving.value = true

  try {
    // Validation
    if (!taskData.value.name || !taskData.value.priority || !taskData.value.startDate ||
      !taskData.value.dueDate || !taskData.value.estimationTime || !taskData.value.assigneeId) {
      errorMessage.value = 'Veuillez remplir tous les champs obligatoires'
      return
    }

    // Validation des dates
    if (new Date(taskData.value.dueDate) < new Date(taskData.value.startDate)) {
      errorMessage.value = 'La date d\'échéance doit être postérieure à la date de début'
      return
    }

    const companyId = route.params.companyId

    const projectId = route.params.projectId

    // Préparer les données pour l'API
    const taskPayload = {
      name: taskData.value.name,
      description: taskData.value.description || '',
      priority: taskData.value.priority,
      startDate: taskData.value.startDate,
      dueDate: taskData.value.dueDate,
      estimationTime: taskData.value.estimationTime,
      assigneeId: taskData.value.assigneeId,
      projectId: props.projectId,
      status: taskData.value.status,
      attachements:taskData.value.files,
      stepId:taskData.value.stepId
    }

    // Si il y a des fichiers, les uploader d'abord
    if (selectedFiles.value.length > 0) {
      // Ici vous devriez implémenter l'upload des fichiers
      // et ajouter les URLs des fichiers au payload
      taskPayload.files = selectedFiles.value.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    }

    const response = await auth.api(
      'POST',
      `/companies/${companyId}/projects/${projectId}/tasks/create`,
      taskPayload,
      true
    )

    if (response.success) {
      emit('created', response.data)
      console.log('Tâche créée avec succès:', response.data)
    } else {
      errorMessage.value = response.message || 'Erreur lors de la création de la tâche'
    }

  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error)
    errorMessage.value = 'Erreur lors de la création de la tâche'
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  // Set default start date to today
  taskData.value.startDate = today.value

  // Set default due date to tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  taskData.value.dueDate = tomorrow.toISOString().split('T')[0]
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