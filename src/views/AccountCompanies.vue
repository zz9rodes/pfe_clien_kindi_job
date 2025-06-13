<template>
      <AppModal
      @closeModal="toggleOpenLoaderModal"
      :isOpen="isLoading"
      :isLoader="true"
    />
  <div class="w-full px-4 ">
    <div v-if="!OpenFormCreateCompanie" class="w-full py-1">
      <div
        class="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between lg:mb-8"
      >
        <h1 class="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl sm:mb-0">
          Companie Informtaion
        </h1>
      </div>
      <div
        v-if="companies.length <= 0"
        class="p-6 text-center rounded-lg bg-gray-50"
      >
        <UsersIcon class="w-8 h-8 mx-auto mb-4 text-gray-400 sm:h-16 sm:w-16" />
        <h3 class="mb-2 font-medium text-gray-900 text-md sm:text-lg">
          No Companie Found
        </h3>
        <p class="mb-4 text-gray-600">You haven't added any companie</p>
        <button
          @click="OpenFormCreateCompanie = true"
          class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors"
        >
          <span class="hidden sm:block">Create Your Companie Now</span>
          <Plus class="sm:hidden" />
        </button>
      </div>
      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CompanieCard
          v-for="company in companies"
          @click="viewCompany(company.id)"
          :key="company.id"
          :company="company.activeDetails ? company.activeDetails : company"
        />
      </div>
    </div>

    <FormCreateOrUpdateCompanie
      @close-form="OpenFormCreateCompanie = false"
      @request-saved="HandleResquestSave"
      v-else
      class="w-full mt-4"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CompanieCard from "@/components/CompanieCard.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import FormCreateOrUpdateCompanie from "@/components/profile/FormCreateOrUpdateCompanie.vue";
import AppModal from "@/components/globales/AppModal.vue";

const router = useRouter();

const isLoading=ref(false)
const auth = useAuthStore();
const OpenFormCreateCompanie = ref(false);

const companies = ref([]);
const request=ref({})

const viewCompany = async (id) => {
  router.push({ name: "companie_versions"});
};

const toggleOpenLoaderModal=()=>{
  isLoading.value=!isLoading.value
}

const HandleGetCompaniedetail = async () => {
  toggleOpenLoaderModal()
  try {
    const response = await auth.api("GET", "/company_request", {}, false);

    if (response.success) {
      console.log(response.data.companies);

      companies.value =
        response.data.companies.length > 0 ? response.data.companies : response.data.request;
      auth.setCompany(response.data)
    }
  toggleOpenLoaderModal()
  } catch (error) {
    console.log(error)
      toggleOpenLoaderModal()
  }
 
};

  const HandleResquestSave=(data)=>{
    companies.value.push(data)
  }

onMounted(async () => {
  await HandleGetCompaniedetail();
});
</script>
