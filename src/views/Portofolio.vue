<template>
  <AppModal :isOpen="isModalOpen" :isLoader="true"></AppModal>
  <div class="min-h-screen bg-gray-50" v-if="userAccount">
    <!-- Header Section -->
    <header class="relative py-16 bg-white">
      <!-- Bouton d'impression en haut à droite -->
      <button
        @click="downloadPDF"
        class="absolute flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm top-4 right-4 hover:bg-gray-50 hover:shadow-md print:hidden"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          ></path>
        </svg>
        Imprimer
      </button>

      <div class="max-w-4xl px-6 mx-auto text-center">
        <!-- Profile Image -->
        <div
         
          class="relative inline-block mb-6 avatar"
        >
          <img
           v-if="userAccount.avatarUrl"
            :src="
              userAccount.avatarUrl || '/placeholder.svg?height=120&width=120'
            "
            :alt="userAccount.firstName"
            class="object-cover mx-auto border-4 border-white rounded-full shadow-lg h-28 w-28"
          />
           <UserIcon
          class="text-gray-600 bg-gray-300 border-4 border-white rounded-full shadow-lg h-28 w-28"
          v-else
        />
          <button
            class="absolute flex items-center justify-center w-6 h-6 text-gray-500 bg-green-300 rounded-full top-2 right-2 hover:bg-gray-300"
          >
            <!-- <XIcon class="w-3 h-3" /> -->
          </button>
        </div>

        <!-- Name and Title -->
        <h1 class="mb-2 text-4xl font-bold text-gray-900">
          {{ userAccount.firstName }} {{ userAccount.lastName }}
        </h1>
        <h1 class="mb-2 text-xl font-bold text-gray-900">
          {{ moment().diff(moment(userAccount.dob), "years") }} Years Old
        </h1>
        <h1
          class="flex justify-center gap-2 mb-2 text-xl font-bold text-gray-900"
        >
          <GlobeIcon />
          <span>
            {{ userAccount.country }}
          </span>
          <span>
            {{ userAccount.city }}
          </span>
        </h1>
        <p class="max-w-2xl mx-auto mb-6 text-gray-600">{{ cvInfo.bio }}</p>

        <!-- Status Badge -->
        <div
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full rotate-[-3deg] cursor-pointer"
        >
          <div class="w-2 h-2 mr-2 bg-green-400 rounded-full"></div>
          Available For Work
        </div>
      </div>
    </header>

    <!-- Portfolio Gallery -->
    <!-- <section
      v-if="profile.portfolioImages && profile.portfolioImages.length"
      class="py-12"
    >
      <div class="max-w-4xl px-6 mx-auto">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <img
            v-for="(image, index) in profile.portfolioImages"
            :key="index"
            :src="image.url"
            :alt="image.alt"
            class="object-cover w-full h-48 transition-shadow rounded-lg shadow-sm cursor-pointer hover:shadow-md"
          />
        </div>
      </div>
    </section> -->

    <div class="max-w-4xl px-6 pb-16 mx-auto">
      <!-- Experience Section -->
      <section
        v-if="cvInfo.workExperiences && cvInfo.workExperiences.length"
        class="mb-16"
      >
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Experience</h2>
        <div class="space-y-8">
          <div
            v-for="(work, index) in cvInfo.workExperiences"
            :key="index"
            class="flex gap-4"
          >
            <!-- Timeline Icon -->
            <div class="flex flex-col items-center">
              <div
                :class="[
                  'w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold',
                  getCompanyColor(index),
                ]"
              >
                {{ work.company.charAt(0) }}
              </div>
              <div
                v-if="index < cvInfo.workExperiences.length - 1"
                class="w-0.5 h-16 bg-gray-200 mt-2"
              ></div>
            </div>

            <!-- Content -->
            <div class="flex-1 pb-8">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm text-gray-500"
                  >{{ work.period }} Month</span
                >
                <span class="text-sm text-gray-400">•</span>
                <span class="text-sm text-gray-500">{{ work.role }}</span>
              </div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900">
                {{ work.title }}
              </h3>
              <p class="mb-2 text-sm text-gray-500">{{ work.company }}</p>
              <p class="leading-relaxed text-gray-700">
                {{ work.description }}
              </p>
              <a
                v-if="work.website"
                :href="work.website"
                target="_blank"
                class="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700"
              >
                Visit Website →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section
        v-if="cvInfo.competence && cvInfo.competence.length"
        class="mb-16"
      >
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Skills</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="competence in cvInfo.competence"
            :key="competence"
            class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
          >
            {{ competence }}
          </span>
        </div>
      </section>

      <!-- Personal Projects Section -->

      <section
        v-if="cvInfo.personalProjects && cvInfo.personalProjects.length"
        class="mb-16"
      >
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Projects</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            v-for="(project, index) in cvInfo.personalProjects"
            :key="index"
            class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md"
          >
            <div
              class="flex items-center justify-center h-32 bg-gradient-to-br from-blue-500 to-purple-600"
            >
              <h3 class="text-lg font-bold text-white">{{ project.title }}</h3>
            </div>
            <div class="p-4">
              <p class="mb-3 text-sm text-gray-700">
                {{ project.description }}
              </p>
              <a
                v-if="project.website"
                :href="project.website"
                target="_blank"
                class="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Project →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->

      <section
        v-if="cvInfo.educations && cvInfo.educations.length"
        class="mb-16"
      >
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Education</h2>
        <div class="space-y-6">
          <div
            v-for="(edu, index) in cvInfo.educations"
            :key="index"
            class="p-6 bg-white border border-gray-200 rounded-lg"
          >
            <div class="flex items-start justify-between">
              <div>
                <h3 class="mb-1 text-lg font-semibold text-gray-900">
                  {{ edu.title }}
                </h3>
                <p class="mb-1 text-gray-600">{{ edu.institution }}</p>
                <p class="text-sm text-gray-500">{{ edu.degree }}</p>
              </div>
              <span
                class="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full"
                >{{ edu.year }}</span
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Interests Section -->
      <section
        v-if="cvInfo.focusPoint && cvInfo.focusPoint.length"
        class="mb-16"
      >
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Interests</h2>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="interest in cvInfo.focusPoint"
            :key="interest"
            class="px-4 py-2 text-sm font-medium text-blue-700 rounded-full bg-blue-50"
          >
            {{ interest }}
          </span>
        </div>
      </section>

      <!-- Social Links Section -->
      <section v-if="cvInfo.links && cvInfo.links.length" class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Connect</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <a
            v-for="(link, index) in cvInfo.links"
            :key="index"
            :href="link.href"
            target="_blank"
            class="flex items-center gap-4 p-4 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md"
          >
            <div
              :class="[
                'w-10 h-10 rounded-lg flex items-center justify-center text-white',
                getSocialColor(link.icon),
              ]"
            >
              <component :is="getSocialIcon(link.icon)" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ link.title }}</h3>
              <p class="text-sm text-gray-500">{{ link.href }}</p>
            </div>
          </a>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer class="py-8 bg-white border-t border-gray-200">
      <div class="max-w-4xl px-6 mx-auto">
        <!-- Signature -->
        <div class="mb-6 text-center">
          <div class="mb-4 text-4xl font-bold text-gray-900">
            {{ getInitials(userAccount.firstNamename) }}
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center gap-4 mb-6">
          <a
            v-for="social in cvInfo.links?.slice(0, 3)"
            :key="social.title"
            :href="social.href"
            target="_blank"
            class="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <component :is="getSocialIcon(social.icon)" class="w-5 h-5" />
          </a>
        </div>

        <!-- Copyright -->
        <p class="text-sm text-center text-gray-500">
          © Kind🎁Job. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import {
  XIcon,
  UserIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  GlobeIcon,
  MailIcon,
} from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import AppModal from "@/components/globales/AppModal.vue";
// Props
const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({}),
  },
});

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();


