<template>
  <div class="w-full min-h-screen bg-gray-50">
    <div class="max-w-4xl p-6 mx-auto">
      <!-- Header with Save Button -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Créer un contrat</h1>
          <p class="mt-1 text-gray-600">Rédigez votre contrat avec articles et clauses personnalisés</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="previewContract"
            class="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Aperçu
          </button>
          <button
            @click="saveContract"
            :disabled="isSaving"
            class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#db147f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSaving ? 'Sauvegarde...' : 'Sauvegarder' }}
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Basic Information -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 class="mb-4 text-xl font-semibold text-gray-900">Informations générales</h2>
          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Titre du contrat *</label>
              <input
                v-model="contract.title"
                type="text"
                placeholder="Ex: Contrat de travail CDI, Contrat de prestation..."
                class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              />
            </div>
            
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Description générale *</label>
              <div class="relative">
                <textarea
                  v-model="contract.textDescription"
                  placeholder="Décrivez l'objet et le contexte de ce contrat..."
                  rows="4"
                  class="w-full px-3 py-2 pr-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
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
          
          <div v-if="contract.articlesAndClauses.length === 0" class="py-8 text-center text-gray-500">
            <FileTextIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Aucun article ajouté. Commencez par ajouter votre premier article.</p>
          </div>

          <div class="space-y-6">
            <div
              v-for="(article, index) in contract.articlesAndClauses"
              :key="index"
              class="p-6 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
            >
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-medium text-gray-900">Article {{ index + 1 }}</h3>
                <button
                  @click="removeArticle(index)"
                  class="p-1 text-red-600 hover:text-red-700"
                >
                  <XIcon class="w-4 h-4" />
                </button>
              </div>
              
              <div class="space-y-4">
                <!-- Article Title -->
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Titre de l'article *</label>
                  <input
                    v-model="article.title"
                    type="text"
                    placeholder="Ex: Objet du contrat, Durée, Rémunération..."
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    required
                  />
                </div>

                <!-- Article Text -->
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Texte de l'article *</label>
                  <div class="relative">
                    <textarea
                      v-model="article.text"
                      placeholder="Rédigez le contenu de cet article..."
                      rows="4"
                      class="w-full px-3 py-2 pr-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
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
                </div>

                <!-- Article Items -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="block text-sm font-medium text-gray-700">Éléments de l'article (optionnel)</label>
                    <button
                      @click="addArticleItem(index)"
                      class="text-sm font-medium text-[#db147f] hover:text-[#db147f]"
                    >
                      + Ajouter un élément
                    </button>
                  </div>
                  
                  <div v-if="article.items && article.items.length > 0" class="space-y-2">
                    <div
                      v-for="(item, itemIndex) in article.items"
                      :key="itemIndex"
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
    <div v-if="showPreview" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-4xl bg-white rounded-lg shadow-xl mx-4 max-h-[90vh] overflow-hidden">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Aperçu du contrat</h2>
          <button @click="showPreview = false" class="text-gray-400 hover:text-gray-600">
            <XIcon class="w-6 h-6" />
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div class="prose prose-gray max-w-none">
            <h1 class="mb-4 text-2xl font-bold text-gray-900">{{ contract.title }}</h1>
            
            <div class="mb-6">
              <h2 class="mb-2 text-lg font-semibold text-gray-900">Description</h2>
              <p class="text-gray-700 whitespace-pre-wrap">{{ contract.textDescription }}</p>
            </div>

            <div v-if="contract.articlesAndClauses.length > 0">
              <h2 class="mb-4 text-lg font-semibold text-gray-900">Articles et clauses</h2>
              <div class="space-y-6">
                <div v-for="(article, index) in contract.articlesAndClauses" :key="index">
                  <h3 class="mb-2 text-base font-semibold text-gray-900">
                    Article {{ index + 1 }} : {{ article.title }}
                  </h3>
                  <p class="mb-3 text-gray-700 whitespace-pre-wrap">{{ article.text }}</p>
                  <ol v-if="article.items && article.items.length > 0" class="ml-4 space-y-1 list-decimal list-inside">
                    <li v-for="item in article.items" :key="item" class="text-gray-700">{{ item }}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            @click="showPreview = false"
            class="px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Fermer
          </button>
          <button
            @click="downloadContract"
            class="px-4 py-2 text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#db147f]"
          >
            Télécharger PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { XIcon, FileTextIcon, PlusIcon } from 'lucide-vue-next'

// Reactive data
const isSaving = ref(false)
const showPreview = ref(false)
const showFieldSelector = ref(false)
const selectorPosition = ref({ top: 0, left: 0 })
const activeElement = ref(null)
const descriptionTextarea = ref(null)

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
  }
])

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
  
  // Position the dropdown below the button
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
    
    // Update the model value based on the active element type
    if (activeElement.value.type === 'description') {
      contract.value.textDescription = newValue
    } else if (activeElement.value.type === 'article') {
      contract.value.articlesAndClauses[activeElement.value.articleIndex].text = newValue
    } else if (activeElement.value.type === 'item') {
      contract.value.articlesAndClauses[activeElement.value.articleIndex].items[activeElement.value.itemIndex] = newValue
    }
    
    // Set cursor position after insertion
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
  // Clean up refs
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
  // Clean up refs
  const key = `${articleIndex}-${itemIndex}`
  delete itemInputRefs.value[key]
}

const previewContract = () => {
  showPreview.value = true
}

const downloadContract = () => {
  alert('Fonctionnalité de téléchargement PDF à implémenter')
}

const getRequiredFieldLabel = (fieldValue) => {
  const field = availableRequiredFields.value.find(f => f.value === fieldValue)
  return field ? field.label : fieldValue
}

const saveContract = async () => {
  isSaving.value = true
  
  try {
    const cleanedContract = {
      ...contract.value,
      articlesAndClauses: contract.value.articlesAndClauses.filter(article => 
        article.title && article.text
      ).map(article => ({
        ...article,
        items: article.items ? article.items.filter(item => item.trim()) : []
      }))
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Contract saved:', cleanedContract)
    alert('Contrat sauvegardé avec succès !')
    
  } catch (error) {
    console.error('Error saving contract:', error)
    alert('Erreur lors de la sauvegarde')
  } finally {
    isSaving.value = false
  }
}

// Close field selector when clicking outside
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