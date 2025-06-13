<template>
  <div class="w-full min-h-screen bg-gray-50">
    <AppModal :isOpen="isModalOpen" :isLoader="true"> </AppModal>

    <div class="max-w-4xl p-6 mx-auto">
      <form @submit.prevent="saveJobOffer">
        <!-- Header with Save Button -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Create a Job Offer</h1>
            <p class="mt-1 text-gray-600">
              Post your job offer and find the ideal candidate
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
                        <button
            type="button"
            @click.prevent="previewJob"
            class="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Aperçu
          </button>

          <button
            type="submit"
            :disabled="isSaving"
            class="px-6 py-2 font-medium text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#db147f] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSaving ? "Saving..." : "Publish Offer" }}
          </button>
          </div>


        </div>

        <div class="space-y-6">
          <!-- Basic Information -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-900">
              General Information
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Job Title *</label
                >
                <input
                  required
                  v-model="jobOffer.title"
                  type="text"
                  placeholder="E.g., Senior Frontend Developer"
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                />
              </div>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Country</label
                  >
                  <input
                    required
                    v-model="jobOffer.country"
                    type="text"
                    placeholder="E.g., France"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >City</label
                  >
                  <input
                    required
                    v-model="jobOffer.city"
                    type="text"
                    placeholder="E.g., Paris"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  />
                </div>
              </div>

              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Job Description *</label
                >
                <textarea
                  required
                  v-model="jobOffer.description"
                  placeholder="Describe the job, responsibilities, work environment..."
                  rows="4"
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Industry *</label
                  >
                  <input
                    required
                    v-model="jobOffer.industries"
                    type="text"
                    placeholder="E.g., Technology, Finance, Healthcare..."
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Job Type *</label
                  >
                  <select
                    id="jobType"
                    required
                    v-model="jobOffer.job_type"
                    class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  >
                    <option value="">select a job type</option>
                    <option
                      v-for="job_type in jobTypes"
                      :key="job_type"
                      :value="job_type"
                    >
                      {{ job_type.toLocaleLowerCase() }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Salary and Requirements -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-900">
              Salary and Requirements
            </h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div class="md:col-span-2">
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Salary</label
                  >
                  <input
                    required
                    v-model.number="jobOffer.price.value"
                    type="number"
                    placeholder="50000"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Currency</label
                  >
                  <select
                    required
                    v-model="jobOffer.price.currency"
                    class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD (C$)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Years of Experience Required</label
                  >
                  <input
                    required
                    v-model.number="jobOffer.years_experience"
                    type="number"
                    min="0"
                    placeholder="3"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700"
                    >Gender</label
                  >
                  <select
                    id="jobType"
                    required
                    v-model="jobOffer.gender"
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

              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Required Skills</label
                >
                <textarea
                  required
                  v-model="jobOffer.skill_required"
                  placeholder="E.g., Vue.js, JavaScript, CSS, Git..."
                  rows="2"
                  class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                ></textarea>
              </div>

              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700"
                  >Application Deadline</label
                >
                <input
                  required
                  v-model="jobOffer.last_date"
                  type="date"
                  class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                />
              </div>
            </div>
          </div>

          <!-- Job Details -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900">Job Details</h2>
              <button
                @click="addDetail"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                + Add Section
              </button>
            </div>
            <div class="space-y-4">
              <div
                v-for="(detail, index) in jobOffer.details"
                :key="index"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center justify-between mb-3">
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
                <div class="space-y-3">
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Section Title</label
                    >
                    <input
                      required
                      v-model="detail.title"
                      type="text"
                      placeholder="E.g., Responsibilities, Benefits, Qualifications..."
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Items</label
                    >
                    <div class="space-y-2">
                      <div
                        v-for="(item, itemIndex) in detail.items"
                        :key="itemIndex"
                        class="flex items-center gap-2"
                      >
                        <input
                          required
                          v-model="detail.items[itemIndex]"
                          type="text"
                          placeholder="E.g., Develop user interfaces..."
                          class="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                        />
                        <button
                          @click="removeDetailItem(index, itemIndex)"
                          class="p-2 text-red-600 hover:text-red-700"
                        >
                          <XIcon class="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        @click="addDetailItem(index)"
                        class="text-sm font-medium text-[#db147f] hover:text-[#db147f]"
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recruitment Steps -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900">
                Recruitment Steps
              </h2>
              <button
                @click="addRecruitmentStep"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                + Add Step
              </button>
            </div>
            <div class="space-y-4">
              <div
                v-for="(step, index) in jobOffer.recruitment_steps"
                :key="index"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-medium text-gray-900">
                    Step {{ index + 1 }}
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
                      >Step Title</label
                    >
                    <input
                      required
                      v-model="step.title"
                      type="text"
                      placeholder="E.g., Phone Interview, Technical Test..."
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Description</label
                    >
                    <textarea
                      required
                      v-model="step.description"
                      placeholder="Describe this recruitment process step..."
                      rows="2"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Process Steps -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900">Process Steps</h2>
              <button
                @click="addProcessStep"
                class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                + Add Step
              </button>
            </div>
            <div class="space-y-4">
              <div
                v-for="(step, index) in jobOffer.steps"
                :key="index"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-medium text-gray-900">
                    Process {{ index + 1 }}
                  </h3>
                  <button
                    @click="removeProcessStep(index)"
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
                        >Step Name</label
                      >
                      <input
                        required
                        v-model="step.name"
                        type="text"
                        placeholder="E.g., Initial Training"
                        class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                      />
                    </div>
                    <div>
                      <label
                        class="block mb-1 text-sm font-medium text-gray-700"
                        >Compensation</label
                      >
                      <div class="flex gap-2">
                        <input
                          required
                          v-model.number="step.renumeration.value"
                          type="number"
                          placeholder="1000"
                          class="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                        />
                        <select
                          required
                          v-model="step.renumeration.currency"
                          class="px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                        >
                          <option value="EUR">EUR</option>
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                          <option value="CAD">CAD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700"
                      >Description</label
                    >
                    <textarea
                      required
                      v-model="step.description"
                      placeholder="Describe this process step..."
                      rows="2"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f]"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Job Cover -->
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

              <div v-if="jobOffer.coverUrl">
                <div class="mt-4">
                  <img
                    :src="jobOffer.coverUrl"
                    class="h-[200px] object-cover rounded-lg object-center"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Status -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-4 text-xl font-semibold text-gray-900">
              Offer Status
            </h2>
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700"
                >Status *</label
              >

              <select
                id="jobType"
                required
                v-model="jobOffer.status"
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

    <!-- Preview Modal -->
    <AppModal
      @close-modal="previewJob"
      :isOpen="showPreview"
      :isLoader="false"
    >
      <div class="flex items-center md:w-[80%] w-[95%] justify-center">
        <div
          class="w-full  bg-white rounded-lg shadow-xl max-h-[95vh] overflow-hidden"
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
            <JobPreview :jobData="jobOffer" />
          </div>
        </div>
      </div>
    </AppModal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UploadIcon, XIcon } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import { AppwriteuploadFile } from "@/app_write/files";