const isModalOpen = ref(false);

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
const userAccount = ref(null);
const cvInfo = ref(null);

// Helper functions
const getCompanyColor = (index) => {
  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
  ];
  return colors[index % colors.length];
};

const getSocialColor = (icon) => {
  const colors = {
    github: "bg-gray-900",
    linkedin: "bg-blue-600",
    twitter: "bg-blue-400",
    instagram: "bg-pink-500",
    website: "bg-green-500",
    email: "bg-red-500",
  };
  return colors[icon] || "bg-gray-500";
};

const getSocialIcon = (icon) => {
  const icons = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    website: GlobeIcon,
    email: MailIcon,
  };
  return icons[icon] || GlobeIcon;
};

const getInitials = (name) => {
  if (!name) return "JW";
  return name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase();
};

// Merge with provided profile data
if (props.profileData && Object.keys(props.profileData).length > 0) {
  profile.value = { ...profile.value, ...props.profileData };
}

const InitFectCvProfileDetail = async () => {
  toggleOpenModal()
  const response = await auth.api(
    "GET",
    `/extern/cv_profiles/${route.params.cvId}`,
    null,
    false
  );

  if (response.success) {
    userAccount.value = response.data.account;
    cvInfo.value = response.data;
  }
  toggleOpenModal()
};

const downloadPDF = async () => {
  toggleOpenModal()
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
  toggleOpenModal()
};

onMounted(async () => {
  await InitFectCvProfileDetail();
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

.bg-gradient-to-br {
  background: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>