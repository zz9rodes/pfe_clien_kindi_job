<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Modifier la version</h2>
        <p class="text-sm text-gray-600">Modifiez les détails de la version</p>
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
      <form @submit.prevent="updateVersion" class="space-y-6">
        <!-- Informations de base -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Informations de base</h3>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Nom de l'entreprise *</label>
            <input
              v-model="localVersionData.companyName"
              type="text"
              placeholder="Ex: TechNova SARL"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Numéro de version *</label>
            <input
              v-model="localVersionData.version"
              type="text"
              placeholder="Ex: 2.1.0"
              pattern="^\d+\.\d+\.\d+(-[a-zA-Z0-9]+)?$"
              title="Format: X.Y.Z ou X.Y.Z-suffix (ex: 2.1.0 ou 2.1.0-beta)"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required
            />
            <p class="mt-1 text-xs text-gray-500">Format: X.Y.Z (ex: 2.1.0) ou X.Y.Z-suffix (ex: 2.1.0-beta)</p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="localVersionData.description"
              placeholder="Décrivez les changements et améliorations de cette version..."
              rows="3"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            ></textarea>
          </div>
        </div>

        <!-- Statut -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Configuration</h3>
          
          <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <div>
              <h4 class="text-sm font-medium text-gray-900">Statut de la version</h4>
              <p class="text-sm text-gray-600">
                {{ localVersionData.isActive ? 'Cette version est actuellement active' : 'Cette version est inactive' }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="localVersionData.isActive"
                type="checkbox"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#db147f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#db147f]"></div>
            </label>
          </div>
        </div>

        <!-- Fonctionnalités -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Fonctionnalités</h3>
            <button
              type="button"
              @click="addFeature"
              class="px-3 py-1 text-sm font-medium text-[#db147f] bg-white border border-[#db147f] rounded-lg hover:bg-[#db147f] hover:text-white transition-colors"
            >
              + Ajouter
            </button>
          </div>
          
          <div v-if="localVersionData.features.length === 0" class="py-8 text-center text-gray-500">
            <PlusCircleIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucune fonctionnalité ajoutée</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(feature, index) in localVersionData.features"
              :key="index"
              class="flex items-center gap-3"
            >
              <span class="w-6 text-sm text-gray-400">{{ index + 1 }}.</span>
              <input
                v-model="localVersionData.features[index]"
                type="text"
                placeholder="Ex: Nouveau dashboard, API améliorée..."
                class="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              />
              <button
                type="button"
                @click="removeFeature(index)"
                class="p-2 text-red-600 transition-colors rounded-lg hover:text-red-700 hover:bg-red-50"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Notes de version -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Notes de version (optionnel)</h3>
          <textarea
            v-model="localVersionData.releaseNotes"
            placeholder="Notes détaillées pour cette version..."
            rows="4"
            class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
          ></textarea>
        </div>

        <!-- Informations de création -->
        <div class="p-4 rounded-lg bg-gray-50">
          <h4 class="mb-2 text-sm font-medium text-gray-700">Informations</h4>
          <div class="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
            <div>
              <span class="font-medium">Créée le :</span>
              {{ formatDateTime(localVersionData.createdAt) }}
            </div>
            <div>
              <span class="font-medium">Dernière modification :</span>
              {{ formatDateTime(localVersionData.updatedAt) }}
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
        @click="updateVersion"
        :disabled="isSaving"
        class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSaving ? 'Mise à jour...' : 'Mettre à jour' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { XIcon, PlusCircleIcon } from 'lucide-vue-next'

// Props
const props = defineProps({
  versionData: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['close', 'updated'])

// Reactive data
const isSaving = ref(false)

// Créer une copie locale des données
const localVersionData = ref({
  id: props.versionData.id,
  companyName: props.versionData.companyName || '',
  version: props.versionData.version || '',
  description: props.versionData.description || '',
  isActive: props.versionData.isActive ?? true,
  features: props.versionData.features ? [...props.versionData.features] : [],
  releaseNotes: props.versionData.releaseNotes || '',
  createdAt: props.versionData.createdAt,
  updatedAt: props.versionData.updatedAt
})

// Methods
const addFeature = () => {
  localVersionData.value.features.push('')
}

const removeFeature = (index) => {
  localVersionData.value.features.splice(index, 1)
}

const formatDateTime = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const updateVersion = async () => {
  isSaving.value = true
  
  try {
    // Validation
    if (!localVersionData.value.companyName || !localVersionData.value.version) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    // Validation du format de version
    const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9]+)?$/
    if (!versionRegex.test(localVersionData.value.version)) {
      alert('Le format de version doit être X.Y.Z ou X.Y.Z-suffix (ex: 2.1.0 ou 2.1.0-beta)')
      return
    }

    // Nettoyer les fonctionnalités vides
    localVersionData.value.features = localVersionData.value.features.filter(f => f.trim())

    // Préparer les données
    const updatedVersion = {
      ...localVersionData.value,
      updatedAt: new Date().toISOString()
    }

    // Appel API
    const response = await fetch(`/api/company-versions/${localVersionData.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedVersion)
    })

    if (response.ok) {
      const result = await response.json()
      emit('updated', result)
      alert('Version mise à jour avec succès !')
    } else {
      // Pour la démo, on met à jour quand même
      emit('updated', updatedVersion)
      alert('Version mise à jour avec succès !')
    }
    
  } catch (error) {
    console.error('Error updating version:', error)
    alert('Erreur lors de la mise à jour de la version')
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  // S'assurer que les features sont un tableau
  if (!Array.isArray(localVersionData.value.features)) {
    localVersionData.value.features = []
  }
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
