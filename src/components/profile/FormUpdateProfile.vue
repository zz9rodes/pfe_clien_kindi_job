<template>
  <div class="bg-white rounded-md max-h-[90vh] mx-[5px] flex flex-col">
    <!-- Header -->
    <div class="p-6 text-center border-b border-gray-200">
      <h3 class="text-xl font-semibold text-gray-900">Informations de base</h3>
      <p class="mt-1 text-gray-600">
        {{ !userProfile.account 
          ? "Complétez vos informations pour créer votre profil" 
          : "Mettez à jour vos informations personnelles" 
        }}
      </p>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto">
      <!-- No Account Warning -->
      <div 
        v-if="!userProfile.account" 
        class="p-4 mx-6 mt-6 border border-yellow-200 rounded-md bg-yellow-50"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-yellow-800">
              Profil incomplet
            </p>
            <p class="text-sm text-yellow-700">
              Veuillez compléter tous les champs obligatoires pour créer votre profil.
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmitLoginProfile" class="p-6 space-y-6">
        <!-- Email Field -->
        <div class="relative">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-700">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="john.doe@company.com"
            :class="[
              'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
              formErrors.email?.length ? 'border-red-300' : 'border-gray-300'
            ]"
            required
          />
          <span
            v-if="formErrors.email?.length"
            class="absolute left-0 text-sm text-red-600 -bottom-5"
          >
            {{ formErrors.email[0] }}
          </span>
        </div>

        <!-- Name Fields -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="relative">
            <label for="firstName" class="block mb-2 text-sm font-medium text-gray-700">
              Prénom <span class="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              v-model="formData.firstName"
              placeholder="John"
              :class="[
                'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
                formErrors.firstName?.length ? 'border-red-300' : 'border-gray-300'
              ]"
              required
            />
            <span
              v-if="formErrors.firstName?.length"
              class="absolute left-0 text-sm text-red-600 -bottom-5"
            >
              {{ formErrors.firstName[0] }}
            </span>
          </div>

          <div class="relative">
            <label for="lastName" class="block mb-2 text-sm font-medium text-gray-700">
              Nom <span class="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              v-model="formData.lastName"
              placeholder="Doe"
              :class="[
                'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
                formErrors.lastName?.length ? 'border-red-300' : 'border-gray-300'
              ]"
              required
            />
            <span
              v-if="formErrors.lastName?.length"
              class="absolute left-0 text-sm text-red-600 -bottom-5"
            >
              {{ formErrors.lastName[0] }}
            </span>
          </div>
        </div>

        <!-- Phone and Date -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="relative">
            <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-700">
              Numéro de téléphone <span class="text-red-500">*</span>
            </label>
            <input
              id="phoneNumber"
              v-model="formData.phoneNumber"
              type="tel"
              placeholder="+1234567890"
              :class="[
                'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
                formErrors.phoneNumber?.length ? 'border-red-300' : 'border-gray-300'
              ]"
              required
            />
            <span
              v-if="formErrors.phoneNumber?.length"
              class="absolute left-0 text-sm text-red-600 -bottom-5"
            >
              {{ formErrors.phoneNumber[0] }}
            </span>
          </div>

          <div class="relative">
            <label for="dob" class="block mb-2 text-sm font-medium text-gray-700">
              Date de naissance <span class="text-red-500">*</span>
            </label>
            <input
              id="dob"
              v-model="formData.dob"
              type="date"
              :class="[
                'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
                formErrors.dob?.length ? 'border-red-300' : 'border-gray-300'
              ]"
              required
            />
            <span
              v-if="formErrors.dob?.length"
              class="absolute left-0 text-sm text-red-600 -bottom-5"
            >
              {{ formErrors.dob[0] }}
            </span>
          </div>
        </div>

        <!-- Location Fields -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="relative">
            <label for="country" class="block mb-2 text-sm font-medium text-gray-700">
              Pays
            </label>
            <input
              id="country"
              v-model="formData.country"
              placeholder="Cameroun, Nigeria, Ghana..."
              :class="[
                'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
                formErrors.country?.length ? 'border-red-300' : 'border-gray-300'
              ]"
            />
            <span
              v-if="formErrors.country?.length"
              class="absolute left-0 text-sm text-red-600 -bottom-5"
            >
              {{ formErrors.country[0] }}
            </span>
          </div>

          <div class="relative">
            <label for="city" class="block mb-2 text-sm font-medium text-gray-700">
              Ville
            </label>
            <input
              id="city"
              v-model="formData.city"
              placeholder="Yaoundé, Douala, Bamenda..."
              :class="[
                'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
                formErrors.city?.length ? 'border-red-300' : 'border-gray-300'
              ]"
            />
            <span
              v-if="formErrors.city?.length"
              class="absolute left-0 text-sm text-red-600 -bottom-5"
            >
              {{ formErrors.city[0] }}
            </span>
          </div>
        </div>

        <!-- Address -->
        <div class="relative">
          <label for="address" class="block mb-2 text-sm font-medium text-gray-700">
            Adresse complète
          </label>
          <input
            id="address"
            v-model="formData.address.title"
            placeholder="123 Rue Principale, Yaoundé, Cameroun"
            :class="[
              'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
              formErrors.address?.length ? 'border-red-300' : 'border-gray-300'
            ]"
          />
          <span
            v-if="formErrors.address?.length"
            class="absolute left-0 text-sm text-red-600 -bottom-5"
          >
            {{ formErrors.address[0] }}
          </span>
        </div>

        <!-- Language Fields -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="relative">
            <label for="firstLangage" class="block mb-2 text-sm font-medium text-gray-700">
              Langue principale <span class="text-red-500">*</span>
            </label>
            <select
              id="firstLangage"
              v-model="formData.firstLangage"
              :class="[
                'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
                formErrors.firstLangage?.length ? 'border-red-300' : 'border-gray-300'
              ]"
              required
            >
              <option value="">Sélectionnez votre langue principale</option>
              <option
                v-for="language in languesProfessionnelles"
                :key="language"
                :value="language"
              >
                {{ language }}
              </option>
            </select>
            <span
              v-if="formErrors.firstLangage?.length"
              class="absolute left-0 text-sm text-red-600 -bottom-5"
            >
              {{ formErrors.firstLangage[0] }}
            </span>
          </div>

          <div class="relative">
            <label for="secondLangage" class="block mb-2 text-sm font-medium text-gray-700">
              Langue secondaire
            </label>
            <select
              id="secondLangage"
              v-model="formData.secondLangage"
              :class="[
                'w-full px-4 py-2 transition-colors border rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]',
                formErrors.secondLangage?.length ? 'border-red-300' : 'border-gray-300'
              ]"
            >
              <option value="">Sélectionnez votre langue secondaire</option>
              <option
                v-for="language in languesProfessionnelles"
                :key="language"
                :value="language"
              >
                {{ language }}
              </option>
            </select>
            <span
              v-if="formErrors.secondLangage?.length"
              class="absolute left-0 text-sm text-red-600 -bottom-5"
            >
              {{ formErrors.secondLangage[0] }}
            </span>
          </div>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <div   class="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
      <button
        type="button"
        @click="$emit('close')"
        class="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-100"
      >
        Annuler
      </button>
      
      <button
        type="button"
        @click="handleSubmitLoginProfile"
        :disabled="isSubmitting"
        :class="[
          'flex items-center px-6 py-2 font-semibold text-white transition-colors rounded-md',
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#e4097f] hover:bg-[#c1136e]'
        ]"
      >
        <svg 
          v-if="isSubmitting" 
          class="w-4 h-4 mr-2 animate-spin" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isSubmitting ? 'Traitement...' : (userProfile.account ? 'Mettre à jour le profil' : 'Créer le profil') }}
      </button>
    </div>
    
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { languesProfessionnelles } from "@/helpers/language";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";

