<template>
  <div class="p-6 transition-shadow duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
    <!-- Header avec statut -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="mb-1 text-lg font-semibold text-gray-900">
          {{ request.name }}
        </h3>
        <p class="text-sm text-gray-600">{{ request.industry }}</p>
      </div>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        {{request.status}}
      </span>
    </div>

    <div class="mt-4">
        <img :src="request.avatarUrl" class="w-full h-[200px] object-cover rounded-lg object-center">
    </div>

    <!-- Description -->
    <p class="my-4 text-sm text-gray-700 line-clamp-3">
      {{ request.description }}
    </p>

    <!-- Informations -->
    <div class="mb-4 space-y-2">
      <div class="flex items-center text-sm text-gray-600">
        <MapPinIcon class="w-4 h-4 mr-4"/>
        {{ request.city }}, {{ request.country }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
       <MailIcon class="w-4 h-4 mr-4" />
        {{ request.email }}
      </div>
      <div class="flex items-center text-sm text-gray-600">
        <Calendar class="w-4 h-4 mr-4"  />
        Demandé le {{ formatDate(request.createdAt) }}
      </div>
    </div>

    <!-- Actions -->
    <div class="flex space-x-2">
      <button
        @click="viewDetails"
        class="flex-1 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-[#e4097f] rounded-md "
      >
        Voir détails
      </button>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon,MailIcon, Calendar } from 'lucide-vue-next'
import { defineProps, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  request: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['approve', 'reject', 'edit'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const router = useRouter()

const viewDetails = () => {
  router.push(`/admin/companie_request/${props.request.slug}/details`)
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
