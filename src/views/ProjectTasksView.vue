<template>
  <div class="w-full ">
    <TaskBoard 
      :projectId="projectId" 
      :projectName="projectName"
    />
  </div>
</template>

<script setup>
import TaskBoard from './TaskBoard.vue'

const props = defineProps({
  projectId: {
    type: [String, Number],
    required: true
  },
  projectName: {
    type: String,
    default: 'Mon Projet'
  }
})
</script>
