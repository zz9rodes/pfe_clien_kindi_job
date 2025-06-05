<template>
  <div class="bg-white rounded-md max-h-[90vh] mx-[5px] flex flex-col">
    <div class="p-6 text-center">
      <h3 class="text-xl font-semibold text-gray-900">Basic Information</h3>
      <p class="mt-1 text-gray-600">
        Let's start with your personal information
      </p>
    </div>
    <div class="flex-1 p-6 space-y-6 overflow-auto">
      <div class="relative space-y-2">
        <label for="email" class="block text-sm font-medium text-gray-700">
          Email <span class="text-red-500">*</span>
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          placeholder="john.doe@company.com"
          class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
          required
        />
        <span
          class="absolute top-[90%] left-0 text-sm text-red-600"
          v-if="formErrors.email"
          >{{ formErrors.email[0] }}</span
        >
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2 required:">
          <label
            for="firstName"
            class="block text-sm font-medium text-gray-700"
          >
            First Name <span class="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            v-model="formData.firstName"
            placeholder="John"
            class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
            required
          />
          <span
            class="absolute top-[90%] left-0 text-sm text-red-600"
            v-if="formErrors.firstName"
            >{{ formErrors.firstName[0] }}</span
          >
        </div>
        <div class="relative space-y-2">
          <label for="lastName" class="block text-sm font-medium text-gray-700">
            Last Name <span class="text-red-600">*</span>
          </label>
          <input
            id="lastName"
            v-model="formData.lastName"
            placeholder="Doe"
            class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
            required
          />
          <span
            class="absolute top-[90%] left-0 text-sm text-red-600"
            v-if="formErrors.lastName"
            >{{ formErrors.lastName[0] }}</span
          >
        </div>
      </div>
      <div class="relative space-y-2">
        <label
          for="phoneNumber"
          class="block text-sm font-medium text-gray-700"
        >
          Phone Number <span class="text-red-500">*</span>
        </label>
        <input
          id="phoneNumber"
          v-model="formData.phoneNumber"
          type="tel"
          placeholder="+1234567890"
          class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
          required
        />
        <span
          class="absolute top-[90%] left-0 text-sm text-red-600"
          v-if="formErrors.phoneNumber"
          >{{ formErrors.phoneNumber[0] }}</span
        >
      </div>
      <div class="relative space-y-2">
        <label for="dob" class="block text-sm font-medium text-gray-700">
          Date of Birth <span class="text-red-500">*</span>
        </label>
        <input
          id="dob"
          :v-model="formData.dob"
          type="date"
          class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
          required
        />
        <span
          class="absolute top-[90%] left-0 text-sm text-red-600"
          v-if="formErrors.dob"
          >{{ formErrors.dob[0] }}</span
        >
      </div>

      <div class="space-y-6">
        <div class="relative space-y-2 mt-7">
          <label for="city" class="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            id="city"
            v-model="formData.country"
            placeholder="Yaoundé, Douala, Bamenda..."
            class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
          />
          <span
            class="absolute top-[90%] left-0 text-sm text-red-600"
            v-if="formErrors.country"
            >{{ formErrors.country[0] }}</span
          >
        </div>
        <div class="relative space-y-2">
          <label for="city" class="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            id="city"
            v-model="formData.city"
            placeholder="Yaoundé, Douala, Bamenda..."
            class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
          />
          <span
            class="text-sm text-red-600 absolute top-[90%] left-0"
            v-if="formErrors.city"
            >{{ formErrors.city[0] }}</span
          >
        </div>

        <div class="relative space-y-2">
          <label for="address" class="block text-sm font-medium text-gray-700">
            Full Address
          </label>
          <input
            id="address"
            v-model="formData.address.title"
            placeholder="123 Main St, Yaoundé, Cameroon"
            class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
          />
          <span
            class="text-sm text-red-600 absolute top-[90%] left-0"
            v-if="formErrors.address"
            >{{ formErrors.address[0] }}</span
          >
        </div>
        <div class="relative space-y-2">
          <label
            for="firstLangage"
            class="block text-sm font-medium text-gray-700"
          >
            First Language <span class="text-red-500">*</span>
          </label>
          <select
            id="firstLangage"
            v-model="formData.firstLangage"
            class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
            required
          >
            <option value="">Select your first language</option>
            <option
              v-for="language in languesProfessionnelles"
              :key="language"
              :value="language"
            >
              {{ language }}
            </option>
          </select>
          <span
            class="text-sm text-red-600 absolute top-[90%] left-0"
            v-if="formErrors.firstLangage"
            >{{ formErrors.firstLangage[0] }}</span
          >
        </div>
        <div class="relative space-y-2">
          <label
            for="secondLangage"
            class="block text-sm font-medium text-gray-700"
          >
            Second Language
          </label>
          <select
            id="secondLangage"
            v-model="formData.secondLangage"
            class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
          >
            <option value="">Select your second language</option>
            <option
              v-for="language in languesProfessionnelles"
              :key="language"
              :value="language"
            >
              {{ language }}
            </option>
          </select>
          <span
            class="absolute top-[90%] left-0 text-sm"
            v-if="formErrors.secondLangage"
            >{{ formErrors.secondLangage[0] }}</span
          >
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end p-6 border-t border-gray-400">
      <button
        type="button"
        @click.prevent="HandlerUpdateProfile"
        class="flex items-center px-6 py-2 font-semibold text-white transition-colors rounded-md bg-[#e4097f] hover:bg-[#e4097f]"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { languesProfessionnelles } from "@/helpers/language";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";

const props = defineProps({
  accountProfile: {
    type: Object,
    required: true,
  },
});


const auth=useAuthStore()

const formData = ref({
  email: props.accountProfile.email,
  firstName: props.accountProfile.account.firstName,
  lastName: props.accountProfile.account.lastName,
  phoneNumber: props.accountProfile.account.phoneNumber,
  dob: props.accountProfile.account.dob,
  city: props.accountProfile.account.city,
  country: props.accountProfile.account.country,
  address: props.accountProfile.account.address,
  country: props.accountProfile.account.country,
  firstLangage: props.accountProfile.account.firstLangage,
  secondLangage: props.accountProfile.account.secondLangage,
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

const HandlerUpdateProfile= async()=>{
    console.log(formData.value)

      const {dob,...payloadData}=formData.value

      const data = await auth.api('put',`/accounts/${auth.user.account.slug}/update`, {
        ...payloadData,dob:moment(dob).format('yyyy-MM-DD')
    })
  
      console.log(data)
    if(data.success){
        // formData.value.avatarUrl = newFile.url;
    }
}
</script>
