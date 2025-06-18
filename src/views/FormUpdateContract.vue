<template>
 <div class="w-full min-h-screen bg-gray-50">
   <AppModal
    :isOpen="isModalLoaderOpen"
    :isLoader="true"
  >
  </AppModal>
    <div class="max-w-4xl p-6 mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Modifier le contrat</h1>
          <p class="mt-1 text-gray-600">Modifiez votre contrat avec articles et clauses personnalisés</p>
        </div>
        <div class="flex items-center gap-3">
          <button 
            @click="goBack"
            class="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Retour
          </button>
          <button 
            @click="togglePreviewModal"
            class="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Aperçu
          </button>
          <button 
            @click="updateContract" 
            :disabled="isSaving || !isFormValid"
            class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSaving ? 'Mise à jour...' : 'Sauvegarder' }}
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Informations générales -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 class="mb-4 text-xl font-semibold text-gray-900">Informations générales</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Titre du contrat *
              </label>
              <input 
                v-model="localContractData.title" 
                type="text"
                placeholder="Ex: Contrat de travail CDI, Contrat de prestation..."
                class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                :class="{ 'border-red-300': errors.title }"
                required 
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Description générale *
              </label>
              <div class="relative">
                <textarea 
                  v-model="localContractData.textDescription"
                  placeholder="Décrivez l'objet et le contexte de ce contrat..." 
                  rows="4"
                  class="w-full px-3 py-2 pr-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  :class="{ 'border-red-300': errors.textDescription }"
                  ref="descriptionTextarea"
                ></textarea>
                <button 
                  @click="(e) => toggleFieldSelector(e, 'description', null, null, $refs.descriptionTextarea)"
                  class="absolute p-2 text-gray-400 transition-colors rounded-md top-2 right-2 hover:text-gray-600 hover:bg-gray-100"
                  title="Insérer un champ"
                >
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>
              <p v-if="errors.textDescription" class="mt-1 text-sm text-red-600">{{ errors.textDescription }}</p>
            </div>

            <!-- Statut de publication -->
            <div>
              <label class="flex items-center">
                <input 
                  v-model="localContractData.isPublish" 
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  class="w-4 h-4 text-[#db147f] border-gray-300 rounded focus:ring-[#db147f]"
                />
                <span class="ml-2 text-sm font-medium text-gray-700">Publier ce contrat</span>
              </label>
              <p class="mt-1 text-xs text-gray-500">
                Les contrats publiés peuvent être utilisés pour créer des accords
              </p>
            </div>
          </div>
        </div>

        <!-- Articles and Clauses -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Articles et clauses</h2>
            <button 
              @click="addArticle"
              class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              + Ajouter un article
            </button>
          </div>

          <div v-if="localContractData.articlesAndClauses.length === 0" class="py-8 text-center text-gray-500">
            <FileTextIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucun article ajouté. Commencez par ajouter votre premier article.</p>
          </div>

          <div class="space-y-6">
            <div 
              v-for="(article, index) in localContractData.articlesAndClauses" 
              :key="`article-${index}`"
              class="p-6 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-medium text-gray-900">Article {{ index + 1 }}</h3>
                <button 
                  @click="removeArticle(index)" 
                  class="p-1 text-red-600 hover:text-red-700"
                  title="Supprimer cet article"
                >
                  <XIcon class="w-4 h-4" />
                </button>
              </div>

              <div class="space-y-4">
                <!-- Article Title -->
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">
                    Titre de l'article *
                  </label>
                  <input 
                    v-model="article.title" 
                    type="text" 
                    placeholder="Ex: Objet du contrat, Durée, Rémunération..."
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    :class="{ 'border-red-300': errors[`article_${index}_title`] }"
                    required 
                  />
                  <p v-if="errors[`article_${index}_title`]" class="mt-1 text-sm text-red-600">
                    {{ errors[`article_${index}_title`] }}
                  </p>
                </div>

                <!-- Article Text -->
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">
                    Texte de l'article *
                  </label>
                  <div class="relative">
                    <textarea 
                      v-model="article.text" 
                      placeholder="Rédigez le contenu de cet article..." 
                      rows="4"
                      class="w-full px-3 py-2 pr-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                      :class="{ 'border-red-300': errors[`article_${index}_text`] }"
                      :ref="el => setArticleTextareaRef(el, index)"
                    ></textarea>
                    <button 
                      @click="(e) => toggleFieldSelector(e, 'article', index, null, getArticleTextareaRef(index))"
                      class="absolute p-2 text-gray-400 transition-colors rounded-md top-2 right-2 hover:text-gray-600 hover:bg-gray-100"
                      title="Insérer un champ"
                    >
                      <PlusIcon class="w-4 h-4" />
                    </button>
                  </div>
                  <p v-if="errors[`article_${index}_text`]" class="mt-1 text-sm text-red-600">
                    {{ errors[`article_${index}_text`] }}
                  </p>
                </div>

                <!-- Article Items -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700">
                      Éléments de l'article (optionnel)
                    </label>
                    <button 
                      @click="addArticleItem(index)"
                      class="text-sm font-medium text-[#db147f] hover:text-[#c41370]"
                    >
                      + Ajouter un élément
                    </button>
                  </div>

                  <div v-if="article.items && article.items.length > 0" class="space-y-2">
                    <div 
                      v-for="(item, itemIndex) in article.items" 
                      :key="`item-${index}-${itemIndex}`" 
                      class="flex items-center gap-2"
                    >
                      <span class="text-sm text-gray-400">{{ itemIndex + 1 }}.</span>
                      <div class="relative flex-1">
                        <input 
                          v-model="article.items[itemIndex]" 
                          type="text"
                          placeholder="Ex: Point spécifique, condition particulière..."
                          class="w-full px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                          :ref="el => setItemInputRef(el, index, itemIndex)" 
                        />
                        <button
                          @click="(e) => toggleFieldSelector(e, 'item', index, itemIndex, getItemInputRef(index, itemIndex))"
                          class="absolute p-1 text-gray-400 transition-colors transform -translate-y-1/2 rounded top-1/2 right-2 hover:text-gray-600 hover:bg-gray-100"
                          title="Insérer un champ"
                        >
                          <PlusIcon class="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        @click="removeArticleItem(index, itemIndex)" 
                        class="p-2 text-red-600 hover:text-red-700"
                        title="Supprimer cet élément"
                      >
                        <XIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Champs requis détectés -->
        <div v-if="detectedRequiredFields.length > 0" class="p-6 border border-blue-200 rounded-lg bg-blue-50">
          <h3 class="mb-3 text-lg font-semibold text-blue-900">Champs requis détectés</h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="field in detectedRequiredFields" 
              :key="field"
              class="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full"
            >
              {{ field }}
            </span>
          </div>
          <p class="mt-2 text-sm text-blue-700">
            Ces champs seront automatiquement remplis lors de la signature du contrat.
          </p>
        </div>
      </div>
    </div>

    <!-- Field Selector Dropdown -->
    <div 
      v-if="showFieldSelector" 
      :style="{ top: selectorPosition.top + 'px', left: selectorPosition.left + 'px' }"
      class="fixed z-50 w-64 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <div class="p-2">
        <div class="px-2 py-1 mb-2 text-xs text-gray-500">Sélectionner un champ</div>
        <div class="overflow-y-auto max-h-48">
          <button 
            v-for="field in availableRequiredFields" 
            :key="field.value" 
            @click="selectField(field.value)"
            class="w-full p-2 text-sm text-left transition-colors rounded hover:bg-gray-50"
          >
            <div class="font-medium text-gray-900">{{ field.label }}</div>
            <div class="text-xs text-gray-500">{{ field.description }}</div>
            <div class="mt-1 text-xs text-[#db147f]">{{ field.value }}</div>
          </button>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <AppModal @closeModal="togglePreviewModal" :isOpen="isPreviewModalOpen" :isLoader="false">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl max-h-[95vh] overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Aperçu du contrat</h2>
            <button @click="togglePreviewModal" class="text-gray-400 hover:text-gray-600">
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          
          <div class="overflow-y-auto max-h-[calc(95vh-120px)]">
            <ContractPreview 
              :description="localContractData.textDescription"
              :clauses="processedClauses"
              :title="localContractData.title"
              :companyData="sampleCompanyData"
              :userData="userData"
              :isLive="false"
            />
          </div>
        </div>
      </div>
    </AppModal>

     
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { XIcon, FileTextIcon, PlusIcon } from 'lucide-vue-next'
import ContractPreview from './ContractPreview.vue'
import AppModal from '@/components/globales/AppModal.vue'
import { useContractStore } from '@/stores/useContractStore'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  contractId: {
    type: [String, Number],
    default: null
  }
})

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const contractStore = useContractStore()

