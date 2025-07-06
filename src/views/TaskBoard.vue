<template>
  <AppModal
    @closeModal="toggleOpenModal"
    :isOpen="isModalOpen"
    :isLoader="false"
    class="px-1"
  >
    <div
      class="flex flex-col justify-between p-6 mx-auto bg-white rounded-md h-60"
    >
      <span class="flex justify-center">
        <ShieldQuestion class="w-12 h-12 text-red-300" />
      </span>
      <p class="inline-flex flex-wrap text-xl">
        Voulez-vous vraiment supprimer cette tâche ?
      </p>
      <div class="flex justify-between text-white">
        <button
          @click="isModalOpen = false"
          class="px-6 py-2 bg-red-600 rounded"
        >
          Non
        </button>
        <button
          @click="confirmDeleteTask"
          class="px-6 py-2 bg-green-600 border rounded"
        >
          Oui
        </button>
      </div>
    </div>
  </AppModal>

  <div class="h-full bg-gray-50">
    <div class="mx-auto ">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ projectName }}</h1>
          <p class="mt-1 text-gray-600">
            Tâches du projet ({{ tasks.length }})
          </p>
        </div>
        <button
          @click="openCreateTaskDrawer"
          class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded hover:bg-[#c41370]"
        >
          + Nouvelle Tâche
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#db147f]"
        ></div>
      </div>

      <!-- Kanban Board -->
      <div v-else class="flex flex-col gap-3 overflow-auto overflow-x-auto md:flex-row">
        <!-- CREATE Column -->
        <div class="border border-gray-200 rounded-lg shadow-sm min-w-[300px]">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">À FAIRE</h2>
              <span
                class="px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {{ createTasks.length }}
              </span>
            </div>
          </div>
          <div class="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <TaskCard
              v-for="task in createTasks"
              :key="task.id"
              :task="task"
              @update="openUpdateTaskDrawer"
              @delete="openDeleteModal"
            />
            <div
              v-if="createTasks.length === 0"
              class="py-8 text-center text-gray-500"
            >
              <ClipboardListIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Aucune tâche</p>
            </div>
          </div>
        </div>

        <!-- IN PROGRESS Column -->
        <div class="border border-gray-200 rounded-lg shadow-sm min-w-[300px]">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">EN COURS</h2>
              <span
                class="px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {{ inProgressTasks.length }}
              </span>
            </div>
          </div>
          <div class="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <TaskCard
              v-for="task in inProgressTasks"
              :key="task.id"
              :task="task"
              @update="openUpdateTaskDrawer"
              @delete="openDeleteModal"
            />
            <div
              v-if="inProgressTasks.length === 0"
              class="py-8 text-center text-gray-500"
            >
              <ClockIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Aucune tâche</p>
            </div>
          </div>
        </div>

        <!-- IN REVIEW Column -->
        <div class="border border-gray-200 rounded-lg shadow-sm min-w-[300px]">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">EN RÉVISION</h2>
              <span
                class="px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {{ inReviewTasks.length }}
              </span>
            </div>
          </div>
          <div class="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <TaskCard
              v-for="task in inReviewTasks"
              :key="task.id"
              :task="task"
              @update="openUpdateTaskDrawer"
              @delete="openDeleteModal"
            />
            <div
              v-if="inReviewTasks.length === 0"
              class="py-8 text-center text-gray-500"
            >
              <SearchIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Aucune tâche</p>
            </div>
          </div>
        </div>

        <!-- COMPLETED Column -->
        <div class="border border-gray-200 rounded-lg shadow-sm min-w-[300px]">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">TERMINÉ</h2>
              <span
                class="px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {{ completedTasks.length }}
              </span>
            </div>
          </div>
          <div class="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <TaskCard
              v-for="task in completedTasks"
              :key="task.id"
              :task="task"
              @update="openUpdateTaskDrawer"
              @delete="openDeleteModal"
            />
            <div
              v-if="completedTasks.length === 0"
              class="py-8 text-center text-gray-500"
            >
              <CheckCircleIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Aucune tâche</p>
            </div>
          </div>
        </div>

        <!-- CLOSED Column -->
        <div class="border border-gray-200 rounded-lg shadow-sm min-w-[300px]">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">FERMÉ</h2>
              <span
                class="px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {{ closedTasks.length }}
              </span>
            </div>
          </div>
          <div class="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <TaskCard
              v-for="task in closedTasks"
              :key="task.id"
              :task="task"
              @update="openUpdateTaskDrawer"
              @delete="openDeleteModal"
            />
            <div
              v-if="closedTasks.length === 0"
              class="py-8 text-center text-gray-500"
            >
              <ArchiveIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Aucune tâche</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Task Drawer -->
    <AppDrawer
      :isOpen="isCreateDrawerOpen"
      :isLoader="false"
      position="right"
      width="600px"
      @closeDrawer="closeCreateTaskDrawer"
    >
      <CreateTaskForm
        :steps_validation="avalaibleJobStepValidation"
        :projectId="projectId"
        :projectMembers="projectMembers"
        @close="closeCreateTaskDrawer"
        @created="handleTaskCreated"
      />
    </AppDrawer>

    <!-- Update Task Drawer -->
    <AppDrawer
      :isOpen="isUpdateDrawerOpen"
      :isLoader="false"
      :projectMembers="projectMembers"
      position="right"
      width="600px"
      @closeDrawer="closeUpdateTaskDrawer"
    >
      <UpdateTaskForm
        v-if="selectedTask"
        :taskData="selectedTask"
        :projectMembers="projectMembers"
        :connectedMember="connectedMember"
        @close="closeUpdateTaskDrawer"
        @updated="handleTaskUpdated"
      />
    </AppDrawer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import {
  ClipboardListIcon,
  ClockIcon,
  CheckCircleIcon,
  ShieldQuestion,
  SearchIcon,
  ArchiveIcon,
} from "lucide-vue-next";
import TaskCard from "@/components/Task/TaskCard.vue";
import CreateTaskForm from "@/components/Task/CreateTaskForm.vue";
import UpdateTaskForm from "@/components/Task/UpdatTaskForm.vue";
import AppDrawer from "@/components/globales/AppDrawer.vue";
import AppModal from "@/components/globales/AppModal.vue";

// Props
const props = defineProps({
  projectId: {
    type: [String, Number],
    required: true,
  },
  projectName: {
    type: String,
    default: "Mon Projet",
  },
});

const route = useRoute();
const auth = useAuthStore();

// Reactive data
const tasks = ref([]);
const projectMembers = ref([]);
const avalaibleJobStepValidation = ref([]);
const loading = ref(true);
const isModalOpen = ref(false);
const isCreateDrawerOpen = ref(false);
const isUpdateDrawerOpen = ref(false);
const selectedTask = ref(null);
const taskToDelete = ref(null);
const connectedMember=ref(null)

// Computed properties pour chaque statut
const createTasks = computed(() =>
  tasks.value.filter((task) => task.status === "create")
);
const inProgressTasks = computed(() =>
  tasks.value.filter((task) => task.status === "in progress")
);
const inReviewTasks = computed(() =>
  tasks.value.filter((task) => task.status === "in review")
);
const completedTasks = computed(() =>
  tasks.value.filter((task) => task.status === "completed")
);
const closedTasks = computed(() =>
  tasks.value.filter((task) => task.status === "closed")
);

// Methods
const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const openDeleteModal = (task) => {
  taskToDelete.value = task;
  isModalOpen.value = true;
};

const openCreateTaskDrawer = () => {
  isCreateDrawerOpen.value = true;
};

const closeCreateTaskDrawer = () => {
  isCreateDrawerOpen.value = false;
};

const openUpdateTaskDrawer = (task) => {
  selectedTask.value = task;
  console.log(selectedTask.value)
  isUpdateDrawerOpen.value = true;
};

const closeUpdateTaskDrawer = () => {
  isUpdateDrawerOpen.value = false;
  selectedTask.value = null;
};

const handleTaskCreated = (newTask) => {
  tasks.value.unshift(newTask);
  closeCreateTaskDrawer();
  // Optionnel: recharger les tâches pour avoir les données complètes
  fetchTasks();
};

const handleTaskUpdated = (updatedTask) => {
  const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
  }
  closeUpdateTaskDrawer();
  // Optionnel: recharger les tâches pour avoir les données complètes
  fetchTasks();
};

