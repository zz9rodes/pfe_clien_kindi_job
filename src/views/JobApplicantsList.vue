<template>
  <div class="w-full min-h-screen mx-auto bg-gray-50">
    <AppModal  :isOpen="isLoading" :isLoader="true"></AppModal>

    <!-- Modal pour voir le profil du candidat -->
    <AppModal
      @close="closeApplicantModal"
      :isOpen="isApplicantModalOpen"
      :isLoader="false"
    >
      <ApplicantProfileModal 
        @close="closeApplicantModal"
        v-if="selectedApplicant"
        :applicant="selectedApplicant.account"
        :applyInfo='{
            message:selectedApplicant.message,
            slug:selectedApplicant.slug,
            status:selectedApplicant.status
        }'
        @updateStatus="handleStatusUpdate"
      />
    </AppModal>

    <!-- Header avec informations du job -->
    <div class="px-6 py-6 bg-white border-b border-gray-200">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <div class="flex items-center mb-4 space-x-4">
            <img
              v-if="jobData?.company?.activeDetails?.avatarUrl"
              :src="jobData.company.activeDetails.avatarUrl"
              :alt="jobData.company.activeDetails.name"
              class="object-cover w-16 h-16 border-2 border-gray-100 rounded-lg"
            />
            <div
              v-else
              class="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-lg"
            >
              <span class="text-lg font-medium text-gray-600">
                {{ jobData?.company?.activeDetails?.name?.charAt(0) || 'J' }}
              </span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ jobData?.title || 'Candidatures' }}</h1>
              <p class="text-gray-600">{{ jobData?.company?.activeDetails?.name }}</p>
              <div class="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <MapPin class="w-4 h-4 mr-1" />
                  {{ jobData?.city }}, {{ jobData?.country }}
                </span>
                <span class="flex items-center">
                  <Briefcase class="w-4 h-4 mr-1" />
                  {{ jobData?.jobType }}
                </span>
                <span class="flex items-center">
                  <DollarSign class="w-4 h-4 mr-1" />
                  {{ formatSalary(jobData?.price) }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Job Status and Stats -->
          <div class="flex items-center space-x-6">
            <span 
              :class="[
                'inline-flex items-center px-3 py-1 text-sm font-medium rounded-full',
                getJobStatusBadgeClass(jobData?.status)
              ]"
            >
              <div 
                :class="[
                  'w-2 h-2 rounded-full mr-2',
                  getJobStatusDotClass(jobData?.status)
                ]"
              ></div>
              {{ getJobStatusLabel(jobData?.status) }}
            </span>
            <span class="text-sm text-gray-500">
              {{ jobData?.yearsExperience }}+ ans d'expérience requis
            </span>
            <span class="text-sm text-gray-500">
              Date limite: {{ formatDate(jobData?.lastDate) }}
            </span>
          </div>
        </div>
        
        <div class="text-right">
          <div class="text-2xl font-bold text-gray-900">{{ applicants.length }}</div>
          <div class="text-sm text-gray-500">candidature{{ applicants.length > 1 ? 's' : '' }}</div>
        </div>
      </div>
    </div>

    <!-- Tabs pour filtrer par statut -->
    <div class="bg-white border-b border-gray-200">
      <div class="flex gap-0">
        <button
          v-for="status in applicationStatuses"
          :key="status"
          @click="activeTab = status"
          :class="[
            'py-2 px-4 text-sm font-medium border-b-2',
            activeTab === status
              ? 'border-[#db147f] text-[#db147f]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ statusLabels[status] }}
          <span 
            v-if="getApplicantCountByStatus(status) > 0"
            class="px-2 py-1 ml-2 text-xs bg-gray-100 rounded-full"
          >
            {{ getApplicantCountByStatus(status) }}
          </span>
        </button>
      </div>
    </div>
    
    <!-- Contenu principal -->
    <div class="p-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <!-- Cartes des candidats -->
        <div 
          v-for="applicant in filteredApplicants"
          :key="applicant.id"
          class="p-4 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
          @click="viewApplicantProfile(applicant)"
        >
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <img
                v-if="applicant.account?.avatarUrl"
                :src="applicant.account.avatarUrl"
                :alt="getApplicantName(applicant)"
                class="object-cover w-12 h-12 border-2 border-gray-100 rounded-full"
              />
              <div
                v-else
                class="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full"
              >
                <span class="text-sm font-medium text-gray-600">
                  {{ getApplicantInitials(applicant) }}
                </span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-900 truncate">
                {{ getApplicantName(applicant) }}
              </h3>
              <p class="text-sm text-gray-500 truncate">
                {{ getApplicantCurrentPosition(applicant) }}
              </p>
              <p class="text-xs text-gray-400 truncate">
                {{ getApplicantExperience(applicant) }}
              </p>
              <div class="flex items-center justify-between mt-2">
                <span 
                  :class="[
                    'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
                    getStatusBadgeClass(applicant.status)
                  ]"
                >
                  <div 
                    :class="[
                      'w-1.5 h-1.5 rounded-full mr-1.5',
                      getStatusDotClass(applicant.status)
                    ]"
                  ></div>
                  {{ getStatusLabel(applicant.status) }}
                </span>
                <div class="flex items-center space-x-1">
                  <button
                    v-if="applicant.status === 'pending'"
                    @click.stop="updateApplicantStatus(applicant.id, 'accepted')"
                    class="p-1 text-green-600 rounded hover:bg-green-50"
                    title="Accepter"
                  >
                    <Check class="w-4 h-4" />
                  </button>
                  <button
                    v-if="applicant.status === 'pending'"
                    @click.stop="updateApplicantStatus(applicant.id, 'rejected')"
                    class="p-1 text-red-600 rounded hover:bg-red-50"
                    title="Rejeter"
                  >
                    <X class="w-4 h-4" />
                  </button>
                  <button
                    @click.stop="viewApplicantProfile(applicant)"
                    class="p-1 text-gray-600 rounded hover:bg-gray-50"
                    title="Voir le profil"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Informations supplémentaires -->
          <div class="pt-3 mt-3 border-t border-gray-100">
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>Postulé le {{ formatDate(applicant.createdAt) }}</span>
              <div class="flex items-center space-x-2">
                <span class="flex items-center">
                  <Phone class="w-3 h-3 mr-1" />
                  {{ applicant.account?.phoneNumber }}
                </span>
              </div>
            </div>
            
            <!-- Compétences du candidat -->
            <div v-if="getApplicantSkills(applicant).length > 0" class="mt-2">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="skill in getApplicantSkills(applicant).slice(0, 3)"
                  :key="skill"
                  class="px-2 py-1 text-xs text-blue-700 rounded bg-blue-50"
                >
                  {{ skill }}
                </span>
                <span
                  v-if="getApplicantSkills(applicant).length > 3"
                  class="px-2 py-1 text-xs text-gray-500 rounded bg-gray-50"
                >
                  +{{ getApplicantSkills(applicant).length - 3 }}
                </span>
              </div>
            </div>

            <!-- Message de candidature -->
            <div v-if="applicant.message" class="mt-2">
              <p class="mt-4 text-xs italic text-gray-600 truncate">
                "{{ applicant.message }}"
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- État vide -->
      <div 
        v-if="filteredApplicants.length === 0 && !isLoading" 
        class="py-12 text-center"
      >
        <div class="flex flex-col items-center">
          <div class="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
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
import AppModal from "@/components/globales/AppModal.vue";
import ApplicantProfileModal from "@/components/ApplicantProfileModal.vue";
import { Check, X, Eye, Star, Users, MapPin, Briefcase, DollarSign, Phone } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";

