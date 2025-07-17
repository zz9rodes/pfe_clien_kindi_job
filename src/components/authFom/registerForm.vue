<template>
    <AppModal  :isOpen="isModalOpen" :isLoader="true">
  </AppModal>
  <div class="flex min-h-screen">
    <!-- Left Side - Brand Section -->
    <div class="relative hidden lg:flex lg:w-2/5 bg-gradient-to-br from-amber-50 to-orange-100">
      <div class="flex flex-col justify-between w-full p-12">
        <!-- Illustration and Content -->
        <div class="flex flex-col justify-center flex-1 space-y-8">
          <div class="flex justify-center">
            <div class="relative">
              <div class="relative w-80 h-80">
                <!-- Background -->
                <div class="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 to-blue-100 opacity-20">
                </div>
                <!-- Career growth elements -->
                <div
                  class="absolute flex items-center justify-center w-16 h-16 transform bg-white rounded-md shadow-lg top-8 left-8 rotate-12">
                  <UserPlus class="w-8 h-8 text-green-600" />
                </div>
                <div
                  class="absolute flex items-center justify-center w-20 transform bg-white rounded-md shadow-lg top-16 right-12 h-14 -rotate-6">
                  <Award class="w-8 h-8 text-purple-600" />
                </div>
                <div
                  class="absolute flex items-center justify-center transform bg-white rounded-md shadow-lg bottom-20 left-12 w-18 h-18 rotate-6">
                  <Rocket class="w-8 h-8 text-blue-600" />
                </div>
                <div
                  class="absolute flex items-center justify-center w-16 h-16 transform bg-white rounded-md shadow-lg bottom-8 right-8 -rotate-12">
                  <Star class="w-8 h-8 text-amber-600" />
                </div>
                <!-- Central element -->
                <div
                  class="absolute flex items-center justify-center w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 bg-[#e4097f] rounded-full shadow-xl top-1/2 left-1/2">
                  <UserCheck class="w-12 h-12 text-white" />
                </div>
                <!-- Connecting lines -->
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                  <path d="M80 80 L160 160 M240 80 L160 160 M80 240 L160 160 M240 240 L160 160" stroke="#e5e7eb"
                    stroke-width="2" stroke-dasharray="5,5" opacity="0.5" />
                </svg>
              </div>
            </div>
          </div>
          <!-- Text Content -->
          <div class="space-y-4">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">
              Join the community of ambitious professionals
            </h1>
            <p class="text-lg leading-relaxed text-gray-600">
              Create your profile in minutes and access thousands of job opportunities tailored to your skills and aspirations.
            </p>
          </div>
        </div>
        <!-- Footer Links -->
        <div class="flex space-x-6 text-sm">
          <a href="#" class="text-gray-600 transition-colors hover:text-gray-900">Privacy Policy</a>
          <span class="text-gray-400">•</span>
          <a href="#" class="text-gray-600 transition-colors hover:text-gray-900">Terms of Use</a>
        </div>
      </div>
    </div>

    <!-- Right Side - Register Form -->
    <div class="flex items-center justify-center flex-1 p-8 bg-white">
      <div class="w-full max-w-md space-y-8">
        <div class="space-y-2 text-center">
          <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
          <p class="text-gray-600">Step {{ currentStep }} / {{ totalSteps }}</p>
        </div>

        <!-- Step Content -->
        <div class="space-y-6">
          <!-- Step 1: Basic Info -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div class="text-center">
              <h3 class="text-xl font-semibold text-gray-900">
                Basic Information
              </h3>
              <p class="mt-1 text-gray-600">
                Let's start with your personal information
              </p>
            </div>
            <div class="relative space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email <span class="text-red-500">*</span>
              </label>
              <input id="email" v-model="formData.email" type="email" placeholder="john.doe@company.com"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                required />
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.email">{{
                formErrors.email[0]
              }}</span>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="relative space-y-2">
                <label for="firstName" class="block text-sm font-medium text-gray-700">
                  First Name <span class="text-red-500">*</span>
                </label>
                <input id="firstName" v-model="formData.firstName" placeholder="John"
                  class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                  required />
                <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.firstName">{{
                  formErrors.firstName[0] }}</span>
              </div>
              <div class="relative space-y-2">
                <label for="lastName" class="block text-sm font-medium text-gray-700">
                  Last Name <span class="text-red-500">*</span>
                </label>
                <input id="lastName" v-model="formData.lastName" placeholder="Doe"
                  class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                  required />
                <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.lastName">{{
                  formErrors.lastName[0]
                }}</span>
              </div>
            </div>
            <div class="relative space-y-2">
              <label for="phoneNumber" class="block text-sm font-medium text-gray-700">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input id="phoneNumber" v-model="formData.phoneNumber" type="tel" placeholder="+1234567890"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                required />
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.phoneNumber">{{
                formErrors.phoneNumber[0] }}</span>
            </div>
            <div class="relative space-y-2">
              <label for="dob" class="block text-sm font-medium text-gray-700">
                Date of Birth <span class="text-red-500">*</span>
              </label>
              <input id="dob" v-model="formData.dob" type="date"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                required />
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.dob">{{
                formErrors.dob[0] }}</span>
            </div>
          </div>

          <!-- Step 2: Professional Info -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div class="text-center">
              <h3 class="text-xl font-semibold text-gray-900">
                Professional Profile
              </h3>
              <p class="mt-1 text-gray-600">Help us get to know you better</p>
            </div>
            <div class="relative space-y-2">
              <label for="city" class="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input id="city" v-model="formData.country" placeholder="Yaoundé, Douala, Bamenda..."
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]" />
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.country">{{
                formErrors.country[0]
              }}</span>
            </div>
            <div class="relative space-y-2">
              <label for="city" class="block text-sm font-medium text-gray-700">
                City
              </label>
              <input id="city" v-model="formData.city" placeholder="Yaoundé, Douala, Bamenda..."
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]" />
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.city">{{
                formErrors.city[0]
              }}</span>
            </div>
            <div class="relative space-y-2">
              <label for="address" class="block text-sm font-medium text-gray-700">
                Full Address
              </label>
              <input id="address" v-model="formData.location.title" placeholder="123 Main St, Yaoundé, Cameroon"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]" />
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.address">{{
                formErrors.address[0]
              }}</span>
            </div>
            <div class="relative space-y-2">
              <label for="firstLangage" class="block text-sm font-medium text-gray-700">
                First Language <span class="text-red-500">*</span>
              </label>
              <select id="firstLangage" v-model="formData.firstLangage"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                required>
                <option value="">Select your first language</option>
                <option v-for="language in languesProfessionnelles" :key="language" :value="language">
                  {{ language }}
                </option>
              </select>
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.firstLangage">{{
                formErrors.firstLangage[0] }}</span>
            </div>
            <div class="relative space-y-2">
              <label for="secondLangage" class="block text-sm font-medium text-gray-700">
                Second Language
              </label>
              <select id="secondLangage" v-model="formData.secondLangage"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]">
                <option value="">Select your second language</option>
                <option v-for="language in languesProfessionnelles" :key="language" :value="language">
                  {{ language }}
                </option>
              </select>
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.secondLangage">{{
                formErrors.secondLangage[0] }}</span>
            </div>
          </div>

          <!-- Step 3: Security -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div class="text-center">
              <h3 class="text-xl font-semibold text-gray-900">Security</h3>
              <p class="mt-1 text-gray-600">Create a secure password</p>
            </div>
            <div class="relative space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input id="password" v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••••"
                  class="w-full px-4 py-2 pr-12 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                  required />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600">
                  <EyeOff v-if="showPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.password">{{
                formErrors.password[0]
              }}</span>
            </div>
            <div class="relative space-y-2">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Confirm Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input id="confirmPassword" v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'" placeholder="••••••••••••"
                  class="w-full px-4 py-2 pr-12 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                  required />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600">
                  <EyeOff v-if="showConfirmPassword" class="w-5 h-5" />
                  <Eye v-else class="w-5 h-5" />
                </button>
              </div>
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.confirmPassword">{{
                formErrors.confirmPassword[0] }}</span>
            </div>
            <div class="p-6 rounded-md bg-gray-50">
              <h4 class="mb-3 text-sm font-medium text-gray-900">
                Password Criteria:
              </h4>
              <ol class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start">
                  <span
                    class="bg-pink-100 text-[#e4097f] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">1</span>
                  At least 8 characters

                </li>
                <li class="flex items-start">
                  <span
                    class="bg-pink-100 text-[#e4097f] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">2</span>
                  One uppercase and one lowercase letter
                </li>
                <li class="flex items-start">
                  <span
                    class="bg-pink-100 text-[#e4097f] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">3</span>
                  A number and a special character
                </li>
              </ol>
            </div>
          </div>

          <!-- Step 4: Confirmation -->
          <div v-if="currentStep === 4" class="space-y-6">
            <div class="text-center">
              <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#e4097f] rounded-full">
                <Check class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900">Almost done!</h3>
              <p class="mt-1 text-gray-600">Check your information</p>
            </div>
            <div class="p-6 space-y-4 rounded-md bg-gray-50">
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-700">Full Name:</span>
                <span class="text-sm text-gray-900">{{ formData.firstName }} {{ formData.lastName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-700">Email:</span>
                <span class="text-sm text-gray-900">{{ formData.email }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-700">Country:</span>
                <span class="text-sm text-gray-900">{{
                  formData.country || "Not specified"
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-700">City:</span>
                <span class="text-sm text-gray-900">{{
                  formData.city || "Not specified"
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-700">Address:</span>
                <span class="text-sm text-gray-900">{{
                  formData.location.title || "Not specified"
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-700">First Language:</span>
                <span class="text-sm text-gray-900">{{
                  formData.firstLangage || "Not specified"
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-700">Second Language:</span>
                <span class="text-sm text-gray-900">{{
                  formData.secondLangage || "Not specified"
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm font-medium text-gray-700">Location (Lat, Long):</span>
                <span class="text-sm text-gray-900">{{ formData.location.lat }},
                  {{ formData.location.long }}</span>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center group">
                <input type="checkbox" id="terms" v-model="acceptTerms" class="sr-only" />
                <label for="terms" class="flex items-center cursor-pointer">
                  <div
                    class="w-4 h-4 border border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-[#e4097f]"
                    :class="{
                      'bg-[#e4097f] border-[#e4097f]': acceptTerms,
                    }">
                    <svg v-if="acceptNewsletter" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <label for="terms" class="ml-3 text-sm text-gray-700">
                    I accept the
                    <a href="#" class="font-medium text-[#e4097f]">terms of use</a>
                    and
                    <a href="#" class="font-medium text-[#e4097f]">the privacy policy</a>
                  </label>
                </label>
              </div>

              <div class="flex items-center group">
                <input type="checkbox" id="remember" v-model="acceptNewsletter" class="sr-only" />
                <label for="remember" class="flex items-center cursor-pointer">
                  <div
                    class="w-4 h-4 border border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-[#e4097f]"
                    :class="{
                      'bg-[#e4097f] border-[#e4097f]': acceptNewsletter,
                    }">
                    <svg v-if="acceptNewsletter" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <label for="newsletter" class="ml-2 text-sm text-gray-700">
                    I would like to receive job offers and career advice by email
                  </label>
                </label>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between pt-6">
            <button type="button" @click="prevStep" :disabled="currentStep === 1"
              class="flex items-center px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ArrowLeft class="w-4 h-4 mr-2" />
              Previous
            </button>
            <button v-if="currentStep < totalSteps" type="button" @click="nextStep"
              class="flex items-center px-6 py-2 font-semibold text-white transition-colors rounded-md bg-[#e4097f] hover:bg-[#e4097f]">
              Next
              <ArrowRight class="w-4 h-4 ml-2" />
            </button>
            <button v-else type="button" @click="handleSubmit" :disabled="isLoading || !acceptTerms"
              class="flex items-center px-6 py-2 font-semibold text-white transition-colors rounded-md bg-[#e4097f] disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading ? "Processing..." : "Create my account" }}
            </button>
          </div>
          <!-- Login Link -->
          <div class="pt-4 text-sm text-center">
            <span class="text-gray-600">Already have an account? </span>

            <router-link :to="{ name: 'login' }"
              class="p-1 font-medium text-[#e4097f] hover:bg-[#e4097f] hover:text-white">
              Log in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Check,
  UserPlus,
  Award,
  Rocket,
  Star,
  UserCheck,
} from "lucide-vue-next";
import { languesProfessionnelles } from "@/helpers/language";
import {
  validateFirstStep,
  validateSecondStep,
  validateThirdStep,
} from "@/vineValidation/authForm";
import { useAuthStore } from "@/stores/auth";
import { useRouter,useRoute } from "vue-router";
import AppModal from "../globales/AppModal.vue";
const router=useRouter()
const route=useRoute()

const auth = useAuthStore()

const isModalOpen = ref(false);

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};


const currentStep = ref(1);
const totalSteps = 4;
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const acceptTerms = ref(false);
const acceptNewsletter = ref(true);
const isAllowsLocation = ref(false);

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
  password: "",
  confirmPassword: "",
  country: "",
  city: "",
  firstLangage: "",
  secondLangage: "",
  location: {
    title: "",
    lat: 0,
    long: 0,
  },
});

const formErrors = ref({
  firstName: [],
  lastName: [],
  email: [],
  phoneNumber: [],
  dob: [],
  password: [],
  confirmPassword: [],
  country: [],
  city: [],
  address: [],
  firstLangage: [],
  secondLangage: [],
});

const progress = computed(() => (currentStep.value / totalSteps) * 100);

const emit = defineEmits(["navigate"]);

const nextStep = async () => {
  if (currentStep.value < totalSteps) {
    let validationResult;

    // Reset errors before validation
    Object.keys(formErrors.value).forEach((key) => {
      formErrors.value[key] = [];
    });

    if (currentStep.value === 1) {
      validationResult = validateFirstStep({
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        email: formData.value.email,
        phoneNumber: formData.value.phoneNumber,
        dob: formData.value.dob,
      });

      if (!validationResult.isValid) {
        formErrors.value = { ...formErrors.value, ...validationResult.errors };
        // Clear errors after 2 seconds
        setTimeout(() => {
          Object.keys(formErrors.value).forEach((key) => {
            formErrors.value[key] = [];
          });
        }, 1500);
        return; // Stop progression
      }
    }

    if (currentStep.value === 2) {
      validationResult = await validateSecondStep({
        country: formData.value.country,
        city: formData.value.city,
        address: formData.value.location.title,
        firstLangage: formData.value.firstLangage,
        secondLangage: formData.value.secondLangage,
      });

      if (!validationResult.isValid) {
        formErrors.value = { ...formErrors.value, ...validationResult.errors };
        // Clear errors after 2 seconds
        setTimeout(() => {
          Object.keys(formErrors.value).forEach((key) => {
            formErrors.value[key] = [];
          });
        }, 1500);
        return; // Stop progression
      }
    }

    if (currentStep.value === 3) {
      validationResult = await validateThirdStep({
        password: formData.value.password,
        confirmPassword: formData.value.confirmPassword,
      });

      if (!validationResult.isValid) {
        formErrors.value = { ...formErrors.value, ...validationResult.errors };
        // Clear errors after 2 seconds
        setTimeout(() => {
          Object.keys(formErrors.value).forEach((key) => {
            formErrors.value[key] = [];
          });
        }, 1500);
        return; // Stop progression
      }
    }

    currentStep.value++;

    if (currentStep.value === 2) {
      await getGeolocation();
    }
  }
};
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    if (currentStep.value === 2) {
      getGeolocation();
    }
  }
};

const handleSubmit = async () => {

  toggleOpenModal()

  const {password,email,location,...RestData}=formData.value


  const payloadData={
    user:{
      email:email,
      password:password
    },
    account:{
      ...RestData,
      address:location,
      accountType:route.params.type
    }
  }

  
  const data = await auth.register(payloadData)
  
  toggleOpenModal()
  
  if (data?.success) {
  
    router.push({ name: 'login' })
  }

}

async function getGeolocation() {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      isAllowsLocation.value = true;
      formData.value.location.lat = position.coords.latitude.toString();
      formData.value.location.long = position.coords.longitude.toString();
      await fetchLocationInfo(
        formData.value.location.lat,
        formData.value.location.long
      );
    } catch (error) {
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
    formData.value.location.title = data.display_name || "";
    formData.value.country = data.address.country || "";
    formData.value.city =
      data.address.city || data.address.town || data.address.village || "";
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}
</script>
