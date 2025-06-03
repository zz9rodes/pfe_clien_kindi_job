<template>
  <div>
    <Teleport to="#modal">
      <Transition name="drawer">
        <div 
          class="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-[1px]" 
          v-if="isOpen" 
          @click.self="handleOnClickOutside"
        >
          <Apploader v-if="isLoader" />
          <div 
            v-else
            :class="[
              'fixed top-0 h-full bg-white  shadow-xl transform transition-transform duration-300 ease-in-out',
              position === 'right' ? 'right-0' : 'left-0',
              width ? 'w-auto md:min-w-['+width+']':'',
              drawerClasses
            ]"
          >
            <slot></slot>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import Apploader from './Apploader.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  isLoader: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },
  width: {
    type: String,
    default: '500px'
  }
})

const emit = defineEmits(['closeDrawer'])

const drawerClasses = computed(() => {
  return props.position === 'right' 
    ? 'translate-x-0' 
    : 'translate-x-0'
})

const handleOnClickOutside = () => {
  if (!props.isLoader) {
    emit('closeDrawer')
  }
}
</script>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.3s ease;
}

.drawer-enter-from {
  opacity: 0;
}

.drawer-enter-from .fixed {
  transform: translateX(100%);
}

.drawer-enter-from .fixed.left-0 {
  transform: translateX(-100%);
}

.drawer-leave-to {
  opacity: 0;
}

.drawer-leave-to .fixed {
  transform: translateX(100%);
}

.drawer-leave-to .fixed.left-0 {
  transform: translateX(-100%);
}
</style>
