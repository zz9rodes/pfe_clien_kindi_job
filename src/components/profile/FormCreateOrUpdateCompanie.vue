<template>
    <div>
        <div class="flex items-center justify-between mb-8">
            <h1 class="hidden font-bold text-gray-900 sm:text-xl md:text-3xl">Company Information</h1>
            <div class="flex gap-3">
                <button @click="CancelCompanieChange"
                    class="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
                    <X class=" sm:hidden"/>
                    

                    <span class="hidden sm:block">
                       Cancel
                  </span>
                </button>
                <button @click="SaveCompanieChange"
                    class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors">
                  <Save class="sm:hidden"/>
                  <span class="hidden sm:block">
                       Save Changes
                  </span>
                </button>
            </div>
        </div>

        <form @submit.prevent="saveCompanyInfo" class="space-y-8">
            <!-- Company Logo & Cover -->
            <div class="p-6 bg-white border rounded-lg">
                <h3 class="mb-6 text-lg font-medium text-gray-900">Company Branding</h3>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- Company Logo -->
                    <div>
                        <label class="block mb-3 text-sm font-medium text-gray-700">Company Logo</label>
                        <div class="flex items-center space-x-4">
                            <div
                                class="flex items-center justify-center w-20 h-20 bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg">
                                <BuildingIcon class="w-8 h-8 text-gray-400" />
                            </div>
                            <input type="file" class="hidden " name="logo_image" id="logo_image">
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
                        <input class="hidden" type="file" name="" id="cover_image" />
                        <label for="cover_image" class="block mb-3 text-sm font-medium text-gray-700 cursor-pointer">
                            <span> Cover Image </span>
                            <div
                                class="flex items-center justify-center w-full h-20 bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg">
                                <div class="text-center ">
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
                        <textarea v-model="companyForm.description" rows="4"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
                            placeholder="Describe your company..."></textarea>
                    </div>

                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input type="email" v-model="companyForm.email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
                            placeholder="company@example.com" />
                    </div>

                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" v-model="companyForm.phone_number"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
                            placeholder="+1 (555) 000-0000" />
                    </div>
                </div>
            </div>

            <!-- Location Information -->
            <div class="p-6 bg-white border rounded-lg">
                <h3 class="flex items-center justify-between mb-6 text-lg font-medium text-gray-900">
                    <span class="flex items-center ">
                         <MapPinIcon class="w-5 h-5 mr-2 text-[#db147f]" />
                        Location Information
                    </span>
                   

                     <button type="button" @click="Userlocation"  :class="[
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
                        <select v-model="companyForm.first_langage"
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
                        <input v-model="companyForm.social_status"
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
                        <input type="text" v-model="companyForm.registration_nnumber"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
                            placeholder="Enter registration number" />
                    </div>

                    <div>
                        <span for="certificate_of_incorporation"
                            class="block mb-2 text-sm font-medium text-gray-700">Certificate of Incorporation</span>

                        <div class="flex justify-between gap-4">

                            <label for="certificate_of_incorporation"
                                class="flex items-center justify-center w-20 h-20 bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                                <File class="w-8 h-8 text-gray-400" />
                            </label>
                            <input type="file" id="certificate_of_incorporation"
                                :v-model="companyForm.certificate_of_incorporation"
                                class="flex-1  mb-2 hidden px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] outline-none focus:border-transparent"
                                placeholder="Certificate number" />
                          
                        </div>


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
                    <button type="button"  :class="[
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        companyForm.is_active ? 'bg-[#db147f]' : 'bg-gray-200 cursor-not-allowed',
                    ]">
                        <span :class="[
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                            companyForm.is_active ? 'translate-x-6' : 'translate-x-1',
                        ]" />
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

import { UploadIcon, BuildingIcon,MapPinIcon, File ,X ,Save} from "lucide-vue-next";
import { languesProfessionnelles } from "@/helpers/language";

const emits = defineEmits();

const ActiveLocation=ref(false)


const companyForm = ref({
    name: "",
    industry: "",
    description: "",
    email: "",
    phone_number: "",
    address: "",
    first_langage: "",
    country: "",
    city: "",
    avatar_url: "",
    cover_url: "",
    social_status: "",
    registration_nnumber: "",
    certificate_of_incorporation: "",
    is_active: false,
});

const saveCompanyInfo = () => {
    console.log("Saving company info:", companyForm.value);
    // Logique de sauvegarde ici
};

const SaveCompanieChange = () => {
    emits("close-form");
};

const CancelCompanieChange = () => {
    emits("close-form");
};

const Userlocation=()=>{
    if(!ActiveLocation.value){
        getGeolocation()
    }else{
        ActiveLocation.value=false
    }
}

async function getGeolocation() {
    console.log("Gesolocation")
  if (navigator.geolocation) {
    console.log("le vanigateur gere la georlocatlisation")
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      
      ActiveLocation.value=true
      console.log("le user a valider")
      console.log(position)
      
      await fetchLocationInfo(
        position.coords.latitude.toString(),
        position.coords.longitude.toString()
      );
    } catch (error) {
     ActiveLocation.value=false
     console.log(error)
        console.log("le User a refuser ca ici")
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

</script>

<style></style>