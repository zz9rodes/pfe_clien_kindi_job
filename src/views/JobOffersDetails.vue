<template>
  <AppModal :isOpen="isModalLoaderOpen" :isLoader="true" />
  <div v-if="jobOffer" class="w-full h-full py-16 overflow-y-auto bg-gray-50">
    <div class="px-6 py-8 mx-auto max-w-7xl">
      <button
        @click="goBack"
        class="flex items-center px-4 py-2 mb-3 transition-all duration-200 bg-white rounded-lg bg-opacity-30 hover:bg-opacity-100"
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
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <!-- Main Content -->
        <div class="space-y-3 lg:col-span-2">
          <!-- Job Header -->
          <div
            class="relative p-4 bg-white border border-gray-200 rounded-md shadow-md group"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#db147f] to-purple-600 rounded-xl"
              >
                <div
                  v-if="jobOffer.company.activeDetails.avatarUrl"
                  class="flex items-center"
                >
                  <img
                    :src="jobOffer.company.activeDetails.avatarUrl"
                    :alt="`Logo de ${jobOffer.company.activeDetails.name}`"
                    class="object-cover w-12 h-12 border-4 border-white shadow-lg rounded-xl"
                  />
                </div>
                <span v-else class="text-xl font-bold text-white">
                  {{ getCompanyInitials(jobOffer.company.activeDetails.name) }}
                </span>
              </div>
              <div class="font-bold">
                {{ jobOffer.company.activeDetails.name }}
              </div>
            </div>

            <div class="flex items-start gap-6 mt-4">
              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h1 class="mb-2 text-3xl font-bold text-gray-900">
                      {{ jobOffer.title }}
                    </h1>
                    <div
                      class="flex flex-wrap items-center gap-4 mb-3 text-gray-600"
                    >
                      <div class="flex items-center gap-1">
                        <MapPinIcon class="w-4 h-4" />
                        <span>{{ jobOffer.city }}, {{ jobOffer.country }}</span>
                      </div>
                      <div class="flex items-center gap-1 font-bold">
                        <ClockIcon class="w-4 h-4" />
                        <span>{{ getJobTypeLabel(jobOffer.jobType) }}</span>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                      <span
                        class="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full"
                      >
                        {{ getStatusLabel(jobOffer.status) }}
                      </span>
                      <span
                        v-if="jobOffer.price?.value"
                        class="px-3 py-1 text-sm font-medium text-[#db147f] bg-blue-100 rounded-full"
                      >
                        {{ formatSalary(jobOffer.price) }}
                      </span>
                      <span
                        v-if="jobOffer.yearsExperience"
                        class="px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full"
                      >
                        {{ jobOffer.yearsExperience }}+ years of experience
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Apply Button -->
                <div class="flex flex-wrap items-center justify-between mt-8">
                  <button
                    @click="applyToJob"
                    class="px-8 py-2 font-semibold text-white transition-colors bg-[#db147f] rounded-md hover:bg-[#b3126b] disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Apply now
                  </button>

                  <div class="flex items-center gap-1">
                    <CalendarCheck class="h-4 font-bold" />
                    {{ moment(jobOffer.createdAt).startOf("day").fromNow() }}
                  </div>
                </div>
              </div>
            </div>

            <div
              @click.stop="HandleCopyLink"
              class="absolute top-0 right-0 p-1 text-white transition-opacity duration-500 ease-in-out bg-pink-500 cursor-pointer rounded-tr-md "
            >
              copy job
            </div>
          </div>

          <!-- Job Description -->
          <div class="p-4 bg-white border border-gray-200 rounded-md">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">
              Job Description
            </h2>
            <div class="prose prose-gray max-w-none">
              <p class="leading-relaxed text-gray-700 whitespace-pre-wrap">
                {{ jobOffer.description }}
              </p>
            </div>
          </div>

          <!-- Job Details -->
          <div
            v-if="jobOffer.details && jobOffer.details.length"
            class="p-4 bg-white border border-gray-200 rounded-md"
          >
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Job Details</h2>
            <div class="space-y-6">
              <div v-for="(detail, index) in jobOffer.details" :key="index">
                <h3 class="mb-3 text-lg font-semibold text-gray-900">
                  {{ detail.title }}
                </h3>
                <ul class="space-y-2">
                  <li
                    v-for="(item, itemIndex) in detail.items"
                    :key="itemIndex"
                    class="flex items-start gap-3 text-gray-700"
                  >
                    <CheckCircleIcon
                      class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                    />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Skills Required -->
          <div
            v-if="jobOffer.skillRequired"
            class="p-4 bg-white border border-gray-200 rounded-md"
          >
            <h2 class="mb-6 text-2xl font-bold text-gray-900">
              Required Skills
            </h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in getSkillsArray(jobOffer.skillRequired)"
                :key="skill"
                class="px-3 py-2 text-sm font-medium text-[#db147f] rounded-lg bg-gray-100"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Recruitment Process -->
          <div
            v-if="jobOffer.recruitmentSteps && jobOffer.recruitmentSteps.length"
            class="p-4 bg-white border border-gray-200 rounded-md"
          >
            <h2 class="mb-6 text-2xl font-bold text-gray-900">
              Recruitment Process
            </h2>
            <div class="space-y-6">
              <div
                v-for="(step, index) in jobOffer.recruitmentSteps"
                :key="index"
                class="flex gap-4"
              >
                <div class="flex flex-col items-center">
                  <div
                    class="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[#db147f] rounded-full"
                  >
                    {{ index + 1 }}
                  </div>
                  <div
                    v-if="index < jobOffer.recruitmentSteps.length - 1"
                    class="w-0.5 h-12 bg-gray-200 mt-2"
                  ></div>
                </div>
                <div class="flex-1 pb-6">
                  <h3 class="mb-2 text-lg font-semibold text-gray-900">
                    {{ step.title }}
                  </h3>
                  <p v-if="step.description" class="text-gray-700">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Process Steps -->
          <div
            v-if="jobOffer.stepsValidation && jobOffer.stepsValidation.length"
            class="p-4 bg-white border border-gray-200 rounded-md"
          >
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Process Steps</h2>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div
                v-for="(step, index) in jobOffer.stepsValidation"
                :key="index"
                class="p-4 border border-gray-200 rounded-md"
              >
                <h3 class="mb-2 font-semibold text-gray-900">
                  {{ step.name }}
                </h3>
                <p v-if="step.description" class="mb-3 text-sm text-gray-700">
                  {{ step.description }}
                </p>
                <div v-if="step.renumeration?.value" class="text-sm">
                  <span class="font-medium text-green-600">
                    {{ formatSalary(step.renumeration) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Info -->
          <div class="p-6 bg-white border border-gray-200 rounded-md">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">
              Key Information
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Industry</span>
                <span class="font-medium text-gray-900">{{
                  jobOffer.industries
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Job Type</span>
                <span class="font-medium text-gray-900">{{
                  getJobTypeLabel(jobOffer.jobType)
                }}</span>
              </div>
              <div
                v-if="jobOffer.yearsExperience"
                class="flex items-center justify-between"
              >
                <span class="text-gray-600">Experience</span>
                <span class="font-medium text-gray-900"
                  >{{ jobOffer.yearsExperience }}+ years</span
                >
              </div>
              <div
                v-if="jobOffer.lastDate"
                class="flex items-center justify-between"
              >
                <span class="text-gray-600">Deadline</span>
                <span class="font-medium text-gray-900">{{
                  formatDate(jobOffer.lastDate)
                }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Gender</span>
                <span class="font-medium text-gray-900">{{
                  getGenderLabel(jobOffer.gender)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Company Info -->
          <div class="p-6 bg-white border border-gray-200 rounded-md">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">
              About the Company
            </h3>
            <div class="flex items-center gap-3 mb-4">
              <div
                v-if="jobOffer.company.activeDetails.avatarUrl"
                class="flex items-center"
              >
                <img
                  :src="jobOffer.company.activeDetails.avatarUrl"
                  :alt="`Logo de ${jobOffer.company.activeDetails.name}`"
                  class="object-cover w-12 h-12 border-4 border-white shadow-lg rounded-xl"
                />
              </div>
              <span v-else class="text-xl font-bold text-white">{{
                getCompanyInitials(jobOffer.company.activeDetails.name)
              }}</span>

              <!-- {{ jobOffer.company.activeDetails.avatarUrl }} -->
            </div>
            <div class="flex flex-wrap gap-4">
              <div>
                <h4 class="font-semibold text-gray-900">
                  {{ jobOffer.company.activeDetails.name || "Company" }}
                </h4>
                <p class="text-sm text-gray-600">{{ jobOffer.industries }}</p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Admin</h4>
                <p class="text-sm text-gray-600">
                  {{ jobOffer.company.admin.firstName }}
                  {{ jobOffer.company.admin.lastName }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ jobOffer.company.admin.country }} ,<span>Tel: </span
                  >{{ jobOffer.company.admin.phoneNumber }}
                </p>
              </div>
            </div>
            <button
              class="w-full mt-3 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-md"
            >
              View company
            </button>
          </div>

          <!-- Share -->
          <!-- <div class="p-6 bg-white border border-gray-200 rounded-md">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">
              Share this offer
            </h3>
            <button
              class="w-full bg-[#db147f] py-2 mt-3 font-medium text-gray-700 transition-colors text-white rounded-lg"
            >
              Copy link
            </button>
          </div> -->
          <!-- Similar Jobs -->
          <div class="p-6 bg-white border border-gray-200 rounded-md">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">
              Similar Offers
            </h3>
            <div class="space-y-4">
              <div
                v-for="similarJob in similarJobs"
                :key="similarJob.id"
                class="p-4 transition-colors border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
              >
                <h4 class="mb-1 font-medium text-gray-900">
                  {{ similarJob.title }}
                </h4>
                <p class="mb-2 text-sm text-gray-600">
                  {{ similarJob.company }}
                </p>
                <div class="flex items-center gap-2 text-xs text-gray-500">
                  <MapPinIcon class="w-3 h-3" />
                  <span>{{ similarJob.location }}</span>
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
import { ref, onMounted } from "vue";
import {
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  BuildingIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  User,
  CalendarCheck,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import AppModal from "@/components/globales/AppModal.vue";
import moment from "moment";
import { Notyf } from "notyf";
// Props
const props = defineProps({
  jobId: {
    type: [String, Number],
    required: true,
  },
});

// Reactive data
const isSaved = ref(false);
const hasApplied = ref(false);
const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const isModalLoaderOpen = ref(false);

const toggleOpenLoaderModal = () => {
  isModalLoaderOpen.value = !isModalLoaderOpen.value;
};


const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 });

// Sample job data (normally would come from API)
const jobOffer = ref(null);
// Similar jobs
const similarJobs = ref([
  {
    id: 1,
    title: "React Developer",
    company: "StartupTech",
    location: "Paris",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "DigitalCorp",
    location: "Lyon",
  },
  {
    id: 3,
    title: "Vue.js Developer",
    company: "WebAgency",
    location: "Remote",
  },
]);

// Methods
const toggleSave = () => {
  isSaved.value = !isSaved.value;
};

const applyToJob = () => {
  hasApplied.value = true;
  // Here you would typically send the application to the backend
  alert("Application sent successfully!");
};

const getCompanyInitials = (companyName) => {
  if (!companyName) return "TC";
  return companyName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getJobTypeLabel = (jobType) => {
  const labels = {
    FULL_TIME: "Full-time",
    PART_TIME: "Part-time",
    CONTRACT: "Contract",
    FREELANCE: "Freelance",
    INTERNSHIP: "Internship",
  };
  return labels[jobType] || jobType;
};

const getStatusLabel = (status) => {
  const labels = {
    DRAFT: "Draft",
    ACTIVE: "Active",
    PAUSED: "Paused",
    CLOSED: "Closed",
  };
  return labels[status] || status;
};

const getGenderLabel = (gender) => {
  const labels = {
    ANY: "All",
    MALE: "Male",
    FEMALE: "Female",
  };
  return labels[gender] || gender;
};

const formatSalary = (price) => {
  if (!price?.value) return "";
  const symbols = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    CAD: "C$",
  };
  return `${price.value.toLocaleString()} ${
    symbols[price.currency] || price.currency
  }`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US");
};

const getSkillsArray = (skillsString) => {
  if (!skillsString) return [];
  return skillsString.split(",").map((skill) => skill.trim());
};

const FectJobDetails = async () => {
  toggleOpenLoaderModal();

  try {
    const jobId = route.params.id;
    const Url = `/extern/companies/jobs/${jobId}`;
    const response = await auth.api("GET", Url, null, false);
    if (!response.success) {
      console.log("error ici");
      router.push({ name: "jobs" });
    } else {
      jobOffer.value = response.data;

      console.log(response);
    }
  } catch (error) {
    console.error(error);
  }

  toggleOpenLoaderModal();
};

const goBack = () => {
  router.back();
};

const HandleCopyLink=()=>{
  const textLink=window.location.href
  navigator.clipboard.writeText(textLink).then(() => {
    console.log('Texte copié :', textLink);
    notyf.success("job copied")
  }).catch(err => {
    console.error('Erreur lors de la copie :', err);
    notyf.error("erro copy")
  });
}
// Lifecycle
onMounted(() => {
  // Fetch job data based on jobId
  console.log("Loading job offer:", props.jobId);
  FectJobDetails();
});
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Prose styles for description */
.prose {
  line-height: 1.7;
}
</style>
