<template>
  <AppModal @closeModal="HandleToogleModal" :isOpen="isOpenModal" :isLoader="false">
    <div class="block lg:hidden">
      <LargeAppFilter :initialActiveFilters="savedFilters" 
        @close="HandleToogleModal" />
    </div>
  </AppModal>
  <AppModal :isOpen="isModalOpen" :isLoader="true"></AppModal>
  
  <div class="flex flex-col w-full h-full py-24 overflow-auto">
    <AppInputJobsFilter 
      :showToggleModal="true" 
      @open-modal="HandleToogleModal"
      @searchvalue-changed="handleSearchValueChange" 
      :show-title="false" 
      :filters="savedFilters"
      @update:filters="handleFiltersUpdate"
    />
    <div class="container flex flex-1 px-4 mx-auto mt-8">
      <div class="hidden filter-bar lg:block">
        <JobFilter :initialActiveFilters="savedFilters"  />
      </div>
      <main class="flex-1 bg-gray-50">
        <div class="container px-4 py-6 mx-auto">
          <div class="flex items-center justify-between mb-4">
            <h2 class="hidden text-lg font-bold text-gray-700 uppercase sm:block">
              Recommended for you
            </h2>
            <div id="pagination-bar" class="flex gap-2">
              <button 
                :disabled="!jobs?.meta?.previousPageUrl" 
                :class="!jobs?.meta?.previousPageUrl ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-pink-500 hover:text-white'" 
                class="px-3 py-1 border rounded-md"
                @click="fetchPage(jobs?.meta?.previousPageUrl)"
              >
                Prev
              </button>
              <button 
                :disabled="!jobs?.meta?.nextPageUrl" 
                :class="!jobs?.meta?.nextPageUrl ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-pink-500 hover:text-white'" 
                class="px-3 py-1 border rounded-md"
                @click="fetchPage(jobs?.meta?.nextPageUrl)"
              >
                Next
              </button>
            </div>
          </div>

          <div v-if="filteredJobs?.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <JobCard 
              v-for="job in filteredJobs" 
              :key="job.id" 
              :job="job"
              :companyName="job.company.activeDetails.name"
              :companyLogo="job.company.activeDetails.avatarUrl"
              @click="ShowJobDetail(job.slug)"
              @bookmark="handleBookmark"
            />
          </div>

          <div v-else-if="jobs?.data?.length && hasActiveFilters" class="mt-8 text-center">
            <div class="flex flex-col items-center justify-center">
              <BriefcaseIcon class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
              <div class="pt-8">
                <h2 class="mb-4 text-2xl">
                  No Jobs Found
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
              <BriefcaseIcon class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
              <div class="pt-8">
                <h2 class="text-2xl">
                  Oups, No Jobs Found Now
                </h2>
              </div>
            </div>
            <button 
              @click="router.push({name:'login'})"
              class="bg-[#e4097f] mt-8 text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200"
            >
              Be The First To Post a Job
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import JobFilter from "@/components/globales/JobFilter.vue";
import AppInputJobsFilter from "@/components/AppInputJobsFilter.vue";
import JobCard from "@/components/JobCard.vue";
import AppModal from "@/components/globales/AppModal.vue";
import LargeAppFilter from "@/components/globales/LargeAppFilter.vue";
import { BriefcaseIcon } from 'lucide-vue-next';
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const jobs = ref({ data: [], meta: {} });
const isModalOpen = ref(false);
const isOpenModal = ref(false);

const savedFilters = ref({
  keywords: '',
  location: '',
  jobType: '',
  salary: { min: 0, max: Infinity, isFiltered: false }
});

const filteredJobs = computed(() => {
  if (!jobs.value?.data?.length) return [];

  let filtered = jobs.value.data;

  if (savedFilters.value.keywords.trim()) {
    const keywords = savedFilters.value.keywords.toLowerCase().trim();
    filtered = filtered.filter(job => {
      return (
        job.title?.toLowerCase().includes(keywords)||
        job.industries?.toLowerCase().includes(keywords)||
        job.jobType?.toLowerCase().includes(keywords)

    );
    });
  }
  return filtered;
});

const hasActiveFilters = computed(() => {
  return (
    savedFilters.value.keywords.trim() ||
    savedFilters.value.location.trim() ||
    savedFilters.value.jobType.trim() ||
    savedFilters.value.salary.isFiltered
  );
});

const toggleLoader = () => {
  isModalOpen.value = !isModalOpen.value;
};

const fetchJobs = async (url = '/extern/companies/jobs/all') => {
  toggleLoader();
  try {
    const response = await auth.api("GET", url, {}, false);
    if (response.success) {
      jobs.value = response.data;
      console.log('Jobs fetched:', response.data);
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
  toggleLoader();
};

const fetchPage = async (url) => {
  if (url) {
    await fetchJobs(url);
  }
};

const handleFiltersUpdate = (filters) => {
  savedFilters.value = { ...filters };
};


const handleSearchValueChange = (searchQuery) => {
  savedFilters.value.keywords = searchQuery;
};

const HandleToogleModal = () => {
  isOpenModal.value = !isOpenModal.value;
};

const clearFilters = () => {
  savedFilters.value = {
    keywords: '',
    location: '',
    jobType: '',
    salary: { min: 0, max: Infinity, isFiltered: false }
  };
};

const ShowJobDetail = (id) => {
  if (route.name === 'l_jobs') {
    router.push({ name: "account_jobs_details", params: { id } });
  } else {
    router.push({ name: 'jobs_details', params: { id } });
  }
};

const handleBookmark = (jobId) => {
  console.log('Bookmark toggled for job:', jobId);
};

onMounted(() => {
  fetchJobs();
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
</style>