<template>
<div :class="['group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100', cardBorderClass]">
  <!-- Background decorative elements -->
  <div :class="['absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500', cardBackgroundClass]"></div>
  
  <div class="relative p-6 space-y-4">
    <div class="flex items-center justify-between">
      <div :class="['p-3 rounded-full', iconBgClass]">
        <component :is="iconComponent" :class="['w-6 h-6', iconColorClass]" />
      </div>
      <span class="text-4xl font-bold text-gray-900 group-hover:text-[#e4097f] transition-colors duration-300">
        {{ value }}
      </span>
    </div>
    
    <h3 class="text-lg font-semibold text-gray-700 group-hover:text-[#00a3e0] transition-colors duration-300">
      {{ title }}
    </h3>
    
    <p class="text-sm text-gray-500">
      Latest update: <span class="font-medium">{{ lastUpdate }}</span>
    </p>
  </div>
</div>
</template>

<script setup>
import { computed } from 'vue';
import { BriefcaseIcon, FolderIcon, UsersIcon, UserPlusIcon, BuildingIcon, Building2Icon, FileTextIcon, HandshakeIcon } from 'lucide-vue-next';

const props = defineProps({
title: {
  type: String,
  required: true,
},
value: {
  type: Number,
  required: true,
},
icon: {
  type: String,
  required: true,
},
color: {
  type: String,
  default: 'gray', // 'pink', 'blue', 'green', 'purple', 'orange', 'teal', 'red', 'yellow'
},
});

const iconComponent = computed(() => {
const icons = {
  BriefcaseIcon,
  FolderIcon,
  UsersIcon,
  UserPlusIcon,
  BuildingIcon,
  Building2Icon,
  FileTextIcon,
  HandshakeIcon,
};
return icons[props.icon] || BriefcaseIcon; // Default to BriefcaseIcon if not found
});

const cardBorderClass = computed(() => {
switch (props.color) {
  case 'pink': return 'hover:border-[#e4097f]/30';
  case 'blue': return 'hover:border-[#00a3e0]/30';
  case 'green': return 'hover:border-green-500/30';
  case 'purple': return 'hover:border-purple-500/30';
  case 'orange': return 'hover:border-orange-500/30';
  case 'teal': return 'hover:border-teal-500/30';
  case 'red': return 'hover:border-red-500/30';
  case 'yellow': return 'hover:border-yellow-500/30';
  default: return 'hover:border-gray-300/30';
}
});

const cardBackgroundClass = computed(() => {
switch (props.color) {
  case 'pink': return 'group-hover:from-[#e4097f]/5';
  case 'blue': return 'group-hover:from-[#00a3e0]/5';
  case 'green': return 'group-hover:from-green-500/5';
  case 'purple': return 'group-hover:from-purple-500/5';
  case 'orange': return 'group-hover:from-orange-500/5';
  case 'teal': return 'group-hover:from-teal-500/5';
  case 'red': return 'group-hover:from-red-500/5';
  case 'yellow': return 'group-hover:from-yellow-500/5';
  default: return 'group-hover:from-gray-200/5';
}
});

const iconBgClass = computed(() => {
switch (props.color) {
  case 'pink': return 'bg-[#e4097f]/10 group-hover:bg-[#e4097f]/20';
  case 'blue': return 'bg-[#00a3e0]/10 group-hover:bg-[#00a3e0]/20';
  case 'green': return 'bg-green-500/10 group-hover:bg-green-500/20';
  case 'purple': return 'bg-purple-500/10 group-hover:bg-purple-500/20';
  case 'orange': return 'bg-orange-500/10 group-hover:bg-orange-500/20';
  case 'teal': return 'bg-teal-500/10 group-hover:bg-teal-500/20';
  case 'red': return 'bg-red-500/10 group-hover:bg-red-500/20';
  case 'yellow': return 'bg-yellow-500/10 group-hover:bg-yellow-500/20';
  default: return 'bg-gray-200/10 group-hover:bg-gray-200/20';
}
});

const iconColorClass = computed(() => {
switch (props.color) {
  case 'pink': return 'text-[#e4097f] group-hover:text-[#c4087a]';
  case 'blue': return 'text-[#00a3e0] group-hover:text-[#0088cc]';
  case 'green': return 'text-green-600 group-hover:text-green-700';
  case 'purple': return 'text-purple-600 group-hover:text-purple-700';
  case 'orange': return 'text-orange-600 group-hover:text-orange-700';
  case 'teal': return 'text-teal-600 group-hover:text-teal-700';
  case 'red': return 'text-red-600 group-hover:text-red-700';
  case 'yellow': return 'text-yellow-600 group-hover:text-yellow-700';
  default: return 'text-gray-600 group-hover:text-gray-700';
}
});

const lastUpdate = computed(() => {
// For simplicity, a static string. In a real application, this would be dynamic.
return 'just now';
});
</script>

<style scoped>
/* Inherit general card styles from other components if needed, or define here */
</style>
