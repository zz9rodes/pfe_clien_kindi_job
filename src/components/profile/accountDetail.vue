<template>
    <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
        <FormUpdateProfile :accountProfile="props.accountProfile" />
    </AppModal>
    <div class="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between lg:mb-8">
        <h1 class="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl sm:mb-0">
            My Profile
        </h1>
        <button @click="toggleOpenModal()"
            class="bg-[#db147f] text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors text-sm lg:text-base">
            Edit
        </button>
    </div>

    <div class="flex flex-col items-center mb-6 lg:mb-8">
        <div class="relative">
            <div class="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full lg:w-32 lg:h-32">
                <UserIcon class="w-8 h-8 text-white lg:w-16 lg:h-16" />
            </div>
            <button
                class="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 bg-[#db147f] text-white p-1.5 lg:p-2 rounded-full hover:bg-[#c01370] transition-colors">
                <CameraIcon class="w-3 h-3 lg:w-4 lg:h-4" />
            </button>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div class="space-y-4">
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">Name</label>
                <p class="text-lg text-gray-900">
                    {{ props.accountProfile.firstName }}
                    {{ props.accountProfile.lastName }}
                </p>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">Email</label>
                <p class="text-lg text-gray-900">{{ props.accountProfile.email }}</p>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
                <p class="text-lg text-gray-900">
                    {{ props.accountProfile.phoneNumber }}
                </p>
            </div>
        </div>
        <div class="space-y-4">
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">Centrelink CRN</label>
                <p class="text-lg text-gray-900">No</p>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">Date of Birth</label>
                <p class="text-lg text-gray-900">
                    {{ moment(props.accountProfile.dob).format("MMM Do YYYY") }}
                </p>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">Address</label>
                <p class="text-lg text-gray-900">{{ props.accountProfile.address }}</p>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">first Langage</label>
                <p class="text-lg text-gray-900">
                    {{ props.accountProfile.firstLangage }}
                </p>
            </div>
            <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">second Langage</label>
                <p class="text-lg text-gray-900">
                    {{ props.accountProfile.secondLangage }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CameraIcon, UserIcon, ArrowRight, ArrowLeft } from "lucide-vue-next";
import moment from "moment";
import { defineProps, ref, computed } from "vue";
import AppModal from "../globales/AppModal.vue";
import FormUpdateProfile from "./FormUpdateProfile.vue";
import {
    validateFirstStep,
    validateSecondStep,
} from "@/vineValidation/authForm";


const props = defineProps({
    accountProfile: {
        type: Object,
        required: true,
    },
});

const isModalOpen = ref(false);

const toggleOpenModal = () => {
    isModalOpen.value = !isModalOpen.value;
};


</script>

<style scoped></style>