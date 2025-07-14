<template>
  <!-- <div class="w-full bg-gray-500"> -->
  <div class="w-full px-4 pb-6 overflow-scroll sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Mes Entreprises</h1>
          <p class="mt-2 text-gray-600">
            Gérez vos accès aux entreprises et vos invitations
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="px-4 py-2 bg-white border rounded-lg shadow-sm">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">
                {{ acceptedCompanies.length }} Entreprise{{
                  acceptedCompanies.length > 1 ? "s" : ""
                }}
              </span>
            </div>
          </div>
          <div class="px-4 py-2 bg-white border rounded-lg shadow-sm">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">
                {{ pendingInvitations.length }} En attente
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

<AppModal :isOpen="isLoading" :isLoader="true">
    
</AppModal>
    <!-- Loading State -->
    <!-- <div v-if="" class="flex items-center justify-center py-12">
      <div class="flex items-center space-x-3">
        <div
          class="w-8 h-8 border-4 border-[#db147f] border-t-transparent rounded-full animate-spin"
        ></div>
        <span class="text-gray-600">Chargement des entreprises...</span>
      </div>
    </div> -->

    <!-- Content -->
    <div  class="pb-5 space-y-8">
      <!-- Entreprises Acceptées -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="flex items-center text-2xl font-semibold text-gray-900">
            <Building2 class="w-6 h-6 mr-2 text-[#db147f]" />
            Mes Entreprises
          </h2>
          <span class="text-sm text-gray-500"
            >{{ acceptedCompanies.length }} entreprise{{
              acceptedCompanies.length > 1 ? "s" : ""
            }}</span
          >
        </div>

        <div
          v-if="acceptedCompanies.length === 0"
          class="py-12 text-center bg-white border-2 border-gray-200 border-dashed rounded-lg"
        >
          <Building2 class="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 class="mb-2 text-lg font-medium text-gray-900">
            Aucune entreprise
          </h3>
          <p class="text-gray-500">
            Vous n'avez accès à aucune entreprise pour le moment.
          </p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="company in acceptedCompanies"
            :key="company.id"
            class="overflow-hidden transition-all duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md group"
          >
            <!-- Company Header -->
            <div
              class="relative p-6 bg-gradient-to-br from-[#db147f] to-[#e4097f]"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <!-- {{ company }} -->
                    <img v-if="company.avatarUrl" class="w-12 h-12 rounded-lg "  :src="company.avatarUrl">
                  <div v-else
                    class="flex items-center justify-center w-12 h-12 bg-white rounded-lg bg-opacity-20"
                  >
                    <span class="text-lg font-bold text-white">
                      {{ getCompanyInitials(company.name) }}
                    </span>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-white">
                      {{ company.name }}
                    </h3>
                    <p class="text-sm text-white text-opacity-80">
                      {{ company.industry || "Industrie" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Company Details -->
            <div class="p-6">
              <div class="space-y-4">
                <!-- Role -->
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">Rôle</span>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ company.role || "Collaborateur" }}
                  </span>
                </div>

                <!-- Join Date -->
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-500">Rejoint le</span>
                  <span class="text-sm font-medium text-gray-900">
                    {{ formatDate(company.joinedAt) }}
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex mt-6 space-x-3">
                <button
                  @click="viewCompanyProjects(company)"
                  class="flex-1 bg-[#db147f] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#c41370] transition-colors duration-200"
                >
                  Voir les projets
                </button>
                <button
                  @click="viewCompanyDetails(company)"
                  class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Détails
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Invitations en Attente -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <h2 class="flex items-center text-2xl font-semibold text-gray-900">
            <LetterText class="w-6 h-6 mr-2 text-yellow-500" />
            Invitations en Attente
          </h2>
          <span class="text-sm text-gray-500"
            >{{ pendingInvitations.length }} invitation{{
              pendingInvitations.length > 1 ? "s" : ""
            }}</span
          >
        </div>

        <div
          v-if="pendingInvitations.length === 0"
          class="py-12 text-center bg-white border-2 border-gray-200 border-dashed rounded-lg"
        >
          <LetterText class="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 class="mb-2 text-lg font-medium text-gray-900">
            Aucune invitation
          </h3>
          <p class="text-gray-500">Vous n'avez aucune invitation en attente.</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="invitation in pendingInvitations"
            :key="invitation.id"
            class="p-6 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <!-- Company Avatar -->
                <div
                  class="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500"
                >
                  <span class="text-lg font-bold text-white">
                    {{ getCompanyInitials(invitation.companyName) }}
                  </span>
                </div>

                <!-- Invitation Details -->
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ invitation.companyName }}
                  </h3>
                  <p class="mb-1 text-sm text-gray-600">
                    Invité par
                    <span class="font-medium">{{ invitation.invitedBy }}</span>
                  </p>
                  <div
                    class="flex items-center space-x-4 text-sm text-gray-500"
                  >
                    <span class="flex items-center">
                      <CalendarIcon class="w-4 h-4 mr-1" />
                      {{ formatDate(invitation.invitedAt) }}
                    </span>
                    <span class="flex items-center">
                      <UserIcon class="w-4 h-4 mr-1" />
                      Rôle: {{ invitation.role }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex items-center space-x-3">
                <button
                  @click="acceptInvitation(invitation)"
                  :disabled="invitation.processing"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckIcon class="w-4 h-4 mr-2" />
                  {{ invitation.processing ? "Acceptation..." : "Accepter" }}
                </button>
              </div>
            </div>

            <!-- Invitation Message -->
            <div
              v-if="invitation.message"
              class="p-3 mt-4 rounded-lg bg-gray-50"
            >
              <p class="text-sm text-gray-700">
                <span class="font-medium">Message:</span>
                {{ invitation.message }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Success/Error Messages -->
    <div
      v-if="successMessage"
      class="fixed px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg bottom-4 right-4"
    >
      {{ successMessage }}
    </div>
    <div
      v-if="errorMessage"
      class="fixed px-6 py-3 text-white bg-red-500 rounded-lg shadow-lg bottom-4 right-4"
    >
      {{ errorMessage }}
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  Building2,
  LetterText,
  CalendarIcon,
  UserIcon,
  CheckIcon,
  BookMarkedIcon,
} from "lucide-vue-next";
import AppModal from "@/components/globales/AppModal.vue";

const router = useRouter();
const auth = useAuthStore();

// Reactive data
const isLoading = ref(true);
const acceptedCompanies = ref([]);
const pendingInvitations = ref([]);
const successMessage = ref("");
const errorMessage = ref("");

// Fonction pour obtenir les initiales d'une compagnie
const getCompanyInitials = (companyName) => {
  if (!companyName) return "?";
  return companyName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Fonction pour récupérer les données
const fetchGuestData = async () => {
  try {
    isLoading.value = true;

    // Récupérer les entreprises acceptées
    const acceptedResponse = await auth.api(
      "GET",
      "/accounts/guest/list",
      null,
      false
    );
    if (acceptedResponse.success) {
      acceptedResponse.data.forEach((guest) => {
        
        if (guest.accept) {
          acceptedCompanies.value.push({
            id: guest.company.slug,
            avatarUrl:guest.company.activeDetails.avatarUrl,
            companySlug:guest.company.slug,
            name: guest.company.activeDetails.name,
            industry: guest.company.activeDetails.industry,
            role: guest.role || "Collaborateur",
            joinedAt: guest.acceptedAt || guest.createdAt,
            projectsCount: guest.projectsCount || 0,
            status: guest.status,
          });
        } else {
          pendingInvitations.value.push({
            id: guest.id,
            avatarUrl:guest.company.activeDetails.avatarUrl,
            companySlug:guest.company.slug,
            companyName: guest.company.activeDetails.name,
            invitedBy: guest.invitedBy?.name || "Administrateur",
            invitedAt: guest.createdAt,
            role: guest.role || "Collaborateur",
            message: guest.message,
            processing: false,
          });
        }
        
      });
    }
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    showError("Erreur lors du chargement des données");
  } finally {
    isLoading.value = false;
  }
};

// Fonction pour accepter une invitation
const acceptInvitation = async (invitation) => {
  try {
    invitation.processing = true;
    isLoading.value=true
    let companyId=invitation.companySlug
    let guestId= invitation.id

    const response = await auth.api(
      "POST",
      `/companies/${companyId}/guests/${guestId}/accept`,
      {},
      false
    );

    if (response.success) {
      // Déplacer l'invitation vers les entreprises acceptées
      const newCompany = {
        id: response.data.company.slug,
        name: response.data.company.activeDetails.name,
        industry: response.data.company.activeDetails.industry,
        role: invitation.role,
        joinedAt: new Date().toISOString(),
        projectsCount: 0,
        status: "active",
      };

      acceptedCompanies.value.push(newCompany);
      pendingInvitations.value = pendingInvitations.value.filter(
        (inv) => inv.id !== invitation.id
      );

      showSuccess("Invitation acceptée avec succès!");
    } else {
      showError(
        response.message || "Erreur lors de l'acceptation de l'invitation"
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'acceptation:", error);
    showError("Erreur lors de l'acceptation de l'invitation");
  } finally {
    invitation.processing = false;
    isLoading.value=false

  }
};

// Fonction pour refuser une invitation
const declineInvitation = async (invitation) => {
  try {
    invitation.processing = true;

    const response = await auth.api(
      "POST",
      `/accounts/guest/invitations/${invitation.id}/decline`,
      null,
      false
    );

    if (response.success) {
      pendingInvitations.value = pendingInvitations.value.filter(
        (inv) => inv.id !== invitation.id
      );
      showSuccess("Invitation refusée");
    } else {
      showError(response.message || "Erreur lors du refus de l'invitation");
    }
  } catch (error) {
    console.error("Erreur lors du refus:", error);
    showError("Erreur lors du refus de l'invitation");
  } finally {
    invitation.processing = false;
  }
};

// Fonction pour voir les projets d'une entreprise
const viewCompanyProjects = (company) => {
console.log(company)
  router.push({
    name: "guest_list_projects",
    params: { companyId: company.id },
  });
};

// Fonction pour voir les détails d'une entreprise
const viewCompanyDetails = (company) => {
  // Implémenter la navigation vers les détails de l'entreprise
  console.log("Voir détails de:", company);

  router.push({name:'companie_details',    params: { companyId: company.companySlug },
})
};

// Fonctions pour afficher les messages
const showSuccess = (message) => {
  successMessage.value = message;
  setTimeout(() => {
    successMessage.value = "";
  }, 3000);
};

const showError = (message) => {
  errorMessage.value = message;
  setTimeout(() => {
    errorMessage.value = "";
  }, 3000);
};

// Lifecycle
onMounted(() => {
  fetchGuestData();
});
</script>

<style scoped>
/* Animations personnalisées */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Transitions fluides */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
