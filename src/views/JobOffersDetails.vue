<template>
  <div class="min-h-screen py-24 bg-gray-50">

    <div class="px-6 py-8 mx-auto max-w-7xl">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Main Content -->
        <div class="space-y-8 lg:col-span-2">
          <!-- Job Header -->
          <div class="p-8 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-start gap-6">
              <!-- Company Logo -->
              <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#db147f] to-purple-600 rounded-xl">
                <span class="text-xl font-bold text-white">{{ getCompanyInitials(jobOffer.company_name) }}</span>
              </div>
              
              <!-- Job Info -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div>
                    <h1 class="mb-2 text-3xl font-bold text-gray-900">{{ jobOffer.title }}</h1>
                    <div class="flex flex-wrap items-center gap-4 mb-3 text-gray-600">
                      <div class="flex items-center gap-1">
                        <BuildingIcon class="w-4 h-4" />
                        <span>{{ jobOffer.company_name || 'Company' }}</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <MapPinIcon class="w-4 h-4" />
                        <span>{{ jobOffer.city }}, {{ jobOffer.country }}</span>
                      </div>
                      <div class="flex items-center gap-1 font-bold">
                        <ClockIcon class="w-4 h-4" />
                        <span>{{ getJobTypeLabel(jobOffer.job_type) }}</span>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                      <span class="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                        {{ getStatusLabel(jobOffer.status) }}
                      </span>
                      <span v-if="jobOffer.price?.value" class="px-3 py-1 text-sm font-medium text-[#db147f] bg-blue-100 rounded-full">
                        {{ formatSalary(jobOffer.price) }}
                      </span>
                      <span v-if="jobOffer.years_experience" class="px-3 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                        {{ jobOffer.years_experience }}+ years of experience
                      </span>
                    </div>
                  </div>
                </div>
                
                <!-- Apply Button -->
                <button 
                  @click="applyToJob"
                  :disabled="hasApplied"
                  class="px-8 py-2 font-semibold text-white transition-colors bg-[#db147f] rounded-lg hover:bg-[#db147f] disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {{ hasApplied ? 'Application sent' : 'Apply now' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Job Description -->
          <div class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Job Description</h2>
            <div class="prose prose-gray max-w-none">
              <p class="leading-relaxed text-gray-700 whitespace-pre-wrap">{{ jobOffer.description }}</p>
            </div>
          </div>

          <!-- Job Details -->
          <div v-if="jobOffer.details && jobOffer.details.length" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Job Details</h2>
            <div class="space-y-6">
              <div v-for="(detail, index) in jobOffer.details" :key="index">
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
          <div v-if="jobOffer.skill_required" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Required Skills</h2>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in getSkillsArray(jobOffer.skill_required)" 
                :key="skill"
                class="px-3 py-2 text-sm font-medium text-[#db147f] rounded-lg bg-blue-50"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Recruitment Process -->
          <div v-if="jobOffer.recruitment_steps && jobOffer.recruitment_steps.length" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Recruitment Process</h2>
            <div class="space-y-6">
              <div 
                v-for="(step, index) in jobOffer.recruitment_steps" 
                :key="index"
                class="flex gap-4"
              >
                <div class="flex flex-col items-center">
                  <div class="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-[#db147f] rounded-full">
                    {{ index + 1 }}
                  </div>
                  <div v-if="index < jobOffer.recruitment_steps.length - 1" class="w-0.5 h-12 bg-gray-200 mt-2"></div>
                </div>
                <div class="flex-1 pb-6">
                  <h3 class="mb-2 text-lg font-semibold text-gray-900">{{ step.title }}</h3>
                  <p v-if="step.description" class="text-gray-700">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Process Steps -->
          <div v-if="jobOffer.steps && jobOffer.steps.length" class="p-8 bg-white border border-gray-200 rounded-lg">
            <h2 class="mb-6 text-2xl font-bold text-gray-900">Process Steps</h2>
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div 
                v-for="(step, index) in jobOffer.steps" 
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
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Key Information</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Industry</span>
                <span class="font-medium text-gray-900">{{ jobOffer.industries }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Contract Type</span>
                <span class="font-medium text-gray-900">{{ getJobTypeLabel(jobOffer.job_type) }}</span>
              </div>
              <div v-if="jobOffer.years_experience" class="flex items-center justify-between">
                <span class="text-gray-600">Experience</span>
                <span class="font-medium text-gray-900">{{ jobOffer.years_experience }}+ years</span>
              </div>
              <div v-if="jobOffer.last_date" class="flex items-center justify-between">
                <span class="text-gray-600">Deadline</span>
                <span class="font-medium text-gray-900">{{ formatDate(jobOffer.last_date) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Gender</span>
                <span class="font-medium text-gray-900">{{ getGenderLabel(jobOffer.gender) }}</span>
              </div>
            </div>
          </div>

          <!-- Company Info -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">About the Company</h3>
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#db147f] to-purple-600">
                <span class="font-bold text-white">{{ getCompanyInitials(jobOffer.company_name) }}</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ jobOffer.company_name || 'Company' }}</h4>
                <p class="text-sm text-gray-600">{{ jobOffer.industries }}</p>
              </div>
            </div>
            <button class="w-full py-2 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
              View company
            </button>
          </div>

          <!-- Similar Jobs -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Similar Offers</h3>
            <div class="space-y-4">
              <div 
                v-for="similarJob in similarJobs" 
                :key="similarJob.id"
                class="p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <h4 class="mb-1 font-medium text-gray-900">{{ similarJob.title }}</h4>
                <p class="mb-2 text-sm text-gray-600">{{ similarJob.company }}</p>
                <div class="flex items-center gap-2 text-xs text-gray-500">
                  <MapPinIcon class="w-3 h-3" />
                  <span>{{ similarJob.location }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Share -->
          <div class="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Share this offer</h3>
            <button class="w-full bg-[#db147f] py-2 mt-3 font-medium text-gray-700 transition-colors text-white rounded-lg hover:bg-gray-200">
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  BuildingIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon
} from 'lucide-vue-next'

// Props
const props = defineProps({
  jobId: {
    type: [String, Number],
    required: true
  }
})

// Reactive data
const isSaved = ref(false)
const hasApplied = ref(false)

// Sample job data (normally would come from API)
const jobOffer = ref({
  title: 'Senior Frontend Developer',
  company_name: 'TechCorp',
  city: 'Paris',
  country: 'France',
  description: `We are looking for a passionate senior frontend developer to join our dynamic team. You will work on innovative projects using the latest web technologies.

You will be responsible for developing modern and high-performing user interfaces, in close collaboration with our design and backend teams.

This position offers an excellent opportunity for growth in a stimulating and supportive environment.`,
  industries: 'Technology',
  job_type: 'FULL_TIME',
  price: {
    value: 55000,
    currency: 'EUR'
  },
  details: [
    {
      title: 'Responsibilities',
      items: [
        'Develop user interfaces with Vue.js and React',
        'Collaborate with the design team to implement mockups',
        'Optimize web application performance',
        'Maintain and improve existing code',
        'Participate in code reviews and technical decisions'
      ]
    },
    {
      title: 'Benefits',
      items: [
        'Flexible remote work (2-3 days per week)',
        'Continuous training and personal development budget',
        'Premium company health insurance',
        'Meal vouchers and transportation reimbursement',
        'Young and dynamic team'
      ]
    }
  ],
  years_experience: 3,
  skill_required: 'Vue.js, React, JavaScript, TypeScript, CSS, Git, Figma',
  last_date: '2024-02-15',
  gender: 'ANY',
  recruitment_steps: [
    {
      title: 'Phone Interview',
      description: 'Initial contact with the HR manager (30 minutes)'
    },
    {
      title: 'Technical Test',
      description: 'Practical exercise to be completed at home (2-3 hours)'
    },
    {
      title: 'Technical Interview',
      description: 'Discussion with the technical team (1 hour)'
    },
    {
      title: 'Final Interview',
      description: 'Meeting with the manager and team introduction'
    }
  ],
  status: 'ACTIVE',
  steps: [
    {
      name: 'Probation Period',
      description: 'Training and integration into the team',
      renumeration: {
        value: 50000,
        currency: 'EUR'
      }
    },
    {
      name: 'Confirmation',
      description: 'Confirmed position with salary increase',
      renumeration: {
        value: 55000,
        currency: 'EUR'
      }
    }
  ]
})

// Similar jobs
const similarJobs = ref([
  {
    id: 1,
    title: 'React Developer',
    company: 'StartupTech',
    location: 'Paris'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'DigitalCorp',
    location: 'Lyon'
  },
  {
    id: 3,
    title: 'Vue.js Developer',
    company: 'WebAgency',
    location: 'Remote'
  }
])

// Methods
const toggleSave = () => {
  isSaved.value = !isSaved.value
}

const applyToJob = () => {
  hasApplied.value = true
  // Here you would typically send the application to the backend
  alert('Application sent successfully!')
}

const getCompanyInitials = (companyName) => {
  if (!companyName) return 'TC'
  return companyName.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)
}

