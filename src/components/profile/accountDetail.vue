<template>
  <div v-if="userAccount" class="flex flex-col w-full px-4 mx-auto">
    <!-- Modals -->
    <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
      <FormUpdateProfile @close="toggleOpenModal" :accountProfile="userAccount" />
    </AppModal>

    <AppModal :isOpen="isUploading" :isLoader="true"></AppModal>

    <!-- Profile Header -->
    <div class="flex flex-col mb-8 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
      <div>
        <h1 class="mb-2 text-3xl font-bold text-gray-900 lg:text-4xl">Mon Profile</h1>
        <p class="text-gray-600">Gérez vos informations personnelles et préférences</p>
      </div>
      <button @click="toggleOpenModal()"
        class="mt-4 sm:mt-0 bg-[#db147f] text-white px-6 lg:px-8 py-3 rounded-lg hover:bg-[#c01370] transition-colors text-sm lg:text-base font-medium shadow-sm">
        <svg class="inline w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
          </path>
        </svg>
        Editer Mon Profile
      </button>
    </div>

    <!-- Main Profile Section -->
    <div class="p-6 mb-8 bg-white shadow-sm rounded-2xl lg:p-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
        <!-- Profile Image -->
        <div class="flex flex-col items-center mb-6 lg:mb-0">
          <div class="relative">
            <div class="relative inline-block">
              <img v-if="userAccount.account?.avatarUrl"
                :src="userAccount.account.avatarUrl || '/placeholder.svg?height=120&width=120'"
                :alt="userAccount.account?.firstName || 'User'"
                class="object-cover w-32 h-32 border-4 border-white rounded-full shadow-sm lg:w-40 lg:h-40" />
              <div v-else
                class="flex items-center justify-center w-32 h-32 bg-gray-200 border-4 border-white rounded-full shadow-sm lg:w-40 lg:h-40">
                <UserIcon class="w-16 h-16 text-gray-400 lg:w-20 lg:h-20" />
              </div>
            </div>
            <button
              class="absolute bottom-2 right-2 lg:bottom-3 lg:right-3 bg-[#db147f] text-white p-2 lg:p-3 rounded-full hover:bg-[#c01370] transition-colors shadow-sm">
              <input type="file" id="avatar" name="avatar" accept="image/*" class="hidden" @change="handleFileUpload" />
              <label for="avatar" class="cursor-pointer">
                <CameraIcon class="w-4 h-4 lg:w-5 lg:h-5" />
              </label>
            </button>
          </div>
        </div>

        <!-- Main Information -->
        <div class="flex-1 text-center lg:text-left">
          <h2 class="mb-2 text-2xl font-bold text-gray-900 lg:text-3xl">
            {{ userAccount.account?.firstName || '' }} {{ userAccount.account?.lastName || '' }}
          </h2>
          <p class="mb-4 text-lg text-gray-600">{{ userAccount.email || '' }}</p>

          <!-- Badges -->
          <div class="flex flex-wrap justify-center gap-2 mb-4 lg:justify-start">
            <span v-if="userAccount.account?.firstLangage"
              class="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
              {{ userAccount.account.firstLangage }}
            </span>
            <span v-if="userAccount.account?.secondLangage"
              class="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
              {{ userAccount.account.secondLangage }}
            </span>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <div class="text-center lg:text-left">
              <p class="text-sm text-gray-500">Membre depuis</p>
              <p class="font-semibold text-gray-900">
                {{ userAccount.createdAt ? moment(userAccount.createdAt).format("DD MMM YYYY") : '' }}
              </p>
            </div>
            <div class="text-center lg:text-left">
              <p class="text-sm text-gray-500">Dernière connexion</p>
              <p class="font-semibold text-gray-900">
                {{ userAccount.account?.updatedAt ? moment(userAccount.account.updatedAt).startOf("day").fromNow() : ''
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Information Cards -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      <!-- Personal Information -->
      <div class="p-6 bg-white shadow-sm rounded-2xl lg:p-8">
        <div class="flex items-center mb-6">
          <div class="p-2 bg-[#db147f] bg-opacity-10 rounded-lg mr-3">
            <UserIcon class="w-6 h-6 text-[#db147f]" />
          </div>
          <h3 class="text-xl font-bold text-gray-900">Informations personnelles</h3>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">Prénom</label>
              <p class="text-lg font-semibold text-gray-900">
                {{ userAccount.account?.firstName || 'Non renseigné' }}
              </p>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">Nom</label>
              <p class="text-lg font-semibold text-gray-900">
                {{ userAccount.account?.lastName || 'Non renseigné' }}
              </p>
            </div>
          </div>

           <div>
            <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">
              Titre professionelle</label>
            <p class="px-2 text-lg font-semibold text-gray-900 bg-pink-400 border rounded-2xl contents">
              {{ userAccount.account?.roles || "non reseigner" }}
            </p>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">Date de
              naissance</label>
            <p class="text-lg font-semibold text-gray-900">
              {{ userAccount.account?.dob ? moment(userAccount.account.dob).format("DD MMM YYYY") : 'Non renseigné' }}
            </p>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">Numéro de
              téléphone</label>
            <p class="text-lg font-semibold text-gray-900">
              {{ userAccount.account?.phoneNumber || "Non renseigné" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="p-6 bg-white shadow-sm rounded-2xl lg:p-8">
        <div class="flex items-center mb-6">
          <div class="p-2 mr-3 bg-blue-500 rounded-lg bg-opacity-10">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Contact & Localisation</h3>
        </div>

        <div class="space-y-6">
          <div>
            <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">Email</label>
            <p class="text-lg font-semibold text-gray-900">
              {{ userAccount.email || 'Non renseigné' }}
            </p>
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">Adresse</label>
            <p class="text-lg font-semibold text-gray-900">
              {{ userAccount.account?.address?.title || "Non renseignée" }}
            </p>
          </div>
        </div>
      </div>

      <!-- Language Preferences -->
      <div class="p-6 bg-white shadow-sm rounded-2xl lg:p-8">
        <div class="flex items-center mb-6">
          <div class="p-2 mr-3 bg-green-500 rounded-lg bg-opacity-10">
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129">
              </path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Langues</h3>
        </div>

        <div class="space-y-6">
          <div>
            <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">Langue
              principale</label>
            <div class="flex items-center">
              <span class="px-4 py-2 font-semibold text-blue-800 bg-blue-100 rounded-lg">
                {{ userAccount.account?.firstLangage || 'Non renseignée' }}
              </span>
            </div>
          </div>

          <div v-if="userAccount.account?.secondLangage">
            <label class="block mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">Langue
              secondaire</label>
            <div class="flex items-center">
              <span class="px-4 py-2 font-semibold text-green-800 bg-green-100 rounded-lg">
                {{ userAccount.account.secondLangage }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Statistics -->
      <div class="p-6 bg-white shadow-sm rounded-2xl lg:p-8">
        <div class="flex items-center mb-6">
          <div class="p-2 mr-3 bg-purple-500 rounded-lg bg-opacity-10">
            <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
              </path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Activité du compte</h3>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <span class="text-gray-600">Compte créé</span>
            <span class="font-semibold text-gray-900">
              {{ userAccount.createdAt ? moment(userAccount.createdAt).format("DD/MM/YYYY") : '' }}
            </span>
          </div>
          <div class="flex items-center justify-between p-4 rounded-lg bg-gray-50">
            <span class="text-gray-600">Statut</span>
            <span class="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Actif</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CameraIcon, UserIcon } from "lucide-vue-next";
import moment from "moment";
import { ref, onMounted } from "vue";
import AppModal from "../globales/AppModal.vue";
import FormUpdateProfile from "./FormUpdateProfile.vue";
import { AppwriteuploadFile } from "@/app_write/files";
import { Notyf } from "notyf";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();
const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 });
const isModalOpen = ref(false);
const isUploading = ref(false);

const userAccount = ref({})

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const toggleLoader = () => {
  isUploading.value = !isUploading.value;
};

const handleFileUpload = async (e) => {
  if (!userAccount.value?.account?.slug) {
    notyf.error("Impossible de mettre à jour le profil");
    return;
  }

  toggleLoader();

  const file_base_url = import.meta.env.VITE_APP_WRITE_FILE_BASE_URL;
  const bucket_id = import.meta.env.VITE_APP_WRITE_BUCKET_ID;
  const project_id = import.meta.env.VITE_APP_WRITE_PROJECT_ID;

  const files = Array.from(e.target.files);

  try {
    for (const file of files) {
      const data = await AppwriteuploadFile(file);

      if (data.isCreate) {
        const newFile = {
          url: `${file_base_url}/${data.file.bucketId}/files/${data.file.$id}/view?project=${project_id}`,
          title: data.file.$id,
          type: data.file.mimeType,
        };

        const payloadData = {
          avatarUrl: newFile.url,
        };

        const response = await auth.api(
          "put",
          `/accounts/${userAccount.value.account.slug}/update`,
          payloadData
        );

        if (response.success) {
          userAccount.value.account.avatarUrl = newFile.url;
        } else {
          console.log(response.message || "Erreur lors de la mise à jour");
          notyf.error(response.message || "Erreur lors de la mise à jour");
        }
      } else {
        console.log((data.message || "Erreur lors du téléchargement"))
        notyf.error(data.message || "Erreur lors du téléchargement");
      }
    }
  } catch (error) {
    console.error("File upload error:", error);
    notyf.error("Une erreur est survenue");
  } finally {
    toggleLoader();
  }
};

const initFetchLoginAccountDetail = async () => {
  try {
    const response = await auth.api('GET', '/auth/users', null, false);

    if (response?.success) {
      auth.setUser(response.data);
      // console.log(userAccount.account)
      userAccount.value = response.data
    }
  } catch (error) {
    console.error("Profile load error:", error);
    notyf.error("Erreur lors du chargement du profil");
  }
};

onMounted(() => {
  if (userAccount.value?.isAdmin) {
    router.push({ name: 'admin_companies' });
    return;
  }

  initFetchLoginAccountDetail();
});
</script>

<style scoped>
/* Styles conservés du composant original */
</style>