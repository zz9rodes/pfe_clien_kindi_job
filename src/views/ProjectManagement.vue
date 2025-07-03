<template>

  <div class="w-full p-6">
  <AppModal  :isOpen="isLoaderModalOpen" :isLoader="true">
  </AppModal>
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

    <!-- Liste des projets -->
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
            <span>
              Manager:
              <strong>
                {{ project.manager?.account?.firstName }}
                {{ project.manager?.account?.lastName }}
              </strong>
            </span>
            <span>cree le : {{ formatDate(project.createdAt) }}</span>
          </div>
          <!-- Section membres -->
          <div class="flex items-center mt-3">
            <template v-for="member in project.membersList.slice(0, 3)">
              <img
                v-if="member.avatarUrl"
                :src="member.avatarUrl"
                :alt="member.firstName"
                class="w-8 h-8 -ml-2 border-2 border-white rounded-full first:ml-0"
                :key="member.id"
              />
              <div
                v-else
                class="flex items-center justify-center w-8 h-8 -ml-2 text-xs font-bold text-gray-600 bg-gray-300 border-2 border-white rounded-full first:ml-0"
                :key="member"
              >
                {{ member.firstName.charAt(0) }}
              </div>
            </template>
            <span v-if="project.membersList.length > 3" class="px-2 py-1 ml-2 text-xs font-semibold bg-gray-200 rounded-full">
              +{{ project.membersList.length - 3 }}
            </span>
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
        :membersList="membersForUpdate"
        @created="handleProjectCreated"
        v-if="showUpdateForm"
      />
    </AppDrawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import AppDrawer from "@/components/globales/AppDrawer.vue";
import FormCreateProject from "@/components/projectsManagements/FormCrateProject.vue";
import FormUpdateProject from "@/components/projectsManagements/FormUpdateProject.vue";
import { Edit, Plus } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import AppModal from "@/components/globales/AppModal.vue";

const auth = useAuthStore();
const projects = ref([]);
const isCreateDrawerOpen = ref(false);
const showCreateForm = ref(false);
const showUpdateForm = ref(false);
const activeProject = ref({});
const loading = ref(false);
const membersForUpdate = ref([]);
const isLoaderModalOpen=ref(false)

const router = useRouter();
const route = useRoute();

const fetchProjects = async () => {
  const companyId = route.params.companyId;
  isLoaderModalOpen.value = true;
  try {
    const res = await auth.api(
      "GET",
      `/companies/${companyId}/projects/all`,
      null,
      false
    );
    projects.value = (res.data || []).map((project) => {
      const membersList = Array.isArray(project.members)
        ? project.members.map((m) => ({
            id: m.member?.id,
            firstName: m.member?.account?.firstName || '',
            lastName: m.member?.account?.lastName || '',
            avatarUrl: m.member?.account?.avatarUrl || ''
          }))
        : [];
      return { ...project, membersList };
    });
  } catch (e) {
    projects.value = [];
  } finally {
    isLoaderModalOpen.value = false;
  }
};

onMounted(() => {
  fetchProjects();
});

const openDrawer = (form_name = "create", project = null) => {
  if (form_name == "create") {
    showUpdateForm.value = false;
    isCreateDrawerOpen.value = true;
    showCreateForm.value = true;
  } else {
    let members = [];
    if (project && Array.isArray(project.members)) {
      members = project.members.map((m) => ({
        id: m.member?.id,
        firstName: m.member?.account?.firstName || "",
      }));
    }
    membersForUpdate.value = members;
    activeProject.value = project !== null ? project : null;
    showCreateForm.value = false;
    isCreateDrawerOpen.value = true;
    showUpdateForm.value = true;
  }
};

const closeDrawer = () => {
  isCreateDrawerOpen.value = false;
};

const closeCreateDrawer = () => {
  isCreateDrawerOpen.value = false;
  showCreateForm.value = false;
  showUpdateForm.value = false;
};

const handleProjectCreated = async (newProject) => {
  const companyId = route.params.companyId;
  try {
    const res = await auth.api(
      "POST",
      `/companies/${companyId}/projects/create`,
      newProject,
      true
    );
    if (res.data) {
      projects.value.unshift(res.data);
      closeCreateDrawer();
    }
  } catch (e) {}
};

const getStatusClasses = (status) => {
  const classes = {
    open: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusLabel = (status) => {
  const labels = {
    planning: "open",
    in_progress: "in progress",
    completed: "completed",
    cancelled: "closed",
  };
  return labels[status] || status;
};

/*
[
  { value: 'open', label: 'open' },
  { value: 'in_progress', label: 'in progress' },
  { value: 'completed', label: 'completed' },
  { value: 'closed', label: 'closed' }
]
*/

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("fr-FR");
};
</script>
