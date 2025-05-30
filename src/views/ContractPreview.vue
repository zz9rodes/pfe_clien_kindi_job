<template>

    <div class="w-full h-full p-6 py-24 bg-gray-100">
        <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
            <AcceptSignContractModal @close="toggleOpenModal()" />
        </AppModal>
        <div class="max-w-4xl mx-auto">
            <!-- Contract Document -->
            <div class="overflow-hidden bg-white rounded-lg shadow-lg">
                <!-- Header -->
                <div class="bg-[#db147f] text-white px-6 py-4 flex justify-between items-center">
                    <h1 class="text-xl font-bold">{{ contract.title || 'Contrat de Travail' }}</h1>
                    <div class="flex items-center gap-2">
                        <CalendarIcon class="w-4 h-4" />
                        <span class="text-sm">{{ formatDate(new Date()) }}</span>
                    </div>
                </div>

                <!-- Document Content -->
                <div class="p-8 space-y-6">
                    <!-- Title and Reference -->
                    <div class="mb-8 text-center">
                        <h2 class="mb-2 text-2xl font-bold text-gray-900">{{ contract.title || 'Titre du contrat' }}
                        </h2>
                        <p class="text-sm text-gray-500">Réf: {{ contract.reference || generateReference() }}</p>
                    </div>

                    <!-- Company Info -->
                    <div class="mb-8 text-right">
                        <div class="text-sm text-gray-600">
                            <p class="font-medium">{{ companyInfo.name }}</p>
                            <p>{{ companyInfo.address }}</p>
                            <p>{{ companyInfo.city }}, {{ companyInfo.country }}</p>
                        </div>
                    </div>

                    <!-- Contract Description -->
                    <div class="mb-8">
                        <h3 class="mb-4 font-semibold text-gray-900">Entre les soussignés :</h3>
                        <div class="space-y-4 leading-relaxed text-gray-700">
                            <p>
                                <strong>{{ companyInfo.name }}</strong>, {{ companyInfo.description }},
                                représentée par <strong>{{ companyInfo.representative }}</strong>,
                                agissant en qualité de {{ companyInfo.representativeTitle }},
                                dûment habilité aux fins des présentes,
                            </p>
                            <p>Ci-après désignée « l'Employeur »,</p>
                            <p>D'une part,</p>
                            <p>Et</p>
                        </div>
                    </div>

                    <!-- Dynamic Fields Section -->
                    <div class="mb-8">
                        <div v-for="field in requiredFields" :key="field.key" class="mb-4">
                            <label class="block mb-2 text-sm font-medium text-gray-700">
                                {{ field.label }} :
                            </label>
                            <div class="relative">
                                <input v-model="fieldValues[field.key]" type="text" :placeholder="field.placeholder"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#db147f] focus:border-[#db147f] bg-gray-50" />
                            </div>
                        </div>
                    </div>

                    <div class="mb-8">
                        <p class="text-gray-700">Ci-après désigné(e) « le Salarié »,</p>
                        <p class="mt-4 text-gray-700">D'autre part,</p>
                        <p class="mt-4 text-gray-700">Il a été convenu et arrêté ce qui suit :</p>
                    </div>

                    <!-- Articles -->
                    <div class="space-y-8">
                        <div v-for="(article, index) in contract.articlesAndClauses" :key="index"
                            class="border-l-4 border-[#db147f] pl-6">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-6 h-6 bg-[#db147f] rounded-full flex items-center justify-center">
                                    <FileTextIcon class="w-3 h-3 text-white" />
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900">
                                    Article {{ index + 1 }} - {{ article.title }}
                                </h3>
                            </div>

                            <div class="space-y-3 leading-relaxed text-gray-700">
                                <p class="whitespace-pre-wrap">{{ processText(article.text) }}</p>

                                <ul v-if="article.items && article.items.length > 0"
                                    class="ml-4 space-y-2 list-disc list-inside">
                                    <li v-for="item in article.items" :key="item" class="text-gray-600">
                                        {{ processText(item) }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Contract Footer -->
                    <div class="pt-8 mt-12 border-t border-gray-200">
                        <p class="mb-8 text-center text-gray-600">
                            Fait à {{ companyInfo.city }}, le {{ formatDate(new Date()) }}, en deux exemplaires
                            originaux.
                        </p>

                        <!-- Signatures -->
                        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <!-- Employer Signature -->
                            <div class="text-center">
                                <p class="mb-2 font-medium text-gray-900">Pour {{ companyInfo.name }} :</p>
                                <p class="mb-1 text-gray-700">{{ companyInfo.representative }}</p>
                                <p class="mb-4 text-sm text-gray-600">{{ companyInfo.representativeTitle }}</p>
                                <div
                                    class="flex items-center justify-center h-24 p-6 border-2 border-gray-300 border-dashed rounded-lg">
                                    <span class="italic text-gray-400">{{ companyInfo.representative }}</span>
                                </div>
                            </div>

                            <!-- Employee Signature -->
                            <div class="text-center">
                                <p class="mb-2 font-medium text-gray-900">Le Salarié :</p>
                                <p class="mb-1 text-gray-700">{{ fieldValues.AccountFirstName }} {{
                                    fieldValues.AccountLastName || '[Votre nom complet]' }}</p>
                                <p class="mb-4 text-sm text-gray-600">Lu et approuvé</p>
                                <div
                                    class="relative flex items-center justify-center h-24 p-6 border-2 border-gray-300 border-dashed rounded-lg">
                                    <button @click="toggleOpenModal"
                                        class="w-full italic text-center text-gray-600 bg-transparent border outline-none">✍️
                                        Signature</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { CalendarIcon, FileTextIcon } from 'lucide-vue-next'
import AppModal from '@/components/globales/AppModal.vue';
import sendRegistrationEmail from '@/components/authFom/sendRegistrationEmail.vue';
import AcceptSignContractModal from '@/components/Contract/AcceptSignContractModal.vue';
// Props
const props = defineProps({
    contractData: {
        type: Object,
        default: () => ({})
    }
})

// Reactive data
const employeeSignature = ref('')
const fieldValues = ref({
    UserEmail: '',
    AccountFirstName: '',
    AccountLastName: '',
    AccountPhoneNumber: ''
})

// Sample contract data (you can replace this with props.contractData)
const contract = ref({
    title: 'Recrutement d\'un Dev Vue.js',
    reference: 'EVT-2025-VUE-001',
    textDescription: 'Contrat de travail pour le recrutement d\'un développeur Vue.js',
    articlesAndClauses: [
        {
            title: 'Engagement',
            text: 'L\'Employeur engage le Salarié en qualité de {{AccountFirstName}}, statut cadre, coefficient 400, à compter du 1er juin 2025.\n\nLe Salarié sera notamment chargé de :',
            items: [
                'Développer et maintenir des applications web utilisant Vue.js',
                'Collaborer avec l\'équipe de conception pour créer des interfaces utilisateur',
                'Optimiser les applications pour une performance maximale',
                'Assurer la qualité du code par des tests appropriés',
                'Participer aux réunions d\'équipe et aux revues de code'
            ]
        },
        {
            title: 'Durée du contrat et période d\'essai',
            text: 'Le présent contrat est conclu pour une durée indéterminée.\n\nLe Salarié sera soumis à une période d\'essai de trois mois, renouvelable une fois pour une durée équivalente. Durant cette période, chacune des parties pourra rompre le contrat sans indemnité, en respectant un préavis conformément aux dispositions légales en vigueur.',
            items: []
        },
        {
            title: 'Rémunération',
            text: 'En contrepartie de son travail, le Salarié percevra une rémunération mensuelle brute de 4 500 € pour 35 heures de travail hebdomadaire.\n\nCette rémunération inclut un 13ème mois versé pour moitié en juin et pour moitié en décembre.',
            items: []
        },
        {
            title: 'Lieu de travail',
            text: 'Le Salarié exercera ses fonctions au siège social de l\'entreprise situé à Paris.\n\nLe Salarié pourra bénéficier d\'un accord de télétravail à raison de 2 jours par semaine, selon les modalités définies dans la charte de télétravail de l\'entreprise.',
            items: []
        },
        {
            title: 'Confidentialité',
            text: 'Le Salarié s\'engage à observer la plus grande discrétion sur l\'ensemble des informations auxquelles il aura accès dans le cadre de ses fonctions.\n\nCette obligation de confidentialité se poursuivra après la rupture du contrat de travail, quelle qu\'en soit la cause.',
            items: []
        }
    ],
    requiredField: ['UserEmail', 'AccountFirstName', 'AccountLastName', 'AccountPhoneNumber']
})

// Company information
const companyInfo = ref({
    name: 'Event4You SARL',
    description: 'Société à Responsabilité Limitée au capital de 50 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789, dont le siège social est situé au 123 Avenue des Développeurs, 75001 Paris',
    address: '123 Avenue des Développeurs',
    city: 'Paris',
    country: 'France',
    representative: 'M. Claude DuBoit',
    representativeTitle: 'Directeur Général'
})

// Field mapping
const fieldMapping = {
    UserEmail: { label: 'Email du contractant', placeholder: 'Veuillez saisir votre email' },
    AccountFirstName: { label: 'Prénom du contractant', placeholder: 'Veuillez saisir votre prénom' },
    AccountLastName: { label: 'Nom du contractant', placeholder: 'Veuillez saisir votre nom' },
    AccountPhoneNumber: { label: 'Téléphone du contractant', placeholder: 'Veuillez saisir votre téléphone' }
}



const isModalOpen = ref(false);

const toggleOpenModal = () => {
    isModalOpen.value = !isModalOpen.value;
};
// Computed properties
const requiredFields = computed(() => {
    return contract.value.requiredField.map(fieldKey => ({
        key: fieldKey,
        label: fieldMapping[fieldKey]?.label || fieldKey,
        placeholder: fieldMapping[fieldKey]?.placeholder || `Veuillez saisir ${fieldKey}`
    }))
})

const isFormValid = computed(() => {
    return contract.value.requiredField.every(field =>
        fieldValues.value[field] && fieldValues.value[field].trim()
    ) && employeeSignature.value.trim()
})

// Methods
const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

const generateReference = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `CTR-${year}-${month}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
}

const processText = (text) => {
    let processedText = text

    // Replace field placeholders with actual values
    Object.keys(fieldValues.value).forEach(key => {
        const value = fieldValues.value[key] || `[${fieldMapping[key]?.label || key}]`
        processedText = processedText.replace(new RegExp(`{{${key}}}`, 'g'), value)
    })

    return processedText
}

const clearForm = () => {
    Object.keys(fieldValues.value).forEach(key => {
        fieldValues.value[key] = ''
    })
    employeeSignature.value = ''
}

const validateContract = () => {
    if (isFormValid.value) {
        const contractData = {
            contract: contract.value,
            fieldValues: fieldValues.value,
            signature: employeeSignature.value,
            timestamp: new Date().toISOString()
        }

        console.log('Contract validated:', contractData)
        alert('Contrat validé avec succès !')

        // Here you would typically send the data to your backend
        // or generate a PDF, etc.
    } else {
        alert('Veuillez remplir tous les champs obligatoires et signer le contrat.')
    }
}

onMounted(() => {
    if (props.contractData && Object.keys(props.contractData).length > 0) {
        contract.value = { ...contract.value, ...props.contractData }
    }
})





</script>

<style scoped>
/* Custom styles for the contract document */
.contract-document {
    font-family: 'Times New Roman', serif;
}

/* Print styles */
@media print {
    .no-print {
        display: none !important;
    }

    .bg-gray-100 {
        background: white !important;
    }

    .shadow-lg {
        box-shadow: none !important;
    }
}
</style>