const confirmDeleteTask = async () => {
  if (!taskToDelete.value) return;

  try {
    const companyId = route.params.companyId;
    const taskId = taskToDelete.value.id;

    const response = await auth.api(
      "DELETE",
      `/companies/${companyId}/tasks/${taskId}`,
      null,
      true
    );

    if (response.success) {
      // Supprimer la tâche de la liste locale
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la tâche:", error);
  } finally {
    isModalOpen.value = false;
    taskToDelete.value = null;
  }
};

const fetchTasks = async () => {
  loading.value = true;
  try {
    const companyId = route.params.companyId;
    const projectId = route.params.projectId;

    const response = await auth.api(
      "GET",
      `/companies/${companyId}/projects/${projectId}/tasks`,
      null,
      false
    );

    if (response.success) {
      console.log("tasks.value")
      tasks.value = response.data.map((task) => ({
        ...task,
        // Adapter les données pour correspondre à votre structure
        assigneeName:
          task.assignee?.account?.firstName +
          " " +
          task.assignee?.account?.lastName,
        assigneeAvatar: task.assignee?.account?.avatarUrl,
        assigneeRole: task.assignee?.role,
        filesCount: task.files?.length || 0,
        // Calculer les jours restants
        daysLeft: task.dueDate
          ? Math.ceil(
              (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
            )
          : 0,
      }));

    }
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches:", error);
  } finally {
    loading.value = false;
  }
};

const fetchProjectMembers = async () => {
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
      // Extraire les membres du projet (manager + membres)
      const members = [];
      


      avalaibleJobStepValidation.value=response.data?.job?.stepsValidation ?? []

      // Ajouter le manager
      // if (response.data.manager) {
      //   members.push({
      //     id: response.data.manager.id,
      //     name:
      //       response.data.manager.account.firstName +
      //       " " +
      //       response.data.manager.account.lastName,
      //     email: response.data.manager.account.email || "",
      //     role: "Manager",
      //     avatar: response.data.manager.account.avatarUrl,
      //   });
      // }

      // Ajouter les autres membres
      if (response.data.members) {
        
        response.data.members.forEach((member) => {
          // if (member.memberId !== response.data.manager?.id) {
          if(member.member.account.id===auth.user.account.id){
            connectedMember.value=member
          }          
            members.push({
              id: member.id,
              name:
                member.member.account.firstName +
                " " +
                member.member.account.lastName,
              email: member.member.account.email || "",
              role: member.member.role || "Membre",
              avatar: member.member.account.avatarUrl,
            });
          // }
        });
      }


      projectMembers.value = members;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des membres:", error);
  }
};

onMounted(async () => {
  await Promise.all([fetchTasks(), fetchProjectMembers()]);
});
</script>

<style scoped>
/* Styles pour les barres de défilement */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-x-auto::-webkit-scrollbar {
  height: 1px;
}

.overflow-y-auto::-webkit-scrollbar-track ,.overflow-x-auto::-webkit-scrollbar{
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb,.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>