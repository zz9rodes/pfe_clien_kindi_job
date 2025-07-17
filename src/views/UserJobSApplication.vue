<template>
  <div class="w-full min-h-screen mx-auto bg-gray-50">
    <!-- Modal de chargement -->
    <AppModal :isOpen="isLoading" :isLoader="true"></AppModal>


    <!-- Modal pour voir les détails de la candidature -->


    <AppModal  
      @closeModal="closeApplicationModal"
      :isOpen="isApplicationModalOpen"
      :isLoader="false"
      >
        
      <div
        class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Détails de la candidature</h2>
            <button
              @click="closeApplicationModal"
              class="text-gray-400 hover:text-gray-600"
            >
              <X class="w-6 h-6" />
            </button>
          </div>

          <div v-if="selectedApplication" class="space-y-4">
            <!-- Informations du job -->
            <div class="pb-4 border-b">
              <div class="flex items-center mb-3 space-x-4">
                <img
                  v-if="selectedApplication.job.company.activeDetails.avatarUrl"
                  :src="selectedApplication.job.company.activeDetails.avatarUrl"
                  :alt="selectedApplication.job.company.activeDetails.name"
                  class="object-cover w-16 h-16 border-2 border-gray-100 rounded-lg"
                />
                <div
                  v-else
                  class="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg"
                >
                  <Building2 class="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold">
                    {{ selectedApplication.job.title }}
                  </h3>
                  <p class="text-gray-600">
                    {{ selectedApplication.job.company.activeDetails.name || 'Entreprise inconnue' }}
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex items-center text-gray-600">
                  <MapPin class="w-4 h-4 mr-2" />
                  {{ selectedApplication.job.city }},
                  {{ selectedApplication.job.country }}
                </div>
                <div class="flex items-center text-gray-600">
                  <Briefcase class="w-4 h-4 mr-2" />
                  {{ selectedApplication.job.jobType }}
                </div>
                <div class="flex items-center text-gray-600">
                  <DollarSign class="w-4 h-4 mr-2" />
                  {{ formatSalary(selectedApplication.job.price) }}
                </div>
                <div class="flex items-center text-gray-600">
                  <Calendar class="w-4 h-4 mr-2" />
                  Expire le {{ formatDate(selectedApplication.job.lastDate) }}
                </div>
              </div>
            </div>

            <!-- Statut de la candidature -->
            <div>
              <h4 class="mb-2 font-medium">Statut de la candidature</h4>
              <div class="flex items-center space-x-3">
                <span :class="getStatusBadgeClass(selectedApplication.status)">
                  <div
                    :class="getStatusDotClass(selectedApplication.status)"
                  ></div>
                  {{ getStatusLabel(selectedApplication.status) }}
                </span>
                <span class="text-sm text-gray-500">
                  Postulé le {{ formatDate(selectedApplication.createdAt) }}
                </span>
              </div>
            </div>

            <!-- Message de candidature -->
            <div v-if="selectedApplication.message">
              <h4 class="mb-2 font-medium">Votre message de candidature</h4>
              <div class="p-4 rounded-lg bg-gray-50">
                <p class="italic text-gray-700">
                  "{{ selectedApplication.message }}"
                </p>
              </div>
            </div>

            <!-- Étapes de validation -->
            <div v-if="selectedApplication.job.stepsValidation && selectedApplication.status=='approved'">
              <h4 class="mb-2 font-medium">Étapes de validation</h4>
              <div v-for="step in selectedApplication.job.stepsValidation" :key="step.id">
                <div>{{ step.name }} : {{ step.description }}</div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </AppModal>

    <!-- Header avec statistiques -->
    <div class="px-6 py-6 bg-white border-b border-gray-200">
      <div class="mb-6">
        <h1 class="mb-2 text-3xl font-bold text-gray-900">Mes candidatures</h1>
        <p class="text-gray-600">
          Suivez le statut de vos candidatures et gérez vos applications
        </p>
      </div>

      <!-- Cartes de statistiques
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div class="p-4 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Total</p>
              <p class="text-2xl font-bold">{{ applications.length }}</p>
            </div>
            <Users class="w-8 h-8 text-[#db147f]" />
          </div>
        </div>
        <div class="p-4 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">En attente</p>
              <p class="text-2xl font-bold text-yellow-600">{{ getApplicationCount('pending') }}</p>
            </div>
            <Clock class="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div class="p-4 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Acceptées</p>
              <p class="text-2xl font-bold text-green-600">{{ getApplicationCount('approved') }}</p>
            </div>
            <CheckCircle class="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div class="p-4 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Rejetées</p>
              <p class="text-2xl font-bold text-red-600">{{ getApplicationCount('rejected') }}</p>
            </div>
            <XCircle class="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div> -->
    </div>

    <!-- Tabs pour filtrer par statut -->
    <div class="px-6 bg-white border-b border-gray-200">
      <div class="flex gap-0">
        <button
          v-for="status in applicationStatuses"
          :key="status"
          @click="activeTab = status"
          :class="[
            'py-2 px-3 text-[12px] sm:text-sm font-medium border-b-2 transition-colors',
            activeTab === status
              ? 'border-[#db147f] text-[#db147f] '
              : 'border-transparent text-gray-500 hover:text-gray-700 ',
          ]"
        >
          {{ statusLabels[status] }}
          <span
            v-if="getApplicationCount(status) > 0"
            class="px-2 py-1 ml-2 text-xs bg-gray-100 rounded-full"
          >
            {{ getApplicationCount(status) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="p-6">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Cartes des candidatures -->
        <div
          v-for="application in filteredApplications"
          :key="application.id"
          class="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg"
          @click="viewApplicationDetails(application)"
        >
          <!-- En-tête avec entreprise et poste -->
          <div class="flex items-start mb-4 space-x-4">
            <div class="flex-shrink-0">
              <img
                v-if="application.job.company.activeDetails.avatarUrl"
                :src="application.job.company.activeDetails.avatarUrl"
                :alt="application.job.company.activeDetails.name"
                class="object-cover w-12 h-12 border-2 border-gray-100 rounded-lg"
              />
              <div
                v-else
                class="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-lg"
              >
                <Building2 class="w-6 h-6 text-gray-500" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-semibold text-gray-900 truncate">
                {{ application.job.title }}
              </h3>
              <p class="text-sm text-gray-600 truncate">
                {{ application.job.company.activeDetails.name || 'Entreprise inconnue' }}
              </p>
            </div>
          </div>

          <!-- Détails du job -->
          <div class="mb-4 space-y-2">
            <div class="flex items-center text-sm text-gray-600">
              <MapPin class="w-4 h-4 mr-2" />
              {{ application.job.city }}, {{ application.job.country }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Briefcase class="w-4 h-4 mr-2" />
              {{ application.job.jobType }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <DollarSign class="w-4 h-4 mr-2" />
              {{ formatSalary(application.job.price) }}
            </div>
          </div>

          <!-- Badges de statut -->
          <div class="flex items-center justify-between mb-4">
            <span
              :class="[
                'inline-flex items-center px-3 py-1 text-sm font-medium rounded-full',
                getStatusBadgeClass(application.status),
              ]"
            >
              <div
                :class="[
                  'w-2 h-2 rounded-full mr-2',
                  getStatusDotClass(application.status),
                ]"
              ></div>
              {{ getStatusLabel(application.status) }}
            </span>
          </div>

          <!-- Message de candidature -->
          <div v-if="application.message" class="mb-4">
            <p class="mb-1 text-xs text-gray-500">Message de candidature:</p>
            <p class="text-sm italic text-gray-700 line-clamp-2">
              "{{ application.message }}"
            </p>
          </div>

          <!-- Date de candidature et actions -->
          <div
            class="flex items-center justify-between pt-4 border-t border-gray-100"
          >
            <span class="text-xs text-gray-500">
              Postulé le {{ formatDate(application.createdAt) }}
            </span>
            <button
              @click.stop="viewJobDetails(application)"
              class="flex items-center px-3 py-1 text-xs text-[#db147f] border border-[#ceb2c1] rounded hover:text-white hover:bg-[#db147f]"
            >
            <Eye class="w-3 h-3 mr-1" />
              Voir le job
            </button>
          </div>
        </div>
      </div>

      <!-- État vide -->
      <div
        v-if="filteredApplications.length === 0 && !isLoading"
        class="py-12 text-center"
      >
        <div class="flex flex-col items-center">
          <div
            class="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full"
          >
            <Users class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="mb-2 text-lg font-medium text-gray-900">
            {{ getEmptyStateTitle() }}
          </h3>
          <p class="text-gray-500">
            {{ getEmptyStateDescription() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Eye,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  X,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import AppModal from "@/components/globales/AppModal.vue";
import { useRouter } from "vue-router";

// Reactive data

const auth=useAuthStore()
const router=useRouter()
const isLoading = ref(false);
const isApplicationModalOpen = ref(false);
const selectedApplication = ref(null);
const activeTab = ref("all");

const statusLabels = {
  all: "Toutes",
  pending: "En attente",
  approved: "Acceptées",
  rejected: "Rejetées",
};

const applicationStatuses = ["all", "pending", "approved", "rejected"];

const applications = ref([]);

// Computed properties
const filteredApplications = computed(() => {
  if (activeTab.value === "all") {
    return applications.value;
  }
  return applications.value.filter(
    (application) => application.status === activeTab.value
  );
});

const getApplicationCount = (status) => {
  if (status === "all") {
    return applications.value.length;
  }
  return applications.value.filter(
    (application) => application.status === status
  ).length;
};

// Methods pour les statuts des candidatures
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-400";
    case "approved":
      return "bg-green-400";
    case "rejected":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "En attente",
    approved: "Acceptée",
    rejected: "Rejetée",
  };
  return labels[status] || status;
};

// Methods pour le statut du job
const getJobStatusBadgeClass = (status) => {
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

const getJobStatusLabel = (status) => {
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

// Utility methods
const formatSalary = (price) => {
  if (!price) return "Salaire non spécifié";
  return `${price.value?.toLocaleString()} ${price.currency}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getEmptyStateTitle = () => {
  switch (activeTab.value) {
    case "all":
      return "Aucune candidature";
    case "pending":
      return "Aucune candidature en attente";
    case "approved":
      return "Aucune candidature acceptée";
    case "rejected":
      return "Aucune candidature rejetée";
    default:
      return "Aucune candidature";
  }
};

const getEmptyStateDescription = () => {
  switch (activeTab.value) {
    case "all":
      return "Vous n'avez pas encore postulé à des offres.";
    case "pending":
      return "Toutes vos candidatures ont été traitées.";
    case "approved":
      return "Aucune de vos candidatures n'a été acceptée pour le moment.";
    case "rejected":
      return "Aucune de vos candidatures n'a été rejetée.";
    default:
      return "Aucune candidature trouvée.";
  }
};

// Actions
const viewApplicationDetails = (application) => {
  selectedApplication.value = application;
  isApplicationModalOpen.value = true;
};

const viewJobDetails=(applicant)=>{
 console.log(applicant)   
 router.push({name:'account_jobs_details',params:{id:applicant.job.slug}})
}

const closeApplicationModal = () => {
  isApplicationModalOpen.value = false;
  selectedApplication.value = null;
};

// API Methods (à implémenter)
const fetchUserApplications = async () => {
  isLoading.value = true;
  try {
    const response = await auth.api('GET', '/applies/accounts', null, false);
    if (response.success && Array.isArray(response.data)) {
      applications.value = response.data;
    } else {
      applications.value = [];
    }
  } catch (error) {
    console.error("Erreur lors du chargement des candidatures:", error);
    applications.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  await fetchUserApplications();
});
</script>

<style scoped>
/* Animations pour les transitions */
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

/* Hover effects */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
</style>