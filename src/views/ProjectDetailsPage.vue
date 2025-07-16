<template>
  <div class="w-full min-h-screen bg-gray-50">
    <AppModal :isOpen="loading" :isLoader="true"> </AppModal>

    <AppModal
      @closeModal="toggleOpenModal"
      :isOpen="isModalOpen"
      :isLoader="false"
    >
      <div
        class="mx-3 overflow-y-auto w-[80%] md:w-[40%] h-[50%] bg-white rounded-md shadow-lg modal-container"
      >
        <div
          class="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-gray-100"
        >
          <div class="flex items-center gap-4">
            <h3 class="text-xl font-bold text-gray-900">Add new Member</h3>
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

        <form @submit.prevent="HandleAddToProject">
          <div class="flex flex-col p-6 b">
            <div class="">
              <div class="space-y-6">
                <div class="space-y-2">
                  <div class="">
                    <MultiSelect
                      v-model="selectedMembers"
                      :options="companieMembers"
                      option-label="fullName"
                      option-value="id"
                      placeholder="Sélectionner des membres..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-6 mt-6 border-t border-gray-100">
              <button
                type="submit"
                :disabled="isAddingMembers"
                class="w-full bg-[#e4097f] text-white py-2 px-6 rounded-md font-semibold hover:shadow-lg hover:scale transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span v-if="isAddingMembers">Ajout en cours...</span>
                <span v-else>Inviter</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppModal>

    <!-- Header du projet -->
    <div class="bg-white border-b border-gray-200 shadow-sm">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="py-6">
          <!-- Breadcrumb -->
          <nav class="flex mb-4" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li>
                <div class="flex items-center">
                  <a
                    href="#"
                    class="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Projets
                  </a>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <ChevronRightIcon
                    class="flex-shrink-0 w-4 h-4 mx-2 text-gray-400"
                  />
                  <span class="text-sm font-medium text-gray-900 truncate">
                    {{ project.name }}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <!-- Informations principales -->
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-4 mb-4">
                <h1 class="text-2xl font-bold text-gray-900">
                  {{ project.name }}
                </h1>
                <div class="flex items-center gap-2">
                  <!-- Badge de statut -->
                  <span
                    :class="getStatusBadgeClass(project.status)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    <div
                      :class="getStatusDotClass(project.status)"
                      class="w-1.5 h-1.5 rounded-full mr-1.5"
                    ></div>
                    {{ getStatusLabel(project.status) }}
                  </span>

                  <!-- Badge de priorité -->
                  <span
                    :class="getPriorityBadgeClass(project.priority)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    <FlagIcon class="w-3 h-3 mr-1" />
                    {{ getPriorityLabel(project.priority) }}
                  </span>
                </div>
              </div>

              <!-- Informations secondaires -->
              <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div class="flex items-center text-sm text-gray-600">
                  <UserIcon class="w-4 h-4 mr-2 text-gray-400" />
                  <span class="mr-1 font-medium">Manager:</span>
                  <span
                    >{{ project.manager?.account?.firstName }}
                    {{ project.manager?.account?.lastName }}</span
                  >
                </div>

                <div class="flex items-center text-sm text-gray-600">
                  <CalendarIcon class="w-4 h-4 mr-2 text-gray-400" />
                  <span class="mr-1 font-medium">Début:</span>
                  <span>{{ formatDate(project.start) }}</span>
                </div>

                <div class="flex items-center text-sm text-gray-600">
                  <ClockIcon class="w-4 h-4 mr-2 text-gray-400" />
                  <span class="mr-1 font-medium">Créé:</span>
                  <span>{{ formatDate(project.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation par onglets -->
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-[#db147f] text-[#db147f]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center',
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4 mr-2" />
            {{ tab.name }}
           
          </button>
        </nav>
      </div>
    </div>

    <!-- Contenu des onglets -->
    <div class="px-4 pt-6 mx-auto sm:px-6 lg:px-8">
      <!-- Onglet Détails -->
      <div v-if="activeTab === 'details'" class="space-y-6">
        <!-- Statistiques rapides -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Statut -->
          <div class="relative overflow-hidden bg-white rounded-lg shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    :class="[
                      'flex items-center justify-center w-8 h-8 rounded-md',
                      project.status === 'completed'
                        ? 'bg-green-500'
                        : project.status === 'in_progress'
                        ? 'bg-yellow-500'
                        : project.status === 'open'
                        ? 'bg-blue-500'
                        : 'bg-gray-500',
                    ]"
                  >
                    <CheckCircleIcon
                      v-if="project.status === 'completed'"
                      class="w-5 h-5 text-white"
                    />
                    <PlayIcon
                      v-else-if="project.status === 'in_progress'"
                      class="w-5 h-5 text-white"
                    />
                    <CircleIcon
                      v-else-if="project.status === 'open'"
                      class="w-5 h-5 text-white"
                    />
                    <XCircleIcon v-else class="w-5 h-5 text-white" />
                  </div>
                </div>
                <div class="flex-1 w-0 ml-5">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Statut
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ getStatusLabel(project.status) }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Priorité -->
          <div class="relative overflow-hidden bg-white rounded-lg shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    :class="[
                      'flex items-center justify-center w-8 h-8 rounded-md',
                      project.priority === 'HIGH'
                        ? 'bg-red-500'
                        : project.priority === 'MEDIUM'
                        ? 'bg-yellow-500'
                        : 'bg-green-500',
                    ]"
                  >
                    <FlagIcon class="w-5 h-5 text-white" />
                  </div>
                </div>
                <div class="flex-1 w-0 ml-5">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Priorité
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ getPriorityLabel(project.priority) }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Tâches -->
          <div class="relative overflow-hidden bg-white rounded-lg shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-md"
                  >
                    <CheckSquareIcon class="w-5 h-5 text-white" />
                  </div>
                </div>
                <div class="flex-1 w-0 ml-5">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Tâches
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ project.tasks?.length || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Durée -->
          <div class="relative overflow-hidden bg-white rounded-lg shadow">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-md"
                  >
                    <ClockIcon class="w-5 h-5 text-white" />
                  </div>
                </div>
                <div class="flex-1 w-0 ml-5">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">
                      Durée
                    </dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ getProjectDuration() }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contenu principal en deux colonnes -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- Colonne principale (2/3) -->
          <div class="space-y-6 lg:col-span-2">
            <!-- Description et Objectif -->
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="flex items-center text-lg font-medium text-gray-900">
                  <FileTextIcon class="w-5 h-5 mr-2 text-gray-400" />
                  Description du projet
                </h3>
              </div>
              <div class="px-6 py-4 space-y-4">
                <div>
                  <h4 class="mb-2 text-sm font-medium text-gray-900">
                    Description
                  </h4>
                  <div class="p-4 rounded-lg bg-gray-50">
                    <p class="text-sm leading-relaxed text-gray-700">
                      {{
                        project.description ||
                        "Aucune description fournie pour ce projet."
                      }}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 class="mb-2 text-sm font-medium text-gray-900">
                    Objectif
                  </h4>
                  <div
                    class="p-4 border-l-4 border-blue-400 rounded-lg bg-blue-50"
                  >
                    <p class="text-sm leading-relaxed text-blue-700">
                      {{
                        project.objectif ||
                        "Aucun objectif spécifique défini pour ce projet."
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline du projet -->
            <div class="pb-8 bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="flex items-center text-lg font-medium text-gray-900">
                  <PlusIcon class="w-5 h-5 mr-2 text-gray-400" />
                  Chronologie du projet
                </h3>
              </div>
              <div class="px-6 py-4">
                <div class="flow-root">
                  <ul class="-mb-8">
                    <li>
                      <div class="relative pb-8">
                        <span
                          class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                        <div class="relative flex space-x-3">
                          <div>
                            <span
                              class="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full ring-8 ring-white"
                            >
                              <PlusIcon class="w-4 h-4 text-white" />
                            </span>
                          </div>
                          <div class="flex-1 min-w-0">
                            <div>
                              <p class="text-sm font-medium text-gray-900">
                                Projet créé
                              </p>
                              <p class="text-sm text-gray-500">
                                {{ formatDate(project.createdAt) }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="relative pb-8">
                        <span
                          class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        ></span>
                        <div class="relative flex space-x-3">
                          <div>
                            <span
                              class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full ring-8 ring-white"
                            >
                              <PlayIcon class="w-4 h-4 text-white" />
                            </span>
                          </div>
                          <div class="flex-1 min-w-0">
                            <div>
                              <p class="text-sm font-medium text-gray-900">
                                Début prévu
                              </p>
                              <p class="text-sm text-gray-500">
                                {{ formatDate(project.start) }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div class="relative">
                        <div class="relative flex space-x-3">
                          <div>
                            <span
                              class="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full ring-8 ring-white"
                            >
                              <EditIcon class="w-4 h-4 text-white" />
                            </span>
                          </div>
                          <div class="flex-1 min-w-0">
                            <div>
                              <p class="text-sm font-medium text-gray-900">
                                Dernière modification
                              </p>
                              <p class="text-sm text-gray-500">
                                {{ formatDate(project.updatedAt) }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar (1/3) -->
          <div class="space-y-6">
            <!-- Informations de l'équipe -->
            <div class="bg-white rounded-lg shadow">
              <div
                class="flex justify-between w-full px-6 py-4 border-b border-gray-200 flr"
              >
                <h3 class="flex items-center text-lg font-medium text-gray-900">
                  <UsersIcon class="w-5 h-5 mr-2 text-gray-400" />
                  Équipe ({{ (project.members?.length || 0)  }})
                </h3>
                <div class="flex items-center gap-3 ml-6">
                  <button
                    type="button"
                    @click.prevent="openAddMemberModal"
                    class="inline-flex text-gray-400 bg-white items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#db147f]"
                  >
                    <Plus class="w-4 h-4 mr-2" />
                    Nouveau
                  </button>
                </div>
              </div>
              <div class="px-6 py-4 space-y-4">
                <!-- Manager -->
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full"
                    >
                      <UserIcon class="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">
                      {{ project.manager?.account?.firstName }}
                      {{ project.manager?.account?.lastName }}
                    </p>
                    <p class="text-sm text-gray-500">Manager du projet</p>
                    <p class="text-xs text-gray-400">
                      {{ project.manager?.account?.email }}
                    </p>
                  </div>
                  <div class="flex-shrink-0">
                    <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                      Manager
                    </span>
                  </div>
                </div>

                <!-- Membres du projet -->
                <div
                  v-for="member in filteredMembers"
                  :key="member.id"
                  class="flex items-center space-x-3"
                >
                  <div class="flex-shrink-0">
                    <div
                      class="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full"
                    >
                      <UserIcon class="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">
                      {{ member.member.account.firstName }}
                      {{ member.member.account.lastName }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ member.member.role || 'Membre' }}
                    </p>
                    <p class="text-xs text-gray-400">
                      {{ member.member.account.email }}
                    </p>
                  </div>
                  <div class="flex-shrink-0">
                    <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      Actif
                    </span>
                  </div>
                </div>

                <!-- Message si aucun membre -->
                <div v-if="!filteredMembers.length" class="py-4 text-center">
                  <p class="text-sm text-gray-500">Aucun membre assigné au projet</p>
                </div>
              </div>
            </div>

            <!-- Détails techniques -->
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="flex items-center text-lg font-medium text-gray-900">
                  <SettingsIcon class="w-5 h-5 mr-2 text-gray-400" />
                  Détails techniques
                </h3>
              </div>
              <div class="px-6 py-4">
                <dl class="space-y-3">
                  <div class="flex items-center justify-between">
                    <dt class="text-sm font-medium text-gray-500">
                      ID du projet
                    </dt>
                    <dd
                      class="px-2 py-1 font-mono text-sm text-gray-900 bg-gray-100 rounded"
                    >
                      #{{ project.id }}
                    </dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-sm font-medium text-gray-500">Slug</dt>
                    <dd
                      class="px-2 py-1 font-mono text-sm text-gray-900 bg-gray-100 rounded"
                    >
                      {{ project.slug }}
                    </dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-sm font-medium text-gray-500">
                      Offre liée
                    </dt>
                    <dd class="text-sm text-gray-900">
                      {{ project.job?.title || "Aucune" }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- Fichiers du projet -->
            <div v-if="project.files?.length" class="bg-white rounded-lg shadow">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="flex items-center text-lg font-medium text-gray-900">
                  <FileArchiveIcon class="w-5 h-5 mr-2 text-gray-400" />
                  Fichiers ({{ project.files.length }})
                </h3>
              </div>
              <div class="px-6 py-4 space-y-3">
                <div
                  v-for="(file, index) in project.files"
                  :key="index"
                  class="w-full"
                >
                  <a
                    class="flex items-center justify-between w-full p-3 transition-colors border rounded-lg bg-gray-50 hover:bg-gray-100"
                    target="_blank"
                    :href="file.url"
                  >
                    <div class="flex items-center gap-3">
                      <div class="flex-shrink-0">
                        <FileTextIcon
                          v-if="isDocumentFile(file.type)"
                          class="w-8 h-8 text-blue-500"
                        />
                        <ImageIcon
                          v-else-if="isImageFile(file.type)"
                          class="w-8 h-8 text-green-500"
                        />
                        <VideoIcon
                          v-else-if="isVideoFile(file.type)"
                          class="w-8 h-8 text-purple-500"
                        />
                        <FileIcon v-else class="w-8 h-8 text-gray-500" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-gray-900 truncate"
                        >
                          {{ file.name }}
                        </p>
                        <p class="text-xs text-gray-500">
                          {{ formatFileSize(file.size) }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <CheckCircleIcon class="w-5 h-5 text-green-500" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="bg-white rounded-lg shadow">
              <div class="px-6 py-4">
                <button
                  @click="editProject"
                  class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2Icon class="w-4 h-4 mr-2" />
                  Supprimer le projet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglet Tâches -->
      <div v-if="activeTab === 'tasks'" >
        <ProjectTasksView :projectId="project.id" :projectName="project.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppModal from "@/components/globales/AppModal.vue";
import {
  ChevronRightIcon,
  UserIcon,
  CalendarIcon,
  ClockIcon,
  Trash2Icon,
  ShareIcon,
  FlagIcon,
  CheckSquareIcon,
  CheckCircleIcon,
  PlayIcon,
  CircleIcon,
  XCircleIcon,
  FileTextIcon,
  PlusIcon,
  EditIcon,
  UsersIcon,
  SettingsIcon,
  FileArchiveIcon,
  Plus,
  FileIcon,
  ImageIcon,
  VideoIcon
} from "lucide-vue-next";
import ProjectTasksView from "./ProjectTasksView.vue";
import MultiSelect from "@/components/globales/MultiSelect.vue";

const route = useRoute();
const auth = useAuthStore();

// État réactif
const project = ref({});
const loading = ref(true);
const isAddingMembers = ref(false);
const activeTab = ref("details");
const isModalOpen = ref(false);
const companieMembers = ref([]);
const selectedMembers = ref([]);

// Configuration des onglets
const tabs = computed(() => [
  {
    id: "details",
    name: "Détails",
    icon: CheckSquareIcon,
  },
  {
    id: "tasks",
    name: "Tâches",
    icon: CheckSquareIcon,
  },
]);

// Computed pour filtrer les membres (exclure le manager)
const filteredMembers = computed(() => {
  if (!project.value.members || !project.value.manager) return [];
  
  return project.value.members.filter(
    member => member.memberId !== project.value.manager.id
  );
});

// Méthodes utilitaires pour les statuts
const getStatusLabel = (status) => {
  const statusLabels = {
    open: "Ouvert",
    in_progress: "En cours",
    completed: "Terminé",
    closed: "Fermé",
  };
  return statusLabels[status] || status;
};

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const openAddMemberModal = async () => {
  // Charger les membres disponibles avant d'ouvrir le modal
  await fetchcompanieMembers();
  isModalOpen.value = true;
};

const HadleCloseModal = () => {
  isModalOpen.value = false;
  selectedMembers.value = [];
};

const getStatusBadgeClass = (status) => {
  const classes = {
    open: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const isDocumentFile = (type) => {
  return (
    type &&
    (type.includes("pdf") ||
      type.includes("document") ||
      type.includes("text") ||
      type.includes("spreadsheet") ||
      type.includes("presentation"))
  );
};

const isImageFile = (type) => {
  return type && type.startsWith("image/");
};

const isVideoFile = (type) => {
  return type && type.startsWith("video/");
};

const formatFileSize = (bytes) => {
  if (!bytes) return 'N/A';
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getStatusDotClass = (status) => {
  const classes = {
    open: "bg-blue-400",
    in_progress: "bg-yellow-400",
    completed: "bg-green-400",
    closed: "bg-gray-400",
  };
  return classes[status] || "bg-gray-400";
};

// Méthodes utilitaires pour les priorités
const getPriorityLabel = (priority) => {
  const priorityLabels = {
    HIGH: "Haute",
    MEDIUM: "Moyenne",
    LOW: "Basse",
  };
  return priorityLabels[priority] || priority;
};

const getPriorityBadgeClass = (priority) => {
  const classes = {
    HIGH: "bg-red-100 text-red-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    LOW: "bg-green-100 text-green-800",
  };
  return classes[priority] || "bg-gray-100 text-gray-800";
};

// Calcul de la durée du projet
const getProjectDuration = () => {
  if (!project.value.createdAt || !project.value.start) return "N/A";

  const created = new Date(project.value.createdAt);
  const start = new Date(project.value.start);
  const now = new Date();

  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} mois`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} an${years > 1 ? "s" : ""}`;
  }
};

// Formatage des dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Actions
const editProject = () => {
  console.log("Supprimer le projet:", project.value.id);
};

const HandleAddToProject = async () => {

  isAddingMembers.value = true;
  try {
    const companyId = route.params.companyId;
    const projectId = project.value.id;
    
    const payload = {
      projectId: projectId,
      membersId: selectedMembers.value
    };

    const response = await auth.api(
      "POST", // Changé de GET à POST
      `/companies/${companyId}/project_members/create_many`,
      payload,
      true // Changé à true pour envoyer les données
    );

    if (response.success) {
      // Recharger les données du projet pour voir les nouveaux membres
      await fetchProject();
      // Fermer le modal et réinitialiser
      HadleCloseModal();
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout des membres:", error);
  } finally {
    isAddingMembers.value = false;
  }
};

// Récupération des données du projet
const fetchProject = async () => {
  loading.value = true;
  try {
    const companyId = route.params.companyId;
    const projectId = route.params.projectId;

    const response = await auth.api(
      "GET",
      `/companies/${companyId}/projects/${projectId}/with_task`,
      null,
      false
    );

    if (response.success) {
      project.value = response.data;
      console.log('Projet chargé:', project.value);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du projet:", error);
  } finally {
    loading.value = false;
  }
};

// Récupération des membres de la compagnie (disponibles pour ajout)
const fetchcompanieMembers = async () => {
  try {
    const companyId = route.params.companyId;

    const response = await auth.api(
      "GET",
      `/companies/${companyId}/guests`,
      null,
      false
    );

    if (response.success) {
      // Réinitialiser la liste
      companieMembers.value = [];
      
      // Vérifier que project.value.members existe
      const projectMembers = project.value.members || [];
      const managerId = project.value.manager?.id;
      
      response.data.forEach(guest => {
        const memberData = {
          id: guest.id,
          fullName: guest.account.firstName + " " + guest.account.lastName
        };

        // Exclure le manager et les membres déjà assignés
        const isManager = guest.id === managerId;
        const isAlreadyMember = projectMembers.some(member => member.memberId === guest.id);

        if (!isManager && !isAlreadyMember && guest.accept) {
          companieMembers.value.push(memberData);
        }
      });
      
      console.log('Membres disponibles:', companieMembers.value);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des membres :", error);
  }
};

// Watcher pour recharger les membres disponibles quand le projet change
watch(() => project.value.members, () => {
  if (isModalOpen.value) {
    fetchcompanieMembers();
  }
}, { deep: true });

// Initialisation
onMounted(async () => {
  await fetchProject();
});
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>