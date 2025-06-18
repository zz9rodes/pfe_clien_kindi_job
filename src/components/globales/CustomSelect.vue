<template>
  <div class="relative w-full">
    <!-- Input principal -->
    <div 
      @click="toggleDropdown"
      class="min-h-[2.5rem] w-full px-3 py-2 border  rounded-md bg-white cursor-pointer focus:ring-2 focus:ring-[#e4097f] border-gray-300 transition-all duration-200"
      :class="{ 
        'ring-2 ring-[#e4097f] border-[#e4097f]': isOpen,
        'opacity-50 cursor-not-allowed': disabled
      }"
    >
      <!-- Valeur sélectionnée ou placeholder -->
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <span 
            v-if="selectedItem"
            class="text-sm text-gray-900"
          >
            {{ getItemLabel(selectedItem) }}
          </span>
          <span 
            v-else
            class="text-sm text-gray-500"
          >
            {{ placeholder }}
          </span>
        </div>
        
        <!-- Bouton clear si une valeur est sélectionnée -->
        <button 
          v-if="selectedItem && clearable && !disabled"
          @click.stop="clearSelection"
          class="mr-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <X class="w-4 h-4" />
        </button>
        
        <!-- Icône dropdown -->
        <ChevronDown 
          class="w-4 h-4 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>
    </div>

    <!-- Liste déroulante -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div 
        v-if="isOpen"
        class="absolute z-50 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60"
      >
        <!-- Input de recherche -->
        <div v-if="searchable" class="p-2 border-b border-gray-100">
          <input
            ref="searchInput"
            v-model="searchQuery"
            placeholder="Rechercher..."
            class="w-full px-3 py-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            @keydown.enter.prevent="selectHighlighted"
            @keydown.escape="closeDropdown"
            @keydown.arrow-down.prevent="navigateDown"
            @keydown.arrow-up.prevent="navigateUp"
          />
        </div>

        <!-- Option vide si clearable -->
        <div 
          v-if="clearable && !searchQuery"
          @click="selectOption(null)"
          class="px-3 py-2 text-sm italic text-gray-500 transition-colors duration-150 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
          :class="{ 'bg-blue-50': highlightedIndex === -1 }"
        >
          Aucune sélection
        </div>

        <!-- Options filtrées -->
        <div 
          v-for="(option, index) in filteredOptions" 
          :key="getItemValue(option)"
          @click="selectOption(option)"
          class="flex items-center justify-between px-3 py-2 text-sm transition-colors duration-150 cursor-pointer hover:bg-gray-50"
          :class="{ 
            'bg-blue-50': index === highlightedIndex,
            'bg-blue-100 text-blue-800 font-medium': isSelected(option)
          }"
        >
          <span>{{ getItemLabel(option) }}</span>
          <Check 
            v-if="isSelected(option)"
            class="w-4 h-4 text-blue-600"
          />
        </div>

        <!-- Message si aucun résultat -->
        <div 
          v-if="filteredOptions.length === 0"
          class="px-3 py-2 text-sm text-center text-gray-500"
        >
          {{ searchQuery ? 'Aucun résultat trouvé' : 'Aucune option disponible' }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { ChevronDown, X, Check } from 'lucide-vue-next'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number, Object, null],
    default: null
  },
  options: {
    type: Array,
    required: true
  },
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
  },
  placeholder: {
    type: String,
    default: 'Sélectionner une option...'
  },
  searchable: {
    type: Boolean,
    default: true
  },
  clearable: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  emptyMessage: {
    type: String,
    default: 'Aucune option disponible'
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

// Refs
const isOpen = ref(false)
const searchQuery = ref('')
const searchInput = ref(null)
const highlightedIndex = ref(-1)

// Computed
const selectedItem = computed(() => {
  if (!props.modelValue) return null
  
  return props.options.find(option => 
    getItemValue(option) === props.modelValue
  )
})

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options
  
  return props.options.filter(option => 
    getItemLabel(option).toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
const getItemLabel = (item) => {
  if (!item) return ''
  return typeof item === 'object' ? item[props.optionLabel] : item
}

const getItemValue = (item) => {
  if (!item) return null
  return typeof item === 'object' ? item[props.optionValue] : item
}

const isSelected = (option) => {
  if (!props.modelValue || !option) return false
  return getItemValue(option) === props.modelValue
}

const toggleDropdown = () => {
  if (props.disabled) return
  
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
    highlightedIndex.value = -1
    emit('focus')
    
    if (props.searchable) {
      setTimeout(() => {
        searchInput.value?.focus()
      }, 100)
    }
  } else {
    emit('blur')
  }
}

const closeDropdown = () => {
  isOpen.value = false
  highlightedIndex.value = -1
  emit('blur')
}

const selectOption = (option) => {
  const value = option ? getItemValue(option) : null
  
  emit('update:modelValue', value)
  emit('change', value)
  
  closeDropdown()
}

const clearSelection = () => {
  emit('update:modelValue', null)
  emit('change', null)
}

const selectHighlighted = () => {
  if (props.clearable && highlightedIndex.value === -1) {
    selectOption(null)
  } else if (filteredOptions.value[highlightedIndex.value]) {
    selectOption(filteredOptions.value[highlightedIndex.value])
  }
}

const navigateDown = () => {
  const maxIndex = filteredOptions.value.length - 1
  if (highlightedIndex.value < maxIndex) {
    highlightedIndex.value++
  } else if (props.clearable && highlightedIndex.value === maxIndex) {
    highlightedIndex.value = -1
  }
}

const navigateUp = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  } else if (highlightedIndex.value === 0 && props.clearable) {
    highlightedIndex.value = -1
  } else if (highlightedIndex.value === -1) {
    highlightedIndex.value = filteredOptions.value.length - 1
  }
}

// Click outside handler
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    closeDropdown()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch pour la navigation clavier
watch(highlightedIndex, (newIndex) => {
  // Scroll vers l'élément surligné si nécessaire
  const dropdown = document.querySelector('.absolute.z-50')
  if (dropdown && newIndex >= 0) {
    const highlightedElement = dropdown.children[newIndex + (props.searchable ? 1 : 0) + (props.clearable ? 1 : 0)]
    if (highlightedElement) {
      highlightedElement.scrollIntoView({ block: 'nearest' })
    }
  }
})
</script>