<template>
  <div class="w-full p-6">
    <!-- Header avec bouton de création -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">
          All Projects
        </h1>
      </div>
      <button
        @click="() => openDrawer('create')"
        class="px-6 flex gap-1 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
      >
        <Plus />
        <span class="hidden sm:block">Nouveau projet</span>
      </button>
    </div>

    <!-- Liste des projets (exemple) -->
    <div class="grid grid-cols-1 gap-6 resla md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="project in projects"
        :key="project.id"
        class="relative p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
      >
        <div
          @click="() => openDrawer('update', project)"
          class="absolute rounded cursor-pointer top-0 right-0 flex items-center justify-end gap-2 bg-[#db147f] p-1 text-white"
        >
          <Edit class="w-4 h-4" />
          <span> edit </span>
        </div>

        <div class="pt-[24px]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ project.name }}
            </h3>
            <span
              :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                getStatusClasses(project.status),
              ]"
            >
              {{ getStatusLabel(project.status) }}
            </span>
          </div>
          <p class="mb-4 text-gray-600">{{ project.description }}</p>
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>Manager: {{ project.manager }}</span>
            <span>{{ formatDate(project.start) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Drawer pour la création de projet -->
    <AppDrawer
      :isOpen="isCreateDrawerOpen"
      :isLoader="false"
      position="right"
      width="600px"
      @closeDrawer="closeCreateDrawer"
    >
      <FormCreateProject
        @close="closeDrawer"
        @created="handleProjectCreated"
        v-if="showCreateForm"
      />
      <FormUpdateProject
        @close="closeDrawer"
        :projectData="activeProject"
        @created="handleProjectCreated"
        v-if="showUpdateForm"
      />
    </AppDrawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppDrawer from "@/components/globales/AppDrawer.vue";
import FormCreateProject from "@/components/projectsManagements/FormCrateProject.vue";
import FormUpdateProject from "@/components/projectsManagements/FormUpdateProject.vue";
import { Edit, Plus } from "lucide-vue-next";

// Reactive data
const isCreateDrawerOpen = ref(false);

const showCreateForm = ref(false);

const showUpdateForm = ref(false);

const activeProject = ref({});

// Sample projects data
const projects = ref([
  {
    id: 1,
    name: "Application Mobile E-commerce",
    description:
      "Développement d'une application mobile pour la vente en ligne",
    status: "in_progress",
    manager: "Jean Dupont",
    start: "2024-01-15",
    job: { id: 14, title: "Chauffeur Taxi", company: "TechCorp" },
    files: [],
  },
  {
    id: 2,
    name: "Site Web Corporate",
    description: "Refonte complète du site web de l'entreprise",
    status: "planning",
    manager: "Marie Martin",
    start: "2024-02-01",
    job: { id: 7, title: "Gootballeur", company: "TechCorp" },
    files: [],
  },
  {
    id: 3,
    name: "Système de Gestion",
    description: "Développement d'un système de gestion interne",
    status: "completed",
    manager: "Pierre Durand",
    start: "2023-12-01",
    job: { id: 6, title: "MEDECIN", company: "TechCorp" },
    files: [],
  },
]);

// Methods
const openDrawer = (form_name = "create", project = null) => {
  console.log(form_name);
  console.log(project);

  if (form_name == "create") {
    showUpdateForm.value = false;
    isCreateDrawerOpen.value = true;
    showCreateForm.value = true;
  } else {
    activeProject.value = project !== null ? project : null;

    showCreateForm.value = false;
    isCreateDrawerOpen.value = true;
    showUpdateForm.value = true;
  }
};

const closeDrawer = () => {
  isCreateDrawerOpen.value = false;
};

const handleProjectCreated = (newProject) => {
  projects.value.unshift(newProject);
  closeCreateDrawer();
};

const getStatusClasses = (status) => {
  const classes = {
    planning: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    on_hold: "bg-gray-100 text-gray-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusLabel = (status) => {
  const labels = {
    planning: "Planification",
    in_progress: "En cours",
    on_hold: "En pause",
    completed: "Terminé",
    cancelled: "Annulé",
  };
  return labels[status] || status;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR");
};
</script>
