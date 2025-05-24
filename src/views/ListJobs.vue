<template>
  <AppModal @closeModal="HandleToogleModal" :isOpen="isOpenModal" :isLoader="false">
    <div class="block lg:hidden">
      <LargeAppFilter
        :initialActiveFilters="savedFilters"
        @filters-changed="handleFiltersChange"
        @close="HandleToogleModal"
      />
    </div>
  </AppModal>
  <div class="flex flex-col min-h-screen mt-24 bg-white">
    <AppInputFilter
      :showToggleModal="true"
      @filter="HandleFilterJobs"
      @open-modal="HandleToogleModal"
      @searchvalue-changed="handleSearchValueChange"
      :show-title="false"
    />
    <div class="container flex flex-1 px-4 mx-auto mt-8">
      <div class="hidden filter-bar lg:block">
        <JobFilter
          :initialActiveFilters="savedFilters"
          @filters-changed="handleFiltersChange"
        />
      </div>
      <main class="flex-1 bg-gray-50">
        <div class="container px-4 py-6 mx-auto">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-gray-700 uppercase">
              Recommended for you
            </h2>
          </div>
          <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
            <div
              class="group flex overflow-hidden relative group transition duration-700 rounded-[2px] ease-in-out bg-white border border-gray-300 shadow-sm hover:shadow-md hover:cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute hidden group-hover:block text-yellow-50 right-2 top-2"
              >
                <path
                  d="M20 4L8 16M20 4V14M20 4H10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex-1 p-4">
                <div class="text-xs text-[#e4097f] font-medium mb-1">
                  HINTS, TIPS & STORIES
                </div>
                <h3 class="mb-2 text-lg font-bold">
                  Win a Nature Play Kitchen
                </h3>
                <p class="mb-2 text-sm text-gray-600">
                  Thanks to our friends at KindiJob, one KindiJob reader will
                  win a Hape Outdoor Kitchen, worth $399.95!
                </p>
                <p class="text-xs text-gray-500">
                  Posted 12 June 2023, and if you're reading it today, KindiJob,
                  you're welcome to enter too! Good luck everyone.
                </p>
              </div>
              <div class="w-1/3">
                <img
                  src="https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg"
                  alt="Nature Play Kitchen"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>

            <div
              class="flex group overflow-hidden relative transition duration-700 rounded-[2px] ease-in-out bg-white border border-gray-300 shadow-sm hover:shadow-md hover:cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute hidden text-yellow-50 right-2 top-2 group-hover:block"
              >
                <path
                  d="M20 4L8 16M20 4V14M20 4H10"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex-1 p-4">
                <div class="text-xs text-[#e4097f] font-medium mb-1">
                  HEALTH
                </div>
                <h3 class="mb-2 text-lg font-bold">Injuries at ChildJob</h3>
                <p class="mb-2 text-sm text-gray-600">
                  What to do if your child suffers a bump, bruise or something
                  worse during childJob.
                </p>
                <p class="text-xs text-gray-500">
                  What to do if your child suffers a bump, bruise or something
                  worse during childJob and what to expect from a KindiJob
                  centre if it does happen to see the best Job...
                </p>
              </div>
              <div class="w-1/3">
                <img
                  src="https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg"
                  alt="Injuries at ChildJob"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <JobCard
              v-for="job in jobs"
              :key="job.id"
              :job="job"
              @bookmark="handleBookmark"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import JobFilter from "@/components/globales/JobFilter.vue";
import AppInputFilter from "@/components/AppInputFilter.vue";
import JobCard from "@/components/JobCard.vue";
import AppModal from "@/components/globales/AppModal.vue";
import LargeAppFilter from "@/components/globales/LargeAppFilter.vue";

