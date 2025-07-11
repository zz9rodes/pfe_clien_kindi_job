<template>
  <div class="w-full h-full p-6 ">
    <AppModal :isOpen="isLoaderModalOpen" :isLoader="true"> </AppModal>
    <!-- Header avec bouton de création -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">
           Your Projects
        </h1>
      </div>
      <button
        :disabled="!isAdmin"
        @click="() => openDrawer('create')"
        :class="isAdmin ? 'bg-[#db147f]  hover:bg-[#c41370] cursor-pointer':'bg-[#ce82aa] cursor-not-allowed'"
        class="flex gap-1 px-6 py-2 font-medium text-white transition-colors rounded-lg "
      >
        <Plus />
        <span class="hidden sm:block">Nouveau projet</span>
      </button>
    </div>

    <!-- Liste des projets -->
    <div class="grid grid-cols-1 gap-6 p-3 resla md:grid-cols-2 lg:grid-cols-3">
      <div
        @click.stop="()=>goToViewProject(project)"
        v-for="project in projects"
        :key="project.id"
        class="relative p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
      >
        <button
          :class="isAdmin ? 'bg-[#db147f]  hover:bg-[#c41370] cursor-pointer':'bg-[#ce82aa] cursor-not-allowed'"
          :disabled="!isAdmin"
          @click.stop="() => openDrawer('update', project)"
          class="absolute top-0 right-0 flex items-center justify-end gap-2 p-1 text-white rounded"
        >
          <Edit class="w-4 h-4" />
          <span> edit </span>
        </button>

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
          <p class="mb-4 text-gray-600 line-clamp-4">{{ project.description }}</p>
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
            <span
              v-if="project.membersList.length > 3"
              class="px-2 py-1 ml-2 text-xs font-semibold bg-gray-200 rounded-full"
            >
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
const isLoaderModalOpen = ref(false);
const isAdmin=ref(false)

const router = useRouter();
const route = useRoute();

const fetchProjects = async () => {
  const companyId = route.params.companyId;
  isLoaderModalOpen.value = true;
  try {
    const res = await auth.api(
      "GET",
      `/companies/${companyId}/guest/projects/all`,
      null,
      false
    );
    console.log("res.data.isAdmin")
    console.log(res.data.isAdmin)
    isAdmin.value=res.data.isAdmin
    projects.value = (res.data.projects || []).map((project) => {
      const membersList = Array.isArray(project.members)
        ? project.members.map((m) => ({
            id: m.member?.id,
            firstName: m.member?.account?.firstName || "",
            lastName: m.member?.account?.lastName || "",
            avatarUrl: m.member?.account?.avatarUrl || "",
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
  console.log("demo ici")
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

const goToViewProject=(project)=>{
  router.push({name:'project_tasks',params:{projectId:project.slug}})
}

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
