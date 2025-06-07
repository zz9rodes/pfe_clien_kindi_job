<template>

  <div class="flex flex-col">
      <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
    <FormUpdateProfile @close="toggleOpenModal" :accountProfile="auth.user" />
  </AppModal>

  <AppModal :isOpen="isUploading" :isLoader="true"> </AppModal>
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
          <img class="w-16 h-16 rounded-full lg:w-32 lg:h-32 size-fulltext-white" v-if="formData.avatarUrl !== null"
            :src="formData.avatarUrl" />
          <UserIcon v-else class="w-8 h-8 text-white lg:w-16 lg:h-16" />
        </div>
        <button
          class="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 bg-[#db147f] text-white p-1.5 lg:p-2 rounded-full hover:bg-[#c01370] transition-colors">
          <input type="file" id="avatar" name="avatar" accept="image/*"
            class="hidden ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            @change="handleFileUpload" />
          <label for="avatar">
            <CameraIcon class="w-3 h-3 lg:w-4 lg:h-4" />
          </label>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-600">Name</label>
          <p class="text-lg text-gray-900">
            {{ auth.user.account.firstName }}
            {{ auth.user.account.lastName }}
          </p>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-600">Email</label>
          <p class="text-lg text-gray-900">{{ auth.user.email }}</p>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
          <p class="text-lg text-gray-900">
            {{ auth.user.account.phoneNumber }}
          </p>
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-600">Date of Birth</label>
          <p class="text-lg text-gray-900">
            {{ moment(auth.user.dob).format("MMM Do YYYY") }}
          </p>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-600">Address</label>
          <p class="text-lg text-gray-900">
            {{ auth.user.account.address.title }}
          </p>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-600">First Language</label>
          <p class="text-lg text-gray-900">
            {{ auth.user.account.firstLangage }}
          </p>
        </div>
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-600">Second Language</label>
          <p class="text-lg text-gray-900">
            {{ auth.user.account.secondLangage }}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { CameraIcon, UserIcon } from "lucide-vue-next";
import moment from "moment";
import { defineProps, ref } from "vue";
import AppModal from "../globales/AppModal.vue";
import FormUpdateProfile from "./FormUpdateProfile.vue";
import { AppwriteuploadFile } from "@/app_write/files";
import { Notyf } from "notyf";
import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  accountProfile: {
    type: Object,
    required: true,
  },
});

// console.log(auth.user)

const auth = useAuthStore();
const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 });
const isModalOpen = ref(false);
const isUploading = ref(false);
const formData = ref({ avatarUrl: auth.user.account.avatarUrl });

const toggleOpenModal = () => {
  console.log("ici");

  isModalOpen.value = !isModalOpen.value;
};

const toggleLoader = () => {
  isUploading.value = !isUploading.value;
};

const handleFileUpload = async (e) => {
  toggleLoader();

  const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL;
  const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID;
  const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID;

  const files = Array.from(e.target.files);

  try {
    const uploadPromises = files.map(async (file) => {
      const data = await AppwriteuploadFile(file);
      console.log(data)
      console.log(data.file.bucketId);
      console.log(data.file.$id);

      if (data.isCreate) {
        console.log(data.file.bucketId);

        const newFile = {
          url: `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`,
          title: data.file.$id,
          type: data.file.mimeType,
        };

        const payloadData = {
          avatarUrl: newFile.url,
        };
        const datas = await auth.api(
          "put",
          `/accounts/${auth.user.account.slug}/update`,
          payloadData
        );

        if (datas.success) {
          formData.value.avatarUrl = newFile.url;
        }
      } else {
        const payloadData = {
          avatarUrl:
            "https://i.pinimg.com/736x/2a/d3/ce/2ad3cee384283ac936c09e64bda2565e.jpg",
        };
        const data = await auth.api(
          'put',
          `/accounts/${auth.user.account.slug}/update`,
          payloadData
        );
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

<style scoped>
/* Aucun changement dans les styles */
</style>