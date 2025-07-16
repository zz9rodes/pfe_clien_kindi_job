<template>
  <div class="w-full px-4 ">
     <div class="relative mb-8 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-4 -right-4 w-24 h-24 bg-[#e4097f]/10 rounded-full blur-xl"></div>
        <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-[#00a3e0]/10 rounded-full blur-xl"></div>
      </div>
      <div class="relative p-4 lg:p-8">
        <form class="relative flex flex-col gap-3 sm:gap-0 sm:flex-row group" @submit.prevent="updateFilters">
          <div class="relative flex-1">
            <input 
              v-model="filters.keywords" 
              @input="updateFilters"
              placeholder="Search by name, email, or bio"
              class="w-full h-12 lg:h-14 pl-6 pr-4 text-base bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-full rounded-r-full sm:rounded-r-none border-r-0 sm:border-r-0 focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f] transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
            <SearchIcon class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-4 top-1/2" />
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative h-12 lg:h-14 px-6 bg-gradient-to-r from-[#e4097f] to-[#c8076f] hover:from-[#c8076f] hover:to-[#a8065f] text-white rounded-r-full sm:rounded-l-none rounded-l-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <SearchIcon class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <div class="absolute inset-0 overflow-hidden rounded-r-full">
              <div class="absolute inset-0 transition-opacity duration-300 bg-white opacity-0 group-hover:opacity-20"></div>
            </div>
          </button>
        </form>
      </div>
    </div>

    <div class="w-full overflow-auto border border-gray-200 rounded-lg">
      <div class="grid grid-cols-5 bg-white border-b border-gray-200">
        <div class="px-6 py-3 text-sm font-bold text-gray-700">Avatar</div>
        <div class="px-6 py-3 text-sm font-bold text-gray-700">Full Name</div>
        <div class="px-6 py-3 text-sm font-bold text-gray-700">Email</div>
        <div class="px-6 py-3 text-sm font-bold text-gray-700">Account Type</div>
        <div class="px-6 py-3 text-sm font-bold text-center text-gray-700">Status</div>
      </div>

      <div v-if="filteredUsers?.length">
        <div 
          v-for="account in filteredUsers" 
          :key="account.id" 
          @click.prevent="viewUser(account)"
          class="grid grid-cols-5 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
        >
          <div class="flex items-center px-6 py-4">
            <img 
              :src="account.avatarUrl || '/placeholder-account.png'"
              :alt="`Avatar de ${account.firstName} ${account.lastName}`"
              class="object-cover w-12 h-12 border-4 border-white shadow-lg rounded-xl"
            />
          </div>
          <div class="flex items-center px-6 py-4 text-sm font-bold text-gray-900">
            {{ account.firstName }} {{ account.lastName }}
          </div>
          <div class="flex items-center px-6 py-4 text-sm text-gray-500">
            {{ account.user.email }}
          </div>
          <div class="flex items-center px-6 py-4 text-sm text-gray-500 ">
            {{ account.accountType  }}
          </div>
          <div class="flex items-center justify-center px-6 py-4">
            <span :class="[
              'px-2 py-1 text-xs font-medium rounded-full',
              account?.user.isAdmin ? 'bg-[#fff0fb] text-[#db147f] shadow-sm' : 'text-gray-600 bg-gray-100'
            ]">
              {{ account?.user.isAdmin ? 'Admin' : 'User' }}
            </span>
          </div>
        </div>
      </div>

      <div v-else-if="accounts?.length && hasActiveFilters" class="mt-8 text-center">
        <div class="flex flex-col items-center justify-center">
          <UserIcon class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
          <div class="pt-8">
            <h2 class="mb-4 text-2xl">
              No Users Found
            </h2>
            <p class="mb-4 text-gray-600">
              Try adjusting your search criteria or clear filters
            </p>
            <button 
              @click="clearFilters"
              class="bg-[#e4097f] text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div v-else class="mt-8 text-center">
        <div class="flex flex-col items-center justify-center">
          <UserIcon class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
          <div class="pt-8">
            <h2 class="text-2xl">
              Oups, No Users Found Now
            </h2>
          </div>
        </div>
        <button 
          @click="router.push({name:'login'})"
          class="bg-[#e4097f] mt-8 text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200"
        >
          Invite Users to Join
        </button>
      </div>
    </div> 
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { UserIcon, SearchIcon } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const notyf = new Notyf({ position: { x: 'right', y: 'top' }, duration: 3000,types: [
    {
      type: 'info',
      background: 'blue',
      icon: false
    }
  ] });

const accounts = ref([]);
const filters = ref({ keywords: '' });
const isLoading = ref(false);

const filteredUsers = computed(() => {
  if (!accounts.value?.length) return [];

  let filtered = accounts.value;

  if (filters.value.keywords.trim()) {
    const keywords = filters.value.keywords.toLowerCase().trim();
    filtered = filtered.filter(account => {
      const bio = account.cvProfiles?.description?.toLowerCase() || '';
      return (
        account.firstName?.toLowerCase().includes(keywords) ||
        account.lastName?.toLowerCase().includes(keywords) ||
        account.account.email?.toLowerCase().includes(keywords) ||
        bio.includes(keywords)
      );
    });
  }

  return filtered;
});

const hasActiveFilters = computed(() => {
  return filters.value.keywords.trim();
});

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const response = await auth.api('GET', '/accounts/all', {}, false);
    if (response.success) {
      accounts.value = response.data;
      console.log('Users fetched:', response.data);
    } else {
      notyf.error('Failed to fetch accounts');
    }
  } catch (error) {
    console.error('Error fetching accounts:', error);
    notyf.error('An error occurred while fetching accounts');
  }
  isLoading.value = false;
};

const updateFilters = () => {
  // Filters are updated directly via v-model, so no need for additional emission
};

const clearFilters = () => {
  filters.value = { keywords: '' };
};

const viewUser = (account) => {

    if(!account.cvProfiles){
        notyf.open({
            type: 'info',
            message: 'Is Profil is Not Publish yet'
        });
        
        return
    }
  router.push({ name: 'portofolio', params: { cvId: account.cvProfiles.slug } });
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>