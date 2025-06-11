<template>
  <div class="w-full min-h-screen">
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

    <div class="sticky top-0 z-10 border-b border-gray-20 bg-neutral-400">
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
                : 'border-transparent text-white hover:white-gray hover:border-gray-300',
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>
    <div class="py-8 mx-4 md:mx-8">
      <!-- {{ company?.activeDetails }} -->
      <div v-if="activeTab === 'about'" class="space-y-8">
        <AboutCompanie :employees="company?.guests" :company="company?.activeDetails" />
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
          <div class="flex flex-col" v-for="job in jobs" :key="job.id">
            <div class="text-end" @click="GoToUpdateCreateJob">
              <button class="px-3 py-1 bg-[#db147f] text-white rounded-lg">
                edit
              </button>
            </div>
            <JobCard :job="job" @bookmark="handleBookmark" />
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'team'" class="space-y-8">
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
            v-for="member in members"
            :key="member.name"
            :member="member"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
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
const isUploading=ref(false)


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

const jobs = [
  {
    id: "job_001",
    title: "Frontend Developer",
    companyName: "TechNova",
    companyLogo:
      "https://i.pinimg.com/736x/9b/6b/79/9b6b79c35e01c891fd5cc70e3ec499a0.jpg",
    location: "Remote",
    contractType: "Full-time",
    postedTime: "2 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/29/06/e2/2906e287427c26a98fd362e08a0f8093.jpg",
    seen: true,
    bookmarked: false,
  },
  {
    id: "job_002",
    title: "UX/UI Designer",
    companyName: "PixelCraft",
    companyLogo:
      "https://i.pinimg.com/736x/9e/57/c3/9e57c3ba0aad7de876cdb1c2a4b0bc5d.jpg",
    location: "Paris, France",
    contractType: "Contract",
    postedTime: "1 week ago",
    imageUrl:
      "https://i.pinimg.com/736x/40/9f/77/409f77de213158f6b91780f3001ce214.jpg",
    seen: false,
    bookmarked: true,
  },
  {
    id: "job_003",
    title: "Backend Engineer",
    companyName: "CloudWorks",
    companyLogo:
      "https://i.pinimg.com/736x/d4/69/68/d469681941c7089b06a3ccc5137a6f3c.jpg",
    location: "Berlin, Germany",
    contractType: "Part-time",
    postedTime: "5 hours ago",
    imageUrl:
      "https://i.pinimg.com/736x/68/93/cf/6893cf238804d5855aef507b3b2569be.jpg",
    seen: true,
    bookmarked: false,
  },
  {
    id: "job_004",
    title: "Data Analyst",
    companyName: "InsightCorp",
    companyLogo:
      "https://i.pinimg.com/736x/06/f4/c9/06f4c9a44d0d0558472fe511d41bb0b9.jpg",
    location: "Dakar, Senegal",
    contractType: "Internship",
    postedTime: "3 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/75/84/c5/7584c5cbf81ab168cf9a9470beafa44a.jpg",
    seen: false,
    bookmarked: true,
  },
  {
    id: "job_001",
    title: "Frontend Developer",
    companyName: "TechNova",
    companyLogo:
      "https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg",
    location: "Remote",
    contractType: "Full-time",
    postedTime: "2 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg",
    seen: true,
    bookmarked: false,
  },
  {
    id: "job_002",
    title: "UX/UI Designer",
    companyName: "PixelCraft",
    companyLogo: "/logos/pixelcraft.svg",
    location: "Paris, France",
    contractType: "Contract",
    postedTime: "1 week ago",
    imageUrl:
      "https://i.pinimg.com/736x/03/79/ff/0379ff163827fd605d0c522f2cf585ac.jpg",
    seen: false,
    bookmarked: true,
  },
];

const members = ref([
  {
    avatar:
      "https://i.pinimg.com/736x/a0/dd/1b/a0dd1b06ffb50116537e15d377fa3b11.jpg",
    name: "John Doe",
    position: "Développeur Web",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/09/aa/00/09aa00c89419c62c3f3f58bfff2baa79.jpg",
    name: "Jane Smith",
    position: "Designer UX",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/6a/4c/d7/6a4cd7de7b9322f3f75b09bafeb883f6.jpg",
    name: "Alice Johnson",
    position: "Chef de projet",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/bb/c7/5f/bbc75f884ab3e30157ab356d622a396e.jpg",
    name: "Bob Brown",
    position: "Analyste de données",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/a2/b7/a3/a2b7a353a4f5e24102d60e6d41a995cb.jpg",
    name: "Charlie Davis",
    position: "Responsable marketing",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/36/1a/d1/361ad1d0f6391b502f8d83dc90ec0b37.jpg",
    name: "Eve Miller",
    position: "Ingénieur logiciel",
  },
]);

const GoToNewCreateJob = () => {
  console.log(route)
  router.push({ name: "create_job",params:{companyId:route.params.companyId} });
};

const GoToUpdateCreateJob = () => {
  router.push({ name: "update_job" });
};

const FecthCompanieDetails = async () => {
  toggleLoader()
  const companyId = route.params.companyId;

  const response = await auth.api("GET", `/companies/${companyId}`, {}, false);
  if (response.success) {
    company.value = response.data;
  }

  console.log(response);
  console.log(company.value);
  toggleLoader()
};

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
