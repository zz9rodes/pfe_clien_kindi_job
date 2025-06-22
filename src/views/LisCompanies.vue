<template>
    <AppModal :isLoader="true" :isOpen="isOpenLoaderModale" />
    <div class="min-h-screen pt-6 mt-24 bg-gray-50">
        <AppInputFiltercompanies :filters="searchFilters" :results-count="jobResults.length"
            @update:filters="handleFiltersUpdate" @search="performJobSearch" />
        <main class="flex-1 bg-gray-50">
            <div class="container px-4 py-6 mx-auto">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-gray-700 uppercase">
                        Companies & Workers
                    </h2>
                </div>


                <div  v-if="companies?.data?.length"  class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <CompanieCard v-for="company in companies.data" @click="viewCompany(company)" :key="company.id" :company="company.activeDetails" :members-count="company.guests.length" :jobsCount="company.jobs.length"/>
                </div>

                <div v-else class="mt-8 text-center">
                    <div class="flex flex-col items-center justify-center ">
                        <Building2 class="lg:w-20 lg:h-20 sm:w-14  sm:h-14 text-[#e4097f]" />
                        <div class="pt-8 ">
                            <h2 class="text-2xl ">
                                Oups There is Not Companies Found Now
                            </h2>
                        </div>
                    </div>
                    <button @click="router.push({name:'login'})"
                        class="bg-[#e4097f] mt-8 text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200">
                       Be The First Companie
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {Building2 } from 'lucide-vue-next'
import AppInputFiltercompanies from '@/components/AppInputFiltercompanies.vue'
import CompanieCard from '@/components/CompanieCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AppModal from '@/components/globales/AppModal.vue'

const searchFilters = ref({
    keywords: '',
    location: '',
    language: ''
});

const isOpenLoaderModale=ref(false)
const router=useRouter()
const auth=useAuthStore()
const jobResults = ref([]);
const companies=ref([])
const performJobSearch = (searchData) => {
    jobResults.value = ['Job 1', 'Job 2', 'Job 3'];
};


const handleFiltersUpdate = (filter) => {
    console.log(filter);
}

const toggleOpenLoaderModal=()=>{
    isOpenLoaderModale.value=!isOpenLoaderModale.value
}




const viewCompany = (company) => {
    console.log(`Viewing company ${company}`)
    router.push({name:'companie_details',params:{companyId:company.slug}})
}



const initFectCompanies=async()=>{
toggleOpenLoaderModal()
    try {
            const response=await auth.api('GET','/extern/companies/all',null,false)

            if(response.success){
                console.log(response.data)
                companies.value=response.data
            }
    } catch (error) {
        console.log(error)
    }
    toggleOpenLoaderModal()
}
onMounted(()=>{
    initFectCompanies()
})
</script>


<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>