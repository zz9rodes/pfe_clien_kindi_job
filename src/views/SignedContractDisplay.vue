<template>
  <div class="w-full min-h-screen bg-gray-50">
    <AppModal :isOpen="isLoading" :isLoader="true"></AppModal>

    <div class="container px-4 py-8 mx-auto">
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

      <div class="overflow-hidden bg-white rounded-lg shadow-lg">
        <div class="p-8 space-y-6" id="contract-content">
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

          <div class="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
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
                  class="flex items-center justify-center w-8 h-8 rounded-full"
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

          <!-- Signature Section -->
          <div class="pt-8 mt-12 border-t-2 border-gray-200">
            <h3 class="mb-6 text-lg font-semibold text-center text-gray-900">
              Signatures
            </h3>

            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <!-- Company Signature -->
              <div class="text-center">
                <h4 class="mb-2 font-medium text-gray-900">
                  Pour l'Entreprise:
                </h4>
                <p class="mb-1 text-gray-700">
                  {{ companyInfo.representative }}
                </p>
                <p class="mb-4 text-sm text-gray-600">Représentant Autorisé</p>
                <div
                  class="flex items-center justify-center h-24 border-2 border-gray-300 rounded-lg bg-gray-50"
                >
                  <span class="italic text-gray-500">Signature Entreprise</span>
                </div>
                <p class="mt-2 text-xs text-gray-500">
                  Signé le {{ formatDate(contractData?.createdAt) }}
                </p>
              </div>

              <!-- Employee Signature -->
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

          <!-- Contract Footer -->
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

      <!-- Contract Metadata -->
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
  Calendar,
  MapPin,
  Phone,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import AppModal from "@/components/globales/AppModal.vue";

// Props
const props = defineProps({
  contractId: {
    type: String,
    required: false,
  },
});

// Reactive data
const isLoading = ref(false);
const contractData = ref(null);
const auth = useAuthStore();
const route = useRoute();

const toggleOpenModal=()=>{
    isLoading.value=!isLoading.value
}

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

    // Mapping des champs avec les données du contrat signé
    const fieldMapping = {
      // Données de l'employé (account)
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
      AccountAvatarUrl: contractData.value?.account?.avatarUrl,

      // Données de l'entreprise
      CompanyName: contractData.value?.contract?.company?.activeDetails?.name,
      CompanyCity: contractData.value?.contract?.company?.activeDetails?.city,
      CompanyCountry:
        contractData.value?.contract?.company?.activeDetails?.country,
      CompanyRegisteredNumber:
        contractData.value?.contract?.company?.activeDetails
          ?.registrationNumber,

      // Données de l'admin de l'entreprise
      AdminName: `${
        contractData.value?.contract?.company?.admin?.firstName || ""
      } ${contractData.value?.contract?.company?.admin?.lastName || ""}`,
      AdminFirstName: contractData.value?.contract?.company?.admin?.firstName,
      AdminLastName: contractData.value?.contract?.company?.admin?.lastName,
    };

    return fieldMapping[key] || match;
  });
};



const downloadContract = async () => {
  toggleOpenModal();
  try {
    // URL de la page à convertir en PDF
    const routeUrl = window.location.href;

    console.log(`${auth.baseUrlApi}/cv_profiles/generate-pdf`);
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

    // console.log(response)

    if (!response.ok) {
      throw new Error("Erreur serveur");
    }

    const blob = await response.blob();

    const pdfUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "generated.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(pdfUrl);
  } catch (err) {
    console.error("Erreur lors du téléchargement :", err);
  }
  toggleOpenModal();
};



const fetchContractData = async () => {
  isLoading.value = true;

  try {
    const response = await auth.api(
      "GET",
      `/agreements/${route.params.agrementId}/by_reference`,
      null,
      false
    );

    if (response.success) {
      console.log("Données du contrat chargées:", response.data);
      contractData.value = response.data;
      console.log(response.data);
    }
  } catch (error) {
    console.error("Erreur lors du chargement du contrat:", error);
  }
  isLoading.value = false;
};

// Lifecycle
onMounted(async () => {
  await fetchContractData();
});
</script>

<style scoped>
/* Custom styles for the signed contract */
.contract-document {
  font-family: "Times New Roman", serif;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }

  .bg-gray-50 {
    background: white !important;
  }

  .shadow-lg {
    box-shadow: none !important;
  }
}

/* Signature font styles */
@import url("https://fonts.googleapis.com/css2?family=Sacramento&display=swap");
</style>