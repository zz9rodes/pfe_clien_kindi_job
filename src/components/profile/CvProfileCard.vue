<template>
  <div
    class="overflow-hidden transition-all bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg"
  >
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="mb-2 text-xl font-bold text-gray-900">Mon Profil CV</h3>
          <p class="text-sm text-gray-600 line-clamp-2">
            {{ profile.bio || "Aucune biographie disponible" }}
          </p>
        </div>
        <div class="flex gap-2">
          <button
            @click="$emit('edit', profile)"
            class="p-2 text-blue-600 rounded-full hover:bg-blue-50"
          >
            <EditIcon class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Competences -->
      <div
        v-if="profile.competence && profile.competence.length > 0"
        class="mb-4"
      >
        <h4 class="mb-2 text-sm font-medium text-gray-700">Compétences</h4>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="(skill, index) in profile.competence.slice(0, 3)"
            :key="index"
            class="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
          >
            {{ skill }}
          </span>
          <span
            v-if="profile.competence.length > 3"
            class="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
          >
            +{{ profile.competence.length - 3 }} autres
          </span>
        </div>
      </div>
      <!--Focus Point  -->
      <div
        v-if="profile.focus_point && profile.focus_point.length > 0"
        class="mt-8 mb-4"
      >
        <h4 class="mb-2 text-sm font-medium text-gray-700">Focus Points</h4>
        <div class="flex flex-wrap gap-1">
          <span
            v-for="(skill, index) in profile.focus_point.slice(0, 4)"
            :key="index"
            class="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
          >
            {{ skill }}
          </span>
          <span
            v-if="profile.focus_point.length > 4"
            class="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
          >
            +{{ profile.focus_point.length - 4 }} autres
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-2 pt-4 border-t border-gray-100">
        <button
          @click="$emit('view', profile)"
          class="flex-1 bg-[#e4097f] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#c01370] transition-colors"
        >
          Voir le profil
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Edit as EditIcon, Trash as TrashIcon } from "lucide-vue-next";

defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

defineEmits(["edit", "view"]);
</script>
