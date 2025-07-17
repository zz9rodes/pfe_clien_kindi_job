<template>
  <div class="w-full h-full p-6 ">
    <AppModal :isOpen="isLoaderModalOpen" :isLoader="true"> </AppModal>
    <!-- Header avec bouton de création -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">
           Vos projets
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
      @click.stop="() => goToViewProject(project)"
      v-for="project in projects"
      :key="project.id"
      class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100 hover:border-[#e4097f]/30 cursor-pointer"
    >
      <!-- Background decorative elements -->
      <div class="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-gray-50/50 to-white group-hover:opacity-100"></div>
      
      <!-- Enhanced edit button -->
      <div
        @click.stop="() => openDrawer('update', project)"
        class="absolute z-10 transition-all duration-300 transform translate-x-2 opacity-0 top-4 right-4 group-hover:opacity-100 group-hover:translate-x-0"
      >
        <div class="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-[#db147f] to-[#c4087a] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
          <Edit class="w-4 h-4" />
          <span class="text-sm font-medium">Modifier</span>
        </div>
      </div>

      <!-- Content section with enhanced spacing -->
      <div class="relative p-6 space-y-4">
        <!-- Header with title and status -->
        <div class="flex items-start justify-between gap-4 pt-2">
          <h3 class="text-xl font-bold text-gray-900 group-hover:text-[#e4097f] transition-colors duration-300 flex-1">
            {{ project.name }}
          </h3>
          <span
            :class="[
              'px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-300 transform group-hover:scale-105',
              getStatusClasses(project.status),
            ]"
          >
            {{ getStatusLabel(project.status) }}
          </span>
        </div>

        <!-- Enhanced description -->
        <div class="relative">
          <p class="leading-relaxed text-gray-600 line-clamp-3">
            {{ project.description }}
          </p>
          <!-- Gradient fade for long text -->
          <div class="absolute bottom-0 left-0 right-0 h-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-white to-transparent group-hover:opacity-100"></div>
        </div>

        <!-- Manager and date info with enhanced styling -->
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <div class="p-1.5 bg-gray-100 rounded-full group-hover:bg-[#e4097f]/10 transition-colors duration-300">
              <UserIcon class="w-3 h-3 text-gray-500 group-hover:text-[#e4097f] transition-colors duration-300" />
            </div>
            <span class="text-gray-600">
              Manager: 
              <span class="font-semibold text-gray-900">
                {{ project.manager?.account?.firstName }}
                {{ project.manager?.account?.lastName }}
              </span>
            </span>
          </div>
          
          <div class="flex items-center gap-2">
            <div class="p-1.5 bg-gray-100 rounded-full group-hover:bg-[#e4097f]/10 transition-colors duration-300">
              <CalendarIcon class="w-3 h-3 text-gray-500 group-hover:text-[#e4097f] transition-colors duration-300" />
            </div>
            <span class="text-gray-500">
              Created: {{ formatDate(project.createdAt) }}
            </span>
          </div>
        </div>

        <!-- Enhanced members section -->
        <div class="pt-4 transition-colors duration-300 border-t border-gray-100 group-hover:border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex items-center -space-x-2">
                <template v-for="(member, index) in project.membersList.slice(0, 3)" :key="member.id">
                  <div class="relative">
                    <img
                      v-if="member.avatarUrl"
                      :src="member.avatarUrl"
                      :alt="member.firstName"
                      class="relative w-10 h-10 transition-transform duration-300 border-white rounded-full shadow-sm border-3 hover:scale-110 hover:z-10"
                      :style="{ zIndex: 10 - index }"
                    />
                    <div
                      v-else
                      class="relative flex items-center justify-center w-10 h-10 text-sm font-bold text-gray-600 transition-transform duration-300 border-white rounded-full shadow-sm bg-gradient-to-br from-gray-200 to-gray-300 border-3 hover:scale-110 hover:z-10"
                      :style="{ zIndex: 10 - index }"
                    >
                      {{ member.firstName.charAt(0) }}
                    </div>
                  </div>
                </template>
                
                <div
                  v-if="project.membersList.length > 3"
                  class="flex items-center justify-center w-10 h-10 text-xs font-semibold text-gray-600 bg-gray-100 border-3 border-white rounded-full shadow-sm group-hover:bg-[#e4097f]/10 group-hover:text-[#e4097f] transition-all duration-300 relative z-0"
                >
                  +{{ project.membersList.length - 3 }}
                </div>
              </div>
            </div>
            
            <!-- Team size indicator -->
            <div class="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full group-hover:bg-[#e4097f]/10 transition-colors duration-300">
              <UsersIcon class="w-3 h-3 text-gray-500 group-hover:text-[#e4097f] transition-colors duration-300" />
              <span class="text-xs font-medium text-gray-600 group-hover:text-[#e4097f] transition-colors duration-300">
                {{ project.membersList.length }} membres
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Subtle hover effect border -->
      <!-- <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#e4097f]/10 via-transparent to-[#00a3e0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div> -->
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
