<template>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="space-y-8 lg:col-span-2">
            <div class="p-6 bg-white rounded-lg">
                <h2 class="mb-4 text-xl font-semibold text-gray-900">
                    About {{ company.name }}
                </h2>
                <div class="prose prose-gray max-w-none">
                    <p class="mb-4 leading-relaxed text-gray-700">
                        {{ company.description }}
                    </p>
                    <p class="leading-relaxed text-gray-700">
                        We are committed to innovation and excellence in everything we do.
                        Our team of passionate professionals works together to deliver
                        cutting-edge solutions that make a real difference in our industry.
                    </p>
                </div>
            </div>

            <div class="p-6 border rounded-lg">
                <h3 class="mb-4 font-semibold text-gray-900">Company Info</h3>
                <div class="space-y-4">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Industry</span>
                        <span class="font-medium text-gray-900">{{
                            company.industry
                            }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Company size</span>
                        <span class="font-medium text-gray-900">{{ company.employeeCount }} employees</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Founded</span>
                        <span class="font-medium text-gray-900">{{ company.founded }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Headquarters</span>
                        <span class="font-medium text-gray-900">{{
                            company.headquarters
                            }}</span>
                    </div>
                </div>
            </div>

            <!-- Locations -->
            <div class="p-6 bg-white border rounded-lg">
                <h3 class="mb-4 font-semibold text-gray-900">Locations</h3>
                <div class="space-y-3">
                    <div v-for="location in company.locations" :key="location.city" class="flex items-start">
                        <MapPinIcon class="flex-shrink-0 w-4 h-4 mt-1 mr-3 text-gray-400" />
                        <div>
                            <div class="font-medium text-gray-900">
                                {{ location.city }}
                            </div>
                            <div class="text-sm text-gray-600">
                                {{ location.address }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between border divide-x table-stats">
                <div class="p-6 ">
                    Teams Members
                    <span class="text-2xl font-bold ">
                        8
                    </span>
                </div>
                <div class="p-6 ">
                    Active Jobs
                    <span class="text-2xl font-bold ">
                        5
                    </span>
                </div>
                <div class="p-6 ">
                    Publish News <span class="text-2xl font-bold ">
                        11
                    </span>
                </div>
            </div>

            <WordMap/>
            
        </div>

        <!-- Sidebar -->

        <div class="space-y-6">
            <JobCard
              v-for="job in jobs"
              :key="job.id"
              :job="job"
              @bookmark="handleBookmark"
            />
            <!-- <div class=""> -->
               <button class="w-full p-2 bg-[#db147f]  text-white">
                View Mores ...
               </button>
            <!-- </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import {
    BuildingIcon,
    MapPinIcon,
    StarIcon,
    TrendingUpIcon,
    ShieldIcon,
    ZapIcon,
} from "lucide-vue-next";
import JobCard from "../JobCard.vue";
import WordMap from "../globales/WordMap.vue";

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
  } 
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
</script>

<style></style>