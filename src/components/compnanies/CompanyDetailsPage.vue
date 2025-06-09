<template>
  <div class="w-full">
    <AppModal
      @closeModal="toggleOpenModal"
      :isOpen="isModalOpen"
      :isLoader="false"
    >
      <div
        v-if="!isModalForApproved"
        class="w-full max-w-md p-6 mx-4 bg-white rounded-xl"
      >
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Rejeter la demande
        </h3>
        <p class="mb-6 text-gray-600">
          Êtes-vous sûr de vouloir rejeter cette demande ? Cette action est
          irréversible.
        </p>
          <div class="mb-4 ">
            <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="desapproveMessage"
              placeholder="Décrivez les raisons du Reject de cette Version"
              rows="3"
              class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            ></textarea>
          </div>
        <div class="flex space-x-3">
          <button
            @click="toggleOpenModal"
            class="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            @click="HandleConfirmReject"
            class="flex-1 px-4 py-2 font-medium bg-[#db147f] text-white transition-colors duration-200 rounded-lg"
          >
            Rejeter
          </button>
        </div>
      </div>
      <div v-else class="w-full max-w-md p-6 mx-4 bg-white rounded-xl">
        <h3 class="mb-4 text-lg font-semibold text-gray-900">
          Approuver l'entreprise
        </h3>
        <p class="mb-6 text-gray-600">
          Êtes-vous sûr de vouloir approuver cette entreprise ? Elle sera
          activée et pourra publier des offres
        </p>
        <div class="flex space-x-3">
          <button
            @click="toggleOpenModal"
            class="flex-1 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            @click="HandleConfirmApproved"
            class="flex-1 bg-[#db147f] px-4 py-2 font-medium text-white transition-colors duration-200 rounded-lg"
          >
            Approuver
          </button>
        </div>
      </div>
    </AppModal>
    <AppModal
      @closeModal="toggleOpenLoaderModal"
      :isOpen="isLoading"
      :isLoader="true"
    />
    <!-- Header avec image de couverture -->
    <div class="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
      <img
        v-if="company.coverUrl"
        :src="company.coverUrl"
        :alt="`Couverture de ${company.name}`"
        class="object-cover w-full h-full"
      />
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>

      <!-- Navigation de retour -->
      <div class="absolute top-6 left-6">
        <button
          @click="goBack"
          class="flex items-center px-4 py-2 text-white transition-all duration-200 bg-white rounded-lg bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour
        </button>
      </div>

      <!-- Actions d'approbation -->
      <div class="absolute flex space-x-3 top-6 right-6">
        <button
          @click="toggleOpenModal"
          class="px-6 py-2 font-medium text-white transition-colors duration-200 bg-gray-400 rounded-lg"
        >
          Rejeter
        </button>
        <button
          @click="() => toggleOpenModal('a')"
          class="px-6 py-2 font-medium text-white transition-colors duration-200 bg-[#db147f] rounded-lg"
        >
          Approuver
        </button>
      </div>
    </div>

    <div class="relative z-10 max-w-6xl px-6 mx-auto -mt-20 mb-[50px]">
      <!-- Profil de l'entreprise -->
      <div class="p-8 mb-8 bg-white shadow-lg rounded-xl">
        <div class="flex items-start space-x-6">
          <!-- Avatar de l'entreprise -->
          <div class="flex-shrink-0">
            <img
              :src="company.avatarUrl || '/placeholder-company.png'"
              :alt="`Logo de ${company.name}`"
              class="object-cover w-24 h-24 border-4 border-white shadow-lg rounded-xl"
            />
          </div>

          <!-- Informations principales -->
          <div class="flex-1">
            <div class="flex items-center mb-2 space-x-3">
              <h1 class="text-3xl font-bold text-gray-900">
                {{ company.name }}
              </h1>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  company.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{ company.isActive ? "Actif" : "En attente" }}
              </span>
            </div>

            <div class="flex items-center mb-4 space-x-4 text-gray-600">
              <span class="flex items-center">
                <Building class="w-5 h-5 mr-4" />
                {{ company.industry }}
              </span>
              <span class="flex items-center">
                <MapPinIcon class="w-5 h-5 mr-4" />
                {{ company.city }}, {{ company.country }}
              </span>
            </div>

            <p class="leading-relaxed text-gray-700">
              {{ company.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Grille d'informations détaillées -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Informations de contact -->
        <div class="p-6 bg-white shadow-lg rounded-xl">
          <h2
            class="flex items-center mb-6 text-xl font-semibold text-gray-900"
          >
            <Building class="w-5 h-5 mr-4 text-[#db147f]" />
            Informations de contact
          </h2>

          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <Mail class="w-4 h-4 mr-4" />
              <div>
                <p class="text-sm text-gray-500">Email</p>
                <a :href="`mailto:${company.email}`" class="text-[#db147f]">
                  {{ company.email }}
                </a>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <Phone class="w-4 h-4 mr-4" />
              <div>
                <p class="text-sm text-gray-500">Téléphone</p>
                <a :href="`tel:${company.phoneNumber}`" class="text-[#db147f]">
                  {{ company.phoneNumber }}
                </a>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <MapPinIcon class="w-4 h-4 mr-4" />
              <div>
                <p class="text-sm text-gray-500">Adresse</p>
                <p class="text-gray-900">{{ company.address }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-white shadow-lg rounded-xl">
          <h2
            class="flex items-center mb-6 text-xl font-semibold text-gray-900"
          >
            <svg
              class="w-6 h-6 mr-3 text-[#db147f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Admin Details
          </h2>

          <div class="space-y-4">
            <img
              :src="admin.avatarUrl || '/placeholder-company.png'"
              :alt="`Logo de ${admin.name}`"
              class="object-cover w-24 h-24 border-4 border-white shadow-lg rounded-xl"
            />

            <div>
              <p class="mb-1 text-sm text-gray-500">Full Name</p>
              <p class="text-gray-900">
                {{ admin.firstName }} {{ admin.lastName }}
              </p>
            </div>

            <div>
              <p class="mb-1 text-sm">
                <MapPinHouseIcon class="w-4 h-4" />
              </p>
              <p class="mt-2 text-gray-900 line-clamp-1">
                {{ admin?.address?.title }}
              </p>
            </div>
          </div>
        </div>

        <!-- Informations légales -->
        <div class="p-6 bg-white shadow-lg rounded-xl">
          <h2
            class="flex items-center mb-6 text-xl font-semibold text-gray-900"
          >
            <svg
              class="w-6 h-6 mr-3 text-[#db147f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Informations légales
          </h2>

          <div class="space-y-4">
            <div>
              <p class="mb-1 text-sm text-gray-500">Statut social</p>
              <p class="font-medium text-gray-900">
                {{ company.socialStatus }}
              </p>
            </div>

            <div>
              <p class="mb-1 text-sm text-gray-500">Numéro d'enregistrement</p>
              <p class="font-mono text-gray-900">
                {{ company.registrationNumber }}
              </p>
            </div>

            <div>
              <p class="mb-1 text-sm text-gray-500">Langue principale</p>
              <p class="text-gray-900">{{ company.firstLangage }}</p>
            </div>

            <div v-if="company.certificateOfIncorporation">
              <p class="mb-2 text-sm text-gray-500">
                Certificat d'incorporation
              </p>
              <a
                :href="company.certificateOfIncorporation"
                target="_blank"
                class="inline-flex items-center px-4 py-2 text-blue-700 transition-colors duration-200 rounded-lg bg-blue-50 hover:bg-blue-100"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Télécharger le certificat
              </a>
            </div>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="p-6 bg-white shadow-lg rounded-xl">
          <h2
            class="flex items-center mb-6 text-xl font-semibold text-gray-900"
          >
            <svg
              class="w-6 h-6 mr-3 text-[#db147f]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Actions rapides
          </h2>

          <div class="space-y-3">
            <button
              @click="() => toggleOpenModal('a')"
              class="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors duration-200 bg-[#db147f] rounded-lg"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Approuver l'entreprise
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppModal from "../globales/AppModal.vue";
import {
  Building,
  Mail,
  MapPinHouseIcon,
  MapPinIcon,
  Phone,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const isModalOpen = ref(false);
const isLoading = ref(false);

const toggleOpenModal = (cause = "r") => {
  isModalForApproved.value = cause == "a" ? true : false;
  isModalOpen.value = !isModalOpen.value;
};

const toggleOpenLoaderModal = () => {
  isLoading.value = !isLoading.value;
};

// Reactive data
const company = ref({});
const admin = ref({});
const loading = ref(true);
const showConfirmModal = ref(false);
const confirmAction = ref("");
const isModalForApproved = ref(false);

const desapproveMessage=ref("")


const goBack = () => {
  router.go(-1);
};

const approveCompany = () => {
  showConfirmModal.value = true;
  if (confirmAction === "approve") {
  }
};

const rejectCompany = () => {
  confirmAction.value = "reject";
  showConfirmModal.value = true;
};

const cancelAction = () => {
  showConfirmModal.value = false;
  confirmAction.value = "";
};

const HandleConfirmReject = () => {
  console.log("retourner ici dans le reject");

  toggleOpenLoaderModal();

  const payload = {
    reason: desapproveMessage.value,
  };

  console.log(company)

  try {
    const response = auth.api("post", `/company_request/${company.value.slug}/desapproved`, payload, true);
    console.log(response);
    if (response.success) {
        toggleOpenLoaderModal();
        toggleOpenModal()
        goBack()
    }
  } catch (error) {
    console.log(error);
    toggleOpenLoaderModal();
    toggleOpenModal()
    goBack()

  } finally {

  }
};

const HandleConfirmApproved = async () => {
  toggleOpenLoaderModal();
  try {
    const payload = {
      slug_request: company.value.slug,
    };

    const response = await auth.api("post", "/companies/create", payload, true);
    if (response.success) {
          toggleOpenLoaderModal();
    toggleOpenModal()
    goBack()
    }
  } catch (error) {
    console.log(error);
        toggleOpenLoaderModal();
    toggleOpenModal()
    goBack()
  } 
};

const fetchCompanyDetails = async () => {
  toggleOpenLoaderModal();
  try {
    const companyId = route.params.companyId;
    const response = await auth.api(
      "GET",
      `/company_request/${companyId}`,
      {},
      false
    );

    if (response.success && response.data) {
      company.value = response.data.request;
      admin.value = response.data.account;
    } else {
      goBack();
    }
  } catch (error) {
    console.error("Error fetching company details:", error);
    goBack();
  } finally {
    toggleOpenLoaderModal();
  }
};

onMounted(() => {
  fetchCompanyDetails();
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
