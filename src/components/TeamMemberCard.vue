<template>
  <div
    :key="member.name"
    class="p-2 text-center bg-white border rounded-lg"
  >
    <div
      class="relative flex flex-col overflow-hidden transition duration-700 ease-in-out group hover:cursor-pointer"
    >
      <div class="w-20 h-20 mx-auto mb-4">
        <img
          v-if="member.avatar && !errorAvatars[member.name]"
          :src="member.avatar"
          :alt="member.name"
          class="object-cover w-20 h-20 rounded-full"
          @error="handleAvatarError(member.name)"
        />
        <div
          v-else
          class="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full"
        >
          <UserIcon class="w-10 h-10 text-gray-400" />
        </div>
      </div>
      <h3 class="mb-1 font-semibold text-gray-900">{{ member.name }}</h3>
      <p class="mb-2 text-sm text-gray-600">{{ member.position }}</p>
      <p class="text-xs text-gray-500">{{ member.department }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserIcon } from 'lucide-vue-next'

const props = defineProps({
  member: {
    type: Object,
    required: true,
  }
})

const errorAvatars = ref({})

function handleAvatarError(name) {
  errorAvatars.value[name] = true
}
</script>