// Props & Emits
const props = defineProps({
  accountProfile: {
    type: Object,
    required: true,
  },
  isLogin:{
    type: Boolean,
    required: false,
    default:true
  }
});

const emit = defineEmits(['close', 'success', 'error']);

// Composables
const auth = useAuthStore();

// Reactive Data
const isSubmitting = ref(false);

console.log(props.accountProfile)
console.log(props.accountProfile.email)

const userProfile = ref({
  id: props.accountProfile.id || '',
  email: props.accountProfile.email || '',
  account: props.accountProfile.account || null,
});

const formData = reactive({
  email: userProfile.value.email,
  firstName: userProfile.value.account?.firstName || '',
  lastName: userProfile.value.account?.lastName || '',
  phoneNumber: userProfile.value.account?.phoneNumber || '',
  dob: userProfile.value.account?.dob || '',
  city: userProfile.value.account?.city || '',
  country: userProfile.value.account?.country || '',
  address: userProfile.value.account?.address || { title: '' },
  firstLangage: userProfile.value.account?.firstLangage || '',
  secondLangage: userProfile.value.account?.secondLangage || '',
  avatarUrl: userProfile.value.account?.avatarUrl || '',
  frontIdCard: userProfile.value.account?.frontIdCard || '',
  backIdCard: userProfile.value.account?.backIdCard || '',
  accountType: userProfile.value.account?.accountType || 'personnal',
});

