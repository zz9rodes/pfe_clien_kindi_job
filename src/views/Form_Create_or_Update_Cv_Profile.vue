<template>
  <AppModal :isOpen="isModalOpen" :isLoader="true"></AppModal>
  <div class="w-full h-full overflow-y-auto bg-gray-50 main-frame">
    <div class="max-w-4xl p-6 mx-auto">
      <div v-if="!showCreateForm">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Mes Profils CV</h1>
            <p class="mt-1 text-gray-600">Gérez vos profils professionnels</p>
          </div>
          <button
            @click="showCreateForm = true"
            :disabled="profile.slug ? true : false"
            :class="profile.slug ? ' bg-pink-300 cursor-not-allowed':'bg-[#e4097f]  hover:bg-[#c01370]'"
            class="flex items-center gap-2 px-6 py-2 font-medium text-white transition-colors rounded-lg"
          >
            <PlusIcon class="w-4 h-4" />
            <span>Créer un profil</span>
          </button>
        </div>

        <!-- Liste des profils -->
        <div v-if="profile.slug" class="max-w-2xl">
          <CvProfileCard
            :key="index"
            :profile="profile"
            @edit="editProfile"
            @view="viewProfile"
          />
        </div>
          <div v-else
        class="p-6 text-center rounded-lg bg-gray-50"
      >
        <UsersIcon class="w-8 h-8 mx-auto mb-4 text-gray-400 sm:h-16 sm:w-16" />
        <h3 class="mb-2 font-medium text-gray-900 text-md sm:text-lg">
          No Companie Found
        </h3>
        <p class="mb-4 text-gray-600">You haven't added any Cv Profile</p>
        <button
            @click="showCreateForm = true"
          class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors"
        >
          <span class="hidden sm:block">Create Your Cv Now</span>
          <Plus class="sm:hidden" />
        </button>
        </div>
      </div>

      <!-- Formulaire de création/modification -->
      <div v-if="showCreateForm">
        <form @submit.prevent="saveProfile">
          <!-- Header with Save Button -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-3">
              <button
                type="button"
                @click="cancelForm"
                class="p-2 text-gray-500 rounded-full hover:bg-gray-100"
              >
                <ArrowLeftIcon class="w-5 h-5" />
              </button>
              <div>
                <h1 class="text-3xl font-bold text-gray-900">
                  {{
                    isEditing ? "Modifier le Profil CV" : "Créer un Profil CV"
                  }}
                </h1>
                <p class="mt-1 text-gray-600">
                  {{
                    isEditing
                      ? "Modifiez votre profil professionnel"
                      : "Complétez votre profil professionnel"
                  }}
                </p>
              </div>
            </div>
            <div class="flex gap-2 wrap">
              <button
                type="button"
                @click="PreviewProfile"
                :disabled="isSaving"
                class="px-6 py-2 font-medium text-white transition-colors bg-gray-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Aperçu
              </button>
              <button
                type="submit"
                :disabled="isSaving"
                class="px-6 py-2 font-medium text-white transition-colors bg-[#e4097f] rounded-lg hover:bg-[#e4097f] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{
                  isSaving
                    ? "Sauvegarde..."
                    : isEditing
                    ? "Mettre à jour"
                    : "Sauvegarder"
                }}
              </button>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Bio Section -->
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <h2 class="mb-4 font-semibold text-gray-900 text-md sm:text-xl">
                Biographie
              </h2>
              <textarea
                required
                v-model="profileData.bio"
                placeholder="Décrivez-vous en quelques lignes..."
                rows="4"
                class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
              ></textarea>
            </div>

            <!-- Competence Section -->
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-gray-900 text-md sm:text-xl">
                  Compétences
                </h2>
                <button
                  type="button"
                  @click="addSkill"
                  class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
                >
                  + <span class="hidden sm:block"> Ajouter </span>
                </button>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(skill, index) in profileData.competence"
                  :key="index"
                  class="flex items-center gap-3"
                >
                  <input
                    v-model="profileData.competence[index]"
                    required
                    type="text"
                    placeholder="Ex: Vue.js, JavaScript, Design..."
                    class="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  />
                  <button
                    type="button"
                    @click="removeSkill(index)"
                    class="p-2 text-[#e4097f] hover:text-[#e4097f]"
                  >
                    <XIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Focus Points Section -->
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-gray-900 text-md sm:text-xl">
                  Centres d'intérêt
                </h2>
                <button
                  type="button"
                  @click="addFocusPoint"
                  class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
                >
                  + <span class="hidden sm:block"> Ajouter </span>
                </button>
              </div>
              <div class="space-y-3">
                <div
                  v-for="(point, index) in profileData.focus_point"
                  :key="index"
                  class="flex items-center gap-3"
                >
                  <input
                    v-model="profileData.focus_point[index]"
                    required
                    type="text"
                    placeholder="Ex: Photographie, Voyage, Technologie..."
                    class="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  />
                  <button
                    type="button"
                    @click="removeFocusPoint(index)"
                    class="p-2 text-[#e4097f] hover:text-[#e4097f]"
                  >
                    <XIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Social Links Section -->
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-gray-900 text-md sm:text-xl">
                  Réseaux sociaux
                </h2>
                <button
                  type="button"
                  @click="addSocialLink"
                  class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
                >
                  + <span class="hidden sm:block"> Ajouter </span>
                </button>
              </div>
              <div class="space-y-4">
                <div
                  v-for="(link, index) in profileData.links"
                  :key="index"
                  class="p-4 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
                >
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-medium text-gray-900">
                      Lien {{ index + 1 }}
                    </h3>
                    <button
                      type="button"
                      @click="removeSocialLink(index)"
                      class="p-1 text-[#e4097f] hover:text-[#e4097f]"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                  <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Icône</label
                      >
                      <select
                        v-model="link.icon"
                        class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      >
                        <option value="">Choisir une icône</option>
                        <option value="github">GitHub</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="website">Site web</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Titre</label
                      >
                      <input
                        v-model="link.title"
                        type="text"
                        placeholder="Ex: Mon GitHub"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      />
                    </div>
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Lien</label
                      >
                      <input
                        v-model="link.href"
                        required
                        type="url"
                        placeholder="https://..."
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Education Section -->
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-gray-900 text-md sm:text-xl">
                  Formation
                </h2>
                <button
                  type="button"
                  @click="addEducation"
                  class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
                >
                  + <span class="hidden sm:block"> Ajouter </span>
                </button>
              </div>
              <div class="space-y-4">
                <div
                  v-for="(education, index) in profileData.educations"
                  :key="index"
                  class="p-4 border border-gray-200 rounded-lg"
                >
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-medium text-gray-900">
                      Formation {{ index + 1 }}
                    </h3>
                    <button
                      type="button"
                      @click="removeEducation(index)"
                      class="p-1 text-[#e4097f] hover:text-[#e4097f]"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Titre</label
                      >
                      <input
                        required
                        v-model="education.title"
                        type="text"
                        placeholder="Ex: Master en Informatique"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      />
                    </div>
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Institution</label
                      >
                      <input
                        v-model="education.institution"
                        type="text"
                        placeholder="Ex: Université de Paris"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      />
                    </div>
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Diplôme</label
                      >
                      <input
                        v-model="education.degree"
                        type="text"
                        placeholder="Ex: Master, Licence, BTS..."
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      />
                    </div>
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Année</label
                      >
                      <input
                        v-model="education.year"
                        required
                        type="number"
                        placeholder="Ex: 2020"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Work Experience Section -->
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-gray-900 text-md sm:text-xl">
                  Expérience professionnelle
                </h2>
                <button
                  type="button"
                  @click="addWorkExperience"
                  class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
                >
                  + <span class="hidden sm:block"> Ajouter </span>
                </button>
              </div>
              <div class="space-y-4">
                <div
                  v-for="(work, index) in profileData.work_experiences"
                  :key="index"
                  class="p-4 border border-gray-200 rounded-lg"
                >
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-medium text-gray-900">
                      Expérience {{ index + 1 }}
                    </h3>
                    <button
                      type="button"
                      @click="removeWorkExperience(index)"
                      class="p-1 text-[#e4097f] hover:text-[#e4097f]"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                  <div class="space-y-3">
                    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Poste</label
                        >
                        <input
                          v-model="work.title"
                          required
                          type="text"
                          placeholder="Ex: Développeur Frontend"
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Entreprise</label
                        >
                        <input
                          v-model="work.company"
                          type="text"
                          placeholder="Ex: Tech Company"
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Rôle</label
                        >
                        <input
                          v-model="work.role"
                          required
                          type="text"
                          placeholder="Ex: Développeur, Designer..."
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Période en Mois</label
                        >
                        <input
                          v-model="work.period"
                          required
                          type="number"
                          placeholder="Ex: Jan 2022 - Présent"
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Site web</label
                        >
                        <input
                          v-model="work.website"
                          type="url"
                          placeholder="https://company.com"
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Année</label
                        >
                        <input
                          v-model="work.year"
                          type="number"
                          placeholder="Ex: 2022"
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Description</label
                      >
                      <textarea
                        v-model="work.description"
                        placeholder="Décrivez vos responsabilités et réalisations..."
                        rows="3"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Personal Projects Section -->
            <div class="p-6 bg-white border border-gray-200 rounded-lg">
              <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-gray-900 text-md sm:text-xl">
                  Projets personnels
                </h2>
                <button
                  type="button"
                  @click="addPersonalProject"
                  class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
                >
                  + <span class="hidden sm:block"> Ajouter </span>
                </button>
              </div>
              <div class="space-y-4">
                <div
                  v-for="(project, index) in profileData.personal_projects"
                  :key="index"
                  class="p-4 border border-gray-200 rounded-lg"
                >
                  <div class="flex items-center justify-between mb-3">
                    <h3 class="font-medium text-gray-900">
                      Projet {{ index + 1 }}
                    </h3>
                    <button
                      type="button"
                      @click="removePersonalProject(index)"
                      class="p-1 text-[#e4097f] hover:text-[#e4097f]"
                    >
                      <XIcon class="w-4 h-4" />
                    </button>
                  </div>
                  <div class="space-y-3">
                    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Titre</label
                        >
                        <input
                          v-model="project.title"
                          required
                          type="text"
                          placeholder="Ex: Application de gestion de tâches"
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Site web</label
                        >
                        <input
                          v-model="project.website"
                          type="url"
                          placeholder="https://monprojet.com"
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Description</label
                      >
                      <textarea
                        v-model="project.description"
                        placeholder="Décrivez votre projet, technologies utilisées..."
                        rows="3"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  X as XIcon,
  Plus as PlusIcon,
  User as UserIcon,
  ArrowLeft as ArrowLeftIcon,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import CvProfileCard from "@/components/profile/CvProfileCard.vue";
