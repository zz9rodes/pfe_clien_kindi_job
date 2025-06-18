<template>
  <div
    class="bg-white mx-3 rounded-md w-3/4 md:w-2/4 shadow-lg h-[80vh] overflow-y-auto modal-container"
  >
    <div
      class="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-100"
    >
      <div class="flex items-center gap-4">
        <h3 class="text-xl font-bold text-gray-900">Invite Users</h3>
        <span
          v-if="activeFiltersCount > 0"
          class="bg-[#e4097f] text-[8px] text-white px-2 py-1 rounded-full size-[18px] flex justify-center items-center"
        >
          {{ activeFiltersCount }}
        </span>
      </div>
      <div class="flex items-center gap-3">
        <button
          @click="HadleCloseModal"
          class="p-1 text-gray-400 hover:text-gray-600"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <form @submit.prevent="HandleSendInviation">
      <div class="flex flex-col p-6 b">
        <div class="">
          <div class="space-y-6">
            <div class="space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="example-mail@demo.com"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e4097f] outline-none"
                required
              />
              <input
                id="role"
                v-model="role"
                type="text"
                placeholder="user role"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e4097f] outline-none"
                required
              />

              <div class="">
                <MultiSelect
                  v-model="selectedPermissions"
                  :options="permissions"
                  option-label="label"
                  option-value="id"
                  placeholder="Choisissez des pays..."
                  @change="handleChange"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="pt-6 mt-6 border-t border-gray-100">
          <button
            type="submit"
            class="w-full bg-[#e4097f] text-white py-2 px-6 rounded-md font-semibold hover:shadow-lg hover:scale transition-all duration-200 flex items-center justify-center gap-2"
          >
            Invite
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import MultiSelect from "../globales/MultiSelect.vue";

const emit = defineEmits(["close", "submitform"]);

const route = useRoute();

const HadleCloseModal = () => {
  emit("close");
};



const permissions = ref([
  { id: "task:create", label: "Créer une tâche" },
  { id: "task:edit", label: "Modifier une tâche" },
  { id: "task:delete", label: "Supprimer une tâche" },
  { id: "task:view", label: "Lecture des tâches" },
  { id: "task:all", label: "Toutes les permissions sur les tâches" },

  { id: "project:create", label: "Créer un projet" },
  { id: "project:edit", label: "Modifier un projet" },
  { id: "project:delete", label: "Supprimer un projet" },
  { id: "project:view", label: "Lecture des projets" },
  { id: "project:all", label: "Toutes les permissions sur les projets" },

  { id: "job:create", label: "Créer un job" },
  { id: "job:edit", label: "Modifier un job" },
  { id: "job:delete", label: "Supprimer un job" },
  { id: "job:view", label: "Lecture des jobs" },
  { id: "job:all", label: "Toutes les permissions sur les jobs" },
]);
const selectedPermissions = ref([]);
const email = ref("");
const role = ref("");

const HandleSendInviation = async () => {
  const payload = {
    email: email.value,
    role: role.value,
    companyId: route.params.companyId,
    scopes: selectedPermissions.value,
  };

  emit("submitform", payload);
};
</script>

<style scoped>
.filter-container::-webkit-scrollbar {
  width: 4px;
}

.filter-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 2px;
}

.filter-container::-webkit-scrollbar-thumb {
  background: #e4097f;
  border-radius: 2px;
}

.filter-container::-webkit-scrollbar-thumb:hover {
  background: #c1086a;
}

* {
  transition: all 0.2s ease;
}

@media (min-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid-cols-1 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .grid-cols-1 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

.modal-container {
  --sb-track-color: #e1e3e4;
  --sb-thumb-color: #ffffff;
  --sb-size: 7px;
}

.modal-container::-webkit-scrollbar {
  width: var(--sb-size);
}

.modal-container::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 8px;
}

.modal-container::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 8px;
}

@supports not selector(::-webkit-scrollbar) {
  .modal-container {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}
</style>