const formErrors = ref({
  firstName: [],
  lastName: [],
  email: [],
  phoneNumber: [],
  dob: [],
  country: [],
  city: [],
  address: [],
  firstLangage: [],
  secondLangage: [],
});

// Computed
const isCreatingProfile = computed(() => !userProfile.value.account);

// Methods
const clearErrors = () => {
  Object.keys(formErrors.value).forEach(key => {
    formErrors.value[key] = [];
  });
};

const validateForm = () => {
  clearErrors();
  let isValid = true;

  // Required field validation
  const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'dob', 'firstLangage'];
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      formErrors.value[field] = [`${field.charAt(0).toUpperCase() + field.slice(1)} est requis`];
      isValid = false;
    }
  });

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (formData.email && !emailRegex.test(formData.email)) {
    formErrors.value.email = ['Veuillez entrer une adresse email valide'];
    isValid = false;
  }

  return isValid;
};

const handleSubmitLoginProfile = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  clearErrors();

  try {
    const { dob, email, ...payloadData } = formData;
    const formattedDob = dob ? moment(dob).format('YYYY-MM-DD') : '';

    let response;

    if (isCreatingProfile.value) {
      // Create new profile (POST)
      const postData = {
        userId: userProfile.value.id,
        email: email,
        ...payloadData,
        dob: formattedDob,
      };
      
      response = await auth.api('POST', '/accounts/create', postData, true);
      
      if (response.success) {
        emit('success', { type: 'create', data: response.data });
        emit('close');
      }
    } else {
      // Update existing profile (PUT)
      response = await auth.api('PUT', `/accounts/${auth.user.account.slug}/update`, {
        ...payloadData,
        dob: formattedDob,
      }, true);
      
      if (response.success) {
        emit('success', { type: 'update', data: response.data });
        emit('close');
      }
    }

    if (!response.success && response.errors) {
      // Handle validation errors from server
      Object.keys(response.errors).forEach(key => {
        if (formErrors.value.hasOwnProperty(key)) {
          formErrors.value[key] = Array.isArray(response.errors[key]) 
            ? response.errors[key] 
            : [response.errors[key]];
        }
      });
    }

  } catch (error) {
    console.error('Error submitting form:', error);
    emit('error', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Custom scrollbar for the form area */
.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Animation for form errors */
.text-red-600 {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
