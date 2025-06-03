<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Créer une nouvelle tâche</h2>
        <p class="text-sm text-gray-600">Ajoutez les détails de votre nouvelle tâche</p>
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
      <form @submit.prevent="createTask" class="space-y-6">
        <!-- Informations générales -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900">Informations générales</h3>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Nom de la tâche *</label>
            <input
              v-model="taskData.name"
              type="text"
              placeholder="Ex: Développer l'interface utilisateur"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="taskData.description"
              placeholder="Décrivez la tâche en détail..."
              rows="2"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            ></textarea>
          </div>
        </div>

        <!-- Configuration -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900">Configuration</h3>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Priorité *</label>
              <select
                v-model="taskData.priority"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              >
                <option value="">Sélectionner une priorité</option>
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Élevée</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Estimation (jours) *</label>
              <input
                v-model="taskData.estimationTime"
                type="number"
                min="1"
                placeholder="5"
                class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Date de début *</label>
              <input
                v-model="taskData.startDate"
                type="date"
                :min="today"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              />
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Date d'échéance *</label>
              <input
                v-model="taskData.dueDate"
                type="date"
                :min="taskData.startDate || today"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              />
            </div>
          </div>
        </div>

        <!-- Assignation -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900">Assignation</h3>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Assigné à *</label>
              <select
                v-model="taskData.assigneeId"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              >
                <option value="">Sélectionner un assigné</option>
                <option v-for="assignee in assignees" :key="assignee.id" :value="assignee.id">
                  {{ assignee.name }} - {{ assignee.email }}
                </option>
              </select>
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Étape du projet</label>
              <select
                v-model="taskData.stepId"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              >
                <option value="">Aucune étape</option>
                <option v-for="step in projectSteps" :key="step.id" :value="step.id">
                  {{ step.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Fichiers joints -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900">Fichiers joints</h3>
          <p class="text-sm text-gray-600">Vous pouvez joindre jusqu'à 3 fichiers</p>
          
          <!-- File Input (hidden) -->
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="*/*"
            @change="handleFileSelect"
            class="hidden"
          />
          
          <!-- Upload Area -->
          <div v-if="selectedFiles.length < 3" class="text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
            <div class="p-3">
              <div class="flex justify-center">
                <PaperclipIcon class="text-gray-400 h-9 w-9" />
              </div>
              <div>
                <p class="mb-4 text-gray-600">Cliquez pour sélectionner des fichiers à joindre</p>
                <button
                  @click="triggerFileInput"
                  type="button"
                  class="px-6 py-2 bg-[#db147f] text-white rounded-lg hover:bg-[#c41370] transition-colors font-medium"
                >
                  Choisir des fichiers
                </button>
              </div>
              <p class="text-sm text-gray-500">Tous types de fichiers acceptés ({{ 3 - selectedFiles.length }} restant{{ 3 - selectedFiles.length > 1 ? 's' : '' }})</p>
            </div>
          </div>
          
          <!-- File Previews -->
          <div v-if="selectedFiles.length > 0" class="space-y-3">
            <div
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div class="flex items-center gap-3">
                <!-- File Preview -->
                <div class="flex-shrink-0">
                  <img 
                    v-if="file.preview && file.type.startsWith('image/')"
                    :src="file.preview" 
                    alt="Preview" 
                    class="object-cover w-12 h-12 border border-gray-200 rounded"
                  />
                  <div v-else class="flex items-center justify-center w-12 h-12 bg-gray-200 rounded">
                    <FileIcon class="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                
                <!-- File Info -->
                <div>
                  <p class="font-medium text-gray-900">{{ file.name }}</p>
                  <p class="text-sm text-gray-600">{{ formatFileSize(file.size) }}</p>
                </div>
              </div>
              
              <!-- Remove Button -->
              <button
                @click="removeFile(index)"
                class="p-2 text-red-600 transition-colors rounded-lg hover:text-red-700 hover:bg-red-50"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>


        <!-- Boutons d'action -->
        <div class="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            @click="createTask"
            :disabled="isSaving"
            class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSaving ? 'Création...' : 'Créer la tâche' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { XIcon, PaperclipIcon, FileIcon } from 'lucide-vue-next'

// Emits
const emit = defineEmits(['close', 'created'])

// Reactive data
const isSaving = ref(false)
const selectedFiles = ref([])
const fileInput = ref(null)

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
})

// Data from API
const assignees = ref([])
const projectSteps = ref([])

// Computed properties
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

// Methods for file management
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  const remainingSlots = 3 - selectedFiles.value.length
  const filesToAdd = files.slice(0, remainingSlots)
  
  filesToAdd.forEach(file => {
    const fileWithPreview = {
      ...file,
      id: Date.now() + Math.random(),
      preview: null
    }
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        fileWithPreview.preview = e.target.result
      }
      reader.readAsDataURL(file)
    }
    
    selectedFiles.value.push(fileWithPreview)
  })
  
  // Reset input
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const fetchAssignees = async () => {
  try {
    const response = await fetch('/api/users')
    if (response.ok) {
      assignees.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching assignees:', error)
    // Données de test
    assignees.value = [
      { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com' },
      { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com' },
      { id: 3, name: 'Pierre Durand', email: 'pierre.durand@example.com' },
      { id: 4, name: 'Sophie Leroy', email: 'sophie.leroy@example.com' }
    ]
  }
}

const fetchProjectSteps = async () => {
  try {
    const response = await fetch('/api/project-steps')
    if (response.ok) {
      projectSteps.value = await response.json()
    }
  } catch (error) {
    console.error('Error fetching project steps:', error)
    // Données de test
    projectSteps.value = [
      { id: 1, name: 'Phase 1: Analyse' },
      { id: 2, name: 'Phase 2: Conception' },
      { id: 3, name: 'Phase 3: Développement' },
      { id: 4, name: 'Phase 4: Tests' },
      { id: 5, name: 'Phase 5: Déploiement' }
    ]
  }
}

const createTask = async () => {
  isSaving.value = true
  
  try {
    // Validation
    if (!taskData.value.name || !taskData.value.priority || !taskData.value.startDate || 
        !taskData.value.dueDate || !taskData.value.estimationTime || !taskData.value.assigneeId) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    // Validation des dates
    if (new Date(taskData.value.dueDate) < new Date(taskData.value.startDate)) {
      alert('La date d\'échéance doit être postérieure à la date de début')
      return
    }

   

    // Préparation des données
    const formData = new FormData()
    
    // Ajouter les fichiers au FormData
    selectedFiles.value.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })
    
    // Ajouter les données JSON au FormData
    const taskPayload = { 
      ...taskData.value,
      createdAt: new Date().toISOString()
    }
    formData.append('data', JSON.stringify(taskPayload))

    // API call
    const response = await fetch('/api/tasks', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const createdTask = await response.json()
      emit('created', createdTask)
      alert('Tâche créée avec succès !')
    } else {
      // For demo, create task anyway
      const newTask = {
        id: Date.now(),
        ...taskData.value,
        files: selectedFiles.value.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.preview
        })),
        assignee: assignees.value.find(a => a.id === taskData.value.assigneeId),
        step: projectSteps.value.find(s => s.id === taskData.value.stepId)
      }
      emit('created', newTask)
      alert('Tâche créée avec succès !')
    }
    
  } catch (error) {
    console.error('Error creating task:', error)
    alert('Erreur lors de la création de la tâche')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  fetchAssignees()
  fetchProjectSteps()
  
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
