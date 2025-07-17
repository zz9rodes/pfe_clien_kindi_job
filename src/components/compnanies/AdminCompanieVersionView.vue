<template>
    <div class="w-full overflow-auto border border-gray-200 rounded-lg">

        <div class="p-8 mb-8 bg-white rounded-xl">
            <div class="flex items-start space-x-6">
                <!-- Avatar de l'entreprise -->
                <div class="flex-shrink-0">
                    <img :src="activerVersion.avatarUrl || '/placeholder-company.png'"
                        :alt="`Logo de ${activerVersion.name}`"
                        class="object-cover w-24 h-24 border-4 border-white shadow-lg rounded-xl" />
                </div>

                <!-- Informations principales -->
                <div class="flex-1">
                    <div class="flex items-center mb-2 space-x-3">
                        <h1 class="text-3xl font-bold text-gray-900">
                            {{ activerVersion.name }}
                        </h1>
                        <span :class="[
                            'px-3 py-1 rounded-full text-sm font-medium',
                            activerVersion.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800',
                        ]">
                            {{ activerVersion.status }}
                        </span>
                    </div>

                    <div class="flex items-center mb-4 space-x-4 text-gray-600">
                        <span class="flex items-center">
                            <Building class="w-5 h-5 mr-4" />
                            {{ activerVersion.industry }}
                        </span>
                        <span class="flex items-center">
                            <MapPinIcon class="w-5 h-5 mr-4" />
                            {{ activerVersion.city }}, {{ activerVersion.country }}
                        </span>
                    </div>

                    <p class="leading-relaxed text-gray-700">
                        {{ activerVersion.description }}
                    </p>
                </div>
            </div>
        </div>
       <div class="overflow-x-auto bg-yello-500">
         <div class="grid grid-cols-5 border-b border-gray-200 ">
            <div class="px-6 py-3 text-sm font-bold text-gray-700">Nom</div>
            <div class="px-6 py-3 text-sm font-bold text-gray-700">Numéro d'enregistrement</div>
            <div class="py-3 text-sm font-bold text-gray-700 ">Image de couverture</div>
            <div class="px-6 py-3 text-sm font-bold text-left text-gray-700">Dernière mise à jour</div>
            <div class="flex items-center justify-center px-6 py-3 font-bold text-left text-gray-700">Statut</div>
        </div>

        <div @click.prevent="ViewVersion(version.id)"  v-for="version in versions" :key="version.id" class="grid grid-cols-5 border-b border-gray-200 cursor-pointer">
            <div class="flex items-center px-6 py-4 text-sm font-bold text-gray-900">{{ version.name }}</div>
            <div class="flex items-center px-6 py-4 text-sm font-bold text-gray-900">
                {{ version.registrationNumber }}
            </div>
                        <div class="flex items-center ">
                <img :src="activerVersion.avatarUrl || '/placeholder-company.png'"
                    :alt="`Logo de ${activerVersion.name}`"
                    class="object-cover w-12 h-12 border-4 border-white shadow-lg rounded-xl" />
            </div>
            <div class="flex items-center px-6 py-4 text-sm text-gray-500 overflow-clip">{{moment(version?.updatedAt).format('LL')  }}</div>
            <div class="flex items-center justify-center px-6 py-4">
                <div class="flex items-center">
                    <span :class="[
                        'px-2 py-1 text-xs font-medium rounded-full',
                        !version.status ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' : 'bg-[#fff0fb] text-[#db147f] shadow-sm'
                    ]">
                        {{ version.status ? "Activé" : "Inactif" }}
                    </span>
                </div>
            </div>
        </div>
       </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { Building, MapPinIcon } from 'lucide-vue-next';
import moment from 'moment';

const router = useRouter()
const route = useRoute()


const auth = useAuthStore()
const versions = ref([])
const activerVersion = ref({})


const fetchCompanieVersions = async () => {
    try {
        const companyId = route.params.companyId
        const response = await auth.api('GET', `/admin/companies/${companyId}/companies_versions/all`, {}, false)

        if (response.success) {
            versions.value = response.data.details
            activerVersion.value = response.data.activeDetails
        }
        else {
            // router.go(-1)
        }
    } catch (error) {
        console.log(error)
    }
}

const ViewVersion=(id)=>{
    router.push({name:'companies_version_details',params:{companyId:id}})
}


onMounted(() => {
    fetchCompanieVersions()
})
</script>

<style scoped></style>