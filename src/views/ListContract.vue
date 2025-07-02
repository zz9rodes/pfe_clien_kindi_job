<template>
  <div class="w-full h-full bg-gray-50">
    <AppModal
      @closeModal="openUserModal"
      :isOpen="isModalOpen"
      :isLoader="false"
    >
      <div class="w-[90%] md:w-[70%]">
        <UserListModal
          :isOpen="openUserModal"
          :users="availableUser"
          :isLoading="isLoading"
          :allowMultipleSelection="allowMultiple"
          :selectButtonText="allowMultiple ? 'Ajouter' : 'Sélectionner'"
          @close="openUserModal"
          @viewAgreement="viewFullContract"
          @viewProfiles="viewUserProfile"
        />
      </div>
    </AppModal>
    <div class="p-6 mx-auto max-w-7xl">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Gestion des contrats</h1>
          <p class="mt-1 text-gray-600">
            Gérez vos contrats créés, envoyés et signés
          </p>
        </div>
        <button
          @click="createNewContract"
          class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
        >
          + Nouveau contrat
        </button>
      </div>

      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              @click="activeTab = tab.key"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.key
                  ? 'border-[#db147f] text-[#db147f]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              {{ tab.label }}
              <span
                :class="[
                  'ml-2 py-0.5 px-2 rounded-full text-xs',
                  activeTab === tab.key
                    ? 'bg-[#db147f] text-white'
                    : 'bg-gray-100 text-gray-600',
                ]"
              >
                {{ getContractCount(tab.key) }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <div class="flex items-center gap-4 mb-6">
        <div class="flex-1 max-w-md">
          <div class="relative">
            <SearchIcon
              class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un contrat..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
            />
          </div>
        </div>
      </div>

      <div v-if="filteredContracts.length === 0" class="py-12 text-center">
        <FileTextIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 class="mb-2 text-lg font-medium text-gray-900">
          {{ getEmptyStateMessage() }}
        </h3>
        <p class="mb-6 text-gray-500">
          {{ getEmptyStateDescription() }}
        </p>
        <button
          v-if="activeTab === 'all'"
          @click="createNewContract"
          class="px-4 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
        >
          Créer votre premier contrat
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="contract in filteredContracts"
          :key="contract.id"
          class="transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
        >
          <!-- Contract Card -->
          <div class="p-6">
            <!-- Header with status -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3
                  class="mb-2 text-lg font-semibold text-gray-900 line-clamp-2"
                >
                  {{ contract.title }}
                </h3>

                <div class="flex items-center gap-2 mb-2">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getStatusClasses(contract.isPublish),
                    ]"
                  >
                    {{ getStatusLabel(contract.isPublish) }}
                  </span>
                  <span
                    v-if="contract.agreements && contract.agreements.length > 0"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ contract.agreements.length }} signature(s)
                  </span>
                </div>
              </div>
              <div class="ml-4">
                <button
                  @click.stop="GoToviewUpdate(contract)"
                  class="p-1 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100"
                >
                  <Edit2Icon class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Description -->
            <p class="mb-4 text-sm text-gray-600 line-clamp-3">
              {{ contract.textDescription || "Aucune description disponible" }}
            </p>

            <!-- Articles count -->
            <div class="mb-4">
              <div class="flex items-center text-xs text-gray-500">
                <FileTextIcon class="w-3 h-3 mr-1" />
                {{
                  contract.articlesAndClauses
                    ? contract.articlesAndClauses.length
                    : 0
                }}
                article(s)
              </div>

              <!-- Required fields -->
              <div
                v-if="
                  contract.requiredField && contract.requiredField.length > 0
                "
                class="mt-2"
              >
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="field in contract.requiredField.slice(0, 3)"
                    :key="field"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700"
                  >
                    {{ field }}
                  </span>
                  <span
                    v-if="contract.requiredField.length > 3"
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-50 text-gray-600"
                  >
                    +{{ contract.requiredField.length - 3 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div
              class="flex items-center justify-between mb-4 text-xs text-gray-500"
            >
              <div class="flex items-center">
                <CalendarIcon class="w-3 h-3 mr-1" />
                {{ formatDate(contract.createdAt) }}
              </div>
              <div
                @click="activeAgreementUserModal(contract.agreements)"
                v-if="contract?.agreements?.length"
                class="flex items-center"
              >
                <UserIcon class="w-4 h-4" />
                <span class="text-xs text-gray-400"
                  >{{ contract.agreements.length }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <button
                @click.stop="GoToPreview(contract)"
                class="flex-1 px-3 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Voir détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  FileTextIcon,
  SearchIcon,
  CalendarIcon,
  MoreVerticalIcon,
  XIcon,
  Edit2Icon,
  UserIcon,
} from "lucide-vue-next";
import { useContractStore } from "@/stores/useContractStore";
import AppModal from "@/components/globales/AppModal.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import UserListModal from "@/components/globales/UserListModal.vue";

const contractStore = useContractStore();
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const isModalOpen = ref(false);
const isLoading = ref(false);
const allowMultiple = ref(false);

const availableUser=ref([])

const mockUsers = ref([
  {
    id: 14,
    slug: "7a396c27-ed03-483b-af21-af8fb3bfe418",
    firstName: "Neymar",
    lastName: "Junior Santos",
    phoneNumber: "657883392",
    dob: "2005-06-14T00:00:00.000Z",
    address: {
      title: "maneres baoybde",
      lat: 0,
      long: 0,
    },
    accountType: "personnal",
    country: "Cameroun",
    city: "Douala",
    avatarUrl: null,
    firstLangage: "Japonais",
    secondLangage: "Français",
    frontIdCard: "",
    backIdCard: "",
    createdAt: "2025-06-05T18:13:30.000+00:00",
    updatedAt: "2025-06-05T18:13:30.000+00:00",
    userId: 20,
  },
  {
    id: 15,
    slug: "8b497d38-fe04-594c-bg32-bg9gc4cge529",
    firstName: "Marie",
    lastName: "Dubois",
    phoneNumber: "698765432",
    dob: "1990-03-22T00:00:00.000Z",
    address: {
      title: "123 rue de la Paix",
      lat: 0,
      long: 0,
    },
    accountType: "business",
    country: "France",
    city: "Paris",
    avatarUrl: "/placeholder.svg?height=48&width=48",
    firstLangage: "Français",
    secondLangage: "Anglais",
    frontIdCard: "",
    backIdCard: "",
    createdAt: "2025-06-10T14:20:15.000+00:00",
    updatedAt: "2025-06-10T14:20:15.000+00:00",
    userId: 21,
  },
  // Ajoutez plus d'utilisateurs mockés si nécessaire
]);

const openUserModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const activeAgreementUserModal=(agreement)=>{
  console.log(agreement)
  availableUser.value=agreement

  openUserModal()
}

// Reactive data
const activeTab = ref("all");
const searchQuery = ref("");
const sortBy = ref("date");
const activeContractMenu = ref(null);

// Tabs configuration
const tabs = ref([
  { key: "all", label: "Tous les contrats" },
  { key: "published", label: "Publiés" },
  { key: "signed", label: "Signés" },
]);

// Contracts data
const contracts = ref([]);

// Computed properties
const filteredContracts = computed(() => {
  let filtered = contracts.value;

  // Filter by tab
  if (activeTab.value === "published") {
    filtered = filtered.filter((contract) => contract.isPublish === 1);
  } else if (activeTab.value === "signed") {
    filtered = filtered.filter(
      (contract) => contract.agreements && contract.agreements.length > 0
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (contract) =>
        contract.title.toLowerCase().includes(query) ||
        contract.textDescription.toLowerCase().includes(query) ||
        contract.slug.toLowerCase().includes(query)
    );
  }



  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case "title":
        return a.title.localeCompare(b.title);
      case "status":
        return a.isPublish - b.isPublish;
      case "date":
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return filtered;
});

  const  viewFullContract=(user)=> {
    console.log(user);
    window.open(
      `${window.location.origin}/app/agrements/${user.id}/preview`,
      "_blank"
    );
  }

    const  viewUserProfile=(user)=> {
    console.log(user);
    window.open(
      `${window.location.origin}/portofolio/${user.account.cvProfiles.slug}`,
      "_blank"
    );
  }

const getContractCount = (status) => {
  if (status === "all") {
    return contracts.value.length;
  } else if (status === "published") {
    return contracts.value.filter((contract) => contract.isPublish === 1)
      .length;
  } else if (status === "signed") {
    return contracts.value.filter(
      (contract) => contract.agreements && contract.agreements.length > 0
    ).length;
  }
  return 0;
};

const getStatusClasses = (isPublish) => {
  return isPublish === 1
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";
};

const getStatusLabel = (isPublish) => {
  return isPublish === 1 ? "Publié" : "Brouillon";
};

const getEmptyStateMessage = () => {
  switch (activeTab.value) {
    case "published":
      return "Aucun contrat publié";
    case "signed":
      return "Aucun contrat signé";
    default:
      return "Aucun contrat";
  }
};

const getEmptyStateDescription = () => {
  switch (activeTab.value) {
    case "published":
      return "Vous n'avez pas encore publié de contrats.";
    case "signed":
      return "Vous n'avez pas encore de contrats signés.";
    default:
      return "Commencez par créer votre premier contrat.";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const createNewContract = () => {
  router.push({ name: "contract_creator" });
};

const GoToviewUpdate = (contract) => {
  contractStore.setContract(contract);
  console.log("Contract data:", contractStore.contractData);
  router.push({
    name: "update_contract",
    params: { contractId: contract.slug },
  });
};

const GoToPreview = (contract) => {
  contractStore.setContract(contract);
  console.log("Contract data:", contractStore.contractData);
  router.push({
    name: "contract_preview",
    params: { contractId: contract.slug },
  });
  // router.
};

const handleClickOutside = (e) => {
  if (activeContractMenu.value && !e.target.closest(".relative")) {
    activeContractMenu.value = null;
  }
};

const fetchCompanyContracts = async () => {
  try {
    const companyId = route?.params?.companyId;
    const response = await auth.api(
      "GET",
      `/companies/${companyId}/contracts/`,
      null,
      false
    );

    if (response.success) {
      contracts.value = response.data;
    } else {
      console.error("Failed to fetch contracts:", response.error);
    }
  } catch (error) {
    console.error("Error fetching contracts:", error);
  }
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
  await fetchCompanyContracts();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
