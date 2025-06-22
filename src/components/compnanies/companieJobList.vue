<template>
  <div class="w-full min-h-screen mx-auto bg-gray-50">
    <AppModal :isOpen="isLoading" :isLoader="true"></AppModal>

    <!-- Header avec titre -->
    <div class="px-6 py-4 bg-white border-b border-gray-200">
      <h1 class="text-2xl font-bold text-gray-900">Offres d'emploi</h1>
      <p class="mt-1 text-gray-600">Gérez vos offres d'emploi</p>
    </div>

    <!-- Tabs simplifiés -->
    <div class="bg-white border-b border-gray-200">
      <div class="flex gap-0">
        <button
          v-for="tab in jobStatuses"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'py-2 px-4 text-sm font-medium border-b-2',
            activeTab === tab
              ? 'border-[#db147f] text-[#db147f]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tabLabels[tab] }}
          <span
            v-if="getJobCountByStatus(tab) > 0"
            class="px-2 py-1 ml-2 text-xs bg-gray-100 rounded-full"
          >
            {{ getJobCountByStatus(tab) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Contenu principal -->
       <div class="p-6" @click="GoToNewCreateJob" v-if="isAdmin">
            <button
              class="new-job flex gap-1 bg-[#db147f] text-white rounded-md px-3 py-2"
            >
              <Plus />
              <span>New Job</span>
            </button>
          </div>
    <div class="p-6">
        
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Cartes des jobs -->
         
        <div
          class="relative flex flex-col"
          v-for="job in filteredJobs"
          :key="job.id"
          @click="() => HandlegoToViewJobDetail(job)"
        >
          <div
            v-if="isAdmin"
            class="text-end"
            @click.stop="() => GoToUpdateCreateJob(job)"
          >
            <button
              class="px-3 absolute top-0 right-0 z-10 py-1 bg-[#db147f] text-white rounded-tr-md hover:bg-[#c1136e] transition-colors"
            >
              edit
            </button>
          </div>

          

          <!-- Status badge -->
          <div class="absolute z-10 top-2 left-2">
            <span
              :class="[
                'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
                getStatusBadgeClass(job.status),
              ]"
            >
              <div
                :class="[
                  'w-1.5 h-1.5 rounded-full mr-1.5',
                  getStatusDotClass(job.status),
                ]"
              ></div>
              {{ getStatusLabel(job.status) }}
            </span>
          </div>

          <JobCard
            :shoFavorite="false"
            :companyLogo="company?.activeDetails?.avatarUrl"
            :companyName="company?.activeDetails?.name"
            :job="job"
            @bookmark="handleBookmark"
          />
        </div>


      </div>

      <!-- État vide -->
      <div
        v-if="filteredJobs.length === 0 && !isLoading"
        class="py-12 text-center"
      >
        <div class="flex flex-col items-center">
          <div
            class="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full"
          >
            <FileText class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="mb-2 text-lg font-medium text-gray-900">
            {{ getEmptyStateTitle() }}
          </h3>
          <p class="mb-4 text-gray-500">
            {{ getEmptyStateDescription() }}
          </p>

          <button
          v-if="isAdmin && activeTab=='OPEN'"
            @click="GoToCreateJob()"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c1136e]"
          >
            <Plus class="w-4 h-4 mr-2" />
            Créer votre première offre
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppModal from "../globales/AppModal.vue";
import JobCard from "../JobCard.vue"; // Ajustez le chemin selon votre structure
import { Plus, FileText } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

// Props
const props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Émissions
const emit = defineEmits(["bookmark"]);

const tabLabels = {
  OPEN: "Offres ouvertes",
  CLOSE: "Offres fermées",
  DRAFT: "Brouillons",
};

const jobStatuses = ["OPEN", "CLOSE", "DRAFT"];
const activeTab = ref("OPEN");

const company = ref(null);
const isLoading = ref(false);

// Fonction pour basculer le loader
const toggleLoader = () => {
  isLoading.value = !isLoading.value;
};

// Computed pour filtrer les jobs selon l'onglet actif
const filteredJobs = computed(() => {
  if (!company.value?.jobs) return [];
  return company.value.jobs.filter((job) => job.status === activeTab.value);
});

// Fonction pour compter les jobs par statut
const getJobCountByStatus = (status) => {
  if (!company.value?.jobs) return 0;
  return company.value.jobs.filter((job) => job.status === status).length;
};

const GoToNewCreateJob = () => {
  router.push({
    name: "create_job",
    params: { companyId: route.params.companyId },
  });
};

const GoToUpdateCreateJob = (job) => {
  auth.setJob(job);
  router.push({
    name: "update_job",
    params: { companyId: route.params.companyId, jobId: job.slug },
  });
};

// Fonctions pour les styles des badges de statut
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "OPEN":
      return "bg-green-100 text-green-800";
    case "CLOSE":
      return "bg-red-100 text-red-800";
    case "DRAFT":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case "OPEN":
      return "bg-green-400";
    case "CLOSE":
      return "bg-red-400";
    case "DRAFT":
      return "bg-yellow-400";
    default:
      return "bg-gray-400";
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "OPEN":
      return "Ouverte";
    case "CLOSE":
      return "Fermée";
    case "DRAFT":
      return "Brouillon";
    default:
      return status;
  }
};

// Fonctions pour l'état vide
const getEmptyStateTitle = () => {
  switch (activeTab.value) {
    case "OPEN":
      return "Aucune offre ouverte";
    case "CLOSE":
      return "Aucune offre fermée";
    case "DRAFT":
      return "Aucun brouillon";
    default:
      return "Aucune offre";
  }
};

const getEmptyStateDescription = () => {
  switch (activeTab.value) {
    case "OPEN":
      return "Vous n'avez pas encore d'offres d'emploi ouvertes.";
    case "CLOSE":
      return "Vous n'avez pas encore d'offres d'emploi fermées.";
    case "DRAFT":
      return "Vous n'avez pas encore de brouillons d'offres.";
    default:
      return "Commencez par créer votre première offre d'emploi.";
  }
};

// Fonction pour récupérer les détails de l'entreprise
const FetchCompanyDetails = async () => {
  toggleLoader();
  const companyId = route.params.companyId;

  try {
    const response = await auth.api(
      "GET",
      `/companies/${companyId}`,
      {},
      false
    );
    if (response.success) {
      company.value = response.data;
    }
  } catch (error) {
    console.error(
      "Erreur lors du chargement des détails de l'entreprise:",
      error
    );
  }

  toggleLoader();
};

// Handlers pour les actions
const HandlegoToViewJobDetail = (job) => {
  // Implémentez la navigation vers les détails du job
  router.push({
    name: "account_jobs_details",
    params: {
      companyId: route.params.companyId,
      id: job.slug,
    },
  });
};



const GoToCreateJob = () => {
  // Implémentez la navigation vers la création d'un job
  router.push({
    name: "job-create",
    params: {
      companyId: route.params.companyId,
    },
  });
};

const handleBookmark = (jobData) => {
  emit("bookmark", jobData);
};

// Lifecycle
onMounted(async () => {
  await FetchCompanyDetails();
});
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
.job-card-container {
  transition: transform 0.2s ease-in-out;
}

.job-card-container:hover {
  transform: translateY(-2px);
}
</style>
