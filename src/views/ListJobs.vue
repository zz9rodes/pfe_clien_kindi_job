<template>
  <AppModal @closeModal="HandleToogleModal" :isOpen="isOpenModal" :isLoader="false">
    <div class="block lg:hidden">
      <LargeAppFilter :initialActiveFilters="savedFilters" @filters-changed="handleFiltersChange"
        @close="HandleToogleModal" />
    </div>
  </AppModal>
        <AppModal  :isOpen="isModalOpen" :isLoader="true">
  </AppModal>
  
  <div class="flex flex-col w-full h-full py-24 overflow-auto ">
    <AppInputJobsFilter :showToggleModal="true" @filter="HandleFilterJobs" @open-modal="HandleToogleModal"
      @searchvalue-changed="handleSearchValueChange" :show-title="false" />
    <div class="container flex flex-1 px-4 mx-auto mt-8">
      <div class="hidden filter-bar lg:block">
        <JobFilter :initialActiveFilters="savedFilters" @filters-changed="handleFiltersChange" />
      </div>
      <main class="flex-1 bg-gray-50">
        <div class="container px-4 py-6 mx-auto">
          <div class="flex items-center justify-between mb-4">
            <h2 class="hidden text-lg font-bold text-gray-700 uppercase sm:block">
              Recommended for you
            </h2>
            <div id="pagination-bar " class="flex gap-2">
              <button :disabled="jobs?.meta?.previousPageUrl ? false:true" :class="!jobs?.meta?.previousPageUrl ? ' cursor-not-allowed':' cursor-pointer hover:bg-pink-500 hover:text-white'" class="px-3 py-1 border rounded-md">Prev</button>
              <button :disabled="jobs?.meta?.nextPageUrl  ? false:true" :class="!jobs?.meta?.nextPageUrl ? ' cursor-not-allowed':' cursor-pointer hover:bg-pink-500 hover:text-white'" class="px-3 py-1 border rounded-md">Next</button>
            </div>
          </div>
      
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <JobCard @click="()=>ShowJobDetail(job.slug)" v-for="job in jobs.data" :key="job.id" :job="job"
               :companyName="job.company.activeDetails.name"
              :companyLogo="job.company.activeDetails.avatarUrl"
              @bookmark="handleBookmark" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import JobFilter from "@/components/globales/JobFilter.vue";
import AppInputJobsFilter from "@/components/AppInputJobsFilter.vue";
import JobCard from "@/components/JobCard.vue";
import AppModal from "@/components/globales/AppModal.vue";
import LargeAppFilter from "@/components/globales/LargeAppFilter.vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute()
const auth=useAuthStore()

const company = ref(null);

const isModalOpen = ref(false);

const toggleLoader = () => {
    isModalOpen.value = !isModalOpen.value;
};

const jobs=ref([]);

const FecthJobs = async () => {
  toggleLoader();
try {
    const response = await auth.api("GET", `/extern/companies/jobs/all`, {}, false);
  if (response.success) {
    company.value = response.data;

    jobs.value=response.data

    console.log(response.data)
  }
} catch (error) {
  console.error(error)
}
  toggleLoader();
};