// Reactive data
const isModalLoaderOpen = ref(false)
const isSaving = ref(false)
const showFieldSelector = ref(false)
const selectorPosition = ref({ top: 0, left: 0 })
const activeElement = ref(null)
const isPreviewModalOpen = ref(false)
const errors = ref({})

// Refs for dynamic elements
const articleTextareaRefs = ref({})
const itemInputRefs = ref({})

// Local contract data for editing
const localContractData = ref({
  id: null,
  title: '',
  textDescription: '',
  articlesAndClauses: [],
  isPublish: 0,
  requiredField: []
})

// Sample data
const sampleCompanyData = ref({
  CompanyName: 'TechNova SARL',
  LogoUrl: 'https://i.pinimg.com/736x/0c/62/d9/0c62d97e0c074b9f68e307810ae78be0.jpg',
  city: 'Douala',
  country: 'Cameroon',
  languageAttachment: 'fr',
  RegisteredNumber: 'RC/DLA/2023/B/12987',
  admin: {
    name: "Ze Baby"
  }
})

const userData = ref({
  email: 'jean.kamga@example.com',
  firstName: 'Jean',
  lastName: 'Kamga',
  phoneNumber: '+237694123456',
})

// Available required fields
const availableRequiredFields = ref([
  {
    value: 'UserEmail',
    label: 'Email utilisateur',
    description: 'Adresse email de l\'utilisateur'
  },
  {
    value: 'AccountFirstName',
    label: 'Prénom',
    description: 'Prénom du titulaire du compte'
  },
  {
    value: 'AccountLastName',
    label: 'Nom',
    description: 'Nom du titulaire du compte'
  },
  {
    value: 'AccountPhoneNumber',
    label: 'Téléphone',
    description: 'Numéro de téléphone du compte'
  },
  {
    value: 'CompanieName',
    label: 'Nom de l\'entreprise',
    description: 'Nom de la companie'
  }
])

