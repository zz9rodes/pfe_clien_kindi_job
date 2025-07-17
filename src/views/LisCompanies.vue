<template>
    <AppModal :isLoader="true" :isOpen="isOpenLoaderModale" />
    <div class="min-h-screen pt-6 mt-24 bg-gray-50">
        <AppInputFiltercompanies 
            :filters="searchFilters" 
            :results-count="filteredCompanies.length"
            @update:filters="handleFiltersUpdate" 
            @search="performCompanySearch" 
        />
        <main class="flex-1 bg-gray-50">
            <div class="container px-4 py-6 mx-auto">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-gray-700 uppercase">
                        Entreprises & Travailleurs
                    </h2>
                    <div class="text-sm text-gray-600">
                        {{ filteredCompanies.length }} sur {{ companies?.data?.length || 0 }} entreprises
                    </div>
                </div>

                <div v-if="filteredCompanies?.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <CompanieCard 
                        v-for="company in filteredCompanies" 
                        @click="viewCompany(company)" 
                        :key="company.id" 
                        :company="company.activeDetails" 
                        :members-count="company.guests.length" 
                        :jobsCount="company.jobs.length"
                    />
                </div>

                <div v-else-if="companies?.data?.length && hasActiveFilters" class="mt-8 text-center">
                    <div class="flex flex-col items-center justify-center">
                        <Building2 class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
                        <div class="pt-8">
                            <h2 class="mb-4 text-2xl">
                                Aucune entreprise trouvée
                            </h2>
                            <p class="mb-4 text-gray-600">
                                Essayez d'ajuster vos critères de recherche ou réinitialisez les filtres
                            </p>
                            <button 
                                @click="clearFilters"
                                class="bg-[#e4097f] text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="mt-8 text-center">
                    <div class="flex flex-col items-center justify-center">
                        <Building2 class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
                        <div class="pt-8">
                            <h2 class="text-2xl">
                                Oups, aucune entreprise trouvée pour le moment
                            </h2>
                        </div>
                    </div>
                    <button 
                        @click="router.push({name:'login'})"
                        class="bg-[#e4097f] mt-8 text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200"
                    >
                        Soyez la première entreprise
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { Building2 } from 'lucide-vue-next'
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

const isOpenLoaderModale = ref(false)
const router = useRouter()
const auth = useAuthStore()
const companies = ref([])

// Computed property pour filtrer les companies
const filteredCompanies = computed(() => {
    if (!companies.value?.data?.length) return [];
    
    let filtered = companies.value.data;
    
    // Filtre par mots-clés (nom, industrie, description)
    if (searchFilters.value.keywords.trim()) {
        const keywords = searchFilters.value.keywords.toLowerCase().trim();
        filtered = filtered.filter(company => {
            const activeDetails = company.activeDetails;
            if (!activeDetails) return false;
            
            return (
                activeDetails.name?.toLowerCase().includes(keywords) ||
                activeDetails.industry?.toLowerCase().includes(keywords) ||
                activeDetails.description?.toLowerCase().includes(keywords)
            );
        });
    }
    
    // Filtre par localisation (pays, ville)
    if (searchFilters.value.location.trim()) {
        const location = searchFilters.value.location.toLowerCase().trim();
        filtered = filtered.filter(company => {
            const activeDetails = company.activeDetails;
            if (!activeDetails) return false;
            
            return (
                activeDetails.country?.toLowerCase().includes(location) ||
                activeDetails.city?.toLowerCase().includes(location)||
                activeDetails.address.toLowerCase().includes(location)
            );
        });
    }
        
    return filtered;
});

// Computed property pour vérifier si des filtres sont actifs
const hasActiveFilters = computed(() => {
    return searchFilters.value.keywords.trim() || 
           searchFilters.value.location.trim() || 
           searchFilters.value.language.trim();
});

const performCompanySearch = (searchData) => {
    console.log('Performing search with:', searchData);
    // La recherche se fait automatiquement via la computed property
};

const handleFiltersUpdate = (filters) => {
    searchFilters.value = { ...filters };
    console.log('Filters updated:', filters);
};

const clearFilters = () => {
    searchFilters.value = {
        keywords: '',
        location: '',
        language: ''
    };
};

const toggleOpenLoaderModal = () => {
    isOpenLoaderModale.value = !isOpenLoaderModale.value
}

const viewCompany = (company) => {
    console.log(`Viewing company ${company}`)
    router.push({ name: 'companie_details', params: { companyId: company.slug } })
}

const initFectCompanies = async () => {
    toggleOpenLoaderModal()
    try {
        const response = await auth.api('GET', '/extern/companies/all', null, false)

        if (response.success) {
            console.log(response.data)
            companies.value = response.data
        }
    } catch (error) {
        console.log(error)
    }
    toggleOpenLoaderModal()
}

onMounted(() => {
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
