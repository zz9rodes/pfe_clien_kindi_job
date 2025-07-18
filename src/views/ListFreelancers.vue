<template>
  <div class="container px-4 py-8 mx-auto mt-24">
      <AppModal :isLoader="true" :isOpen="isOpenLoaderModale" />

    <AppInputFilterFreelancer 
      :filters="savedFilters" 
      @update:filters="handleFiltersUpdate"
    />
    <div v-if="filteredFreelancers?.length" class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      <FreelancerCard  
        @view-profile="viewProfile(freelancer)"
        v-for="freelancer in filteredFreelancers" 
        :key="freelancer.id" 
        :freelancer="freelancer"
      />
    </div>
    <div v-else-if="listfreelancers?.length && hasActiveFilters" class="mt-8 text-center">
      <div class="flex flex-col items-center justify-center">
        <UserIcon class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
        <div class="pt-8">
          <h2 class="mb-4 text-2xl">
            Aucun freelance trouvé
          </h2>
          <p class="mb-4 text-gray-600">
            Essayez d'ajuster vos critères de recherche ou réinitialisez les filtres
          </p>
          <button 
            @click="clearFilters"
            class="bg-[#e4097f] text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
    <div v-else class="mt-8 text-center">
      <div class="flex flex-col items-center justify-center">
        <UserIcon class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
        <div class="pt-8">
          <h2 class="text-2xl">
            Oups, aucun freelance trouvé pour le moment
          </h2>
        </div>
      </div>
      <button 
        @click="router.push({name:'login'})"
        class="bg-[#e4097f] mt-8 text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200"
      >
        Soyez le premier à rejoindre
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AppInputFilterFreelancer from '@/components/AppInputFilterFreelancer.vue';
import FreelancerCard from '@/components/FreelancerCard.vue';
import { UserIcon } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import AppModal from '@/components/globales/AppModal.vue';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const notyf = new Notyf({ position: { x: 'right', y: 'top' }, duration: 3000 });

const isOpenLoaderModale = ref(false)

const listfreelancers = ref([]);
const savedFilters = ref({
  keywords: ''
});

const toggleOpenLoaderModal = () => {
    isOpenLoaderModale.value = !isOpenLoaderModale.value
}

const filteredFreelancers = computed(() => {
  if (!listfreelancers.value?.length) return [];

  let filtered = listfreelancers.value;

  if (savedFilters.value.keywords.trim()) {
    const keywords = savedFilters.value.keywords.toLowerCase().trim();
    filtered = filtered.filter(freelancer => {
      const competences = freelancer.cvProfiles?.competence?.join(' ').toLowerCase() || '';
      return (
        freelancer.firstName?.toLowerCase().includes(keywords) ||
        freelancer.lastName?.toLowerCase().includes(keywords) ||
        freelancer.city?.toLowerCase().includes(keywords) ||
        freelancer.country?.toLowerCase().includes(keywords) ||
        freelancer.firstLangage?.toLowerCase().includes(keywords) ||
        freelancer.roles?.toLowerCase().includes(keywords) ||
        competences.includes(keywords)
      );
    });
  }

  return filtered;
});

const hasActiveFilters = computed(() => {
  return savedFilters.value.keywords.trim();
});

const initFetchFreelancers = async () => {
  toggleOpenLoaderModal()
  try {
    const response = await auth.api('GET', '/accounts/extern/all', null, false);
    if (response.success) {
      listfreelancers.value = response.data;
      console.log('Freelancers fetched:', response.data);
    } else {
      notyf.error('Failed to fetch freelancers');
    }
  } catch (error) {
    console.error('Error fetching freelancers:', error);
    notyf.error('An error occurred while fetching freelancers');
  }
  toggleOpenLoaderModal()
};

const viewProfile = (freelancer) => {
  if (!freelancer.cvProfiles) {
    notyf.error('This freelancer has not completed their portfolio');
    return;
  }
  router.push({ name: 'portofolio', params: { cvId: freelancer.cvProfiles.slug } });
};

const handleFiltersUpdate = (filters) => {
  savedFilters.value = { keywords: filters.keywords };
};

const clearFilters = () => {
  savedFilters.value = { keywords: '' };
};

onMounted(() => {
  initFetchFreelancers();
});
</script>

<style scoped>
.freelancer-card:hover .profile-image {
  transform: scale(1.1);
}

* {
  transition: all 0.2s ease;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>