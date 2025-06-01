<template>
  <div class="min-h-screen bg-gray-50">
    <div class="px-6 py-8 mx-auto max-w-7xl">
      <div class="flex flex-col gap-3">
        <!-- Main Content -->
        <div class="space-y-8 lg:col-span-2">
          <!-- Job Header -->
          <div class="p-8 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-start gap-6">
              <!-- Company Logo -->
              <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#db147f] to-purple-600 rounded-xl">
                <span class="text-xl font-bold text-white">{{ getCompanyInitials() }}</span>
              </div>
              
              <!-- Job Info -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h1 class="mb-2 text-3xl font-bold text-gray-900">{{ jobData.title || 'Titre du poste' }}</h1>
                    <div class="flex flex-wrap items-center gap-4 mb-3 text-gray-600">
                      <div class="flex items-center gap-1">
                        <BuildingIcon class="w-4 h-4" />
                        <span>{{ jobData.company_name || 'Entreprise' }}</span>
                      </div>
                      <div v-if="jobData.city || jobData.country" class="flex items-center gap-1">
                        <MapPinIcon class="w-4 h-4" />
                        <span>{{ [jobData.city, jobData.country].filter(Boolean).join(', ') }}</span>
                      </div>
                      <div v-if="jobData.job_type" class="flex items-center gap-1 font-bold">
                        <ClockIcon class="w-4 h-4" />
                        <span>{{ getJobTypeLabel(jobData.job_type) }}</span>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                      <span v-if="jobData.status" class="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                        {{ getStatusLabel(jobData.status) }}
                      </span>
                      <span v-if="jobData.price?.value" class="px-3 py-1 text-sm font-medium text-[#db147f] bg-blue-100 rounded-full">
                        {{ formatSalary(jobData.price) }}
                      </span>
                      <span v-if="jobData.years_experience" class="px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                        {{ jobData.years_experience }}+ années d'expérience
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Apply Button -->
                <button 
                  class="px-8 py-2 font-semibold text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#c41370]"
                >
                  Postuler maintenant
                </button>
              </div>
            </div>
          </div>

          <!-- Job Description -->
          <div v-if="jobData.description" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Description du poste</h2>
            <div class="prose prose-gray max-w-none">
              <p class="leading-relaxed text-gray-700 whitespace-pre-wrap">{{ jobData.description }}</p>
            </div>
          </div>

          <!-- Job Details -->
          <div v-if="jobData.details && jobData.details.length" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Détails du poste</h2>
            <div class="space-y-6">
              <div v-for="(detail, index) in jobData.details" :key="index">
                <h3 class="mb-3 text-lg font-semibold text-gray-900">{{ detail.title }}</h3>
                <ul class="space-y-2">
                  <li 
                    v-for="(item, itemIndex) in detail.items" 
                    :key="itemIndex"
                    class="flex items-start gap-3 text-gray-700"
                  >
                    <CheckCircleIcon class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Skills Required -->
          <div v-if="jobData.skill_required" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Compétences requises</h2>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in getSkillsArray(jobData.skill_required)" 
                :key="skill"
                class="px-3 py-2 text-sm font-medium text-[#db147f] rounded-lg bg-blue-50"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Recruitment Process -->
          <div v-if="jobData.recruitment_steps && jobData.recruitment_steps.length" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Processus de recrutement</h2>
            <div class="space-y-6">
              <div 
                v-for="(step, index) in jobData.recruitment_steps" 
                :key="index"
                class="flex gap-4"
              >
                <div class="flex flex-col items-center">
                  <div class="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[#db147f] rounded-full">
                    {{ index + 1 }}
                  </div>
                  <div v-if="index < jobData.recruitment_steps.length - 1" class="w-0.5 h-12 bg-gray-200 mt-2"></div>
                </div>
                <div class="flex-1 pb-6">
                  <h3 class="mb-2 text-lg font-semibold text-gray-900">{{ step.title }}</h3>
                  <p v-if="step.description" class="text-gray-700">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Process Steps -->
          <div v-if="jobData.steps && jobData.steps.length" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Étapes du processus</h2>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div 
                v-for="(step, index) in jobData.steps" 
                :key="index"
                class="p-4 border border-gray-200 rounded-lg"
              >
                <h3 class="mb-2 font-semibold text-gray-900">{{ step.name }}</h3>
                <p v-if="step.description" class="mb-3 text-sm text-gray-700">{{ step.description }}</p>
                <div v-if="step.renumeration?.value" class="text-sm">
                  <span class="font-medium text-green-600">
                    {{ formatSalary(step.renumeration) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Info -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Informations clés</h3>
            <div class="space-y-4">
              <div v-if="jobData.industries" class="flex items-center justify-between">
                <span class="text-gray-600">Secteur</span>
                <span class="font-medium text-gray-900">{{ jobData.industries }}</span>
              </div>
              <div v-if="jobData.job_type" class="flex items-center justify-between">
                <span class="text-gray-600">Type de contrat</span>
                <span class="font-medium text-gray-900">{{ getJobTypeLabel(jobData.job_type) }}</span>
              </div>
              <div v-if="jobData.years_experience" class="flex items-center justify-between">
                <span class="text-gray-600">Expérience</span>
                <span class="font-medium text-gray-900">{{ jobData.years_experience }}+ années</span>
              </div>
              <div v-if="jobData.last_date" class="flex items-center justify-between">
                <span class="text-gray-600">Date limite</span>
                <span class="font-medium text-gray-900">{{ formatDate(jobData.last_date) }}</span>
              </div>
              <div v-if="jobData.gender" class="flex items-center justify-between">
                <span class="text-gray-600">Genre</span>
                <span class="font-medium text-gray-900">{{ getGenderLabel(jobData.gender) }}</span>
              </div>
            </div>
          </div>

          <!-- Company Info -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">À propos de l'entreprise</h3>
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#db147f] to-purple-600">
                <span class="font-bold text-white">{{ getCompanyInitials() }}</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ jobData.company_name || 'Entreprise' }}</h4>
                <p class="text-sm text-gray-600">{{ jobData.industries }}</p>
              </div>
            </div>
            <button class="w-full py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
              Voir l'entreprise
            </button>
          </div>

          <!-- Share -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Partager cette offre</h3>
            <button class="w-full bg-[#db147f] py-2 mt-3 font-medium text-white transition-colors rounded-lg hover:bg-[#c41370]">
              Copier le lien
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  BuildingIcon,
  MapPinIcon, 
  ClockIcon, 
  CheckCircleIcon 
} from 'lucide-vue-next'

