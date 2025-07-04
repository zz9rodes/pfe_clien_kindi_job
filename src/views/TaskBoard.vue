<template>
  <AppModal
    @closeModal="toggleOpenModal"
    :isOpen="isModalOpen"
    :isLoader="false"
    class="px-1"
  > <div
      class="flex flex-col justify-between p-6 mx-auto bg-white rounded-md h-60"
    >
      <span class="flex justify-center">
        <ShieldQuestion class="w-12 h-12 text-red-300" />
      </span>
      <p class="inline-flex flex-wrap text-xl">Dou You Really want to delete The task</p>
      <div class="flex justify-between text-white">
        <button @click="isModalOpen=false" class="px-6 py-2 bg-red-600 rounded">No</button>
        <button @click="deleteTask" class="px-6 py-2 bg-green-600 border rounded">Yes</button>
      </div>
    </div>
  </AppModal>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6 mx-auto max-w-7xl">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ projectName }}</h1>
          <p class="mt-1 text-gray-600">Tâches du projet</p>
        </div>
        <button
          @click="openCreateTaskDrawer"
          class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded hover:bg-[#c41370]"
        >
          + New Task
        </button>
      </div>

      <!-- Kanban Board -->
      <div class="flex flex-col gap-3 overflow-auto md:flex-row">
        <!-- CREATE Column -->
        <div class="border border-gray-200 rounded-lg shadow-sm min-w-[300px]">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">CREATE</h2>
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
              @delete="toggleOpenModal()"
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
              <h2 class="text-lg font-semibold text-gray-900">IN PROGRESS</h2>
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
              @delete="toggleOpenModal()"
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
              <h2 class="text-lg font-semibold text-gray-900">IN REVIEW</h2>
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
              @delete="toggleOpenModal()"
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
              <h2 class="text-lg font-semibold text-gray-900">COMPLETED</h2>
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
              @delete="toggleOpenModal()"
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
              <h2 class="text-lg font-semibold text-gray-900">CLOSED</h2>
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
              @delete="toggleOpenModal()"
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
        @close="closeCreateTaskDrawer"
        @created="handleTaskCreated"
      />
    </AppDrawer>

    <!-- Update Task Drawer -->
    <AppDrawer
      :isOpen="isUpdateDrawerOpen"
      :isLoader="false"
      position="right"
      width="600px"
      @closeDrawer="closeUpdateTaskDrawer"
    >
      <UpdateTaskForm
        v-if="selectedTask"
        :taskData="selectedTask"
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
const isModalOpen = ref(false);
const route=useRoute()
const auth=useAuthStore()

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

// Reactive data
const tasks = ref([]);
const isCreateDrawerOpen = ref(false);
const isUpdateDrawerOpen = ref(false);
const selectedTask = ref(null);

// Computed properties pour chaque statut
const createTasks = computed(() =>
  tasks.value.filter((task) => task.status === "create")
);
const inProgressTasks = computed(() =>
  tasks.value.filter((task) => task.status === "in_progress")
);
const inReviewTasks = computed(() =>
  tasks.value.filter((task) => task.status === "in_review")
);
const completedTasks = computed(() =>
  tasks.value.filter((task) => task.status === "completed")
);
const closedTasks = computed(() =>
  tasks.value.filter((task) => task.status === "closed")
);

// Methods
const openCreateTaskDrawer = () => {
  isCreateDrawerOpen.value = true;
};

const closeCreateTaskDrawer = () => {
  isCreateDrawerOpen.value = false;
};

const openUpdateTaskDrawer = (task) => {
  selectedTask.value = task;
  isUpdateDrawerOpen.value = true;
};

const closeUpdateTaskDrawer = () => {
  isUpdateDrawerOpen.value = false;
  selectedTask.value = null;
};

const handleTaskCreated = (newTask) => {
  tasks.value.unshift(newTask);
  closeCreateTaskDrawer();
};

const handleTaskUpdated = (updatedTask) => {
  const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
  if (index !== -1) {
    tasks.value[index] = updatedTask;
  }
  closeUpdateTaskDrawer();
};

const deleteTask = async (taskId) => {
    console.log("dans la fonction delete")
    isModalOpen.value=false
};

const fetchTasks = async () => {
  try {
    tasks.value = [
      {
        id: 1,
        name: "Schedule me an appointment with my endocrinologist",
        description:
          "Specializes in the diagnosis and treatment of diseases related to the endocrine system, which includes glands...",
        status: "create",
        priority: "high",
        dueDate: "2024-02-15",
        startDate: "2024-02-01",
        estimationTime: 5,
        daysLeft: 15,
        views: 17,
        comments: 2,
      },
      {
        id: 2,
        name: "Help DStudio get more customers",
        description: "",
        status: "create",
        priority: "medium",
        dueDate: "2024-02-20",
        startDate: "2024-02-05",
        estimationTime: 10,
        daysLeft: 15,
        views: 12,
        comments: 0,
      },
      {
        id: 3,
        name: "Plan an event",
        description: "",
        status: "in_progress",
        priority: "high",
        dueDate: "2024-02-10",
        startDate: "2024-01-25",
        estimationTime: 7,
        daysLeft: 15,
        views: 32,
        comments: 0,
      },
      {
        id: 4,
        name: "Return a package",
        description: "",
        status: "in_review",
        priority: "low",
        dueDate: "2024-02-12",
        startDate: "2024-02-01",
        estimationTime: 3,
        daysLeft: 15,
        views: 8,
        comments: 0,
      },
      {
        id: 5,
        name: "Find a kids activity",
        description: "",
        status: "completed",
        priority: "medium",
        dueDate: "2024-01-30",
        startDate: "2024-01-20",
        estimationTime: 4,
        daysLeft: 0,
        views: 0,
        comments: 0,
      },
      {
        id: 6,
        name: "Cancel subscription",
        description: "Need to cancel the streaming service subscription",
        status: "closed",
        priority: "low",
        dueDate: "2024-01-25",
        startDate: "2024-01-15",
        estimationTime: 1,
        daysLeft: 0,
        views: 3,
        comments: 1,
      },
    ];

    const companyId=route.params.companyId
    const projectId=route.params.projectId
    const response=await auth.api('GET',`/companies/${companyId}/projects/${projectId}/tasks`,null,false)

    if(response.success){
      console.log(response.data)
    }
    
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

onMounted(() => {
  fetchTasks();
});
</script>

<style scoped>
/* Styles pour les barres de défilement */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
