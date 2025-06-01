<template>
  <div class="w-full min-h-screen bg-gray-50">
    <div class="max-w-4xl p-6 mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Créer un contrat</h1>
          <p class="mt-1 text-gray-600">Rédigez votre contrat avec articles et clauses personnalisés</p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="toggleOpenModal"
            class="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
            Aperçu
          </button>
          <button @click="saveContract" :disabled="isSaving"
            class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#db147f] disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isSaving ? 'Sauvegarde...' : 'Sauvegarder' }}
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Informations générales -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 class="mb-4 text-xl font-semibold text-gray-900">Informations générales</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Titre du contrat *</label>
              <input v-model="contract.title" type="text"
                placeholder="Ex: Contrat de travail CDI, Contrat de prestation..."
                class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required />
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Description générale *</label>
              <div class="relative">
                <textarea v-model="contract.textDescription"
                  placeholder="Décrivez l'objet et le contexte de ce contrat..." rows="4"
                  class="w-full px-3 py-2 pr-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  ref="descriptionTextarea"></textarea>
                <button @click="(e) => toggleFieldSelector(e, 'description', null, null, $refs.descriptionTextarea)"
                  class="absolute p-2 text-gray-400 transition-colors rounded-md top-2 right-2 hover:text-gray-600 hover:bg-gray-100"
                  title="Insérer un champ">
                  <PlusIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>



        <!-- Articles and Clauses -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Articles et clauses</h2>
            <button @click="addArticle"
              class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
              + Ajouter un article
            </button>
          </div>

          <div v-if="contract.articlesAndClauses.length === 0" class="py-8 text-center text-gray-500">
            <FileTextIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucun article ajouté. Commencez par ajouter votre premier article.</p>
          </div>

          <div class="space-y-6">
            <div v-for="(article, index) in contract.articlesAndClauses" :key="index"
              class="p-6 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-medium text-gray-900">Article {{ index + 1 }}</h3>
                <button @click="removeArticle(index)" class="p-1 text-red-600 hover:text-red-700">
                  <XIcon class="w-4 h-4" />
                </button>
              </div>

              <div class="space-y-4">
                <!-- Article Title -->
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Titre de l'article *</label>
                  <input v-model="article.title" type="text" placeholder="Ex: Objet du contrat, Durée, Rémunération..."
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    required />
                </div>

                <!-- Article Text -->
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Texte de l'article *</label>
                  <div class="relative">
                    <textarea v-model="article.text" placeholder="Rédigez le contenu de cet article..." rows="4"
                      class="w-full px-3 py-2 pr-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                      :ref="el => setArticleTextareaRef(el, index)"></textarea>
                    <button @click="(e) => toggleFieldSelector(e, 'article', index, null, getArticleTextareaRef(index))"
                      class="absolute p-2 text-gray-400 transition-colors rounded-md top-2 right-2 hover:text-gray-600 hover:bg-gray-100"
                      title="Insérer un champ">
                      <PlusIcon class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Article Items -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700">Éléments de l'article (optionnel)</label>
                    <button @click="addArticleItem(index)"
                      class="text-sm font-medium text-[#db147f] hover:text-[#db147f]">
                      + Ajouter un élément
                    </button>
                  </div>

                  <div v-if="article.items && article.items.length > 0" class="space-y-2">
                    <div v-for="(item, itemIndex) in article.items" :key="itemIndex" class="flex items-center gap-2">
                      <span class="text-sm text-gray-400">{{ itemIndex + 1 }}.</span>
                      <div class="relative flex-1">
                        <input v-model="article.items[itemIndex]" type="text"
                          placeholder="Ex: Point spécifique, condition particulière..."
                          class="w-full px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                          :ref="el => setItemInputRef(el, index, itemIndex)" />
                        <button
                          @click="(e) => toggleFieldSelector(e, 'item', index, itemIndex, getItemInputRef(index, itemIndex))"
                          class="absolute p-1 text-gray-400 transition-colors transform -translate-y-1/2 rounded top-1/2 right-2 hover:text-gray-600 hover:bg-gray-100"
                          title="Insérer un champ">
                          <PlusIcon class="w-3 h-3" />
                        </button>
                      </div>
                      <button @click="removeArticleItem(index, itemIndex)" class="p-2 text-red-600 hover:text-red-700">
                        <XIcon class="w-4 h-4" />
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

    <!-- Field Selector Dropdown -->
    <div v-if="showFieldSelector" :style="{ top: selectorPosition.top + 'px', left: selectorPosition.left + 'px' }"
      class="fixed z-50 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
      <div class="p-2">
        <div class="px-2 py-1 mb-2 text-xs text-gray-500">Sélectionner un champ</div>
        <div class="overflow-y-auto max-h-48">
          <button v-for="field in availableRequiredFields" :key="field.value" @click="selectField(field.value)"
            class="w-full p-2 text-sm text-left transition-colors rounded hover:bg-gray-50">
            <div class="font-medium text-gray-900">{{ field.label }}</div>
            <div class="text-xs text-gray-500">{{ field.description }}</div>
            <div class="mt-1 text-xs text-[#db147f]">{{ field.value }}</div>
          </button>
        </div>
      </div>
    </div>

  
    <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
      <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-6xl bg-white rounded-lg shadow-xl max-h-[95vh] overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Aperçu du contrat</h2>
            <button @click="toggleOpenModal()" class="text-gray-400 hover:text-gray-600">
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          
          <div class="overflow-y-auto max-h-[calc(95vh-120px)]">
            <ContractPreview 
              :clauses="processedClauses"
              :title="contract.title"
              :companyData="companyData"
              :UserData="userData"
              :isLive="false"
            />
          </div>
        </div>
      </div>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { XIcon, FileTextIcon, PlusIcon } from 'lucide-vue-next'
