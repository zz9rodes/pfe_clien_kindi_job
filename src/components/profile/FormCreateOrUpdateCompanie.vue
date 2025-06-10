<template>
  <AppModal :isOpen="isUploading" :isLoader="true"> </AppModal>
  <div class="">
    <div class="flex items-center justify-between mb-8">
      <h1 class="hidden font-bold text-gray-900 sm:text-xl md:text-3xl">
        {{ props.isVersion ? "Edit Company Information" : "Company Information" }}
      </h1>
    </div>

    <form @submit.prevent="SaveCompanieChange" class="space-y-8 ">
      <div class="flex gap-3">
        <button @click="CancelCompanieChange" type="button"
          class="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
          <X class="sm:hidden" />
          <span class="hidden sm:block">Cancel</span>
        </button>
        <button type="submit" :disabled="isUploading"
          class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <Save class="sm:hidden" />
          <span class="hidden sm:block">
            {{ props.isUpdate ? "Update Changes" : "Save Changes" }}
          </span>
        </button>
         <button @click.prevent="SaveCompanieChange"
          class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors">
          <Save class="sm:hidden" />
          <span class="hidden sm:block"> Save Changes </span>
        </button>
      </div>
      <!-- Company Logo & Cover -->
      <div class="p-6 bg-white border rounded-lg">
        <h3 class="mb-6 text-lg font-medium text-gray-900">Company Branding</h3>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Company Logo -->
          <div>
            <label class="block mb-3 text-sm font-medium text-gray-700">Company Logo</label>
            <div class="flex items-center space-x-4">
              <div class="w-20 h-20 rounded-lg">
                <img class="rounded-lg size-full" v-if="companyForm.avatarUrl" :src="companyForm.avatarUrl" alt="" />
                <div v-else
                  class="flex items-center justify-center bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg size-full">
                  <BuildingIcon class="w-8 h-8 text-gray-400" />
                </div>
              </div>

              <input @change="(e) => handleFileUpload(e, 'avatar')" type="file" accept="image/*" class="hidden"
                name="logo_image" id="logo_image" />
              <div>
                <label for="logo_image">
                  <span type="button"
                    class="bg-[#fff0fb] cursor-pointer text-[#db147f] px-4 py-2 rounded-lg hover:bg-[#ffe6f7] transition-colors flex items-center">
                    <UploadIcon class="w-4 h-4 mr-2" />
                    Upload Logo
                  </span>
                  <p class="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </label>
              </div>
            </div>
          </div>

          <!-- Cover Image -->
          <div>
            <input class="hidden" type="file" name="" accept="image/*" id="cover_image"
              @change="(e) => handleFileUpload(e, 'cover')" />
            <label for="cover_image" class="block mb-3 text-sm font-medium text-gray-700 cursor-pointer">
              <span> Cover Image </span>
              <div
                class="flex items-center justify-center w-full h-20 bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg">
                <img class="h-full rounded-lg" v-if="companyForm.coverUrl" :src="companyForm.coverUrl" alt="" />
                <div v-else class="text-center">
                  <UploadIcon class="w-6 h-6 mx-auto mb-1 text-gray-400" />
                  <p class="text-xs text-gray-500">Upload Cover</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="p-6 bg-white border rounded-lg">
        <h3 class="mb-6 text-lg font-medium text-gray-900">
          Basic Information
        </h3>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Company Name *</label>
            <input type="text" v-model="companyForm.name"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="Enter company name" required />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Industry *</label>
            <input v-model="companyForm.industry"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="Enter Industry" required />
          </div>

          <div class="md:col-span-2">
            <label class="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea required v-model="companyForm.description" rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="Describe your company..."></textarea>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input required type="email" v-model="companyForm.email"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="company@example.com" />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <input required type="tel" v-model="companyForm.phoneNumber"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="+1 (555) 000-0000" />
          </div>
        </div>
      </div>

      <!-- Location Information -->
      <div class="p-6 bg-white border rounded-lg">
        <h3 class="flex items-center justify-between mb-6 text-lg font-medium text-gray-900">
          <span class="flex items-center">
            <MapPinIcon class="w-5 h-5 mr-2 text-[#db147f]" />
            Location Information
          </span>

          <button type="button" @click="Userlocation" :class="[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            ActiveLocation ? 'bg-[#db147f]' : 'bg-gray-200 ',
          ]">
            <span :class="[
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              ActiveLocation ? 'translate-x-6' : 'translate-x-1',
            ]" />
          </button>
        </h3>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Country *</label>
            <input v-model="companyForm.country"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              required placeholder="Enter country" />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">City *</label>
            <input type="text" v-model="companyForm.city"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="Enter city" required />
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Primary Language *</label>
            <select v-model="companyForm.firstLangage"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              required>
              <option value="">Select your first language</option>
              <option v-for="language in languesProfessionnelles" :key="language" :value="language">
                {{ language }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Social Status</label>
            <input v-model="companyForm.socialStatus"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="Enter Social Status" type="text" />
          </div>

          <div class="md:col-span-2">
            <label class="block mb-2 text-sm font-medium text-gray-700">Address</label>
            <textarea v-model="companyForm.address" rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="Enter full address..."></textarea>
          </div>
        </div>
      </div>

      <!-- Legal Information -->
      <div class="p-6 bg-white border rounded-lg">
        <h3 class="mb-6 text-lg font-medium text-gray-900">
          Legal Information
        </h3>

        <div class="flex flex-col gap-5">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700">Registration Number</label>
            <input required type="text" v-model="companyForm.registrationNumber"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
              placeholder="Enter registration number" />
          </div>

          <div>
            <span for="certificateOfIncorporation" class="block mb-2 text-sm font-medium text-gray-700">Certificate of
              Incorporation
              <span class="text-red-400">*</span>
            </span>

            <div class="flex justify-between gap-4">
              <label for="certificateOfIncorporation"
                class="flex items-center justify-center w-20 h-20 bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                <File class="w-8 h-8" :class="companyForm.certificateOfIncorporation
                  ? 'text-[#db147f]'
                  : 'text-gray-400'
                  " />
              </label>
              <input   type="file" id="certificateOfIncorporation"
                @change="(e) => handleFileUpload(e, 'certificate')" accept="application/pdf"
                class="flex-1 mb-2 hidden px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
                placeholder="Certificate number" />
            </div>
              <a
              v-if="companyForm.certificateOfIncorporation"
                :href="companyForm.certificateOfIncorporation"
                target="_blank"
                class="inline-flex items-center px-4 py-2 mt-2 text-blue-700 transition-colors duration-200 rounded-lg bg-blue-50 hover:bg-blue-100"
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Voir le certificat
              </a>
          </div>
        </div>
      </div>

      <!-- Company Status -->
      <div class="p-6 bg-white border rounded-lg">
        <h3 class="mb-6 text-lg font-medium text-gray-900">Company Status</h3>

        <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
          <div>
            <h4 class="font-medium text-gray-900">Active Status</h4>
            <p class="text-sm text-gray-600">
              Enable this to make your company profile visible
            </p>
          </div>
          <button type="button" :class="[
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            companyForm.isActive
              ? 'bg-[#db147f]'
              : 'bg-gray-200 cursor-not-allowed',
          ]">
            <span :class="[
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              companyForm.isActive ? 'translate-x-6' : 'translate-x-1',
            ]" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { Notyf } from "notyf";
