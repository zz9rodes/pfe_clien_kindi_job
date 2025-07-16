<template>
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="space-y-8 lg:col-span-2">
            <div class="p-6 bg-white rounded-lg">
                <h2 class="mb-4 text-xl font-semibold text-gray-900">
                    About {{ company?.name }} 
                </h2>
                <div class="prose prose-gray max-w-none">
                    <p class="mb-4 leading-relaxed text-gray-700">
                        {{ company?.description }}
                    </p>
                </div>
            </div>

            <div class="p-6 border rounded-lg">
                <h3 class="mb-4 font-semibold text-gray-900">Company Info</h3>
                <div class="space-y-4">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Industry</span>
                        <span class="font-medium text-gray-900">{{
                            company?.industry
                            }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Company size</span>
                        <span class="font-medium text-gray-900"> {{ employees?.length }} employees</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Register Since</span>
                        <span class="font-medium text-gray-900">{{ moment( company?.createdAt ).format('MMM Do YYYY')}}</span>
                    </div>
                   
                </div>
            </div>
            <!-- Locations -->
            <div class="p-6 bg-white border rounded-lg">
                <div class="inline-flex ">
                    <MapPinIcon class="flex-shrink-0 w-4 h-4 mt-1 mr-3 text-gray-400" />
                    <h3 class="mb-4 mr-3 text-lg font-semibold text-gray-900 ">Locations </h3>
                </div>
                    <div  class="flex items-start">
                        <div>
                            <div class="font-medium text-gray-900">
                             <span class="pr-4 font-semibold">Country :</span>   {{ company?.country }}
                            </div>
                            <div class="font-medium text-gray-900">
                               <span  class="pr-4 font-semibold">City :</span>  {{ company?.city }}
                            </div>

                            <div class="text-sm text-gray-600">
                                <!-- {{ location.address }} -->
                            </div>
                        </div>
                    </div>
            </div> 

            <div class="flex justify-between border divide-x rounded-lg table-stats">
                <div class="flex items-center gap-2 p-6 ">
                    Teams Members
                    <span class="text-2xl font-bold ">
                        {{ detail.stats.members }}
                    </span>
                </div>
                <div class="flex items-center gap-2 p-6 ">
                    Active Jobs
                    <span class="text-2xl font-bold ">
                        {{ detail.stats.jobs }}
                    </span>
                </div>
                <div class="flex items-center gap-2 p-6 ">
                    Publish News 
                    <span class="text-2xl font-bold ">
                        {{ detail.stats.posts }}
                    </span>
                </div>
            </div>
            <div class="flex flex-col ">
                <h3 class="text-lg">
                    Ours Team 
                </h3>
                <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
                    <TeamMemberCard v-for="member in companieMembers" :key="member" :member="member" />
                </div>
            </div>
          

            <WordMap/>
            
        </div>

        <!-- Sidebar -->

        <div class="space-y-6" v-if="jobs.length>0">
            <JobCard
              @click="()=>HandlegoToViewJobDetail(job)"
              v-for="job in jobs"
              :key="job.id"
              :job="job"
              @bookmark="handleBookmark"
              :companyName="detail.companyName"
              :companyLogo="detail.companyLogo"
              :showFavorite="false"
            />
            <!-- <div class=""> -->
               <button  class="w-full p-2 bg-[#db147f]  text-white " @click="$emit('view-more')">
                View Mores ...
               </button>
            <!-- </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref,defineProps,defineEmits, watch } from "vue";
import {
    MapPinIcon,
    StarIcon,
    TrendingUpIcon,
    ShieldIcon,
    ZapIcon,
} from "lucide-vue-next";
import JobCard from "../JobCard.vue";
import WordMap from "../globales/WordMap.vue";
import moment from "moment";
import TeamMemberCard from "../TeamMemberCard.vue";
import { useRouter } from "vue-router";

const emits=defineEmits(['view-more-jobs','view-more'])

const router=useRouter()

const props=defineProps({
    company:{
        type:Object,
        required:true
    },
    employees:{
        type:Array[Object],
        required:true,
        default:[]
    },
    jobs:{
        type:Object,
        required:false,
        default:[]
    },
    detail: {
    type: Object,
    required: true,
    default: () => ({
        stats: {
            members: 0,
            jobs: 0,
            posts: 0
        },
        companyName: '',
        companyLogo: ''
    }),
    validator: (val) => {
        return (
            val &&
            typeof val.companyName === 'string' &&
            typeof val.companyLogo === 'string' &&
            val.stats &&
            typeof val.stats.members === 'number' &&
            typeof val.stats.jobs === 'number' &&
            typeof val.stats.posts === 'number'
        )
    }
}

})

const companieMembers=ref([])

const HandleViewMoreJobs=()=>{
    emits('view-more-jobs')
}

const HandlegoToViewJobDetail=(job)=>{
  router.push({name:'jobs_details',params:{id:job.slug}})
}

watch(() => props.employees, (members) => {

  members?.forEach(member=>{
    companieMembers.value.push({
        name:`${member.account.firstName}  ${member.account.lastName}`,
        avatar:member.account.avatarUrl,
        firstLangage:member.account.firstLangage,
        position:member.role,
        firstLanguage:member.account.firstLanguage,
        status : member.accept ? 'accepted':"pending"
    })
  })
 
})

</script>

<style></style>