// Composables
const auth = useAuthStore();
const route = useRoute();

// Props
const props = defineProps({
  jobId: {
    type: String,
    required: true
  }
});

// Reactive data
const isLoading = ref(false);
const isApplicantModalOpen = ref(false);
const selectedApplicant = ref(null);
const activeTab = ref('pending');
const jobData = ref(null);

const statusLabels = {
  pending: "En attente",
  accepted: "Acceptés",
  rejected: "Rejetés"
};

const applicationStatuses = ["pending", "accepted", "rejected"];

// Données des candidatures (sera rempli par l'API)
const applicants = ref([]);

// Computed properties
const filteredApplicants = computed(() => {
  return applicants.value.filter(applicant => applicant.status === activeTab.value);
});

const getApplicantCountByStatus = (status) => {
  return applicants.value.filter(applicant => applicant.status === status).length;
};

// Methods pour extraire les données des candidats
const getApplicantName = (applicant) => {
  return `${applicant.account?.firstName || ''} ${applicant.account?.lastName || ''}`.trim() || 'Candidat anonyme';
};

const getApplicantInitials = (applicant) => {
  const firstName = applicant.account?.firstName || '';
  const lastName = applicant.account?.lastName || '';
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'CA';
};

const getApplicantCurrentPosition = (applicant) => {
  const workExperiences = applicant.account?.cvProfiles?.workExperiences || [];
  if (workExperiences.length > 0) {
    return workExperiences[0].title || 'Poste non spécifié';
  }
  return 'Poste non spécifié';
};

