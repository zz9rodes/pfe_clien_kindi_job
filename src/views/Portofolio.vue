<template>
  <AppModal :isOpen="isModalOpen" :isLoader="true"></AppModal>
  <div class="min-h-screen bg-gray-50" v-if="userAccount">
    <!-- Header Section -->
  <header class="relative py-16 overflow-hidden bg-white">
    <!-- Background Decorative Elements (subtle, matching theme) -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-8 -right-8 w-48 h-48 bg-[#e4097f]/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-8 -left-8 w-64 h-64 bg-[#00a3e0]/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Print Button -->
    <button
      @click="downloadPDF"
      class="absolute z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm top-4 right-4 hover:bg-gray-50 hover:shadow-md print:hidden"
    >
      <PrinterIcon class="w-4 h-4" />
      Imprimer
    </button>

    <div class="relative z-0 max-w-4xl px-6 mx-auto text-center">
      <!-- Profile Image -->
      <div class="relative inline-block mb-6 group">
        <img
          v-if="userAccount.avatarUrl"
          :src="userAccount.avatarUrl"
          :alt="userAccount.firstName"
          class="object-cover w-32 h-32 mx-auto transition-transform duration-300 border-4 border-white rounded-full shadow-lg group-hover:scale-105"
        />
        <UserIcon
          v-else
          class="w-32 h-32 p-4 text-gray-500 transition-transform duration-300 bg-gray-200 border-4 border-white rounded-full shadow-lg group-hover:scale-105"
        />
        <!-- Subtle glow effect on hover -->
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#e4097f]/20 to-[#00a3e0]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
      </div>

      <!-- Name and Title -->
      <h1 class="mb-2 text-5xl font-extrabold leading-tight text-gray-900">
        {{ userAccount.firstName }} {{ userAccount.lastName }}
      </h1>
      <p class="mt-2 mb-4 text-xl font-semibold text-[#00a3e0]">
        {{ userAccount.roles }}
        <!-- {{ moment().diff(moment(userAccount.dob), "years") }} Years Old -->
      </p>

      <!-- Location -->
      <div class="flex items-center justify-center gap-2 mb-4 text-lg text-gray-600">
        <MapPinIcon class="w-5 h-5 text-gray-500" />
        <span>{{ userAccount.city }}, {{ userAccount.country }}</span>
      </div>

      <!-- Status Badge -->
      <div
        class="inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#e4097f] to-[#c8076f] rounded-full shadow-md transform -rotate-1 transition-all duration-300 hover:rotate-0 hover:scale-105 cursor-pointer"
      >
        <div class="w-2.5 h-2.5 mr-2 bg-green-300 rounded-full animate-pulse"></div>
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

      <section
        v-if="cvInfo.bio "
        class="mt-2 "
      >
        <h2 class="mb-1 text-2xl font-bold text-gray-900">Bio</h2>
            <div class="flex-1 pb-8">
              <p class="mb-6 text-gray-600 ">{{ cvInfo.bio }}</p>
            </div>
      </section>

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
  PrinterIcon,
  MapPinIcon,
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