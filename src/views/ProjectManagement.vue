<template>
  <div class="p-6">
    <!-- Header avec bouton de création -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Gestion des projets</h1>
        <p class="mt-1 text-gray-600">Créez et gérez vos projets</p>
      </div>
      <button
        @click="openCreateDrawer"
        class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
      >
        + Créer un projet
      </button>
    </div>

    <!-- Liste des projets (exemple) -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="project in projects"
        :key="project.id"
        class="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
      >
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

    <!-- Drawer pour la création de projet -->
    <AppDrawer
      :isOpen="isCreateDrawerOpen"
      :isLoader="false"
      position="right"
      width="600px"
      @closeDrawer="closeCreateDrawer"
    >
      <FormCreateProject
        @close="closeCreateDrawer"
        @created="handleProjectCreated"
      />
    </AppDrawer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppDrawer from "@/components/globales/AppDrawer.vue";
import FormCreateProject from "@/components/projectsManagements/FormCrateProject.vue";

// Reactive data
const isCreateDrawerOpen = ref(false);

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
  },
  {
    id: 2,
    name: "Site Web Corporate",
    description: "Refonte complète du site web de l'entreprise",
    status: "planning",
    manager: "Marie Martin",
    start: "2024-02-01",
  },
  {
    id: 3,
    name: "Système de Gestion",
    description: "Développement d'un système de gestion interne",
    status: "completed",
    manager: "Pierre Durand",
    start: "2023-12-01",
  },
]);

// Methods
const openCreateDrawer = () => {
  isCreateDrawerOpen.value = true;
};

const closeCreateDrawer = () => {
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
