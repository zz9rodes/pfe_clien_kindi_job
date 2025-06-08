<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Créer une nouvelle version</h2>
        <p class="text-sm text-gray-600">Ajoutez une nouvelle version d'entreprise</p>
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
      <form @submit.prevent="createVersion" class="space-y-6">
        <!-- Informations de base -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Informations de base</h3>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Nom de l'entreprise *</label>
            <input
              v-model="versionData.companyName"
              type="text"
              placeholder="Ex: TechNova SARL"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Numéro de version *</label>
            <input
              v-model="versionData.version"
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
              v-model="versionData.description"
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
              <h4 class="text-sm font-medium text-gray-900">Activer cette version</h4>
              <p class="text-sm text-gray-600">La version sera immédiatement disponible</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="versionData.isActive"
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
          
          <div v-if="versionData.features.length === 0" class="py-8 text-center text-gray-500">
            <PlusCircleIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucune fonctionnalité ajoutée</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="(feature, index) in versionData.features"
              :key="index"
              class="flex items-center gap-3"
            >
              <span class="w-6 text-sm text-gray-400">{{ index + 1 }}.</span>
              <input
                v-model="versionData.features[index]"
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
            v-model="versionData.releaseNotes"
            placeholder="Notes détaillées pour cette version..."
            rows="4"
            class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
          ></textarea>
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
        @click="createVersion"
        :disabled="isSaving"
        class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSaving ? 'Création...' : 'Créer la version' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XIcon, PlusCircleIcon } from 'lucide-vue-next'

// Emits
const emit = defineEmits(['close', 'created'])

// Reactive data
const isSaving = ref(false)

const versionData = ref({
  companyName: '',
  version: '',
  description: '',
  isActive: true,
  features: [],
  releaseNotes: ''
})

// Methods
const addFeature = () => {
  versionData.value.features.push('')
}

const removeFeature = (index) => {
  versionData.value.features.splice(index, 1)
}

const createVersion = async () => {
  isSaving.value = true
  
  try {
    // Validation
    if (!versionData.value.companyName || !versionData.value.version) {
      alert('Veuillez remplir tous les champs obligatoires')
      return
    }

    // Validation du format de version
    const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9]+)?$/
    if (!versionRegex.test(versionData.value.version)) {
      alert('Le format de version doit être X.Y.Z ou X.Y.Z-suffix (ex: 2.1.0 ou 2.1.0-beta)')
      return
    }

    // Nettoyer les fonctionnalités vides
    versionData.value.features = versionData.value.features.filter(f => f.trim())

    // Préparer les données
    const newVersion = {
      ...versionData.value,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Appel API
    const response = await fetch('/api/company-versions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVersion)
    })

    if (response.ok) {
      const createdVersion = await response.json()
      emit('created', createdVersion)
      alert('Version créée avec succès !')
    } else {
      // Pour la démo, on crée quand même
      emit('created', newVersion)
      alert('Version créée avec succès !')
    }
    
  } catch (error) {
    console.error('Error creating version:', error)
    alert('Erreur lors de la création de la version')
  } finally {
    isSaving.value = false
  }
}
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
