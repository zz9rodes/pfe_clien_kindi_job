<template>
  <div class="p-4 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md">
    <div class="flex items-center space-x-3">
      <div class="flex-shrink-0">
        <img
          v-if="member.avatar && !errorAvatars[member.name]"
          :src="member.avatar"
          :alt="member.name"
          class="object-cover w-12 h-12 border-2 border-gray-100 rounded-full"
          @error="handleAvatarError(member.name)"
        />
        <div
          v-else
          class="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full"
        >
          <span class="text-sm font-medium text-gray-600">
            {{ getInitials(member.name) }}
          </span>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium text-gray-900 truncate">
          {{ member.name }}
        </h3>
        <p class="text-sm text-gray-500 truncate">
          {{ member.position }}
        </p>
        <div class="mt-2">
          <span 
            :class="[
              'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
              member.status === 'accepted' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            ]"
          >
            <div 
              :class="[
                'w-1.5 h-1.5 rounded-full mr-1.5',
                member.status === 'accepted' ? 'bg-green-400' : 'bg-yellow-400'
              ]"
            ></div>
            {{ member.status === 'accepted' ? 'Actif' : 'En attente' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  member: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['resend-invitation', 'view-profile', 'remove-member'])

const errorAvatars = ref({})

function handleAvatarError(name) {
  errorAvatars.value[name] = true
}

function getInitials(name) {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('')
}
</script>