import AppModal from "../globales/AppModal.vue";
import {
  UploadIcon,
  BuildingIcon,
  MapPinIcon,
  File,
  X,
  Save,
} from "lucide-vue-next";
import { languesProfessionnelles } from "@/helpers/language";
import { AppwriteuploadFile } from "@/app_write/files";
import { useAuthStore } from "@/stores/auth";

const emits = defineEmits(["close-form", "version-saved", "request-saved"]);

const props = defineProps({
  versionData: {
    type: Object,
    default: null,
  },
  isVersion: {
    type: Boolean,
    default: false,
  },
  isUpdate:{
     type: Boolean,
     default: false,
  }
});

const ActiveLocation = ref(false);
const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 4000 });
const isUploading = ref(false);
const company=ref({})

const auth = useAuthStore();
const companyForm = ref({
  name: "",
  industry: "",
  description: "",
  email: "",
  phoneNumber: "",
  address: "",
  firstLangage: "",
  country: "",
  city: "",
  avatarUrl: null,
  coverUrl: null,
  socialStatus: "",
  registrationNumber: "",
  certificateOfIncorporation: null,
  isActive: false,
});

const initializeForm = () => {
  if (props.isVersion && props.versionData) {
    Object.keys(companyForm.value).forEach((key) => {
      if (props.versionData[key] !== undefined) {
        companyForm.value[key] = props.versionData[key];
      }
    });
  }
};

onMounted(() => {
  initializeForm();
});

const toggleLoader = () => {
  isUploading.value = !isUploading.value;
};

console.log(auth?.user);