import { Notyf } from "notyf";
import JobPreview from "./JobPreview.vue";
import AppModal from "@/components/globales/AppModal.vue";

// Reactive data

const router = useRouter();
const route = useRoute();
const isSaving = ref(false);
const showPreview = ref(false);

const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 4000 });

const jobTypes = ref(["CDI", "INTERNSHIP", "FREELANCE"]);

const Genders = ref(["MALE", "FEMALE", "BOTH"]);

const jobStatus = ref(["OPEN", "CLOSE", "DRAFT"]);

const isModalOpen = ref(false);

const previewJob = () => {
  showPreview.value = !showPreview.value;
};

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};
const auth = useAuthStore();

const jobOffer = ref({
  title: "",
  country: "",
  coverUrl: null,
  city: "",
  description: "",
  industries: "",
  job_type: "",
  price: {
    value: null,
    currency: "EUR",
  },
  details: [],
  years_experience: null,
  skill_required: "",
  last_date: "",
  gender: "",
  recruitment_steps: [],
  status: "DRAFT",
  steps: [],
});

const addDetail = () => {
  jobOffer.value.details.push({
    title: "",
    items: [""],
  });
};

const removeDetail = (index) => {
  jobOffer.value.details.splice(index, 1);
};

const addDetailItem = (detailIndex) => {
  jobOffer.value.details[detailIndex].items.push("");
};

const removeDetailItem = (detailIndex, itemIndex) => {
  jobOffer.value.details[detailIndex].items.splice(itemIndex, 1);
};

// Recruitment steps methods
const addRecruitmentStep = () => {
  jobOffer.value.recruitment_steps.push({
    title: "",
    description: "",
  });
};

const removeRecruitmentStep = (index) => {
  jobOffer.value.recruitment_steps.splice(index, 1);
};

// Process steps methods
const addProcessStep = () => {
  jobOffer.value.steps.push({
    name: "",
    description: "",
    renumeration: {
      value: null,
      currency: "EUR",
    },
  });
};

const removeProcessStep = (index) => {
  jobOffer.value.steps.splice(index, 1);
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

        jobOffer.value.coverUrl=newFile.url
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

// Save job offer
const saveJobOffer = async () => {
  isSaving.value = true;
  toggleOpenModal();

  try {
    let companyId = route.params.companyId;
    const response = await auth.api(
      "post",
      `/companies/${companyId}/jobs/create`,
      jobOffer.value,
      true
    );
    if(response.success){
      router.push({name:'companie_details',params:{companyId:route.params.companyId}})
    }
    toggleOpenModal();
    // Show success message
  } catch (error) {
    console.error("Error saving job offer:", error);
    toggleOpenModal();
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>