// Computed properties
const { contractData } = storeToRefs(contractStore)

const processedClauses = computed(() => {
  return localContractData.value.articlesAndClauses
    .filter(article => article.title && article.text)
    .map(article => ({
      title: article.title,
      text: article.text,
      items: article.items ? article.items.filter(item => item && item.trim()) : []
    }))
})

const detectedRequiredFields = computed(() => {
  const fields = new Set()
  const text = localContractData.value.textDescription + ' ' + 
    localContractData.value.articlesAndClauses.map(a => 
      a.text + ' ' + (a.items || []).join(' ')
    ).join(' ')
  
  const matches = text.match(/\{\{([^}]+)\}\}/g)
  if (matches) {
    matches.forEach(match => {
      const field = match.replace(/[{}]/g, '')
      fields.add(field)
    })
  }
  
  return Array.from(fields)
})

const isFormValid = computed(() => {
  return localContractData.value.title.trim() && 
         localContractData.value.textDescription.trim() &&
         localContractData.value.articlesAndClauses.every(article => 
           article.title.trim() && article.text.trim()
         )
})

// Methods
const validateForm = () => {
  errors.value = {}
  
  if (!localContractData.value.title.trim()) {
    errors.value.title = 'Le titre est requis'
  }
  
  if (!localContractData.value.textDescription.trim()) {
    errors.value.textDescription = 'La description est requise'
  }
  
  localContractData.value.articlesAndClauses.forEach((article, index) => {
    if (!article.title.trim()) {
      errors.value[`article_${index}_title`] = 'Le titre de l\'article est requis'
    }
    if (!article.text.trim()) {
      errors.value[`article_${index}_text`] = 'Le texte de l\'article est requis'
    }
  })
  
  return Object.keys(errors.value).length === 0
}

const toggleOpenLoaderModal = () => {
    isModalLoaderOpen.value = !isModalLoaderOpen.value;
};

const togglePreviewModal = () => {
  isPreviewModalOpen.value = !isPreviewModalOpen.value
}

const goBack = () => {
  const companyId = route.params.companyId
  router.back()

}
// Ref management functions
const setArticleTextareaRef = (el, index) => {
  if (el) {
    articleTextareaRefs.value[index] = el
  }
}

const getArticleTextareaRef = (index) => {
  return articleTextareaRefs.value[index]
}

const setItemInputRef = (el, articleIndex, itemIndex) => {
  if (el) {
    const key = `${articleIndex}-${itemIndex}`
    itemInputRefs.value[key] = el
  }
}

const getItemInputRef = (articleIndex, itemIndex) => {
  const key = `${articleIndex}-${itemIndex}`
  return itemInputRefs.value[key]
}

const toggleFieldSelector = (event, type, articleIndex = null, itemIndex = null, targetElement = null) => {
  event.stopPropagation()

  if (showFieldSelector.value) {
    showFieldSelector.value = false
    return
  }

  const button = event.currentTarget
  const rect = button.getBoundingClientRect()

  selectorPosition.value = {
    top: rect.bottom + 5 + window.scrollY,
    left: rect.left - 200 + window.scrollX
  }

  activeElement.value = {
    type,
    articleIndex,
    itemIndex,
    element: targetElement
  }

  showFieldSelector.value = true
}