const getJobTypeLabel = (jobType) => {
  const labels = {
    'FULL_TIME': 'Full-time',
    'PART_TIME': 'Part-time',
    'CONTRACT': 'Contract',
    'FREELANCE': 'Freelance',
    'INTERNSHIP': 'Internship'
  }
  return labels[jobType] || jobType
}

const getStatusLabel = (status) => {
  const labels = {
    'DRAFT': 'Draft',
    'ACTIVE': 'Active',
    'PAUSED': 'Paused',
    'CLOSED': 'Closed'
  }
  return labels[status] || status
}

const getGenderLabel = (gender) => {
  const labels = {
    'ANY': 'All',
    'MALE': 'Male',
    'FEMALE': 'Female'
  }
  return labels[gender] || gender
}

const formatSalary = (price) => {
  if (!price?.value) return ''
  const symbols = {
    'EUR': '€',
    'USD': '$',
    'GBP': '£',
    'CAD': 'C$'
  }
  return `${price.value.toLocaleString()} ${symbols[price.currency] || price.currency}`
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US')
}

const getSkillsArray = (skillsString) => {
  if (!skillsString) return []
  return skillsString.split(',').map(skill => skill.trim())
}

// Lifecycle
onMounted(() => {
  // Fetch job data based on jobId
  console.log('Loading job offer:', props.jobId)
})
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Prose styles for description */
.prose {
  line-height: 1.7;
}
</style>