const props = defineProps({
  jobData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// Helper methods
const getJobTypeLabel = (type) => {
  const types = {
    'full_time': 'Temps plein',
    'part_time': 'Temps partiel',
    'contract': 'Contrat',
    'freelance': 'Freelance',
    'internship': 'Stage'
  }
  return types[type] || type
}

const getStatusLabel = (status) => {
  const statuses = {
    'draft': 'Brouillon',
    'active': 'Actif',
    'paused': 'En pause',
    'closed': 'Fermé'
  }
  return statuses[status] || status
}

const getStatusClasses = (status) => {
  const classes = {
    'draft': 'bg-gray-100 text-gray-800',
    'active': 'bg-green-100 text-green-800',
    'paused': 'bg-yellow-100 text-yellow-800',
    'closed': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getGenderLabel = (gender) => {
  const genders = {
    'all': 'Tous',
    'male': 'Homme',
    'female': 'Femme'
  }
  return genders[gender] || gender
}

const formatSalary = (price) => {
  if (!price?.value) return ''
  return `${price.value.toLocaleString()} ${price.currency}`
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getCompanyInitials = () => {
  const companyName = props.jobData.company_name || 'Entreprise'
  return companyName.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)
}

const getSkillsArray = (skillsString) => {
  if (!skillsString) return []
  return skillsString.split(',').map(skill => skill.trim())
}
</script>

<style scoped>
.prose {
  line-height: 1.7;
}
</style>