import AppModal from "@/components/globales/AppModal.vue";

const isSaving = ref(false);
const isLoading = ref(false);
const showCreateForm = ref(false);
const isEditing = ref(false);
const auth = useAuthStore();

const isModalOpen = ref(false);

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const profileData = ref({
  bio: "",
  competence: [""],
  focus_point: [""],
  links: [],
  educations: [],
  work_experiences: [],
  personal_projects: [],
});

const profile = ref({
  bio: "",
  competence: [""],
  focus_point: [""],
  links: [],
  educations: [],
  work_experiences: [],
  personal_projects: [],
});

const fetchProfiles = async () => {
  toggleOpenModal();
  try {
    const response = await auth.api("GET", "/cv_profiles/", null, false);
    if (response.success && response.data) {
      populateProfile(response.data);
    } else {
      profileData.value = [];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des profils:", error);
    profileData.value = [];
  }
  toggleOpenModal();
};

onMounted(() => {
  fetchProfiles();
});

const editProfile = (data) => {
  console.log(data);
  profileData.value = data;
  // profileData.value = profile.value
  // console.log(profile.value)
  console.log(profileData.value);
  isEditing.value = true;
  showCreateForm.value = true;
};

const cancelForm = () => {
  showCreateForm.value = false;
  isEditing.value = false;
  resetForm();
};

const resetForm = () => {
  profileData.value = {
    bio: "",
    competence: [""],
    focus_point: [""],
    links: [],
    educations: [],
    work_experiences: [],
    personal_projects: [],
  };
};

const viewProfile = (profileData) => {
  console.log("Voir le profil:", profileData);
  console.log(`${window.location.origin}/portofolio/${profile.value.slug}`)
  window.open(`${window.location.origin}/portofolio/${profile.value.slug}`, "_blank");
};

const addSkill = () => {
  profileData.value.competence.push("");
};

const removeSkill = (index) => {
  profileData.value.competence.splice(index, 1);
};

const addFocusPoint = () => {
  profileData.value.focus_point.push("");
};

const removeFocusPoint = (index) => {
  profileData.value.focus_point.splice(index, 1);
};

const addSocialLink = () => {
  profileData.value.links.push({
    icon: "",
    title: "",
    href: "",
  });
};

const removeSocialLink = (index) => {
  profileData.value.links.splice(index, 1);
};

const addEducation = () => {
  profileData.value.educations.push({
    title: "",
    institution: "",
    degree: "",
    year: "",
  });
};

const removeEducation = (index) => {
  profileData.value.educations.splice(index, 1);
};

const addWorkExperience = () => {
  profileData.value.work_experiences.push({
    title: "",
    description: "",
    company: "",
    role: "",
    period: "",
    website: "",
    year: "",
  });
};

const removeWorkExperience = (index) => {
  profileData.value.work_experiences.splice(index, 1);
};

const addPersonalProject = () => {
  profileData.value.personal_projects.push({
    title: "",
    description: "",
    website: "",
  });
};

const removePersonalProject = (index) => {
  profileData.value.personal_projects.splice(index, 1);
};

const saveProfile = async () => {
  toggleOpenModal();
  isSaving.value = true;
  try {
    const endpoint = isEditing.value
      ? `/cv_profiles/${profile.value.slug}/update`
      : "/cv_profiles/create";
    const method = isEditing.value ? "PUT" : "POST";

    const response = await auth.api(method, endpoint, profileData.value, true);

    if (response.success) {
      resetForm();
      showCreateForm.value = false;
      isEditing.value = false;

      window.location.reload();
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du profil:", error);
  } finally {
    isSaving.value = false;
  }
  toggleOpenModal();
};

const PreviewProfile = () => {
  console.log("Aperçu du profil en cours:", profileData.value);
};

function populateProfile(source) {
  profile.value.bio = source.bio || "";
  profile.value.competence = source.competence || [""];
  profile.value.focus_point = source.focusPoint || [""];

  profile.value.links = source.links || [];
  profile.value.educations = source.educations || [];
  profile.value.personal_projects = source.personalProjects || [];
  profile.value.work_experiences = source.workExperiences || [];
  profile.value.slug = source.slug;
  profile.value.createdAt = source.createdAt;
  profile.value.updatedAt = source.updatedAt;
}
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.main-frame,
.modal-container {
  --sb-track-color: #ffffff;
  --sb-thumb-color: #ffffff;
  --sb-size: 9px;
}

.main-frame::-webkit-scrollbar {
  width: var(--sb-size);
  display: none;
}

.main-frame::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 3px;
}

.main-frame::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;
}

@supports not selector(::-webkit-scrollbar) {
  .main-frame {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
