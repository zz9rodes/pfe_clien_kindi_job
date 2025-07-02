<template>
  <div class="w-full p-6 py-4">
    <AppModal
      @closeModal="toggleOpenModal"
      :isOpen="isModalOpen"
      :isLoader="false"
    >
      <AcceptSignContractModal 
        @close="toggleOpenModal()" 
        :contractId="contractId"
        :accountId="accountId"
        :reference="generateReference()"
      />
    </AppModal>

    <div class="max-w-4xl mx-auto avatar">
      <!-- Contract Document -->
      <div class="overflow-auto bg-white rounded-lg shadow-lg">
        <!-- Document Content -->
        <div class="p-8 space-y-6">
          <!-- Title and Reference -->
          <div class="mb-8 text-center">
            <h2 class="mb-2 text-2xl font-bold text-gray-900">
              {{ processText(title) }}
            </h2>
            <p class="text-sm text-gray-500">Ref: {{ generateReference() }}</p>
          </div>

          <!-- Company Info -->
          <div class="mb-8 text-right">
            <div class="text-sm text-gray-600">
              <p class="font-bold">
                {{ processText(companyData.CompanyName) }}
              </p>
              <p>
                {{ processText(companyData.city) }},
                {{ processText(companyData.country) }}
              </p>
            </div>
          </div>

          <!-- Contract Description -->
          <div class="mb-8">
            <h3 class="mb-4 font-semibold text-gray-900">
              Between the undersigned:
            </h3>
            <div class="space-y-4 leading-relaxed text-gray-700">
              <p>
                <strong>{{ processText(companyData.CompanyName) }}</strong
                >, Register By
                <strong>{{ processText(companyData.RegisteredNumber) }}</strong>
                represented by the authorized representative, acting in the
                capacity of authorized signatory, duly authorized for the
                purposes hereof,
              </p>
              <p>
                Hereinafter referred to as
                <strong>{{ companyData.admin.name }}</strong> ,
              </p>
              <p>On the one hand,</p>
              <p>And</p>
            </div>
          </div>

          <!-- Employee Information Display -->
          <div class="p-4 mb-8 rounded-lg bg-gray-50">
            <h4 class="mb-3 font-semibold text-gray-900">
              Employee Information:
            </h4>
            <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <span class="font-medium text-gray-700">Full Name:</span>
                <span class="ml-2 text-gray-900"
                  >{{ UserData.firstName }} {{ UserData.lastName }}</span
                >
              </div>
              <div>
                <span class="font-medium text-gray-700">Email:</span>
                <span class="ml-2 text-gray-900">{{ UserData.email }}</span>
              </div>
              <div v-if="UserData.phoneNumber">
                <span class="font-medium text-gray-700">Phone:</span>
                <span class="ml-2 text-gray-900">{{
                  UserData.phoneNumber
                }}</span>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <p class="text-gray-700">
              Hereinafter referred to as
              <strong>{{ UserData.firstName }} {{ UserData.lastName }}</strong>
              ,
            </p>
            <p class="mt-4 text-gray-700">On the other hand,</p>
            <p class="mt-4 text-gray-700">
              It has been agreed and stipulated as follows:
            </p>
          </div>

          <div class="mb-8">
            <p class="text-gray-700">{{ processText(description) }}</p>
          </div>

          <!-- Articles -->
          <div class="space-y-8">
            <div
              v-for="(clause, index) in clauses"
              :key="index"
              class="border-l-4 border-[#db147f] pl-6"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-6 h-6 bg-[#db147f] rounded-full flex items-center justify-center"
                >
                  <FileTextIcon class="w-3 h-3 text-white" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900">
                  Article {{ index + 1 }} - {{ processText(clause.title) }}
                </h3>
              </div>

              <div class="space-y-3 leading-relaxed text-gray-700">
                <p class="whitespace-pre-wrap">
                  {{ processText(clause.text) }}
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
                    {{ processText(item) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Contract Footer -->
          <div class="pt-8 mt-12 border-t border-gray-200">
            <p class="mb-8 text-center text-gray-600">
              Done on {{ formatDate(new Date()) }}, in two original copies.
            </p>

            <!-- Signatures -->
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <!-- Employer Signature -->
              <div class="text-center">
                <p class="mb-2 font-medium text-gray-900">
                  For {{ processText(companyData.CompanyName) }}:
                </p>
                <p class="mb-1 text-gray-700">Authorized Representative</p>
                <p class="mb-4 text-sm text-gray-600">Authorized Signatory</p>
                <div
                  class="flex items-center justify-center h-24 p-6 border-2 border-gray-300 border-dashed rounded-lg"
                >
                  <span class="italic text-gray-400">Company Signature</span>
                </div>
              </div>

              <!-- Employee Signature -->
              <div class="text-center">
                <p class="mb-2 font-medium text-gray-900">The Employee:</p>
                <p class="mb-1 text-gray-700">
                  {{ UserData.firstName }} {{ UserData.lastName }}
                </p>
                <p class="mb-4 text-sm text-gray-600">Read and approved</p>
                <div
                  class="relative flex items-center justify-center h-24 p-6 border-2 border-gray-300 border-dashed rounded-lg"
                >
                  <button
                    @click="toggleOpenModal"
                    :class="!isLive ? 'cursor-not-allowed ' : ' cursor-pointer'"
                    class="w-full italic text-center text-gray-600 bg-transparent border outline-none"
                  >
                    ✍️ Sign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed ,onMounted} from "vue";
import { FileTextIcon } from "lucide-vue-next";
import AppModal from "@/components/globales/AppModal.vue";
import AcceptSignContractModal from "@/components/Contract/AcceptSignContractModal.vue";
import { useAuthStore } from '@/stores/auth';
import { useRoute,useRouter } from "vue-router";

const props = defineProps({
  clauses: {
    type: Array,
    required: true,
    default: () => [],
  },
  isLive: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  companyData: {
    type: Object,
    default: () => ({
      CompanyName: "",
      city: "",
      country: "",
      languageAttachment: "",
      RegisteredNumber: "87233-ujds-88922",
      admin: Object,
    }),
  },
  UserData: {
    type: Object,
    required: true,
    default: () => ({
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    }),
  },
  contractId: {
    type: String,
    default: "",
  },
  accountId: {
    type: String,
    default: "",
  },
});

const employeeSignature = ref("");
const isModalOpen = ref(false);
const route=useRoute()

// Process text by replacing placeholders with values
const processText = (text) => {
  if (!text || typeof text !== "string") return text;

  return text.replace(/\{\{([^}]+)\}\}/g, (match, placeholder) => {
    const key = placeholder.trim();

    // Si isLive est false, on retourne juste le placeholder
    if (!props.isLive) {
      return match;
    }

    // Mapping complet des champs requis selon utils/index.ts
    const fieldMapping = {
      // Champs utilisateur
      UserEmail: props.UserData.email,
      AccountFirstName: props.UserData.firstName,
      AccountLastName: props.UserData.lastName,
      AccountPhoneNumber: props.UserData.phoneNumber,
      AccountAvatarUrl: props.UserData.avatarUrl,
      AccountCountry: props.UserData.country,
      AccountCity: props.UserData.city,
      AccountFirstLangage: props.UserData.firstLangage,
      AccountSecondLangage: props.UserData.secondLangage,

      // Champs entreprise
      CompanieName: props.companyData.CompanyName,
      CompanyName: props.companyData.CompanyName,
      CompanyCity: props.companyData.city,
      CompanyCountry: props.companyData.country,
      CompanyRegisteredNumber: props.companyData.RegisteredNumber,

      // Champs admin
      AdminName: props.companyData.admin?.name,
      AdminFirstName: props.companyData.admin?.firstName,
      AdminLastName: props.companyData.admin?.lastName,
    };

    // Vérifier d'abord dans le mapping des champs
    if (
      fieldMapping[key] !== undefined &&
      fieldMapping[key] !== null &&
      fieldMapping[key] !== ""
    ) {
      return fieldMapping[key];
    }

    // Vérifier dans UserData directement
    if (
      props.UserData[key] !== undefined &&
      props.UserData[key] !== null &&
      props.UserData[key] !== ""
    ) {
      return props.UserData[key];
    }

    // Vérifier dans companyData directement
    if (
      props.companyData[key] !== undefined &&
      props.companyData[key] !== null &&
      props.companyData[key] !== ""
    ) {
      return props.companyData[key];
    }

    // Si aucune valeur n'est trouvée, retourner le placeholder original
    return match;
  });
};

const toggleOpenModal = () => {
  if (props.isLive) {
    isModalOpen.value = !isModalOpen.value;
  }
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const generateReference = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `CTR-${year}-${month}-${Math.random()
    .toString(36)
    .substr(2, 6)
    .toUpperCase()}`;
};

const isFormValid = computed(() => {
  // Check if essential UserData fields are filled
  return (
    props.UserData.firstName &&
    props.UserData.lastName &&
    props.UserData.email &&
    employeeSignature.value
  );
});

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

// Ajout des variables pour les props enfants
const auth = useAuthStore();

// contractId : slug du contrat (à adapter selon la structure de tes données)
const contractId = route.params.contractId
// accountId : slug du compte utilisateur courant
const accountId = computed(() => auth.user?.account?.slug || '');

</script>

<style scoped>
/* Custom styles for the contract document */
.contract-document {
  font-family: "Times New Roman", serif;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }

  .bg-gray-100 {
    background: white !important;
  }

  .shadow-lg {
    box-shadow: none !important;
  }
}
</style>
