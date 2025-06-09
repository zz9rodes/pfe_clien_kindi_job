<template>
  <!-- <AppModal
      @closeModal="toggleOpenModal"
      :isOpen="isModalOpen"
      :isLoader="false"
    >
      <div
        class="w-full max-w-md p-6 mx-4 bg-white rounded-xl"
      >
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Rejeter la demande
        </h3>
        <p class="mb-6 text-gray-600">
          Êtes-vous sûr de vouloir rejeter cette demande ? Cette action est
          irréversible.
        </p>
          <div class="mb-4 ">
            <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="desapproveMessage"
              placeholder="Décrivez les raisons du Reject de cette Version"
              rows="3"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            ></textarea>
          </div>
        <div class="flex space-x-3">
          <button
            @click="toggleOpenModal"
            class="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            @click="HandleConfirmReject"
            class="flex-1 px-4 py-2 font-medium bg-[#db147f] text-white transition-colors duration-200 rounded-lg"
          >
            Rejeter
          </button>
        </div>
      </div>
    </AppModal>
    <AppModal
      @closeModal="toggleOpenLoaderModal"
      :isOpen="isLoading"
      :isLoader="true"
    /> -->
  <div
    class="w-full p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg"
  >
    <!-- Header avec nom et version -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="mb-1 text-lg font-semibold text-gray-900">
          {{ version.activeDetails.name }}
        </h3>
        <p class="py-2">{{ version.activeDetails.industry }}</p>
      </div>

      <!-- Toggle Switch -->
      <div class="flex items-center">
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="version.activeDetails.isActive"
            @change="$emit('toggle', version.activeDetails.id)"
            class="sr-only peer"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#db147f]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#db147f]"
          ></div>
        </label>
      </div>
    </div>

    <div class="mt-4">
      <img
        :src="version.activeDetails.avatarUrl"
        class="w-full h-[200px] object-cover rounded-lg object-center"
      />
    </div>

    <!-- Description -->
    <p
      v-if="version.activeDetails.description"
      class="my-4 text-sm text-gray-600 line-clamp-2"
    >
      {{ version.activeDetails.description }}
    </p>

    <!-- Dates -->
    <div class="flex items-center justify-between mb-4 text-xs text-gray-500">
      <div class="flex items-center">
        <CalendarIcon class="w-3 h-3 mr-1" />
        Créée le {{ formatDate(version.activeDetails.createdAt) }}
      </div>
      <div class="flex items-center">
        <ClockIcon class="w-3 h-3 mr-1" />
        modifier le {{ formatDate(version.activeDetails.updatedAt) }}
      </div>
    </div>

    <!-- Actions -->
    <div
      class="flex items-center justify-end pt-4 space-x-2 border-t border-gray-100"
    >
      <button
        @click="viewDetails"
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
        version.activeDetails.isActive ? 'bg-[#db147f]' : 'bg-gray-300',
      ]"
    ></div>
  </div>
</template>

<script setup>
import {
  CalendarIcon,
  ClockIcon,
  EditIcon,
  TrashIcon,
  EyeIcon,
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { ref } from "vue";
const props = defineProps({
  version: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const isModalOpen = ref(false);
const isLoading = ref(false);

const toggleOpenModal = (cause = "r") => {
  isModalForApproved.value = cause == "a" ? true : false;
  isModalOpen.value = !isModalOpen.value;
};

const toggleOpenLoaderModal = () => {
  isLoading.value = !isLoading.value;
};

const emit = defineEmits(["toggle", "edit", "delete"]);

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const viewDetails = () => {
  router.push(`/admin/companies_version/${props.version.slug}`);
};
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
