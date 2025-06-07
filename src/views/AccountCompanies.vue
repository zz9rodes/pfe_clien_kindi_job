<template>
     <div v-if="!OpenFormCreateCompanie" class="py-1">
                <div
                  class="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between lg:mb-8"
                >
                  <h1
                    class="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl sm:mb-0"
                  >
                    Companie Informtaion
                  </h1>
                </div>

                <div
                  v-if="companies.length > 0"
                  class="p-6 text-center rounded-lg bg-gray-50"
                >
                  <UsersIcon
                    class="w-8 h-8 mx-auto mb-4 text-gray-400 sm:h-16 sm:w-16"
                  />
                  <h3 class="mb-2 font-medium text-gray-900 text-md sm:text-lg">
                    No Companie Found
                  </h3>
                  <p class="mb-4 text-gray-600">
                    You haven't added any companie
                  </p>
                  <button
                    @click="OpenFormCreateCompanie = true"
                    class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors"
                  >
                    <span class="hidden sm:block"
                      >Create Your Companie Now</span
                    >
                    <Plus class="sm:hidden" />
                  </button>
                </div>
                <div
                  v-else
                  class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  <CompanieCard
                    v-for="company in companies"
                    @click="viewCompany(company.id)"
                    :key="company.id"
                    :company="company"
                  />
                </div>
              </div>

              <FormCreateOrUpdateCompanie
                @close-form="OpenFormCreateCompanie = false"
                v-else
                class="mt-4"
              />
</template>

<script setup>
import {ref } from 'vue'
import CompanieCard from '@/components/CompanieCard.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import FormCreateOrUpdateCompanie from '@/components/profile/FormCreateOrUpdateCompanie.vue';
// FormCreateOrUpdateCompanie

const router=useRouter()

const auth=useAuthStore()
const  OpenFormCreateCompanie = ref(false);

const companies = ref([
  {
    id: 8,
    name: "Creative Agency Plus",
    category: "Marketing",
    industry: "Digital Marketing, Advertising, Content Creation",
    location: "Nantes, Rennes",
    employeeCount: "< 15 employees",
    jobsCount: "Internships available",
    image:
      "https://i.pinimg.com/736x/bd/53/9d/bd539da7853d7450133d4da4647a3b44.jpg",
    logo: "https://i.pinimg.com/736x/5e/11/66/5e1166411c8c9bbe3fa91fa81a6f0e52.jpg",
    isFollowed: false,
  },
  {
    id: 4,
    name: "TechCorp Solutions",
    category: "Technology",
    industry: "Software Development, AI, Machine Learning",
    location: "Lyon, France",
    employeeCount: "50-100 employees",
    jobsCount: "5 jobs",
    image:
      "https://i.pinimg.com/736x/23/06/63/2306632032cd363320922c345e300ceb.jpg?height=200&width=300",
    logo: "https://i.pinimg.com/736x/5f/87/16/5f8716a5c1ad120d1cbcaa3007d1e1f5.jpg?height=40&width=60",
    isFollowed: false,
  },
]);

const viewCompany = async (id) => {
  router.push({ name: "companie_details", params: { id: id } });
};
</script>