//   jobs.value= [
//   {
//     id: "job_001",
//     title: "Frontend Developer",
//     companyName: "TechNova",
//     companyLogo:
//       "https://i.pinimg.com/736x/9b/6b/79/9b6b79c35e01c891fd5cc70e3ec499a0.jpg",
//     location: "Remote",
//     contractType: "Full-time",
//     postedTime: "2 days ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/29/06/e2/2906e287427c26a98fd362e08a0f8093.jpg",
//     seen: true,
//     bookmarked: false,
//   },
//   {
//     id: "job_002",
//     title: "UX/UI Designer",
//     companyName: "PixelCraft",
//     companyLogo:
//       "https://i.pinimg.com/736x/9e/57/c3/9e57c3ba0aad7de876cdb1c2a4b0bc5d.jpg",
//     location: "Paris, France",
//     contractType: "Contract",
//     postedTime: "1 week ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/40/9f/77/409f77de213158f6b91780f3001ce214.jpg",
//     seen: false,
//     bookmarked: true,
//   },
//   {
//     id: "job_003",
//     title: "Backend Engineer",
//     companyName: "CloudWorks",
//     companyLogo:
//       "https://i.pinimg.com/736x/d4/69/68/d469681941c7089b06a3ccc5137a6f3c.jpg",
//     location: "Berlin, Germany",
//     contractType: "Part-time",
//     postedTime: "5 hours ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/68/93/cf/6893cf238804d5855aef507b3b2569be.jpg",
//     seen: true,
//     bookmarked: false,
//   },
//   {
//     id: "job_004",
//     title: "Data Analyst",
//     companyName: "InsightCorp",
//     companyLogo:
//       "https://i.pinimg.com/736x/06/f4/c9/06f4c9a44d0d0558472fe511d41bb0b9.jpg",
//     location: "Dakar, Senegal",
//     contractType: "Internship",
//     postedTime: "3 days ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/75/84/c5/7584c5cbf81ab168cf9a9470beafa44a.jpg",
//     seen: false,
//     bookmarked: true,
//   },
//   {
//     id: "job_001",
//     title: "Frontend Developer",
//     companyName: "TechNova",
//     companyLogo:
//       "https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg",
//     location: "Remote",
//     contractType: "Full-time",
//     postedTime: "2 days ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg",
//     seen: true,
//     bookmarked: false,
//   },
//   {
//     id: "job_002",
//     title: "UX/UI Designer",
//     companyName: "PixelCraft",
//     companyLogo: "/logos/pixelcraft.svg",
//     location: "Paris, France",
//     contractType: "Contract",
//     postedTime: "1 week ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/03/79/ff/0379ff163827fd605d0c522f2cf585ac.jpg",
//     seen: false,
//     bookmarked: true,
//   },
//   {
//     id: "job_003",
//     title: "Backend Engineer",
//     companyName: "CloudWorks",
//     companyLogo: "/logos/cloudworks.svg",
//     location: "Berlin, Germany",
//     contractType: "Part-time",
//     postedTime: "5 hours ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/83/1d/a8/831da825220f9ffad222603dbdc836d0.jpg",
//     seen: true,
//     bookmarked: false,
//   },
//   {
//     id: "job_004",
//     title: "Data Analyst",
//     companyName: "InsightCorp",
//     companyLogo: "/logos/insightcorp.svg",
//     location: "Dakar, Senegal",
//     contractType: "Internship",
//     postedTime: "3 days ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/42/6b/f9/426bf91f21f31aedb55edbb36ed96b73.jpg",
//     seen: false,
//     bookmarked: true,
//   },
//   {
//     id: "job_005",
//     title: "DevOps Engineer",
//     companyName: "SysOps360",
//     companyLogo: "/logos/sysops360.svg",
//     location: "London, UK",
//     contractType: "Full-time",
//     postedTime: "6 days ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/d3/10/1a/d3101a53409dcd5efea077fe7028878d.jpg",
//     seen: true,
//     bookmarked: false,
//   },
//   {
//     id: "job_006",
//     title: "Mobile App Developer",
//     companyName: "Appify",
//     companyLogo: "/logos/appify.svg",
//     location: "Remote",
//     contractType: "Freelance",
//     postedTime: "8 hours ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/f1/65/3d/f1653d78e9e052dd26c0af90ac3a9cde.jpg",
//     seen: false,
//     bookmarked: false,
//   },
//   {
//     id: "job_007",
//     title: "Product Manager",
//     companyName: "VisionTech",
//     companyLogo: "/logos/visiontech.svg",
//     location: "New York, USA",
//     contractType: "Full-time",
//     postedTime: "2 weeks ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/12/d2/ed/12d2ed67d9e029f342034dcbd31d9baf.jpg",
//     seen: true,
//     bookmarked: true,
//   },
//   {
//     id: "job_008",
//     title: "QA Engineer",
//     companyName: "TestLogic",
//     companyLogo: "/logos/testlogic.svg",
//     location: "Toronto, Canada",
//     contractType: "Contract",
//     postedTime: "4 days ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/77/a2/d3/77a2d3fefb5377219de622a7719f6487.jpg",
//     seen: false,
//     bookmarked: false,
//   },
//   {
//     id: "job_009",
//     title: "Technical Writer",
//     companyName: "DocuTech",
//     companyLogo: "/logos/docutech.svg",
//     location: "Remote",
//     contractType: "Part-time",
//     postedTime: "1 day ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/1d/85/6d/1d856d20bb8e1847e33003785b7b6a30.jpg",
//     seen: false,
//     bookmarked: true,
//   },
//   {
//     id: "job_010",
//     title: "Cybersecurity Analyst",
//     companyName: "SecureNet",
//     companyLogo: "/logos/securenet.svg",
//     location: "Abidjan, Côte d’Ivoire",
//     contractType: "Full-time",
//     postedTime: "3 weeks ago",
//     imageUrl:
//       "https://i.pinimg.com/736x/e5/87/35/e5873568bc096c20a3cd45f93f89db26.jpg",
//     seen: true,
//     bookmarked: true,
//   },
// ];
const isOpenModal = ref(false);

const HandleToogleModal = () => {
  isOpenModal.value = !isOpenModal.value;
};

const savedFilters = ref({
  location: ["paris", "london"],
  category: ["childJob"],
  salary: {
    min: 40000,
    max: 80000,
    isFiltered: true,
  },
  jobType: ["fulltime"],
  gender: [],
  levelExperience: [],
  searchQuery: "childJob",
});

const handleFiltersChange = (filters) => {
  console.log("Filtres modifiés:", filters);
  // Mettre à jour les résultats de recherche
  // Sauvegarder les filtres si nécessaire
  savedFilters.value = filters;
};

const handleSearchValueChange = (searchQuery) => {
  savedFilters.value.searchQuery = searchQuery;
};

const HandleFilterJobs = () => {
  console.log(savedFilters.value);
};

const ShowJobDetail = async (id) => {

  if (route.name == 'l_jobs') {
    router.push({ name: "account_jobs_details", params: { id: id } })

  }
  else {
     router.push({ name: 'jobs_details', params: { id: id } });
  }
}

onMounted(()=>{
  FecthJobs()
})
</script>
