<template>
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

                <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
                    <div v-for="featured in featuredCompanies" :key="featured.id"
                        class="group flex overflow-hidden relative group transition duration-700 rounded-[2px] ease-in-out bg-white border border-gray-300 shadow-sm hover:shadow-md hover:cursor-pointer">
                        <ExternalLinkIcon
                            class="absolute hidden w-5 h-5 text-gray-600 group-hover:block right-2 top-2" />
                        <div class="flex-1 p-4">
                            <div class="text-xs text-[#e4097f] font-medium mb-1">
                                {{ featured.category.toUpperCase() }}
                            </div>
                            <h3 class="mb-2 text-lg font-bold">
                                {{ featured.name }}
                            </h3>
                            <p class="mb-2 text-sm text-gray-600">
                                {{ featured.description }}
                            </p>
                            <div class="flex items-center gap-4 text-xs text-gray-500">
                                <span class="flex items-center">
                                    <UsersIcon class="w-3 h-3 mr-1" />
                                    {{ featured.employeeCount }}
                                </span>
                                <span class="flex items-center">
                                    <MapPinIcon class="w-3 h-3 mr-1" />
                                    {{ featured.location }}
                                </span>
                                <span class="flex items-center">
                                    <BriefcaseIcon class="w-3 h-3 mr-1" />
                                    {{ featured.jobsCount }}
                                </span>
                            </div>
                        </div>
                        <div class="w-1/3">
                            <img :src="featured.image" :alt="featured.name" class="object-cover w-full h-full" />
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <CompanieCard v-for="company in companies" @click="viewCompany(company.id)" :key="company.id" :company="company"/>
                </div>

                <div class="mt-8 text-center">
                    <button @click="loadMore"
                        class="bg-[#e4097f] text-white px-6 py-2 rounded font-medium hover:bg-[#c4087a] transition-colors duration-200">
                        Load More Companies
                    </button>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ExternalLinkIcon, BriefcaseIcon, MapPinIcon, UsersIcon } from 'lucide-vue-next'
import AppInputJobsFilter from '@/components/AppInputJobsFilter.vue'
import AppInputFiltercompanies from '@/components/AppInputFiltercompanies.vue'
import CompanieCard from '@/components/CompanieCard.vue'


const searchFilters = ref({
    keywords: '',
    location: '',
    language: ''
});

const jobResults = ref([]);

const performJobSearch = (searchData) => {
    console.log('Search performed:', searchData);
    jobResults.value = ['Job 1', 'Job 2', 'Job 3'];
};


const handleFiltersUpdate = (filter) => {
    console.log('new filters');
    console.log(filter);
}

const featuredCompanies = ref([
    {
        id: 1,
        name: 'Coptis',
        category: 'Featured Company',
        description: 'Leading pharmaceutical and cosmetics company specializing in digital transformation and innovative solutions for healthcare industry.',
        industry: 'Cosmetics, IT / Digital, Pharmaceutical',
        location: 'Paris, France',
        employeeCount: 'Between 15 and 50 employees',
        jobsCount: '3 active jobs',
        image: 'https://i.pinimg.com/736x/ca/ad/56/caad56e7408f02b9a1ad97b75e5b60fd.jpg',
        logo: 'https://i.pinimg.com/736x/be/99/37/be9937c0bd1dc50fb290100e39808195.jpg',
        isFollowed: false
    },
    {
        id: 2,
        name: 'TAOS Paris',
        category: 'Top Employer',
        description: 'Award-winning architecture and interior design studio creating innovative spaces across Europe with focus on sustainable design.',
        industry: 'Architecture, Interior Design',
        location: 'Paris, Porto',
        employeeCount: '< 15 employees',
        jobsCount: 'Spontaneous applications',
        image: 'https://i.pinimg.com/736x/2a/d3/ce/2ad3cee384283ac936c09e64bda2565e.jpg',
        logo: 'https://i.pinimg.com/736x/62/36/62/6236624a5d0e39c5ec4c4a1d218702e2.jpg',
        isFollowed: true
    }
])

