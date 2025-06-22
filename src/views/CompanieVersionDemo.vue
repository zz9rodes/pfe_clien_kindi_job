<template>
  <div class="w-full main-frame">
    <div v-if="showFormCreateCompanie" class="w-full px-4 mt-4">
      <FormCreateOrUpdateCompanie
        :versionData="selectedVersion"
        :isVersion="isVersionMode"
        :isUpdate="isUpdate"
        @close-form="closeForm"
        @version-saved="handleVersionSaved"
      />
    </div>
    <div v-else class="w-full min-h-screen">
      <div class="h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 mb-6">
          <button
            @click="goBack"
            class="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeftIcon class="w-5 h-5 mr-1" />
            Back 
          </button>
          <div class="flex gap-3 ">
                  <button
                  v-if="versions.length>0"
            :disabled="versions.length<=0 ? true : fasse"
            :class=" versions.length<=0 ? ' cursor-not-allowed bg-[#d1abbe]' :' cursor-pointer bg-[#db147f]' "
            @click="ViewsDetails(versions[0].slug)"
            class="px-4 py-2 font-medium text-white transition-colors rounded-lg"
          >
          <Apple class="inline-block w-4 h-4 mr-1"/>
            Show
          </button>

              <button
            :disabled="versions.length<=0 ? true : fasse"
            :class=" versions.length<=0 ? ' cursor-not-allowed bg-[#d1abbe]' :' cursor-pointer bg-[#db147f]' "
            @click="OpenCreateNewVersionForm"
            class="px-4 py-2 font-medium text-white transition-colors rounded-lg"
          >
            <Plus class="inline-block w-4 h-4 mr-1" />
             Version
          </button>
          </div>
      
        </div>

        <!-- Title -->
        <div class="p-6 mb-6">
          <h1 class="text-xl font-bold text-gray-900">{{ versions.length <= 0 ? 'Companie Request' :'Companie Versions' }}</h1>
        </div>

        <div class="h-full border-gray-200">
          <div class="grid grid-cols-5 px-3 border-b border-gray-200">
            <div class="py-3 pl-4 text-sm font-bold text-gray-700">Name</div>

            <div class="py-3 text-sm font-bold text-gray-700">Cover Image</div>
            <div
              class="flex items-center justify-center py-3 font-bold text-gray-700"
            >
              Last updated
            </div>
            <div
              class="flex items-center justify-center py-3 font-bold text-gray-700"
            >
              Status
            </div>
          </div>
          <div v-if="versions.length > 0">
            <div
              v-for="version in versions[0].details"
              :key="version.id"
              class="grid items-center grid-cols-5 px-3 border-b border-gray-200"
            >
              <div class="py-3 pl-4 text-sm font-bold text-gray-900">
                {{ version.name }}
              </div>
              <div class="flex items-center py-3">
                <img
                  :src="version.avatarUrl || '/placeholder-company.png'"
                  :alt="`Logo de ${version.name}`"
                  class="object-cover w-12 h-12 border-4 border-white shadow-lg rounded-xl"
                />
              </div>
              <div class="px-6 py-4 text-sm text-gray-500">
                {{ moment(version?.updatedAt).format("LL") }}
              </div>
              <div class="flex items-center justify-center px-6 py-4">
                <div class="flex items-center">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      !version.isActive
                        ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        : 'bg-[#fff0fb] text-[#db147f] shadow-sm',
                    ]"
                  >
                    {{ version.isActive ? "Activated" : "Unactive" }}
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-center px-6 py-4">
                <div class="relative">
                  <button
                    @click="toggleActionMenu(version.id)"
                    class="p-1 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
                  >
                    <MoreVerticalIcon class="w-5 h-5" />
                  </button>

                  <!-- Dropdown Menu -->
                  <div
                    v-if="activeActionMenu === version.id"
                    class="absolute right-0 z-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg top-8"
                  >
                    <div class="py-1">
                       <button
                       v-if="version.isActive"
                        @click="ViewsDetails(versions[0].slug)"
                        class="flex items-center w-full px-4 py-2 text-sm text-left text-blue-600 hover:bg-blue-50"
                      >
                        <Eye class="w-4 h-4 mr-2" />
                        Show
                      </button>
                      <button
                        @click="deleteVersion(version)"
                        class="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                      >
                        <TrashIcon class="w-4 h-4 mr-2" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div
              v-for="version in request"
              :key="version.id"
              class="grid items-center grid-cols-5 px-3 border-b border-gray-200"
            >
              <div class="py-3 pl-4 text-sm font-bold text-gray-900">
                {{ version.name }}
              </div>
              <div class="flex items-center py-3">
                <img
                  :src="version.avatarUrl || '/placeholder-company.png'"
                  :alt="`Logo de ${version.name}`"
                  class="object-cover w-12 h-12 border-4 border-white shadow-lg rounded-xl"
                />
              </div>
              <div class="px-6 py-4 text-sm text-gray-500">
                {{ moment(version?.updatedAt).format("LL") }}
              </div>
              <div class="flex items-center justify-center px-6 py-4">
                <div class="flex items-center">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      !version.status
                        ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        : 'bg-[#fff0fb] text-[#db147f] shadow-sm',
                    ]"
                  >
                    {{ version.status ? "Activated" : "Unactive" }}
                  </span>
                </div>
              </div>
              <div class="flex items-center justify-center px-6 py-4">
                <div class="relative">
                  <button
                    @click="toggleActionMenu(version.id)"
                    class="p-1 text-gray-400 transition-colors rounded-lg hover:text-gray-600 hover:bg-gray-100"
                  >
                    <MoreVerticalIcon class="w-5 h-5" />
                  </button>

                  <!-- Dropdown Menu -->
                  <div
                    v-if="activeActionMenu === version.id"
                    class="absolute right-0 z-10 w-48 bg-white border border-gray-200 rounded-lg shadow-lg top-8"
                  >
                    <div class="py-1">
                      <button
                        @click="editVersion(version)"
                        class="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      >
                        <EditIcon class="w-4 h-4 mr-2" />
                        Modifier
                      </button>
                      <button
                        @click="deleteVersion(version)"
                        class="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                      >
                        <TrashIcon class="w-4 h-4 mr-2" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  ChevronLeftIcon,
  EditIcon,
  MoreVerticalIcon,
  Plus,
  TrashIcon,
  Eye,
  Apple
} from "lucide-vue-next";
import FormCreateOrUpdateCompanie from "@/components/profile/FormCreateOrUpdateCompanie.vue";
import { useAuthStore } from "@/stores/auth";
import moment from "moment";
import { useRouter } from "vue-router";
// États réactifs
const showFormCreateCompanie = ref(false);
const selectedVersion = ref(null);
const isVersionMode = ref(false);
const isUpdate=ref(false)
const activeActionMenu = ref(null);
const auth = useAuthStore();
const versions = ref([]);
const request = ref([]);
const router=useRouter()

