<template>
  <div>
    <header
      class="fixed left-0 right-0 z-50 flex items-center justify-between w-full p-0 px-6 py-2 bg-white border-b border-gray-200 print:hidden to50 h- bg-opacity-90 backdrop-blur-sm"
    >
      <button
        @click="downloadPDF"
        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm top-4 right-4 hover:bg-gray-50 hover:shadow-md print:hidden"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          ></path>
        </svg>
        Imprimer
      </button>
    </header>
    <div class="w-full min-h-screen pt-5 bg-gray-50">
      <!-- Loading Modal -->
      <AppModal :isOpen="loading" :isLoader="true" />

      <!-- Error State -->
      <div v-if="error" class="flex items-center justify-center min-h-screen">
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
          <p class="mb-4 text-gray-600">{{ error }}</p>
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

      <!-- Contract Preview -->
      <div
        v-else-if="contractData"
        class="flex items-center justify-center py-8"
      >
        <ContractPreview
          :description="contractData.textDescription"
          :clauses="processedClauses"
          :title="contractData.title"
          :companyData="companyData"
          :UserData="userData"
          :isLive="true"
        />
        {{ isLive }}
      </div>

      <!-- Empty State -->
      <div
        v-else-if="!loading"
        class="flex items-center justify-center min-h-screen"
      >
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useContractStore } from "@/stores/useContractStore";
import ContractPreview from "./ContractPreview.vue";
import AppModal from "@/components/globales/AppModal.vue";

// Props
const props = defineProps({
  contractId: {
    type: [String, Number],
    default: null,
  },
});

// Composables
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const contractStore = useContractStore();

// Reactive state - Optimized declarations
const loading = ref(false);
const error = ref(null);
const contractData = ref(null);

// Static user data - could be moved to a composable or store
const userData = ref({
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  avatarUrl: "",
  country: "",
  city: "",
  firstLangage: "",
  secondLangage: "",
});

// Mettre à jour userData avec les données de l'utilisateur connecté
const updateUserData = () => {
  if (auth.user) {
    userData.value = {
      email: auth.user.email || "",
      firstName: auth.user.account.firstName || "",
      lastName: auth.user.account.lastName || "",
      phoneNumber: auth.user.account.phoneNumber || "",

      
      avatarUrl: auth.user.account.avatarUrl || "",
      country: auth.user.account.country || "",
      city: auth.user.account.city || "",
      firstLangage: auth.user.account.firstLangage || "",
      secondLangage: auth.user.account.secondLangage || "",
    };
  }
};

const processedClauses = computed(() => {
  if (!contractData.value?.articlesAndClauses) return [];

  return contractData.value.articlesAndClauses
    .filter((article) => article?.title && article?.text)
    .map((article) => ({
      title: article.title,
      text: article.text,
      items: article.items?.filter((item) => item?.trim()) || [],
    }));
});

const companyData = computed(() => {
  if (!contractData.value?.company) return null;

  const company = contractData.value.company;
  const activeDetails = company.activeDetails || {};
  const admin = company.admin || {};

  return {
    CompanyName: activeDetails.name || "Nom non disponible",
    city: activeDetails.city || "",
    country: activeDetails.country || "",
    RegisteredNumber: activeDetails.registrationNumber || "",
    admin: {
      name:
        admin.firstName && admin.lastName
          ? `${admin.firstName} ${admin.lastName}`
          : "Administrateur",
    },
  };
});

// Methods - Optimized async handling

const toggleOpenModal = () => {
  loading.value = !loading.value;
};

const fetchContractDetails = async () => {
  const contractId = route.params.contractId || props.contractId;
  console.log(contractId);
  if (!contractId) {
    error.value = "Paramètres de contrat manquants";
    return;
  }

  loading.value = true;

  console.log("dans la fucntion qui fecth");

  try {
    const response = await auth.api(
      "GET",
      `/contracts/${contractId}`,
      null,
      false
    );

    console.log(response);

    if (!response.success) {
      throw new Error(response.error || "Erreur lors du chargement du contrat");
    }

    contractData.value = {
      ...response.data,
      articlesAndClauses: response.data.articlesAndClauses || [],
      requiredField: response.data.requiredField || [],
    };

    // Update store if needed
    contractStore.setContract(response.data);
  } catch (err) {
    console.error("Error fetching contract details:", err);
    error.value = err.message || "Une erreur est survenue lors du chargement";
  } finally {
    loading.value = false;
  }
};

const downloadPDF = async () => {
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
const retryFetch = () => {
  fetchContractDetails();
};

const goBack = () => {
  const companyId = route.params.companyId;
  if (companyId) {
    router.push({ name: "contracts_list", params: { companyId } });
  } else {
    router.back();
  }
};

onMounted(() => {
  console.log("ici on essaie de charger les datas");
  updateUserData(); // Mettre à jour les données utilisateur
  fetchContractDetails();
  console.log(userData.value)
});

// Expose methods for testing or parent component access
defineExpose({
  fetchContractDetails,
  retryFetch,
  contractData,
  loading,
  error,
});
</script>

<style scoped>
.prose {
  line-height: 1.7;
}

.prose h1 {
  margin-bottom: 1rem;
}

.prose h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}


</style>