const getApplicantExperience = (applicant) => {
  const workExperiences = applicant.account?.cvProfiles?.workExperiences || [];
  if (workExperiences.length > 0) {
    const totalPeriods = workExperiences.reduce((total, exp) => {
      return total + (parseInt(exp.period) || 0);
    }, 0);
    return `${Math.floor(totalPeriods / 12)} ans d'expérience`;
  }
  return 'Expérience non spécifiée';
};

const getApplicantSkills = (applicant) => {
  return applicant.account?.cvProfiles?.competence || [];
};

// Methods pour les statuts
const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'accepted':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-400';
    case 'accepted':
      return 'bg-green-400';
    case 'rejected':
      return 'bg-red-400';
    default:
      return 'bg-gray-400';
  }
};

const getStatusLabel = (status) => {
  return statusLabels[status] || status;
};

// Methods pour le statut du job
const getJobStatusBadgeClass = (status) => {
  switch (status) {
    case 'OPEN':
      return 'bg-green-100 text-green-800';
    case 'CLOSE':
      return 'bg-red-100 text-red-800';
    case 'DRAFT':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getJobStatusDotClass = (status) => {
  switch (status) {
    case 'OPEN':
      return 'bg-green-400';
    case 'CLOSE':
      return 'bg-red-400';
    case 'DRAFT':
      return 'bg-yellow-400';
    default:
      return 'bg-gray-400';
  }
};

const getJobStatusLabel = (status) => {
  switch (status) {
    case 'OPEN':
      return 'Ouverte';
    case 'CLOSE':
      return 'Fermée';
    case 'DRAFT':
      return 'Brouillon';
    default:
      return status;
  }
};

// Utility methods
const formatSalary = (price) => {
  if (!price) return 'Salaire non spécifié';
  return `${price.value?.toLocaleString()} ${price.currency}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const getEmptyStateTitle = () => {
  switch (activeTab.value) {
    case 'pending':
      return 'Aucune candidature en attente';
    case 'accepted':
      return 'Aucun candidat accepté';
    case 'rejected':
      return 'Aucun candidat rejeté';
    default:
      return 'Aucune candidature';
  }
};

const getEmptyStateDescription = () => {
  switch (activeTab.value) {
    case 'pending':
      return 'Les nouvelles candidatures apparaîtront ici.';
    case 'accepted':
      return 'Les candidats acceptés apparaîtront ici.';
    case 'rejected':
      return 'Les candidats rejetés apparaîtront ici.';
    default:
      return 'Aucune candidature reçue pour le moment.';
  }
};

// Actions
const viewApplicantProfile = (applicant) => {
  selectedApplicant.value = applicant;
  isApplicantModalOpen.value = true;
};

const closeApplicantModal = () => {
  isApplicantModalOpen.value = false;
  selectedApplicant.value = null;
};

const updateApplicantStatus = async (applicantId, newStatus) => {
  isLoading.value = true;
  
  try {
    const response = await auth.api('PUT', `/applies/${applicantId}/status`, {
      status: newStatus
    }, true);
    
    if (response.success) {
      // Mise à jour locale
      const applicantIndex = applicants.value.findIndex(a => a.id === applicantId);
      if (applicantIndex !== -1) {
        applicants.value[applicantIndex].status = newStatus;
      }
    }
    
    console.log(`Candidat ${applicantId} mis à jour avec le statut: ${newStatus}`);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleStatusUpdate = (applicantId, newStatus) => {
  updateApplicantStatus(applicantId, newStatus);
  closeApplicantModal();
};

// API Methods
const fetchJobAndApplicants = async () => {
  isLoading.value = true;
  
  try {
    const response = await auth.api('GET', `/applies/jobs/${route.params.jobId}`, null, false);
    if (response.success) {
      jobData.value = response.data;
      applicants.value = response.data.applies || [];
    }
    console.log('Job data:', jobData.value);
    console.log('Applicants:', applicants.value);
  } catch (error) {
    console.error('Erreur lors du chargement des candidatures:', error);
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  await fetchJobAndApplicants();
});
</script>

<style scoped>
/* Animations pour les transitions */
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

/* Hover effects */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Custom scrollbar si nécessaire */
.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
</style>
