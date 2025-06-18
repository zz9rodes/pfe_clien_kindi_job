<template>
  <div class="relative w-full">
    <div
      @click="toggleDropdown"
      class="min-h-[2.5rem] w-full px-3 py-2 border  rounded-md bg-white cursor-pointer focus:ring-2 focus:ring-[#e4097f] border-gray-300 transition-all duration-200"
      :class="{ 'ring-2 ring-[#e4097f] ': isOpen }"
    >
      <div class="flex flex-wrap gap-1 mb-1" v-if="selectedItems.length > 0">
        <span
          v-for="item in selectedItems"
          :key="getItemValue(item)"
          class="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-[#e4097f] rounded-full"
        >
          {{ getItemLabel(item) }}
          <button
            @click.stop="removeItem(item)"
            class="ml-1 focus:outline-none"
          >
            <X class="w-3 h-3" />
          </button>
        </span>
      </div>
      <div v-else>
            select permissions
      </div>

      <input
        v-if="search"
        ref="searchInput"
        v-model="searchQuery"
        :placeholder="selectedItems.length === 0 ? placeholder : ''"
        class="w-full text-sm bg-transparent border-none outline-none"
        @keydown.enter.prevent="selectFirstFiltered"
        @keydown.escape="closeDropdown"
        @keydown.arrow-down.prevent="navigateDown"
        @keydown.arrow-up.prevent="navigateUp"
      />

      <div
        class="absolute transform -translate-y-1/2 pointer-events-none right-3 top-1/2"
      >
        <ChevronDown
          class="w-4 h-4 text-gray-400 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
      </div>
    </div>

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
        <!-- Option "Sélectionner tout" -->
        <div
          v-if="showSelectAll && filteredOptions.length > 0"
          @click="toggleSelectAll"
          class="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
        >
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="isAllSelected"
              :indeterminate="isPartiallySelected"
              class="mr-2 text-pink-600 border-gray-300 rounded "
              readonly
            />
            Sélectionner tout
          </div>
        </div>

        <!-- Options filtrées -->
        <div
          v-for="(option, index) in filteredOptions"
          :key="getItemValue(option)"
          @click="toggleOption(option)"
          class="px-3 py-2 text-sm transition-colors duration-150 cursor-pointer hover:bg-gray-50"
          :class="{
            'bg-pink-50': index === highlightedIndex,
            'bg-gray-50': isSelected(option),
          }"
        >
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="isSelected(option)"
              class="mr-2 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              readonly
            />
            <span>{{ getItemLabel(option) }}</span>
          </div>
        </div>

        <!-- Message si aucun résultat -->
        <div
          v-if="filteredOptions.length === 0"
          class="px-3 py-2 text-sm text-center text-gray-500"
        >
          Aucun résultat trouvé
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { ChevronDown, X } from "lucide-vue-next";

// Props
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Array,
    required: true,
  },
  optionLabel: {
    type: String,
    default: "label",
  },
  optionValue: {
    type: String,
    default: "value",
  },
  placeholder: {
    type: String,
    default: "Sélectionner des options...",
  },
  showSelectAll: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  search:{
     type: Boolean,
    default: false,
  }
});

// Emits
const emit = defineEmits(["update:modelValue", "change"]);

// Refs
const isOpen = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const highlightedIndex = ref(-1);

// Computed
const selectedItems = computed(() => {
  return props.options.filter((option) =>
    props.modelValue.includes(getItemValue(option))
  );
});

const filteredOptions = computed(() => {
  if (!searchQuery.value) return props.options;

  return props.options.filter((option) =>
    getItemLabel(option).toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const isAllSelected = computed(() => {
  return (
    filteredOptions.value.length > 0 &&
    filteredOptions.value.every((option) => isSelected(option))
  );
});

const isPartiallySelected = computed(() => {
  const selectedCount = filteredOptions.value.filter((option) =>
    isSelected(option)
  ).length;
  return selectedCount > 0 && selectedCount < filteredOptions.value.length;
});

// Methods
const getItemLabel = (item) => {
  return typeof item === "object" ? item[props.optionLabel] : item;
};

const getItemValue = (item) => {
  return typeof item === "object" ? item[props.optionValue] : item;
};

const isSelected = (option) => {
  return props.modelValue.includes(getItemValue(option));
};

const toggleDropdown = () => {
  if (props.disabled) return;

  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    searchQuery.value = "";
    highlightedIndex.value = -1;
    setTimeout(() => {
      searchInput.value?.focus();
    }, 100);
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  highlightedIndex.value = -1;
};

const toggleOption = (option) => {
  const value = getItemValue(option);
  const newValue = [...props.modelValue];

  if (newValue.includes(value)) {
    const index = newValue.indexOf(value);
    newValue.splice(index, 1);
  } else {
    newValue.push(value);
  }

  emit("update:modelValue", newValue);
  emit("change", newValue);
};

const removeItem = (item) => {
  const value = getItemValue(item);
  const newValue = props.modelValue.filter((v) => v !== value);
  emit("update:modelValue", newValue);
  emit("change", newValue);
};

const toggleSelectAll = () => {
  const filteredValues = filteredOptions.value.map((option) =>
    getItemValue(option)
  );

  if (isAllSelected.value) {
    // Désélectionner tous les éléments filtrés
    const newValue = props.modelValue.filter(
      (value) => !filteredValues.includes(value)
    );
    emit("update:modelValue", newValue);
    emit("change", newValue);
  } else {
    // Sélectionner tous les éléments filtrés
    const newValue = [...new Set([...props.modelValue, ...filteredValues])];
    emit("update:modelValue", newValue);
    emit("change", newValue);
  }
};

const selectFirstFiltered = () => {
  if (filteredOptions.value.length > 0) {
    toggleOption(filteredOptions.value[0]);
  }
};

const navigateDown = () => {
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++;
  }
};

const navigateUp = () => {
  if (highlightedIndex.value > -1) {
    highlightedIndex.value--;
  }
};

// Click outside handler
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    closeDropdown();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Watch pour fermer le dropdown quand on clique ailleurs
watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener("click", handleClickOutside);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }
});
</script>

<style scoped>
/* Styles pour l'état indeterminate du checkbox */
input[type="checkbox"]:indeterminate {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M4 8h8'/%3e%3c/svg%3e");
}
</style>
