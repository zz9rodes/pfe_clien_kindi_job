<template>
  <!-- Modal Overlay -->

  <!-- Modal Content -->
  <div
    class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
    @click.stop
  >
    <!-- Modal Header -->
    <div class="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Liste des Signatures</h2>
      </div>
      <button
        @click="closeModal"
        class="text-gray-400 transition-colors hover:text-gray-600"
      >
        <X class="w-6 h-6" />
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="relative flex-1">
          <Search
            class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher par nom, email, téléphone..."
            class="max-w-[600px] py-1 pl-10 pr-4 rounded-md border border-collapseder outline-none focus:ring-2 focus:ring-[#db147f] focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div
          class="w-8 h-8 mx-auto mb-4 border-b-2 border-blue-600 rounded-full animate-spin"
        ></div>
        <p class="text-gray-600">Chargement des utilisateurs...</p>
      </div>
    </div>

    <!-- Users List -->
    <div v-else class="overflow-y-auto max-h-96">
      <div class="divide-y divide-gray-200">
        <div
          v-for="user in paginatedUsers"
          :key="user.account.id"
          class="p-4 transition-colors cursor-pointer hover:bg-gray-50"
        >
          <div class="flex items-center space-x-4">
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <img
                v-if="user.account.avatarUrl"
                :src="user.account.avatarUrl"
                :alt="`${user.account.firstName} ${user.account.lastName}`"
                class="object-cover w-8 h-8 border-2 border-gray-200 rounded-full"
              />
              <div
                v-else
                class="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full"
              >
                <span class="text-sm font-medium text-gray-600">
                  {{ getInitials(user) }}
                </span>
              </div>
            </div>

            <!-- User Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between gap-2">
                <div  class="flex-1 ">
                  <h3 class="text-sm font-medium text-gray-900 truncate">
                    {{ user.account.firstName }} {{ user.account.lastName }}
                  </h3>
                  <p class="text-sm text-gray-500 truncate">
                    <span class="flex items-center">
                  {{ user.account.phoneNumber }}
                </span>
                  </p>
                </div>
                <div @click.prevent="HandleGetCvProfile(user)" class="text-right">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                      getAccountTypeBadgeClass(user.account.accountType),
                    ]"
                  >
                    Profiles
                  </span>
                </div>
                <div @click.prevent="HandleGetAggrementTerms(user)" class="text-right">
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium',
                      getAccountTypeBadgeClass(user.account.accountType),
                    ]"
                  >
                    Contract
                  </span>
                </div>
              </div>             
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="py-12 text-center">
        <div class="flex flex-col items-center">
          <div
            class="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full"
          >
            <Users class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="mb-2 text-lg font-medium text-gray-900">
            Aucun utilisateur trouvé
          </h3>
          <p class="text-gray-500">
            {{
              searchQuery
                ? "Essayez de modifier votre recherche."
                : "Aucun utilisateur disponible."
            }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-end px-6 py-4 space-x-3 border-t border-gray-200 bg-gray-50"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { X, Search, Phone, MapPin, Calendar, Users } from "lucide-vue-next";

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  users: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  allowMultipleSelection: {
    type: Boolean,
    default: false,
  },
  selectButtonText: {
    type: String,
    default: "Sélectionner",
  },
  title: {
    type: String,
    default: "Liste des Utilisateurs",
  },
});

// Emits
const emit = defineEmits(["close", "viewAgreement","viewPprofiles"]);

// Reactive data
const searchQuery = ref("");
const selectedAccountType = ref("");
const selectedCountry = ref("");
const selectedUsers = ref([]);
const currentPage = ref(1);
const usersPerPage = 10;

// Computed properties
const filteredUsers = computed(() => {
  let filtered = props.users;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        `${user.account.firstName} ${user.account.lastName}`.toLowerCase().includes(query) ||
        user.account.phoneNumber?.toLowerCase().includes(query) ||
        generateEmail(user).toLowerCase().includes(query) ||
        user.account.city?.toLowerCase().includes(query) ||
        user.account.country?.toLowerCase().includes(query)
    );
  }

  // Filter by account type
  if (selectedAccountType.value) {
    filtered = filtered.filter(
      (user) => user.account.accountType === selectedAccountType.value
    );
  }

  // Filter by country
  if (selectedCountry.value) {
    filtered = filtered.filter(
      (user) => user.account.country === selectedCountry.value
    );
  }

  return filtered;
});

const uniqueCountries = computed(() => {
  const countries = props.users.map((user) => user.account.country).filter(Boolean);
  return [...new Set(countries)].sort();
});



const startIndex = computed(() => {
  return (currentPage.value - 1) * usersPerPage;
});

const endIndex = computed(() => {
  return startIndex.value + usersPerPage;
});

const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(startIndex.value, endIndex.value);
});

// Methods
const getInitials = (user) => {
  const firstInitial = user.account.firstName?.charAt(0) || "";
  const lastInitial = user.account.lastName?.charAt(0) || "";
  return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
};

const generateEmail = (user) => {
  if (user.email) return user.email;
  const firstName = user.account.firstName?.toLowerCase() || "user";
  const lastName = user.account.lastName?.toLowerCase() || "name";
  return `${firstName}.${lastName}@email.com`;
};

const getAccountTypeBadgeClass = (accountType) => {
  switch (accountType) {
    case "personnal":
      return "bg-blue-100 text-blue-800";
    case "business":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


const HandleGetAggrementTerms = (user) => {
  emit("viewAgreement", user);
  closeModal();
};


const HandleGetCvProfile = (user) => {
  emit("viewProfiles", user);
  closeModal();
};
const closeModal = () => {
  // Reset filters and pagination
  searchQuery.value = "";
  selectedAccountType.value = "";
  selectedCountry.value = "";
  selectedUsers.value = [];
  currentPage.value = 1;

  emit("close");
};





// Watch for search changes to reset pagination
watch([searchQuery, selectedAccountType, selectedCountry], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
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

/* Transition effects */
.transition-colors {
  transition: color 0.2s ease-in-out;
}
</style>