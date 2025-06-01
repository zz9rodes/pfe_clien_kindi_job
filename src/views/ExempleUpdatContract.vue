<template>
  <div class="w-full min-h-screen bg-gray-50">
    <div class="max-w-4xl p-6 mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Exemple d'utilisation - ContractUpdate</h1>
        <p class="mt-1 text-gray-600">Démonstration du composant de modification de contrat</p>
      </div>

      <!-- Buttons to show different examples -->
      <div class="flex gap-4 mb-8">
        <button
          @click="loadExampleContract"
          class="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Charger exemple de contrat
        </button>
        <button
          @click="showUpdateForm = !showUpdateForm"
          class="px-4 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
        >
          {{ showUpdateForm ? 'Masquer' : 'Afficher' }} le formulaire de modification
        </button>
      </div>

      <!-- Contract Update Form -->
      <div v-if="showUpdateForm">
        <ContractUpdate
          :contractData="sampleContract"
          :companyData="sampleCompanyData"
          :userData="sampleUserData"
          @update="handleContractUpdate"
          @cancel="handleCancel"
        />
      </div>

      <!-- Display current contract data -->
      <div v-else class="p-6 bg-white rounded-lg shadow-lg">
        <h2 class="mb-4 text-xl font-semibold">Données actuelles du contrat</h2>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-gray-900">Informations générales</h3>
            <p><strong>Titre:</strong> {{ sampleContract.title }}</p>
            <p><strong>Description:</strong> {{ sampleContract.textDescription }}</p>
          </div>

          <div>
            <h3 class="font-medium text-gray-900">Entreprise</h3>
            <p><strong>Nom:</strong> {{ sampleCompanyData.CompanyName }}</p>
            <p><strong>Ville:</strong> {{ sampleCompanyData.city }}, {{ sampleCompanyData.country }}</p>
          </div>

          <div>
            <h3 class="font-medium text-gray-900">Contractant</h3>
            <p><strong>Nom:</strong> {{ sampleUserData.firstName }} {{ sampleUserData.lastName }}</p>
            <p><strong>Email:</strong> {{ sampleUserData.email }}</p>
            <p><strong>Poste:</strong> {{ sampleUserData.position }}</p>
          </div>

          <div>
            <h3 class="font-medium text-gray-900">Articles ({{ sampleContract.articlesAndClauses.length }})</h3>
            <ul class="space-y-1 list-disc list-inside">
              <li v-for="(article, index) in sampleContract.articlesAndClauses" :key="index">
                {{ article.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Update History -->
      <div v-if="updateHistory.length > 0" class="p-6 mt-8 bg-white rounded-lg shadow-lg">
        <h2 class="mb-4 text-xl font-semibold">Historique des modifications</h2>
        <div class="space-y-3">
          <div 
            v-for="(update, index) in updateHistory" 
            :key="index"
            class="p-3 rounded-lg bg-gray-50"
          >
            <p class="font-medium">{{ update.title }}</p>
            <p class="text-sm text-gray-600">Modifié le {{ formatDate(update.updatedAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ContractUpdate from './FormUpdateContract.vue'

const showUpdateForm = ref(false)
const updateHistory = ref([])

const sampleContract = ref({
  id: 1,
  title: 'Contrat de travail CDI - Développeur Frontend',
  textDescription: 'Contrat à durée indéterminée pour un poste de développeur frontend spécialisé en Vue.js et React. Le candidat rejoindra notre équipe technique pour développer des applications web modernes et participer à l\'innovation technologique de l\'entreprise.',
  articlesAndClauses: [
    {
      title: 'Objet du contrat',
      text: 'Le présent contrat a pour objet l\'embauche de {{AccountFirstName}} {{AccountLastName}} en qualité de {{Position}} au sein de {{CompanieName}}.',
      items: [
        'Développement d\'applications web avec Vue.js et React',
        'Collaboration avec l\'équipe UX/UI',
        'Participation aux code reviews et à l\'amélioration continue'
      ]
    },
    {
      title: 'Rémunération',
      text: 'Le salaire brut annuel est fixé à {{Salary}}, payable en 12 mensualités.',
      items: [
        'Salaire versé le dernier jour ouvrable du mois',
        'Révision annuelle selon les performances',
        'Primes variables selon les objectifs atteints'
      ]
    },
    {
      title: 'Durée et période d\'essai',
      text: 'Le contrat prend effet le {{StartDate}}. Une période d\'essai de 3 mois est prévue.',
      items: []
    }
  ],
  status: 'draft',
  createdAt: '2024-01-15T10:00:00Z'
})

const sampleCompanyData = ref({
  CompanyName: 'TechNova SARL',
  LogoUrl: 'https://i.pinimg.com/736x/0c/62/d9/0c62d97e0c074b9f68e307810ae78be0.jpg',
  city: 'Douala',
  country: 'Cameroun',
  languageAttachment: 'fr',
  RegisteredNumber: 'RC/DLA/2023/B/12987'
})

const sampleUserData = ref({
  email: 'jean.kamga@example.com',
  firstName: 'Jean',
  lastName: 'Kamga',
  phoneNumber: '+237694123456',
  position: 'Développeur Frontend Senior',
  salary: '2 500 000 FCFA',
  startDate: '2024-02-01'
})

const loadExampleContract = () => {
  // Simulate loading different contract data
  const examples = [
    {
      title: 'Contrat de prestation - Consultant Marketing',
      textDescription: 'Mission de consulting en marketing digital pour une durée de 6 mois avec possibilité de renouvellement.',
      position: 'Consultant Marketing Digital',
      salary: '3 000 000 FCFA'
    },
    {
      title: 'Contrat freelance - Designer UX/UI',
      textDescription: 'Mission freelance pour la refonte complète de l\'interface utilisateur d\'une application mobile.',
      position: 'Designer UX/UI',
      salary: '2 000 000 FCFA'
    }
  ]
  
  const randomExample = examples[Math.floor(Math.random() * examples.length)]
  
  sampleContract.value.title = randomExample.title
  sampleContract.value.textDescription = randomExample.textDescription
  sampleUserData.value.position = randomExample.position
  sampleUserData.value.salary = randomExample.salary
  
  alert('Nouveau contrat d\'exemple chargé !')
}

const handleContractUpdate = (updatedContract) => {
  // Update the sample data with the new values
  sampleContract.value = { ...updatedContract }
  sampleCompanyData.value = { ...updatedContract.companyData }
  sampleUserData.value = { ...updatedContract.userData }
  
  // Add to history
  updateHistory.value.unshift({
    title: updatedContract.title,
    updatedAt: updatedContract.updatedAt
  })
  
  // Hide the form
  showUpdateForm.value = false
  
  alert('Contrat mis à jour avec succès !')
}

const handleCancel = () => {
  showUpdateForm.value = false
  alert('Modification annulée')
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