const jobs = [
  {
    id: "job_001",
    title: "Frontend Developer",
    companyName: "TechNova",
    companyLogo:
      "https://i.pinimg.com/736x/9b/6b/79/9b6b79c35e01c891fd5cc70e3ec499a0.jpg",
    location: "Remote",
    contractType: "Full-time",
    postedTime: "2 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/29/06/e2/2906e287427c26a98fd362e08a0f8093.jpg",
    seen: true,
    bookmarked: false,
  },
  {
    id: "job_002",
    title: "UX/UI Designer",
    companyName: "PixelCraft",
    companyLogo:
      "https://i.pinimg.com/736x/9e/57/c3/9e57c3ba0aad7de876cdb1c2a4b0bc5d.jpg",
    location: "Paris, France",
    contractType: "Contract",
    postedTime: "1 week ago",
    imageUrl:
      "https://i.pinimg.com/736x/40/9f/77/409f77de213158f6b91780f3001ce214.jpg",
    seen: false,
    bookmarked: true,
  },
  {
    id: "job_003",
    title: "Backend Engineer",
    companyName: "CloudWorks",
    companyLogo:
      "https://i.pinimg.com/736x/d4/69/68/d469681941c7089b06a3ccc5137a6f3c.jpg",
    location: "Berlin, Germany",
    contractType: "Part-time",
    postedTime: "5 hours ago",
    imageUrl:
      "https://i.pinimg.com/736x/68/93/cf/6893cf238804d5855aef507b3b2569be.jpg",
    seen: true,
    bookmarked: false,
  },
  {
    id: "job_004",
    title: "Data Analyst",
    companyName: "InsightCorp",
    companyLogo:
      "https://i.pinimg.com/736x/06/f4/c9/06f4c9a44d0d0558472fe511d41bb0b9.jpg",
    location: "Dakar, Senegal",
    contractType: "Internship",
    postedTime: "3 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/75/84/c5/7584c5cbf81ab168cf9a9470beafa44a.jpg",
    seen: false,
    bookmarked: true,
  },
  {
    id: "job_001",
    title: "Frontend Developer",
    companyName: "TechNova",
    companyLogo:
      "https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg",
    location: "Remote",
    contractType: "Full-time",
    postedTime: "2 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg",
    seen: true,
    bookmarked: false,
  },
  {
    id: "job_002",
    title: "UX/UI Designer",
    companyName: "PixelCraft",
    companyLogo: "/logos/pixelcraft.svg",
    location: "Paris, France",
    contractType: "Contract",
    postedTime: "1 week ago",
    imageUrl:
      "https://i.pinimg.com/736x/03/79/ff/0379ff163827fd605d0c522f2cf585ac.jpg",
    seen: false,
    bookmarked: true,
  },
  {
    id: "job_003",
    title: "Backend Engineer",
    companyName: "CloudWorks",
    companyLogo: "/logos/cloudworks.svg",
    location: "Berlin, Germany",
    contractType: "Part-time",
    postedTime: "5 hours ago",
    imageUrl:
      "https://i.pinimg.com/736x/83/1d/a8/831da825220f9ffad222603dbdc836d0.jpg",
    seen: true,
    bookmarked: false,
  },
  {
    id: "job_004",
    title: "Data Analyst",
    companyName: "InsightCorp",
    companyLogo: "/logos/insightcorp.svg",
    location: "Dakar, Senegal",
    contractType: "Internship",
    postedTime: "3 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/42/6b/f9/426bf91f21f31aedb55edbb36ed96b73.jpg",
    seen: false,
    bookmarked: true,
  },
  {
    id: "job_005",
    title: "DevOps Engineer",
    companyName: "SysOps360",
    companyLogo: "/logos/sysops360.svg",
    location: "London, UK",
    contractType: "Full-time",
    postedTime: "6 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/d3/10/1a/d3101a53409dcd5efea077fe7028878d.jpg",
    seen: true,
    bookmarked: false,
  },
  {
    id: "job_006",
    title: "Mobile App Developer",
    companyName: "Appify",
    companyLogo: "/logos/appify.svg",
    location: "Remote",
    contractType: "Freelance",
    postedTime: "8 hours ago",
    imageUrl:
      "https://i.pinimg.com/736x/f1/65/3d/f1653d78e9e052dd26c0af90ac3a9cde.jpg",
    seen: false,
    bookmarked: false,
  },
  {
    id: "job_007",
    title: "Product Manager",
    companyName: "VisionTech",
    companyLogo: "/logos/visiontech.svg",
    location: "New York, USA",
    contractType: "Full-time",
    postedTime: "2 weeks ago",
    imageUrl:
      "https://i.pinimg.com/736x/12/d2/ed/12d2ed67d9e029f342034dcbd31d9baf.jpg",
    seen: true,
    bookmarked: true,
  },
  {
    id: "job_008",
    title: "QA Engineer",
    companyName: "TestLogic",
    companyLogo: "/logos/testlogic.svg",
    location: "Toronto, Canada",
    contractType: "Contract",
    postedTime: "4 days ago",
    imageUrl:
      "https://i.pinimg.com/736x/77/a2/d3/77a2d3fefb5377219de622a7719f6487.jpg",
    seen: false,
    bookmarked: false,
  },
  {
    id: "job_009",
    title: "Technical Writer",
    companyName: "DocuTech",
    companyLogo: "/logos/docutech.svg",
    location: "Remote",
    contractType: "Part-time",
    postedTime: "1 day ago",
    imageUrl:
      "https://i.pinimg.com/736x/1d/85/6d/1d856d20bb8e1847e33003785b7b6a30.jpg",
    seen: false,
    bookmarked: true,
  },
  {
    id: "job_010",
    title: "Cybersecurity Analyst",
    companyName: "SecureNet",
    companyLogo: "/logos/securenet.svg",
    location: "Abidjan, Côte d’Ivoire",
    contractType: "Full-time",
    postedTime: "3 weeks ago",
    imageUrl:
      "https://i.pinimg.com/736x/e5/87/35/e5873568bc096c20a3cd45f93f89db26.jpg",
    seen: true,
    bookmarked: true,
  },
];
const isOpenModal=ref(false)

const HandleToogleModal=()=>{
  isOpenModal.value=!isOpenModal.value
}

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
</script>