const companies = ref([
    {
        id: 3,
        name: 'Bien Sûr',
        category: 'Real Estate',
        industry: 'Commercial Real Estate, Coworking, Residential',
        location: 'Bois-d\'Arcy, Maurepas, Paris',
        employeeCount: '< 15 employees',
        jobsCount: '2 jobs',
        image: 'https://i.pinimg.com/736x/bd/53/9d/bd539da7853d7450133d4da4647a3b44.jpg',
        logo: 'https://i.pinimg.com/736x/5e/11/66/5e1166411c8c9bbe3fa91fa81a6f0e52.jpg',
        isFollowed: false
    },
    {
        id: 4,
        name: 'TechCorp Solutions',
        category: 'Technology',
        industry: 'Software Development, AI, Machine Learning',
        location: 'Lyon, France',
        employeeCount: '50-100 employees',
        jobsCount: '5 jobs',
        image: 'https://i.pinimg.com/736x/23/06/63/2306632032cd363320922c345e300ceb.jpg?height=200&width=300',
        logo: 'https://i.pinimg.com/736x/5f/87/16/5f8716a5c1ad120d1cbcaa3007d1e1f5.jpg?height=40&width=60',
        isFollowed: false
    },
    {
        id: 5,
        name: 'DesignStudio Creative',
        category: 'Design',
        industry: 'Graphic Design, Branding, Digital Marketing',
        location: 'Marseille, Nice',
        employeeCount: '10-25 employees',
        jobsCount: '1 job',
        image: '/placeholder.svg?height=200&width=300',
        logo: '/placeholder.svg?height=40&width=60',
        isFollowed: true
    },
    {
        id: 6,
        name: 'GreenTech Solutions',
        category: 'Sustainability',
        industry: 'Renewable Energy, Environmental Technology',
        location: 'Bordeaux, Toulouse',
        employeeCount: '25-50 employees',
        jobsCount: '4 jobs',
        image: '/placeholder.svg?height=200&width=300',
        logo: '/placeholder.svg?height=40&width=60',
        isFollowed: false
    },
    {
        id: 7,
        name: 'Innovation Lab',
        category: 'Research',
        industry: 'Research & Development, Biotechnology',
        location: 'Lille, Strasbourg',
        employeeCount: '15-30 employees',
        jobsCount: '2 jobs',
        image: '/placeholder.svg?height=200&width=300',
        logo: '/placeholder.svg?height=40&width=60',
        isFollowed: false
    },
    {
        id: 8,
        name: 'Creative Agency Plus',
        category: 'Marketing',
        industry: 'Digital Marketing, Advertising, Content Creation',
        location: 'Nantes, Rennes',
        employeeCount: '< 15 employees',
        jobsCount: 'Internships available',
        image: '/placeholder.svg?height=200&width=300',
        logo: '/placeholder.svg?height=40&width=60',
        isFollowed: false
    }
])

const followCompany = (companyId) => {
    const featuredCompany = featuredCompanies.value.find(c => c.id === companyId)
    if (featuredCompany) {
        featuredCompany.isFollowed = !featuredCompany.isFollowed
        return
    }

    const company = companies.value.find(c => c.id === companyId)
    if (company) {
        company.isFollowed = !company.isFollowed
    }
}

const viewCompany = (companyId) => {
    console.log(`Viewing company ${companyId}`)
}

const loadMore = () => {
    const newCompanies = [
        {
            id: companies.value.length + 9,
            name: 'FinTech Innovations',
            category: 'Finance',
            industry: 'Financial Technology, Banking Solutions',
            location: 'Monaco, Nice',
            employeeCount: '30-50 employees',
            jobsCount: '3 jobs',
            image: '/placeholder.svg?height=200&width=300',
            logo: '/placeholder.svg?height=40&width=60',
            isFollowed: false
        },
        {
            id: companies.value.length + 10,
            name: 'HealthTech Pro',
            category: 'Healthcare',
            industry: 'Medical Technology, Digital Health',
            location: 'Montpellier, Toulouse',
            employeeCount: '20-40 employees',
            jobsCount: '2 jobs',
            image: '/placeholder.svg?height=200&width=300',
            logo: '/placeholder.svg?height=40&width=60',
            isFollowed: false
        }
    ]

    companies.value.push(...newCompanies)
}
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