<template>
  <div class="w-full min-h-screen p-6">
    <div class="h-full">
      <div class="h-full rounded-lg">
        <div class="flex flex-col h-full lg:flex-row">
          <!-- Sidebar avec onglets -->
          <div class="lg:w-80 lg:border-r lg:border-b-0">
            <div class="h-auto p-4 rounded-md bg-gray-50 lg:p-6">
              <h2
                class="mb-4 text-lg text-gray-800 fonht-semibold lg:mb-6 lg:text-xl"
              >
                Account Settings
              </h2>
              <nav
                class="flex flex-row space-x-2 overflow-x-auto lg:flex-col lg:space-x-0 lg:space-y-2 lg:overflow-x-visible"
              >
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="ToogleActiveTab(tab.id)"
                  :class="[
                    'flex-shrink-0 lg:w-full flex flex-1 flex-col lg:flex-row items-center px-3 lg:px-4 py-2 lg:py-3 text-center lg:text-left rounded-lg transition-all duration-200 min-w-max lg:min-w-0',
                    activeTab === tab.id
                      ? 'bg-[#fff0fb] text-[#db147f] shadow-sm '
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
                  ]"
                >
                  <component
                    :is="tab.icon"
                    class="w-4 h-4 mb-1 lg:w-5 lg:h-5 lg:mb-0 lg:mr-3"
                  />
                  <span
                    class="hidden text-xs font-medium md:block lg:text-sm"
                    >{{ tab.name }}</span
                  >
                </button>
              </nav>
            </div>
          </div>

          <!-- Contenu principal -->
          <div class="flex-[1] p-4 lg:p-8 overflow-auto">
            <!-- Onglet Profile -->
            <div v-if="activeTab === 'profile'">
              <AccountDetail :account-profile="userData" />
            </div>

            <!-- Onglet Additional Parent/Guardian -->
            <div v-if="activeTab === 'companies'">
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
                  v-if="companies.length < 0"
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
            </div>

            <div v-if="activeTab === 'children'">
              <div
                class="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between lg:mb-8"
              >
                <h1
                  class="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl sm:mb-0"
                >
                  My Children
                </h1>
                <button
                  class="bg-[#db147f] text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors text-sm lg:text-base"
                >
                  Add Child
                </button>
              </div>

              <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6"
              >
                <div
                  v-for="child in children"
                  :key="child.id"
                  class="p-4 bg-white border rounded-lg shadow-sm lg:p-6"
                >
                  <div class="flex items-center mb-3 lg:mb-4">
                    <div
                      class="w-10 h-10 lg:w-12 lg:h-12 bg-[#fff0fb] rounded-full flex items-center justify-center"
                    >
                      <BabyIcon class="w-5 h-5 lg:w-6 lg:h-6 text-[#db147f]" />
                    </div>
                    <div class="ml-3">
                      <h3
                        class="text-sm font-medium text-gray-900 lg:text-base"
                      >
                        {{ child.name }}
                      </h3>
                      <p class="text-xs text-gray-600 lg:text-sm">
                        Age: {{ child.age }}
                      </p>
                    </div>
                  </div>
                  <div class="space-y-1 text-xs lg:space-y-2 lg:text-sm">
                    <p>
                      <span class="font-medium">Date of Birth:</span>
                      {{ child.dob }}
                    </p>
                    <p>
                      <span class="font-medium">School:</span>
                      {{ child.school }}
                    </p>
                  </div>
                  <button
                    class="mt-3 lg:mt-4 text-[#db147f] hover:text-[#c01370] text-xs lg:text-sm font-medium"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>

            <div v-if="activeTab === 'signature'">
              <drawSigrature />
            </div>

            <div v-if="activeTab === 'cv_profile'">
              <!-- <drawSigrature /> -->
              <Form_Create_or_Update_Cv_Profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import {
  UserIcon,
  UsersIcon,
  Plus,
  BabyIcon,
  PenToolIcon,
  FileUserIcon,
} from "lucide-vue-next";
import FormCreateOrUpdateCompanie from "@/components/profile/FormCreateOrUpdateCompanie.vue";
import drawSigrature from "@/components/profile/drawSigrature.vue";
import Form_Create_or_Update_Cv_Profile from "./Form_Create_or_Update_Cv_Profile.vue";
import AccountDetail from "@/components/profile/accountDetail.vue";
import CompanieCard from "@/components/CompanieCard.vue";


const router = useRouter();
const route = useRoute();

const auth=useAuthStore()

const activeTab =
  route?.params?.tab == "companies" ? ref(route?.params?.tab) : ref("profile");

const tabs = [
  { id: "profile", name: "Profile", icon: UserIcon },
  { id: "companies", name: "Companies Information", icon: UsersIcon },
  { id: "signature", name: "Sign Agreement", icon: PenToolIcon },
  { id: "cv_profile", name: "Cv Profile", icon: FileUserIcon },
];

const children = ref([
  {
    id: 1,
    name: "Emma Johnson",
    age: 5,
    dob: "2019-03-15",
    school: "Sunshine Elementary",
  },
  {
    id: 2,
    name: "Lucas Johnson",
    age: 3,
    dob: "2021-07-22",
    school: "Little Stars Preschool",
  },
]);

// const userData = {
//   email: "admin@demo.com",
//   slug: "john-doe",
//   firstName: "John",
//   lastName: "Nyada",
//   phoneNumber: "0123456789",
//   dob: new Date("1990-05-20"),
//   accountType: "BASIC",
//   country: "Cameroon",
//   city: "Douala",
//   avatarUrl: null,
//   address: null ?? "Not Provide",
//   firstLangage: "English" ?? "Not Provide",
//   secondLangage: null ?? "Not Provide",
//   frontIdCard: null,
//   backIdCard: null,
// };

const userData=auth.user

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

const OpenFormCreateCompanie = ref(false);

const ToogleActiveTab = (tabId) => {
  activeTab.value = tabId;
  route.params.tab = tabId;
  console.log(route.params);

  OpenFormCreateCompanie.value = false;
};

const validTabs = ["profile", "companies", "signature", "cv_profile"];

onMounted(() => {
  const tabParam = route.query.tab;
  activeTab.value = validTabs.includes(tabParam) ? tabParam : "profile";
});
</script>

<style scoped>
/* Styles personnalisés pour les transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
