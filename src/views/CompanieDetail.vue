<template>
  <div class="w-full min-h-screen mt-[70px]">
    <AppModal :isOpen="isUploading" :isLoader="true"> </AppModal>
    <div class="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600">
      <img
        :src="company?.activeDetails?.coverUrl"
        :alt="`Couverture de ${company?.activeDetails?.name}`"
        class="object-cover w-full h-full"
      />
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
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

      <div v-if="showAction" class="absolute flex space-x-3 top-6 right-6">
        <button
          @click="toggleOpenModal"
          class="px-6 py-2 font-medium text-white transition-colors duration-200 bg-gray-400 rounded-lg"
        >
          Rejeter
        </button>
        <button
          :disabled="company == 'approved' ? true : false"
          :class="
            company == 'approved'
              ? ' cursor-not-allowed bg-pink-300'
              : 'cursor-pointer bg-[#db147f] '
          "
          @click="() => toggleOpenModal('a')"
          class="px-6 py-2 font-medium text-white transition-colors duration-200 bg-[#db147f] rounded-lg"
        >
          Approuver
        </button>
      </div>
    </div>
    <div class="relative z-10 max-w-6xl px-6 mx-auto -mt-20 mb-[50px]">
      <div class="p-8 mb-8 bg-white shadow-lg rounded-xl">
        <div class="flex items-start space-x-6">
          <div class="flex-shrink-0">
            <img
              :src="
                company?.activeDetails?.avatarUrl || '/placeholder-company.png'
              "
              :alt="`Logo de ${company?.activeDetails?.name}`"
              class="object-cover w-24 h-24 border-4 border-white shadow-lg rounded-xl"
            />
          </div>

          <div class="flex-1">
            <div class="flex items-center mb-2 space-x-3">
              <h1 class="text-3xl font-bold text-gray-900">
                {{ company?.activeDetails?.name }}
              </h1>
              <span
                :class="[
                  'px-3 py-1 rounded-full text-sm font-medium',
                  company?.activeDetails?.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{ company?.activeDetails?.status }}
              </span>
            </div>

            <div class="flex items-center mb-4 space-x-4 text-gray-600">
              <span class="flex items-center">
                <Building class="w-5 h-5 mr-4" />
                {{ company?.activeDetails?.industry }}
              </span>
              <span class="flex items-center">
                <MapPinIcon class="w-5 h-5 mr-4" />
                {{ company?.activeDetails?.city }},
                {{ company?.activeDetails?.country }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sticky top-0 z-10 bg-white border-b border-gray-20">
      <div class="mx-4 md:mx-8">
        <nav class="flex space-x-8 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'border-[#db147f] text-[#db147f]'
                : 'border-transparent  hover:text-gray-700 hover:border-gray-300',
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>
    <div
      class="px-4 py-8 md:px-8"
      :class="activeTab === 'team' ? 'bg-gray-50' : 'bg-white'"
    >
      <div v-if="activeTab === 'about'" class="space-y-8">
        <AboutCompanie
          @view-more-jobs="activeTab = 'jobs'"
          :detail="companyDetail"
          :jobs="company?.jobs?.slice(0, 5)"
          :employees="company?.guests.slice(0, 6)"
          :company="company?.activeDetails"
        />
      </div>

      <div v-if="activeTab === 'jobs'" class="space-y-6">
        <div
          class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div @click="GoToNewCreateJob">
            <button
              class="new-job flex gap-1 bg-[#db147f] text-white rounded-md px-3 py-2"
            >
              <Plus />
              <span>New Job</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="flex flex-col" v-for="job in company?.jobs" :key="job.id">
            <div class="text-end" @click="() => GoToUpdateCreateJob(job)">
              <button class="px-3 py-1 bg-[#db147f] text-white rounded-lg">
                edit
              </button>
            </div>
            <JobCard
              :shoFavorite="false"
              :companyLogo="company.activeDetails.avatarUrl"
              :companyName="company.activeDetails.name"
              :job="job"
              @bookmark="handleBookmark"
            />
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'team'" class="space-y-8 bg-gray-50">
        <div class="text-center">
          <h2 class="mb-4 text-2xl font-semibold text-gray-900">
            Meet Our Team
          </h2>
          <p class="max-w-2xl mx-auto text-gray-600">
            Our diverse team of talented professionals is what makes our company
            special. Get to know the people behind our success.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <TeamMemberCard
            v-for="member in companieMembers"
            :key="member.name"
            :member="member"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import {
  BuildingIcon,
  MapPinIcon,
  UsersIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
  TrendingUpIcon,
  ShieldIcon,
  ZapIcon,
  Plus,
} from "lucide-vue-next";
import AboutCompanie from "@/components/compnanies/AboutCompanie.vue";
import JobCard from "@/components/JobCard.vue";
import TeamMemberCard from "@/components/TeamMemberCard.vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AppModal from "@/components/globales/AppModal.vue";
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const isUploading = ref(false);

const toggleLoader = () => {
  isUploading.value = !isUploading.value;
};
const activeTab = ref("about");
const tabs = [
  { id: "about", name: "About" },
  { id: "jobs", name: "Jobs" },
  { id: "team", name: "Team" },
  { id: "news", name: "News" },
];

const company = ref(null);
const companieMembers = ref([]);
const companyDetail = ref({
  stats: {
    members: 0,
    jobs: 0,
    posts: 0,
  },
  companyName: "",
  companyLogo: "",
});

const goBack = () => {
  router.push({ name: "companie_versions" });
};

const GoToNewCreateJob = () => {
  router.push({
    name: "create_job",
    params: { companyId: route.params.companyId },
  });
};

const GoToUpdateCreateJob = (job) => {
  auth.setJob(job);
  router.push({
    name: "update_job",
    params: { companyId: route.params.companyId, jobId: job.slug },
  });
};

const FecthCompanieDetails = async () => {
  toggleLoader();
  const companyId = route.params.companyId;

  const response = await auth.api(
    "GET",
    `/extern/companies/${companyId}`,
    {},
    false
  );
  if (response.success) {
    company.value = response.data;
  }

  toggleLoader();
};

watch(company, (newCompanieDetails) => {
  if (newCompanieDetails.activeDetails) {
    companyDetail.value = {
      stats: {
        members: newCompanieDetails.guests.length,
        jobs: newCompanieDetails.jobs.length,
        posts: newCompanieDetails.posts.length,
      },
      companyName: newCompanieDetails.activeDetails.name,
      companyLogo: newCompanieDetails.activeDetails.avatarUrl,
    };
  }
});

watch(
  () => company.value?.guests,
  (members) => {
    companieMembers.value = []; // reset pour éviter les doublons
    members?.forEach((member) => {
      companieMembers.value.push({
        name: `${member.account.firstName} ${member.account.lastName}`,
        avatar: member.account.avatarUrl,
        firstLanguage: member.account.firstLanguage,
        position: member.role,
        status: member.accept ? "accepted" : "send",
      });
    });
  },
  { immediate: true } // si tu veux que ça s’exécute direct au premier rendu
);

onMounted(() => {
  FecthCompanieDetails();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  max-width: none;
}
</style>
