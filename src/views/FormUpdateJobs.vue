<template>
  <div class="w-full min-h-screen bg-gray-50">
    <AppModal :isOpen="isModalOpen" :isLoader="true"> </AppModal>

    <div class="max-w-4xl p-6 mx-auto">
      <form @submit.prevent="updateJob">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Modifier l'offre d'emploi
            </h1>
            <p class="mt-1 text-gray-600">
              Modifiez votre offre d'emploi avec tous les détails nécessaires
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="cancelUpdate"
              class="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Annuler
            </button>
            <button
              @click="previewJob"
              class="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Aperçu
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSaving ? "Mise à jour..." : "Mettre à jour" }}
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Informations générales -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-900">
              Informations générales
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Titre du poste *</label
                >
                <input
                  v-model="jobData.title"
                  type="text"
                  placeholder="Ex: Développeur Frontend Senior, Chef de projet..."
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  required
                />
              </div>

              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Description du poste *</label
                >
                <textarea
                  v-model="jobData.description"
                  placeholder="Décrivez le poste, les responsabilités et les missions..."
                  rows="4"
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  required
                ></textarea>
              </div>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Secteur d'activité *</label
                  >
                  <input
                    v-model="jobData.industries"
                    type="text"
                    placeholder="Ex: Technologie, Finance, Santé..."
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    required
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Job Type *</label
                  >
                  <select
                    id="jobType"
                    required
                    v-model="jobData.job_type"
                    class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  >
                    <option value="">select a job type</option>
                    <option
                      v-for="job_type in jobTypes"
                      :key="job_type"
                      :value="job_type"
                    >
                      {{ job_type?.toLocaleLowerCase() }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Localisation -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-900">
              Localisation
            </h2>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Pays</label
                >
                <input
                  v-model="jobData.country"
                  type="text"
                  placeholder="Ex: France, Cameroun..."
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                />
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Ville</label
                >
                <input
                  v-model="jobData.city"
                  type="text"
                  placeholder="Ex: Paris, Douala..."
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                />
              </div>
            </div>
          </div>

          <!-- Rémunération et critères -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-900">
              Rémunération et critères
            </h2>
            <div class="space-y-4">
              <div class="flex flex-wrap w-full gap-4">
                <div class="flex-1">
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Salaire</label
                  >
                  <input
                    v-model="jobData.price.value"
                    type="number"
                    placeholder="50000"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Devise</label
                  >
                  <select
                    v-model="jobData.price.currency"
                    class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  >
                    <option value="">Sélectionner</option>
                    <option
                      v-for="currency in currencies"
                      :key="currency.value"
                      :value="currency.value"
                    >
                      {{ currency.label }}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Années d'expérience</label
                >
                <input
                  v-model="jobData.years_experience"
                  type="number"
                  min="0"
                  placeholder="3"
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                />
              </div>

              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Compétences requises</label
                >
                <textarea
                  v-model="jobData.skill_required"
                  placeholder="Ex: Vue.js, React, Node.js, Git..."
                  rows="3"
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                ></textarea>
              </div>

              <div>
                <div class="space-y-4">
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Date limite de candidature</label
                    >
                    <input
                      v-model="jobData.last_date"
                      type="date"
                      :min="tomorrow"
                      class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Gender</label
                >
                <select
                  id="jobType"
                  required
                  v-model="jobData.gender"
                  class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                >
                  <option value="">select a gender</option>
                  <option
                    v-for="gender in Genders"
                    :key="gender"
                    :value="gender"
                  >
                    {{ gender.toLocaleLowerCase() }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-900">
              Cover Image
            </h2>
            <div>
              <div>
                <label for="cover">
                  <span
                    type="button"
                    class="bg-[#fff0fb] cursor-pointer text-[#db147f] px-4 py-2 rounded-lg hover:bg-[#ffe6f7] transition-colors flex items-center"
                  >
                    <UploadIcon class="w-4 h-4 mr-2" />
                    Upload Logo
                  </span>
                  <p class="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </label>
              </div>
              <input
                @change="(e) => handleFileUpload(e)"
                type="file"
                accept="image/*"
                class="hidden"
                name="cover"
                id="cover"
              />

              <div v-if="jobData.coverUrl">
                <div class="mt-4">
                  <img
                    :src="jobData.coverUrl"
                    class="h-[200px] object-cover rounded-lg object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Détails du poste -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900">
                Détails du poste
              </h2>
              <button
                @click="addDetail"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                + Ajouter une section
              </button>
            </div>

            <div
              v-if="jobData.details.length === 0"
              class="py-8 text-center text-gray-500"
            >
              <FileTextIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>
                Aucun détail ajouté. Ajoutez des sections pour détailler le
                poste.
              </p>
            </div>

            <div class="space-y-6">
              <div
                v-for="(detail, index) in jobData.details"
                :key="index"
                class="p-6 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-medium text-gray-900">
                    Section {{ index + 1 }}
                  </h3>
                  <button
                    @click="removeDetail(index)"
                    class="p-1 text-red-600 hover:text-red-700"
                  >
                    <XIcon class="w-4 h-4" />
                  </button>
                </div>

                <div class="space-y-4">
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Titre de la section *</label
                    >
                    <input
                      v-model="detail.title"
                      type="text"
                      placeholder="Ex: Responsabilités, Avantages, Qualifications..."
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                      required
                    />
                  </div>

                  <div>
                    <div class="flex items-center justify-between mb-2">
                      <label class="block text-sm font-medium text-gray-700"
                        >Éléments *</label
                      >
                      <button
                        @click="addDetailItem(index)"
                        class="text-sm font-medium text-[#db147f] hover:text-[#c41370]"
                      >
                        + Ajouter un élément
                      </button>
                    </div>

                    <div
                      v-if="detail.items && detail.items.length > 0"
                      class="space-y-2"
                    >
                      <div
                        v-for="(item, itemIndex) in detail.items"
                        :key="itemIndex"
                        class="flex items-center gap-2"
                      >
                        <span class="text-sm text-gray-400"
                          >{{ itemIndex + 1 }}.</span
                        >
                        <input
                          v-model="detail.items[itemIndex]"
                          type="text"
                          placeholder="Ex: Développer des applications web, Collaborer avec l'équipe..."
                          class="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                        />
                        <button
                          @click="removeDetailItem(index, itemIndex)"
                          class="p-2 text-red-600 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Processus de recrutement -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900">
                Processus de recrutement
              </h2>
              <button
                @click="addRecruitmentStep"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                + Ajouter une étape
              </button>
            </div>

            <div
              v-if="jobData.recruitment_steps.length === 0"
              class="py-8 text-center text-gray-500"
            >
              <UsersIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>
                Aucune étape définie. Décrivez votre processus de recrutement.
              </p>
            </div>

            <div class="space-y-4">
              <div
                v-for="(step, index) in jobData.recruitment_steps"
                :key="index"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-medium text-gray-900">
                    Étape {{ index + 1 }}
                  </h3>
                  <button
                    @click="removeRecruitmentStep(index)"
                    class="p-1 text-red-600 hover:text-red-700"
                  >
                    <XIcon class="w-4 h-4" />
                  </button>
                </div>

                <div class="space-y-3">
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Titre de l'étape *</label
                    >
                    <input
                      v-model="step.title"
                      type="text"
                      placeholder="Ex: Entretien téléphonique, Test technique..."
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                      required
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Description</label
                    >
                    <textarea
                      v-model="step.description"
                      placeholder="Décrivez cette étape du processus..."
                      rows="2"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Étapes avec rémunération -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900">
                Étapes du projet (avec rémunération)
              </h2>
              <button
                @click="addStep"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                + Ajouter une étape
              </button>
            </div>

            <div
              v-if="jobData.steps.length === 0"
              class="py-8 text-center text-gray-500"
            >
              <CreditCardIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>
                Aucune étape définie. Ajoutez des étapes avec rémunération si
                applicable.
              </p>
            </div>

            <div class="space-y-4">
              <div
                v-for="(step, index) in jobData.steps"
                :key="index"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-medium text-gray-900">
                    Étape {{ index + 1 }}
                  </h3>
                  <button
                    @click="removeStep(index)"
                    class="p-1 text-red-600 hover:text-red-700"
                  >
                    <XIcon class="w-4 h-4" />
                  </button>
                </div>

                <div class="space-y-3">
                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Nom de l'étape *</label
                      >
                      <input
                        v-model="step.name"
                        type="text"
                        placeholder="Ex: Phase 1, Développement initial..."
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                        required
                      />
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Montant</label
                        >
                        <input
                          v-model="step.renumeration.value"
                          type="number"
                          placeholder="1000"
                          class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                        />
                      </div>
                      <div>
                        <label
                          class="block mb-1 text-sm font-medium text-gray-700"
                          >Devise</label
                        >
                        <select
                          v-model="step.renumeration.currency"
                          class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                        >
                          <option value="">Devise</option>
                          <option
                            v-for="currency in currencies"
                            :key="currency.value"
                            :value="currency.value"
                          >
                            {{ currency.label }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Description *</label
                    >
                    <textarea
                      v-model="step.description"
                      placeholder="Décrivez cette étape du projet..."
                      rows="2"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Statut -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-900">
              Statut de l'offre
            </h2>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700"
                >Status *</label
              >

              <select
                id="jobType"
                required
                v-model="jobData.status"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
              >
                <option value="">select a gender</option>
                <option
                  v-for="status in jobStatus"
                  :key="status"
                  :value="status"
                >
                  {{ status.toLocaleLowerCase() }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>

    <AppModal @close-modal="previewJob" :isOpen="showPreview" :isLoader="false">
      <div class="flex items-center md:w-[80%] w-[95%] justify-center">
        <div
          class="w-full bg-white rounded-lg shadow-xl max-h-[95vh] overflow-hidden"
        >
          <div
            class="flex items-center justify-between p-6 border-b border-gray-200"
          >
            <h2 class="text-xl font-semibold text-gray-900">
              Aperçu de l'offre d'emploi
            </h2>
            <button
              @click="showPreview = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <XIcon class="w-6 h-6" />
            </button>
          </div>

          <div class="overflow-y-auto max-h-[calc(95vh-120px)] p-6">
            <JobPreview :jobData="jobData" />
          </div>
        </div>
      </div>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  XIcon,
  FileTextIcon,
  UsersIcon,
  CreditCardIcon,
  ImageIcon,
} from "lucide-vue-next";
import JobPreview from "./JobPreview.vue";
import AppModal from "@/components/globales/AppModal.vue";
import { AppwriteuploadFile } from "@/app_write/files";
import { useAuthStore } from "@/stores/auth";
import { useRoute,useRouter } from "vue-router";

// Emits
const emit = defineEmits(["update", "cancel"]);

const auth=useAuthStore()

const router=useRouter()
const route=useRoute()

// États réactifs
const isSaving = ref(false);
const showPreview = ref(false);
const isModalOpen = ref(false);

const selectedImage = ref(null);
const imagePreview = ref(null);
const fileInput = ref(null);

// Structure de données du job
const jobData = ref({
  id: null,
  title: "",
  country: "",
  city: "",
  description: "",
  industries: "",
  job_type: "",
  price: {
    value: null,
    currency: "",
  },
  details: [],
  years_experience: null,
  skill_required: "",
  last_date: "",
  gender: "",
  recruitment_steps: [],
  status: "",
  steps: [],
  coverUrl: null,
});

const jobTypes = ref(["CDI", "INTERNSHIP", "FREELANCE"]);

const Genders = ref(["MALE", "FEMALE", "BOTH"]);

const jobStatus = ref(["OPEN", "CLOSE", "DRAFT"]);

const currencies = ref([
  { value: "EUR", label: "EUR (€)" },
  { value: "USD", label: "USD ($)" },
  { value: "XAF", label: "XAF (FCFA)" },
  { value: "GBP", label: "GBP (£)" },
]);

// Computed properties
const tomorrow = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
});

// Récupération des données du job via API
const fetchJobData = async () => {
  try {
    jobData.value = {
      id: 123,
      title: "Senior Frontend Developer",
      country: "France",
      city: "Paris",
      description:
        "We are looking for a passionate frontend developer with strong Vue.js experience.",
      industries: "Software Development",
      job_type: "CDI",
      price: {
        value: 50000,
        currency: "EUR",
      },
      details: [
        {
          title: "Responsibilities",
          items: [
            "Develop reusable Vue.js components",
            "Collaborate with backend team",
            "Ensure accessibility and responsiveness",
          ],
        },
        {
          title: "Qualifications",
          items: [
            "5+ years of frontend development",
            "Strong knowledge of JavaScript/TypeScript",
            "Familiarity with REST APIs",
          ],
        },
      ],
      years_experience: 5,
      skill_required: "Vue.js, TypeScript, HTML/CSS, Git",
      last_date: "2025-07-01",
      gender: "MALE",
      recruitment_steps: [
        {
          title: "Application Review",
          description: "We review your CV and cover letter",
        },
        {
          title: "Technical Interview",
          description: "Live coding and problem-solving session",
        },
      ],
      status: "DRAFT",
      steps: [
        {
          name: "Step 1",
          description: "Phone screening",
          renumeration: {
            value: 0,
            currency: "EUR",
          },
        },
        {
          name: "Step 2",
          description: "Paid technical task",
          renumeration: {
            value: 200,
            currency: "EUR",
          },
        },
      ],
      image:
        "http://localhost:5173/account/companies/b9df3be9-a92e-4071-8d46-d4f82ead2a16/create_job",
    };

    // Gestion de l'image
    if (jobData.value.image) {
      imagePreview.value = jobData.value.image;
    }
  } catch (err) {
    console.error("Erreur lors du chargement des données:", err);
  } finally {
  }
};

const handleFileUpload = async (e) => {
  toggleOpenModal();

  const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL;
  const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID;
  const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID;

  const files = Array.from(e.target.files);

  try {
    const uploadPromises = files.map(async (file) => {
      const data = await AppwriteuploadFile(file);

      if (data.isCreate) {
        const newFile = {
          url: `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`,
          title: data.file.$id,
          type: data.file.mimeType,
        };

        jobData.value.coverUrl = newFile.url;
        toggleOpenModal();
      } else {
        notyf.error(data.message);
        toggleOpenModal();
      }
    });

    await Promise.all(uploadPromises);
  } catch (error) {
    console.log(error);
    toggleOpenModal();
  } finally {
  }
};

const addDetail = () => {
  jobData.value.details.push({
    title: "",
    items: [""],
  });
};

const removeDetail = (index) => {
  jobData.value.details.splice(index, 1);
};

const addDetailItem = (detailIndex) => {
  if (!jobData.value.details[detailIndex].items) {
    jobData.value.details[detailIndex].items = [];
  }
  jobData.value.details[detailIndex].items.push("");
};

const removeDetailItem = (detailIndex, itemIndex) => {
  jobData.value.details[detailIndex].items.splice(itemIndex, 1);
};

// Methods for recruitment steps management
const addRecruitmentStep = () => {
  jobData.value.recruitment_steps.push({
    title: "",
    description: "",
  });
};

const removeRecruitmentStep = (index) => {
  jobData.value.recruitment_steps.splice(index, 1);
};

// Methods for steps management
const addStep = () => {
  jobData.value.steps.push({
    name: "",
    description: "",
    renumeration: {
      value: null,
      currency: "",
    },
  });
};

const removeStep = (index) => {
  jobData.value.steps.splice(index, 1);
};

// Methods for file management
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    selectedImage.value = file;

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);

    // Add to jobData
    jobData.value.image = file;
  } else {
    alert("Veuillez sélectionner un fichier image valide");
  }
};

const removeImage = () => {
  selectedImage.value = null;
  imagePreview.value = null;
  jobData.value.image = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

// Main actions
const previewJob = () => {
  showPreview.value = !showPreview.value;
};

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const updateJob = async () => {
  console.log("updat Jobs");
  console.log(jobData.value)
  toggleOpenModal();
  isSaving.value = true;

  try {
    console.log(route)
    const companyId=route?.params?.companyId
    const jobId=route?.params?.jobId
    const response=await auth.api('put',`/companies/${companyId}/jobs/${jobId}/update`,jobData,true)
    
    if(response.success){
      router.push({name:'companie_details',params:{companyId:companyId}})
    }
    
    toggleOpenModal();
  } catch (error) {
    console.error("Error updating job:", error);
    toggleOpenModal();
  }
  
  isSaving.value = false;
};

const cancelUpdate = () => {
  if (confirm("Êtes-vous sûr de vouloir annuler les modifications ?")) {
    emit("cancel");
  }
};

// Initialisation au montage du composant
onMounted(() => {
  fetchJobData();
});
</script>

<style scoped>
.prose {
  line-height: 1.7;
}

.prose h1 {
  margin-bottom: 1rem;
}

.prose h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
