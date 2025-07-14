<template>
  <div @click.stop="$emit('update', task)" class="p-4 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md">
     <div class="flex items-start justify-between mb-3">
      <h3 class="text-sm font-semibold leading-tight text-gray-900">
        {{ task?.name }}
      </h3>
      <span 
        :class="[
          'px-2 py-1 text-xs font-medium rounded-full',
          getPriorityClasses(task.priority)
        ]"
      >
        {{ getPriorityLabel(task?.priority) }}
      </span>
    </div>

    <p v-if="task.description" class="mb-3 text-sm text-gray-600 line-clamp-2">
      {{ task?.description }}
    </p>

    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-3 text-xs text-gray-500">
        <div class="flex items-center">
          <CalendarIcon class="w-3 h-3 mr-1" />
          {{ formatDate(task?.startDate) }}
        </div>
        <div class="flex items-center">
          <ClockIcon class="w-3 h-3 mr-1" />
          {{ task?.estimationTime }}j
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mb-3">
      <div v-if="['completed', 'closed'].includes(task?.status)" class="flex items-center text-sm text-green-600">
        <CheckCircleIcon class="w-4 h-4 mr-1" />
        {{ getStatusLabel(task?.status) }}
      </div>
    </div>

    <div class="flex items-center justify-between">

        <img v-if="task?.assignee?.member?.account?.avatarUrl" :src="task?.assignee?.member?.account?.avatarUrl" class="flex items-center justify-center object-cover w-8 h-8 bg-gray-200 rounded-full">
        <div
          v-else
          class="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full"
        >
          <span class="text-sm font-medium text-gray-600">
            {{ getInitials(task?.assignee?.member?.account?.firstName+""+task?.assignee?.member?.account?.lastName) }}
          </span>
        </div>
      
      <div class="flex items-center space-x-3 text-sm text-gray-500">
               <div class="flex items-center">
          <MessageCircleIcon class="w-4 h-4 mr-1" />
          {{ task?.comments ? task?.comments?.length : 0 }}
        </div>
      </div>
       
    </div>
    
     

    <div class="flex items-center justify-end pt-3 mt-3 space-x-2 border-t border-gray-100">
     {{ task?.id }}
      
      <button
        @click.stop="$emit('delete', task)"
        class="px-3 py-1 text-xs font-medium text-red-600 transition-colors bg-white rounded-lg "
        title="Supprimer"
      >
        <TrashIcon class="inline-block w-4 h-4 mr-1" />
      </button>
    </div> 
    <!-- {{ task }} -->
  </div>
</template>

<script setup>
import { 
  ClockIcon, 
  CheckCircleIcon, 
  EyeIcon, 
  MessageCircleIcon, 
  EditIcon, 
  TrashIcon,
  CalendarIcon,
  AlertCircleIcon,
  User
} from 'lucide-vue-next'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'delete'])

const getPriorityClasses = (priority) => {
  const classes = {
    'HIGH': 'bg-red-100 text-red-800',
    'MEDIUM': 'bg-yellow-100 text-yellow-800',
    'LOW': 'bg-green-100 text-green-800',
  }
  return classes[priority] || 'bg-gray-100 text-gray-800'
}

const getPriorityLabel = (priority) => {
  const labels = {
    'HIGH': 'high',
    'MEDIUM': 'medium',
    'LOW': 'low',
  }
  return labels[priority] || priority
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit'
  })
}

function getInitials(name) {
  if (!name) return '??'
  return name.split(' ').map(n => n[0]).join('')
}

const getStatusClasses = (status) => {
  const classes = {
    'create': 'bg-blue-100 text-blue-800',
    'in_progress': 'bg-yellow-100 text-yellow-800',
    'in_review': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800',
    'closed': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusLabel = (status) => {
  const labels = {
    'create': 'Créé',
    'in_progress': 'En cours',
    'in_review': 'En révision',
    'completed': 'Terminé',
    'closed': 'Fermé'
  }
  return labels[status] || status
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