import ContractPreview from './ContractPreview.vue'
import AppModal from '@/components/globales/AppModal.vue'

// Reactive data
const isSaving = ref(false)
const showPreview = ref(false)
const showFieldSelector = ref(false)
const selectorPosition = ref({ top: 0, left: 0 })
const activeElement = ref(null)
const descriptionTextarea = ref(null)


const isModalOpen = ref(false);

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
  console.log("value");
};



// Refs for dynamic elements
const articleTextareaRefs = ref({})
const itemInputRefs = ref({})

// Contract data
const contract = ref({
  title: '',
  textDescription: '',
  articlesAndClauses: [],
  requiredField: []
})

// Company data
const companyData = ref({
  CompanyName: 'TechNova SARL',
  LogoUrl: 'https://i.pinimg.com/736x/0c/62/d9/0c62d97e0c074b9f68e307810ae78be0.jpg',
  city: 'Douala',
  country: 'Cameroon',
  languageAttachment: 'fr',
  RegisteredNumber: 'RC/DLA/2023/B/12987',
  admin: {
    name: "Ze Baby"
  }
});


// User data - informations du contractant
const userData = ref({
  email: 'jean.kamga@example.com',
  firstName: 'Jean',
  lastName: 'Kamga',
  phoneNumber: '+237694123456',
});



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

// Computed properties for ContractPreview
const processedClauses = computed(() => {
  return contract.value.articlesAndClauses
    .filter(article => article.title && article.text)
    .map(article => ({
      title: article.title,
      text: article.text,
      items: article.items ? article.items.filter(item => item && item.trim()) : []
    }))
})

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



// Methods
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
  if (activeElement.value && activeElement.value.element) {
    const element = activeElement.value.element
    const cursorPos = element.selectionStart || element.value.length
    const beforeCursor = element.value.substring(0, cursorPos)
    const afterCursor = element.value.substring(cursorPos)
    const newValue = beforeCursor + `{{${fieldValue}}}` + afterCursor

    if (activeElement.value.type === 'description') {
      contract.value.textDescription = newValue
    } else if (activeElement.value.type === 'article') {
      contract.value.articlesAndClauses[activeElement.value.articleIndex].text = newValue
    } else if (activeElement.value.type === 'item') {
      contract.value.articlesAndClauses[activeElement.value.articleIndex].items[activeElement.value.itemIndex] = newValue
    }

    nextTick(() => {
      const newCursorPos = beforeCursor.length + `{{${fieldValue}}}`.length
      element.focus()
      element.setSelectionRange(newCursorPos, newCursorPos)
    })
  }

  showFieldSelector.value = false
}

const addArticle = () => {
  contract.value.articlesAndClauses.push({
    title: '',
    text: '',
    items: []
  })
}

const removeArticle = (index) => {
  contract.value.articlesAndClauses.splice(index, 1)
  delete articleTextareaRefs.value[index]
}

const addArticleItem = (articleIndex) => {
  if (!contract.value.articlesAndClauses[articleIndex].items) {
    contract.value.articlesAndClauses[articleIndex].items = []
  }
  contract.value.articlesAndClauses[articleIndex].items.push('')
}

const removeArticleItem = (articleIndex, itemIndex) => {
  contract.value.articlesAndClauses[articleIndex].items.splice(itemIndex, 1)
  const key = `${articleIndex}-${itemIndex}`
  delete itemInputRefs.value[key]
}

const previewContract = () => {
  showPreview.value = true
}



const saveContract = async () => {
  isSaving.value = true

  try {
    const cleanedContract = {
      ...contract.value,
      companyData: { ...companyData.value },
      userData: { ...userData.value },
      articlesAndClauses: processedClauses.value
    }

    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Contract saved:', cleanedContract)
    console.log(cleanedContract);

  } catch (error) {
    console.error('Error saving contract:', error)
  } finally {
    isSaving.value = false
  }
}

const handleClickOutside = (e) => {
  if (showFieldSelector.value && !e.target.closest('.fixed')) {
    showFieldSelector.value = false
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