const validateForm = () => {
  const requiredFields = [
    "name",
    "industry",
    "description",
    "email",
    "phoneNumber",
    "country",
    "city",
    "registrationNumber",
  ];

  for (const field of requiredFields) {
    if (!companyForm.value[field] || companyForm.value[field].trim() === "") {
      notyf.error(
        `Please fill in the ${field
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} field`
      );
      return false;
    }
  }

  if (!companyForm.value.certificateOfIncorporation) {
    notyf.error("Please upload the certificate of incorporation");
    return false;
  }

  return true;
};

const SaveCompanieChange = async () => {
if(true){
  companyForm.value = {
      name: "Acme Corporation",
      industry: "Technology",
      description: "Leading provider of innovative tech solutions worldwide.",
      email: "contact@acmecorp.com",
      phoneNumber: "+1 (555) 123-4567",
      address: "123 Silicon Avenue, Tech City, USA",
      firstLangage: "Anglais",
      country: "United States",
      city: "San Francisco",
      avatarUrl:
        "https://i.pinimg.com/736x/c0/1f/08/c01f08228303f3903fd8867c575a1956.jpg",
      coverUrl:
        "https://i.pinimg.com/736x/f8/98/74/f89874787ec776950bbc0173ce61febd.jpg",
      socialStatus: "Private Company",
      registrationNumber: "ACM-2023-001",
      certificateOfIncorporation:
        "https://fra.cloud.appwrite.io/v1/storage/buckets/6662f3050006440b1ab2/files/j8dV781g.OPygkLXCcKo4FIUZeUApmlQaQLT/view?project=6660582f001665b39635&mode=admin", // PDF à uploader manuellement
      isActive: false,
      slug: auth?.user?.account?.slug
  }
}
  
  console.log("dans le SaveCompanieChange ")
  if (!validateForm()) {
    return;
  }
  
  try {
    isUploading.value = true;

    let data;
    if (props.isVersion) {

      if (props.versionData) {
        data = await auth.api(
          "put",
          `/company_request/${props.versionData.slug}/update/`,
          companyForm
        );
      }
      else {

        console.log("rodes la start")
        
        data = await auth.api(
          "post",
          `/companies/${auth.userCompany.companies[0].slug}/companies_versions/create`,
          companyForm
        );
      }

    } else {
      console.log("juste un goozomor")
      data = await auth.api("post", "/company_request/create", companyForm);
      if (data.success && data.data) {
        console.log(companyForm.value)
        emits("request-saved", companyForm.value);
      }
      emits('close-form')
    }

  } catch (error) {
    console.error("Error saving company:", error);
    notyf.error("Error saving company information");
  } finally {
    isUploading.value = false;
  }
};

const CancelCompanieChange = () => {
  emits("close-form");
};

const Userlocation = () => {
  if (!ActiveLocation.value) {
    getGeolocation();
  } else {
    ActiveLocation.value = false;
  }
};

async function getGeolocation() {
  console.log("Gesolocation");
  if (navigator.geolocation) {
    console.log("le vanigateur gere la georlocatlisation");
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      ActiveLocation.value = true;
      console.log("le user a valider");
      console.log(position);

      await fetchLocationInfo(
        position.coords.latitude.toString(),
        position.coords.longitude.toString()
      );
    } catch (error) {
      ActiveLocation.value = false;
      console.log(error);
      console.log("le User a refuser ca ici");
      notyf.error("We Cannot Use Your Location Now , try to permit it");

      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        default:
          console.error("An unknown error occurred:", error.message);
      }
    }
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

async function fetchLocationInfo(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    console.log(data);

    companyForm.value.address = data.display_name || "";
    companyForm.value.country = data.address.country || "";
    companyForm.value.city =
      data.address.city || data.address.town || data.address.village || "";
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}

const handleFileUpload = async (e, type) => {
  toggleLoader();

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

        if (type === "avatar") {
          companyForm.value.avatarUrl = newFile.url;
          console.log(companyForm.value.avatarUrl);
        } else if (type ==="cover") {
          companyForm.value.coverUrl = newFile.url;
          console.log(companyForm.value.coverUrl);
        } else {
          console.log("on a uploade les certificateOfIncorporation ")
          companyForm.value.certificateOfIncorporation = newFile.url;
        }
      } else {
        notyf.error(data.message);
      }
    });

    await Promise.all(uploadPromises);
  } catch (error) {
    console.log(error);
  } finally {
    toggleLoader();
  }
};
</script>

<style></style>
