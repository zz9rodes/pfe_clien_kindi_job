<template>
  <div class="p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg">
    <!-- Header avec nom et version -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="mb-1 text-lg font-semibold text-gray-900">
          {{ version.companyName }}
        </h3>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-[#db147f]">
            v{{ version.version }}
          </span>
          <span 
            :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              version.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ version.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>
      </div>
      
      <!-- Toggle Switch -->
      <div class="flex items-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="version.isActive"
            @change="$emit('toggle', version.id)"
            class="sr-only peer"
          />
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#db147f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#db147f]"></div>
        </label>
      </div>
    </div>

    <!-- Description -->
    <p v-if="version.description" class="mb-4 text-sm text-gray-600 line-clamp-2">
      {{ version.description }}
    </p>

    <!-- Features -->
    <div v-if="version.features && version.features.length > 0" class="mb-4">
      <h4 class="mb-2 text-sm font-medium text-gray-700">industries :</h4>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="feature in version.features.slice(0, 3)"
          :key="feature"
          class="px-2 py-1 text-xs text-blue-700 rounded-md bg-blue-50"
        >
          {{ feature }}
        </span>
        <span
          v-if="version.features.length > 3"
          class="px-2 py-1 text-xs text-gray-600 rounded-md bg-gray-50"
        >
          +{{ version.features.length - 3 }} autres
        </span>
      </div>
    </div>

    <!-- Dates -->
    <div class="flex items-center justify-between mb-4 text-xs text-gray-500">
      <div class="flex items-center">
        <CalendarIcon class="w-3 h-3 mr-1" />
        Créée le {{ formatDate(version.createdAt) }}
      </div>
      <div class="flex items-center">
        <ClockIcon class="w-3 h-3 mr-1" />
        modifier le {{ formatDate(version.updatedAt) }}
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end pt-4 space-x-2 border-t border-gray-100">
      <button
        @click="$emit('edit', version)"
        class="px-3 py-1 text-sm font-medium text-[#db147f] bg-white border border-[#db147f] rounded-lg hover:bg-[#db147f] hover:text-white transition-colors"
      >
        <EyeIcon class="inline-block w-4 h-4 mr-1" />
        Voir
      </button>
      <button
        @click="$emit('delete', version.id)"
        class="px-3 py-1 text-sm font-medium text-red-600 transition-colors bg-white border border-red-600 rounded-lg hover:bg-red-600 hover:text-white"
      >
        <TrashIcon class="inline-block w-3 h-3 mr-1" />
        Supprimer
      </button>
    </div>

    <div 
      :class="[
        'absolute top-0 left-0 w-1 h-full rounded-l-lg',
        version.isActive ? 'bg-green-500' : 'bg-gray-300'
      ]"
    ></div>
  </div>
</template>

<script setup>
import { CalendarIcon, ClockIcon, EditIcon, TrashIcon ,EyeIcon} from 'lucide-vue-next'

const props = defineProps({
  version: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle', 'edit', 'delete'])

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Position relative pour l'indicateur de statut */
.bg-white {
  position: relative;
}
</style>
