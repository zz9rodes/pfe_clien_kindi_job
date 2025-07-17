<template>
  <div class="w-full min-h-screen bg-gray-50">
    <div class="max-w-4xl p-6 mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            Créer une offre d'emploi
          </h1>
          <p class="mt-1 text-gray-600">
            Publiez votre offre d'emploi avec tous les détails nécessaires
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="previewJob"
            class="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Aperçu
          </button>
          <button
            @click="saveJob"
            :disabled="isSaving"
            class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSaving ? "Sauvegarde..." : "Publier l'offre" }}
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
                placeholder="Ex : Développeur Frontend Senior, Chef de projet..."
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
                  >Type de contrat *</label
                >
                <select
                  v-model="jobData.job_type"
                  class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option
                    v-for="type in jobTypes"
                    :key="type.value"
                    :value="type.value"
                  >
                    {{ type.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Localisation -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 class="mb-4 text-xl font-semibold text-gray-900">Localisation</h2>
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
                >Genre *</label
              >
              <select
                v-model="jobData.gender"
                class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                required
              >
                <option value="">Sélectionner</option>
                <option
                  v-for="gender in genders"
                  :key="gender.value"
                  :value="gender.value"
                >
                  {{ gender.label }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Image d'illustration -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 class="mb-4 text-xl font-semibold text-gray-900">Image d'illustration</h2>
          <div class="space-y-4">
            <!-- File Input (hidden) -->
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileSelect"
              class="hidden"
            />
            
            <!-- Upload Area -->
            <div v-if="!imagePreview" class="p-8 text-center transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
              <div class="space-y-4">
                <div class="flex justify-center">
                  <ImageIcon class="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <h3 class="mb-2 text-lg font-medium text-gray-900">Ajouter une image</h3>
                  <p class="mb-4 text-gray-600">Téléchargez une image pour illustrer votre offre d'emploi</p>
                  <button
                    @click="triggerFileInput"
                    type="button"
                    class="px-6 py-2 bg-[#db147f] text-white rounded-lg hover:bg-[#c41370] transition-colors font-medium"
                  >
                    Choisir une image
                  </button>
                </div>
                <p class="text-sm text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
              </div>
            </div>
            
            <!-- Image Preview -->
            <div v-if="imagePreview" class="space-y-4">
              <div class="relative">
                <img 
                  :src="imagePreview" 
                  alt="Preview" 
                  class="object-cover w-full h-64 border border-gray-200 rounded-lg"
                />
                <button
                  @click="removeImage"
                  class="absolute p-2 text-white transition-colors bg-red-600 rounded-full top-2 right-2 hover:bg-red-700"
                >
                  <XIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div class="flex items-center gap-3">
                  <ImageIcon class="w-5 h-5 text-gray-600" />
                  <div>
                    <p class="font-medium text-gray-900">{{ selectedImage?.name }}</p>
                    <p class="text-sm text-gray-600">{{ (selectedImage?.size / 1024 / 1024).toFixed(2) }} MB</p>
                  </div>
                </div>
                <button
                  @click="triggerFileInput"
                  class="px-4 py-2 text-sm font-medium text-[#db147f] bg-white border border-[#db147f] rounded-lg hover:bg-[#db147f] hover:text-white transition-colors"
                >
                  Changer
                </button>
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
              Aucun détail ajouté. Ajoutez des sections pour détailler le poste.
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
                <h3 class="font-medium text-gray-900">Étape {{ index + 1 }}</h3>
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
                <h3 class="font-medium text-gray-900">Étape {{ index + 1 }}</h3>
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
                    <label class="block mb-1 text-sm font-medium text-gray-700"
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
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="fixed inset-0 z-50 bg-black/50">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div
          class="w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[95vh] overflow-hidden"
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
    </div>
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

// Reactive data
const isSaving = ref(false);
const showPreview = ref(false);

const selectedImage = ref(null)
const imagePreview = ref(null)
const fileInput = ref(null)

// Job data structure based on validation schema
const jobData = ref({
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
  image: null,
});

// Options data
const jobTypes = ref([
  { value: "full_time", label: "Temps plein" },
  { value: "part_time", label: "Temps partiel" },
  { value: "contract", label: "Contrat" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Stage" },
]);

const currencies = ref([
  { value: "EUR", label: "EUR (€)" },
  { value: "USD", label: "USD ($)" },
  { value: "XAF", label: "XAF (FCFA)" },
  { value: "GBP", label: "GBP (£)" },
]);

const genders = ref([
  { value: "all", label: "Tous" },
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
]);

const jobStatuses = ref([
  { value: "draft", label: "Brouillon" },
  { value: "active", label: "Actif" },
  { value: "paused", label: "En pause" },
  { value: "closed", label: "Fermé" },
]);

// Computed properties
const tomorrow = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
});

// Methods for details management
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
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedImage.value = file
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    
    // Add to jobData
    jobData.value.image = file
  } else {
    alert('Veuillez sélectionner un fichier image valide')
  }
}

const removeImage = () => {
  selectedImage.value = null
  imagePreview.value = null
  jobData.value.image = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

// Main actions
const previewJob = () => {
  showPreview.value = true;
};

const saveJob = async () => {
  isSaving.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clean up empty arrays and null values
    const cleanedJobData = {
      ...jobData.value,
      details: jobData.value.details
        .filter(
          (detail) =>
            detail.title &&
            detail.items &&
            detail.items.some((item) => item.trim())
        )
        .map((detail) => ({
          ...detail,
          items: detail.items.filter((item) => item.trim()),
        })),
      recruitment_steps: jobData.value.recruitment_steps.filter(
        (step) => step.title
      ),
      steps: jobData.value.steps.filter(
        (step) => step.name && step.description
      ),
    };

    console.log("Job saved:", cleanedJobData);
    alert("Offre d'emploi publiée avec succès !");
  } catch (error) {
    console.error("Error saving job:", error);
    alert("Erreur lors de la publication");
  } finally {
    isSaving.value = false;
  }
};

// Initialize with some default data
onMounted(() => {
  // Set default status
  jobData.value.status = "draft";
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
