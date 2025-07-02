<template>
  <div class="w-full min-h-screen bg-gray-50">
    <AppModal :isOpen="isLoading" :isLoader="true"></AppModal>

    <!-- État d'erreur -->
    <div v-if="hasError" class="flex items-center justify-center min-h-screen">
      <div class="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
        <div class="w-16 h-16 mx-auto mb-4 text-red-500">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 class="mb-2 text-lg font-semibold text-gray-900">
          Erreur de chargement
        </h3>
        <p class="mb-4 text-gray-600">{{ errorMessage }}</p>
        <div class="flex justify-center gap-2">
          <button
            @click="retryFetch"
            class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Réessayer
          </button>
          <button
            @click="goBack"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Retour
          </button>
        </div>
      </div>
    </div>

    <!-- État de chargement sans données -->
    <!-- <div
      v-else-if="isLoading && !contractData"
      class="flex items-center justify-center min-h-screen"
    >
      <div class="text-center">
        <div
          class="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-600 rounded-full animate-spin"
        ></div>
        <p class="text-gray-600">Chargement du contrat...</p>
      </div>
    </div> -->

    <!-- Contenu principal -->
    <div v-else-if="contractData" class="container px-4 py-8 mx-auto">
      <!-- Header avec informations du contrat -->
      <div
        class="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <h1 class="mb-2 text-2xl font-bold text-gray-900">Contrat Signé</h1>
            <p class="text-gray-600">
              Référence: {{ contractData?.reference }}
            </p>
          </div>
          <div class="flex items-center space-x-4">
            <span
              class="inline-flex items-center px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full"
            >
              <CheckCircle class="w-4 h-4 mr-2" />
              Signé
            </span>
            <button
              @click="downloadContract"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 print:hidden"
            >
              <Download class="w-4 h-4 mr-2" />
              Télécharger PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Document du contrat -->
      <div class="overflow-hidden bg-white rounded-lg shadow-lg">
        <div class="p-8 space-y-6" id="contract-content">
          <!-- En-tête du contrat -->
          <div class="mb-8 text-center">
            <h2 class="mb-2 text-3xl font-bold text-gray-900">
              {{ contractData?.contract?.title }}
            </h2>
            <p class="text-sm text-gray-500">
              Référence: {{ contractData?.reference }}
            </p>
            <p class="text-sm text-gray-500">
              Signé le {{ formatDate(contractData?.createdAt) }}
            </p>
          </div>

          <!-- Informations des parties -->
          <div class="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
            <!-- Informations de l'employeur -->
            <div class="p-6 rounded-lg bg-gray-50">
              <h3
                class="flex items-center mb-4 text-lg font-semibold text-gray-900"
              >
                <Building2 class="w-5 h-5 mr-2" />
                L'Employeur
              </h3>
              <div class="space-y-2 text-sm">
                <div>
                  <span class="font-medium text-gray-700">Entreprise:</span>
                  <span class="ml-2 text-gray-900">{{ companyInfo.name }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Localisation:</span>
                  <span class="ml-2 text-gray-900">{{
                    companyInfo.location
                  }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Représentant:</span>
                  <span class="ml-2 text-gray-900">{{
                    companyInfo.representative
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Informations de l'employé -->
            <div class="p-6 rounded-lg bg-rose-50">
              <h3
                class="flex items-center mb-4 text-lg font-semibold text-gray-900"
              >
                <User class="w-5 h-5 mr-2" />
                L'Employé
              </h3>
              <div class="space-y-2 text-sm">
                <div>
                  <span class="font-medium text-gray-700">Nom complet:</span>
                  <span class="ml-2 text-gray-900">
                    {{ contractData?.account?.firstName }}
                    {{ contractData?.account?.lastName }}
                  </span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Email:</span>
                  <span class="ml-2 text-gray-900">
                    {{
                      contractData?.account?.email ||
                      `${contractData?.account?.firstName?.toLowerCase()}.${contractData?.account?.lastName?.toLowerCase()}@email.com`
                    }}
                  </span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Téléphone:</span>
                  <span class="ml-2 text-gray-900">{{
                    contractData?.account?.phoneNumber
                  }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700"
                    >Date de naissance:</span
                  >
                  <span class="ml-2 text-gray-900">{{
                    formatDate(contractData?.account?.dob)
                  }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Adresse:</span>
                  <span class="ml-2 text-gray-900">
                    {{ contractData?.account?.address?.title }},
                    {{ contractData?.account?.city }},
                    {{ contractData?.account?.country }}
                  </span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Langues:</span>
                  <span class="ml-2 text-gray-900">
                    {{ contractData?.account?.firstLangage }},
                    {{ contractData?.account?.secondLangage }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Description du contrat -->
          <div class="mb-8">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">
              Description du Contrat
            </h3>
            <div class="p-6 rounded-lg bg-gray-50">
              <p class="leading-relaxed text-gray-700 whitespace-pre-wrap">
                {{
                  processContractText(contractData?.contract?.textDescription)
                }}
              </p>
            </div>
          </div>

          <!-- Articles et clauses -->
          <div
            class="space-y-8"
            v-if="contractData?.contract?.articlesAndClauses?.length > 0"
          >
            <h3 class="text-lg font-semibold text-gray-900">
              Articles et Clauses
            </h3>

            <div
              v-for="(clause, index) in contractData?.contract
                ?.articlesAndClauses"
              :key="index"
              class="p-6 pl-6 bg-white border-l-4 border-[#db147f]"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="flex items-center justify-center w-8 h-8 bg-[#db147f] rounded-full"
                >
                  <FileText class="w-4 h-4 text-white" />
                </div>
                <h4 class="text-lg font-semibold text-gray-900">
                  Article {{ index + 1 }} - {{ clause.title }}
                </h4>
              </div>

              <div class="space-y-3 leading-relaxed text-gray-700">
                <p class="whitespace-pre-wrap">
                  {{ processContractText(clause.text) }}
                </p>

                <ul
                  v-if="clause.items && clause.items.length > 0"
                  class="ml-4 space-y-2 list-disc list-inside"
                >
                  <li
                    v-for="(item, itemIndex) in clause.items"
                    :key="itemIndex"
                    class="text-gray-600"
                  >
                    {{ processContractText(item) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Section des signatures -->
          <div class="pt-8 mt-12 border-t-2 border-gray-200">
            <h3 class="mb-6 text-lg font-semibold text-center text-gray-900">
              Signatures
            </h3>

            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <!-- Signature de l'entreprise -->
              <div class="text-center">
                <h4 class="mb-2 font-medium text-gray-900">
                  Pour l'Entreprise:
                </h4>
                <p class="mb-1 text-gray-700">
                  {{ companyInfo.representative }}
                </p>
                <p class="mb-4 text-sm text-gray-600">Représentant Autorisé</p>
                <div
                  class="flex items-center justify-center h-24 border-2 border-green-300 rounded-lg bg-green-50"
                >
                  <div class="text-center">
                    <span
                      v-if="!contractData.contract.company.admin.signatures[0]"
                      class="italic text-gray-500"
                      >Signature Entreprise</span
                    >
                    <div
                      v-else
                      class="mb-1 text-2xl"
                      :style="{
                        fontFamily:
                          contractData.contract.company.admin.signatures[0]
                            .font,
                      }"
                    >
                      {{
                        contractData.contract.company.admin.signatures[0]?.text
                      }}
                    </div>
                    <div class="mt-1">
                      <span class="text-xs text-green-600"
                        >✓ Signé électroniquement</span
                      >
                    </div>
                  </div>
                </div>
                <p class="mt-2 text-xs text-gray-500">
                  Signé le {{ formatDate(contractData?.createdAt) }}
                </p>
              </div>

              <!-- Signature de l'employé -->
              <div class="text-center">
                <h4 class="mb-2 font-medium text-gray-900">L'Employé:</h4>
                <p class="mb-1 text-gray-700">
                  {{ contractData?.account?.firstName }}
                  {{ contractData?.account?.lastName }}
                </p>
                <p class="mb-4 text-sm text-gray-600">Lu et approuvé</p>
                <div
                  class="flex items-center justify-center h-24 border-2 border-green-300 rounded-lg bg-green-50"
                >
                  <div class="text-center">
                    <div
                      class="mb-1 text-2xl"
                      :style="{ fontFamily: contractData?.signature?.font }"
                    >
                      {{ contractData?.signature?.text }}
                    </div>
                    <span class="text-xs text-green-600"
                      >✓ Signé électroniquement</span
                    >
                  </div>
                </div>
                <p class="mt-2 text-xs text-gray-500">
                  Signé le {{ formatDate(contractData?.createdAt) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Pied de page du contrat -->
          <div class="pt-8 text-center border-t border-gray-200">
            <p class="text-sm text-gray-600">
              Ce contrat a été signé électroniquement le
              {{ formatDate(contractData?.createdAt) }}
            </p>
            <p class="mt-2 text-xs text-gray-500">
              Document généré automatiquement - Référence:
              {{ contractData?.reference }}
            </p>
          </div>
        </div>
      </div>

      <!-- Métadonnées du contrat -->
      <div
        class="p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Informations du Contrat
        </h3>
        <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <div>
            <span class="font-medium text-gray-700">ID du Contrat:</span>
            <span class="ml-2 text-gray-900">{{
              contractData?.contract?.id
            }}</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Statut:</span>
            <span class="ml-2 font-medium text-green-600">Signé et Actif</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">Date de signature:</span>
            <span class="ml-2 text-gray-900">{{
              formatDate(contractData?.createdAt)
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- État vide (aucune donnée trouvée) -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <div class="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
        <div class="w-16 h-16 mx-auto mb-4 text-gray-400">
          <FileText class="w-full h-full" />
        </div>
        <h3 class="mb-2 text-lg font-semibold text-gray-900">
          Contrat introuvable
        </h3>
        <p class="mb-4 text-gray-600">
          Le contrat demandé n'existe pas ou n'est plus disponible.
        </p>
        <button
          @click="goBack"
          class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Retour
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  CheckCircle,
  Download,
  Building2,
  User,
  FileText,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import AppModal from "@/components/globales/AppModal.vue";

// Composables
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

// Reactive data
const isLoading = ref(false);
const contractData = ref(null);
const hasError = ref(false); // Renommé pour éviter le conflit
const errorMessage = ref("");

// Computed properties
const companyInfo = computed(() => ({
  name:
    contractData.value?.contract?.company?.activeDetails?.name ||
    "Entreprise non spécifiée",
  location: `${
    contractData.value?.contract?.company?.activeDetails?.city || ""
  }, ${contractData.value?.contract?.company?.activeDetails?.country || ""}`,
  representative: `${
    contractData.value?.contract?.company?.admin?.firstName || ""
  } ${contractData.value?.contract?.company?.admin?.lastName || ""}`,
}));

// Methods
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const processContractText = (text) => {
  if (!text || typeof text !== "string") return text;

  return text.replace(/\{\{([^}]+)\}\}/g, (match, placeholder) => {
    const key = placeholder.trim();

    const fieldMapping = {
      UserEmail:
        contractData.value?.account?.email ||
        `${contractData.value?.account?.firstName?.toLowerCase()}.${contractData.value?.account?.lastName?.toLowerCase()}@email.com`,
      AccountFirstName: contractData.value?.account?.firstName,
      AccountLastName: contractData.value?.account?.lastName,
      AccountPhoneNumber: contractData.value?.account?.phoneNumber,
      AccountCountry: contractData.value?.account?.country,
      AccountCity: contractData.value?.account?.city,
      AccountFirstLangage: contractData.value?.account?.firstLangage,
      AccountSecondLangage: contractData.value?.account?.secondLangage,
      CompanyName: contractData.value?.contract?.company?.activeDetails?.name,
      CompanyCity: contractData.value?.contract?.company?.activeDetails?.city,
      CompanyCountry:
        contractData.value?.contract?.company?.activeDetails?.country,
      AdminFirstName: contractData.value?.contract?.company?.admin?.firstName,
      AdminLastName: contractData.value?.contract?.company?.admin?.lastName,
    };

    return fieldMapping[key] || match;
  });
};

const downloadContract = async () => {
  isLoading.value = true;
  try {
    const routeUrl = window.location.href;
    const response = await fetch(
      `${auth.baseUrlApi}/cv_profiles/generate-pdf`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token.value}`,
        },
        body: JSON.stringify({ url: routeUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Erreur serveur lors de la génération du PDF");
    }

    const blob = await response.blob();
    const pdfUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `contrat-${
      contractData.value?.reference || "document"
    }.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(pdfUrl);
  } catch (err) {
    console.error("Erreur lors du téléchargement :", err);
    errorMessage.value = "Erreur lors du téléchargement du PDF";
    // Optionnel: afficher une notification d'erreur
  } finally {
    isLoading.value = false;
  }
};

const fetchContractData = async () => {
  isLoading.value = true;
  hasError.value = false;
  errorMessage.value = "";

  try {
    const response = await auth.api(
      "GET",
      `/agreements/${route.params.agrementId}/by_reference`,
      null,
      false
    );

    if (response.success && response.data) {
      contractData.value = response.data;
      console.log("Données du contrat chargées:", response.data);
    } else {
      throw new Error(response.message || "Contrat non trouvé");
    }
  } catch (err) {
    // Renommé de 'error' à 'err'
    console.error("Erreur lors du chargement du contrat:", err);
    hasError.value = true;
    errorMessage.value =
      err.message || "Impossible de charger le contrat. Veuillez réessayer.";
  } finally {
    isLoading.value = false;
  }
};

const retryFetch = async () => {
  await fetchContractData();
};

const goBack = () => {
  router.go(-1); // Retour à la page précédente
};

// Lifecycle
onMounted(async () => {
  await fetchContractData();
});
</script>

<style scoped>
.contract-document {
  font-family: "Times New Roman", serif;
}

@media print {
  .print\:hidden {
    display: none !important;
  }

  .bg-gray-50 {
    background: white !important;
  }

  .shadow-lg {
    box-shadow: none !important;
  }
}

@import url("https://fonts.googleapis.com/css2?family=Sacramento&display=swap");
</style>