const selectField = (fieldValue) => {
  if (!activeElement.value || !activeElement.value.element) return

  const element = activeElement.value.element
  const dom = element instanceof HTMLElement ? element : element.$el || element

  if (!dom || typeof dom.value === 'undefined') return

  const cursorPos = dom.selectionStart ?? dom.value.length
  const beforeCursor = dom.value.substring(0, cursorPos)
  const afterCursor = dom.value.substring(cursorPos)
  const insertedValue = `{{${fieldValue}}}`
  const newValue = beforeCursor + insertedValue + afterCursor

  const { type, articleIndex, itemIndex } = activeElement.value

  if (type === 'description') {
    localContractData.value.textDescription = newValue
  } else if (type === 'article') {
    if (localContractData.value.articlesAndClauses[articleIndex]) {
      localContractData.value.articlesAndClauses[articleIndex].text = newValue
    }
  } else if (type === 'item') {
    if (localContractData.value.articlesAndClauses[articleIndex] && 
        localContractData.value.articlesAndClauses[articleIndex].items) {
      localContractData.value.articlesAndClauses[articleIndex].items[itemIndex] = newValue
    }
  }

  nextTick(() => {
    dom.focus()
    const newCursorPos = beforeCursor.length + insertedValue.length
    dom.setSelectionRange(newCursorPos, newCursorPos)
  })

  showFieldSelector.value = false
}

const addArticle = () => {
  localContractData.value.articlesAndClauses.push({
    title: '',
    text: '',
    items: []
  })
}

const removeArticle = (index) => {
  localContractData.value.articlesAndClauses.splice(index, 1)
  delete articleTextareaRefs.value[index]
}

const addArticleItem = (articleIndex) => {
  if (localContractData.value.articlesAndClauses[articleIndex]) {
    if (!localContractData.value.articlesAndClauses[articleIndex].items) {
      localContractData.value.articlesAndClauses[articleIndex].items = []
    }
    localContractData.value.articlesAndClauses[articleIndex].items.push('')
  }
}

const removeArticleItem = (articleIndex, itemIndex) => {
  if (localContractData.value.articlesAndClauses[articleIndex] && 
      localContractData.value.articlesAndClauses[articleIndex].items) {
    localContractData.value.articlesAndClauses[articleIndex].items.splice(itemIndex, 1)
  }
  const key = `${articleIndex}-${itemIndex}`
  delete itemInputRefs.value[key]
}

const updateContract = async () => {
  if (!validateForm()) {
    return
  }

  toggleOpenLoaderModal()
  try {
    const companyId = route.params.companyId
    const contractId = route.params.contractId
    
    // Préparer les données avec les champs requis détectés
    const contractDataToUpdate = {
      ...localContractData.value,
      requiredField: detectedRequiredFields.value
    }
    
    const response = await auth.api(
      "PUT",
      `/companies/${companyId}/contracts/${contractId}/update`,
      contractDataToUpdate,
      true
    )

    if (response.success) {
      // Mettre à jour le store
      contractStore.setContract(response.data)
      
      goBack()
    } else {
      throw new Error(response.error || 'Erreur lors de la mise à jour')
    }
  } catch (error) {
    console.error('Error updating contract:', error)
  }
  toggleOpenLoaderModal()
}

const fetchContractDetails = async () => {
toggleOpenLoaderModal()  
  try {
    const companyId = route.params.companyId
    const contractId = route.params.contractId
    
    const response = await auth.api(
      "GET",
      `/companies/${companyId}/contracts/${contractId}`,
      null,
      false
    )

    if (response.success) {
      // Copier les données dans localContractData pour l'édition
      localContractData.value = {
        ...response.data,
        // S'assurer que les propriétés existent
        articlesAndClauses: response.data.articlesAndClauses || [],
        requiredField: response.data.requiredField || []
      }
      
      // Mettre à jour le store aussi
      contractStore.setContract(response.data)
    } else {
      throw new Error(response.error || 'Erreur lors du chargement')
    }
  } catch (error) {
    console.error('Error fetching contract:', error)
    goBack()
  }

  toggleOpenLoaderModal()
}

const handleClickOutside = (e) => {
  if (showFieldSelector.value && !e.target.closest('.fixed')) {
    showFieldSelector.value = false
  }
}

// Watch for changes to update required fields
watch(detectedRequiredFields, (newFields) => {
  localContractData.value.requiredField = newFields
}, { deep: true })

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  
  const contractId = route.params.contractId
  
  // Si on a un contractId dans l'URL, charger les détails
  if (contractId) {
    await fetchContractDetails()
  } else if (contractData.value) {
    // Sinon utiliser les données du store si disponibles
    localContractData.value = { ...contractData.value }
  } else {
    // Rediriger si aucune donnée disponible
    goBack()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.prose {
  line-height: 1.7;
}

.prose h1 {
  margin-bottom: 1rem;
}

.prose h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>