const goBack = () => {
  console.log("Go back");
  router.go(-1)
};

const OpenCreateNewVersionForm = () => {
  isUpdate.value=false
  isVersionMode.value = true;
  showFormCreateCompanie.value = true;
  activeActionMenu.value = null;
};

const editVersion = (version) => {
  selectedVersion.value = version;
  isVersionMode.value = true;
  isUpdate.value=true
  showFormCreateCompanie.value = true;
  activeActionMenu.value = null;
};

const deleteVersion = (version) => {
  activeActionMenu.value = null;
};

const ViewsDetails=(versionId)=>{
  console.log(versionId)
  router.push({name:'me_companie_details',params:{companyId:versionId}})
}


const toggleActionMenu = (versionId) => {
  activeActionMenu.value =
    activeActionMenu.value === versionId ? null : versionId;
};

const closeForm = () => {
  showFormCreateCompanie.value = false;
  selectedVersion.value = null;
  isVersionMode.value = false;
};

const handleVersionSaved = (savedVersion) => {
  if (isVersionMode.value) {
    // Mettre à jour la version existante
    const index = versions.value.findIndex((v) => v.id === savedVersion.id);
    if (index !== -1) {
      versions.value[index] = { ...savedVersion };
    }
  } else {
    // Ajouter une nouvelle version
    versions.value.unshift(savedVersion);
  }
  closeForm();
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    activeActionMenu.value = null;
  }
};

const inithializeCompaniesInfo = () => {
  versions.value = auth.userCompany?.companies;
  request.value = auth.userCompany?.request;
};

onMounted(() => {
  inithializeCompaniesInfo();
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.grid-cols-5 {
  grid-template-columns: 1.5fr 1.4fr 0.8fr 1.5fr 0.7fr;
}

.main-frame {
  --sb-track-color: #ffffff;
  --sb-thumb-color: #ffffff;
  --sb-size: 9px;
}

.main-frame::-webkit-scrollbar {
  width: var(--sb-size);
  display: none;
}

.main-frame::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 3px;
}

.main-frame::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;
}

@supports not selector(::-webkit-scrollbar) {
  .main-frame {
    scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
  }
}
</style>
