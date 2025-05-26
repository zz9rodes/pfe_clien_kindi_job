<template>
  <div
    class="flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-md cursor-pointer group hover:bg-violet-50 hover:text-violet-600"
    :class="[
      isActive ? 'bg-violet-50 text-violet-600' : 'text-gray-600',!isExpanded ? 'justify-center':''
    ]"
  >
    <div v-html="item.icon"></div>

    <span
      v-if="isExpanded"
      class="transition-all duration-300"
    >
      {{ item.label }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isExpanded: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>