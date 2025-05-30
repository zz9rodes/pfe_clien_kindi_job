<template>
  <div class="w-full min-h-screen">
    <div class="relative">
      <div
        class="relative overflow-hidden h-72 md:h-80 bg-gradient-to-r from-blue-600 to-purple-700"
      >
        <img
          src="https://i.pinimg.com/736x/3e/81/89/3e81896faf555eb1f64231cefe643c6b.jpg"
          alt="Company Cover"
          class="object-cover w-full h-full"
        />
        <div
          class="absolute inset-0 flex justify-center pt-20 bg-black sm:pt-p sm:justify-start bo bg-opacity-30 px-14"
        >
          <div class="flex flex-col gap-4 pb-12 sm:items-end sm:flex-row">
            <div class="flex-shrink-0">
              <div
                class="flex items-center justify-center w-20 h-20 bg-white border-4 border-white rounded-lg shadow-md md:w-24 md:h-24"
              >
                <BuildingIcon class="w-12 h-12 text-gray-400 md:w-16 md:h-16" />
              </div>
            </div>
            <div class="flex">
              <div
                class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div class="flex flex-col gap-2">
                  <h1 class="mb-2 text-2xl font-bold text-white md:text-3xl">
                    {{ company.name }}
                  </h1>
                  <div
                    class="flex flex-wrap items-center gap-4 text-sm text-white"
                  >
                    <span class="flex items-center">
                      <MapPinIcon class="w-4 h-4 mr-1" />
                      {{ company.location }}
                    </span>
                    <span class="flex items-center">
                      <UsersIcon class="w-4 h-4 mr-1" />
                      {{ company.employeeCount }} employees
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute -mt-32 mx-14 md:mx-8">
        <div class="rounded-lg"></div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="sticky top-0 z-10 border-b border-gray-20 bg-neutral-400">
      <div class="mx-4 md:mx-8">
        <nav class="flex space-x-8 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'border-[#db147f] text-[#db147f]'
                : 'border-transparent text-white hover:white-gray hover:border-gray-300',
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="py-8 mx-4 md:mx-8">
      <!-- About Tab -->
      <div v-if="activeTab === 'about'" class="space-y-8">
        <AboutCompanie />
      </div>

      <!-- Jobs Tab -->
      <div v-if="activeTab === 'jobs'" class="space-y-6">
        <div
          class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-center space-x-4">
            <select
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] focus:border-transparent"
            >
              <option>All Locations</option>
              <option>Remote</option>
              <option>New York</option>
              <option>San Francisco</option>
              <option>London</option>
            </select>
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

      <!-- Team Tab -->
      <div v-if="activeTab === 'team'" class="space-y-8">
        <div class="text-center">
          <h2 class="mb-4 text-2xl font-semibold text-gray-900">
            Meet Our Team
          </h2>
          <p class="max-w-2xl mx-auto text-gray-600">
            Our diverse team of talented professionals is what makes our company
            special. Get to know the people behind our success.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
          <TeamMemberCard   v-for="member in members"
            :key="member.name" :member="member"/>
          <!-- <div
            v-for="member in members"
            :key="member.name"
            class="p-2 text-center bg-white border rounded-lg"
          >
            <div
              class="relative flex flex-col overflow-hidden transition duration-700 ease-in-out group hover:cursor-pointer"
            >
              <div class="w-20 h-20 mx-auto mb-4">
                <img
                  v-if="member.avatar"
                  :src="member.avatar"
                  :alt="member.name"
                  class="object-cover w-20 h-20 rounded-full"
                  @error="showDefaultAvatar = true"
                  v-show="!showDefaultAvatar"
                />
                <div
                  v-if="!member.avatar || showDefaultAvatar"
                  class="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full"
                >
                  <UserIcon class="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h3 class="mb-1 font-semibold text-gray-900">
                {{ member.name }}
              </h3>
              <p class="mb-2 text-sm text-gray-600">{{ member.position }}</p>
              <p class="text-xs text-gray-500">{{ member.department }}</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  BuildingIcon,
  MapPinIcon,
  UsersIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
  TrendingUpIcon,
  ShieldIcon,
  ZapIcon,
} from "lucide-vue-next";
import AboutCompanie from "@/components/compnanies/AboutCompanie.vue";
import JobCard from "@/components/JobCard.vue";
import TeamMemberCard from "@/components/TeamMemberCard.vue";

const activeTab = ref("about");

const tabs = [
  { id: "about", name: "About" },
  { id: "jobs", name: "Jobs" },
  { id: "team", name: "Team" },
  { id: "news", name: "News" },
];

const company = ref({
  name: "TechCorp Solutions",
  location: "San Francisco, CA",
  employeeCount: "500-1000",
  founded: "2015",
  industry: "Technology",
  headquarters: "San Francisco, CA",
  description:
    "TechCorp Solutions is a leading technology company specializing in innovative software solutions and digital transformation services. We help businesses of all sizes leverage cutting-edge technology to achieve their goals and stay competitive in today's fast-paced digital landscape.",
  values: [
    {
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies",
      icon: ZapIcon,
    },
    {
      title: "Excellence",
      description: "We strive for the highest quality in everything we do",
      icon: StarIcon,
    },
    {
      title: "Growth",
      description: "We believe in continuous learning and development",
      icon: TrendingUpIcon,
    },
    {
      title: "Integrity",
      description: "We operate with transparency and ethical standards",
      icon: ShieldIcon,
    },
  ],
  benefits: [
    "Health Insurance",
    "Dental & Vision",
    "Flexible Working Hours",
    "Remote Work Options",
    "Professional Development",
    "Gym Membership",
    "Free Lunch",
    "Stock Options",
    "Paid Time Off",
    "Parental Leave",
    "Learning Budget",
    "Team Events",
  ],
  locations: [
    {
      city: "San Francisco",
      address: "123 Tech Street, CA 94105",
    },
    {
      city: "New York",
      address: "456 Innovation Ave, NY 10001",
    },
    {
      city: "London",
      address: "789 Digital Lane, EC1A 1BB",
    },
  ],
});

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
];

const members = ref([
  {
    avatar:
      "https://i.pinimg.com/736x/a0/dd/1b/a0dd1b06ffb50116537e15d377fa3b11.jpg",
    name: "John Doe",
    position: "Développeur Web",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/09/aa/00/09aa00c89419c62c3f3f58bfff2baa79.jpg",
    name: "Jane Smith",
    position: "Designer UX",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/6a/4c/d7/6a4cd7de7b9322f3f75b09bafeb883f6.jpg",
    name: "Alice Johnson",
    position: "Chef de projet",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/bb/c7/5f/bbc75f884ab3e30157ab356d622a396e.jpg",
    name: "Bob Brown",
    position: "Analyste de données",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/a2/b7/a3/a2b7a353a4f5e24102d60e6d41a995cb.jpg",
    name: "Charlie Davis",
    position: "Responsable marketing",
  },
  {
    avatar:
      "https://i.pinimg.com/736x/36/1a/d1/361ad1d0f6391b502f8d83dc90ec0b37.jpg",
    name: "Eve Miller",
    position: "Ingénieur logiciel",
  },
]);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  max-width: none;
}
</style>
