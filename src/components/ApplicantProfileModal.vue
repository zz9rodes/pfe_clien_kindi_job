<template>
  <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <img
            v-if="applicant.avatarUrl"
            :src="applicant.avatar"
            :alt="applicant.firstName"
            class="object-cover w-16 h-16 border-2 border-gray-100 rounded-full"
          />
          <div
            v-else
            class="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full"
          >
            <span class="text-xl font-medium text-gray-600">
              {{ applicant.firstName.split(' ').map(n => n[0]).join('') }}
            </span>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">{{ applicant.firstName }} {{ applicant.lastName }}</h2>
            <!-- <p class="text-gray-600">{{ applicant.cvProfiles.bio.split(3) }}</p> -->
            <p class="text-sm text-gray-500">{{ applicant.experience }} d'expérience</p>
          </div>
        </div>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600"
        >
          <X class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 p-6 space-y-6 overflow-auto">
      <!-- Contact Info -->
      <div>
        <h3 class="mb-3 text-lg font-medium text-gray-900">Informations de contact</h3>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <!-- <div class="flex items-center space-x-2">
            <Mail class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-600">{{ applicant.user.email }}</span>
          </div> -->
          <div class="flex items-center space-x-2">
            <Phone class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-600">{{ applicant.phoneNumber }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <MapPin class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-600">{{ applicant.country }} , {{ applicant.city }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <Calendar class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-600">Postulé le {{ formatDate(applicant.createdAt) }}</span>
          </div>
           <div class="flex items-center space-x-2">
            <Languages class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-600">First Langage {{ applicant.firstLangage }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <Languages class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-600">Second Langage {{ applicant.secondLangage }}</span>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="applicant?.cvProfiles.competence && applicant?.cvProfiles?.competence.length > 0">
        <h3 class="mb-3 text-lg font-medium text-gray-900">Compétences</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in applicant?.cvProfiles.competence"
            :key="skill"
            class="px-3 py-1 text-sm text-blue-700 rounded-full bg-blue-50"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      
      <!-- Cover Letter -->
      <div v-if="applicant.message">
        <h3 class="mb-3 text-lg font-medium text-gray-900">Message de motivation</h3>
        <div class="p-4 rounded-lg bg-gray-50">
          <p class="text-sm leading-relaxed text-gray-700">{{ applyInfo.message }}</p>
        </div>
      </div>

      <div v-if="applicant.cvProfiles.slug">
        <h3 class="mb-3 text-lg font-medium text-gray-900">Cv Profile</h3>
        <a
          :href="activeUrl"
          target="_blank"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 rounded-lg bg-blue-50 hover:bg-blue-100"
        >
          <FileText class="w-4 h-4 mr-2" />
          Voir le CV
        </a>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <span 
          :class="[
            'inline-flex items-center px-3 py-1 text-sm font-medium rounded-full',
            getStatusBadgeClass(applyInfo.status)
          ]"
        >
          <div 
            :class="[
              'w-2 h-2 rounded-full mr-2',
              getStatusDotClass(applyInfo.status)
            ]"
          ></div>
          {{ getStatusLabel(applyInfo.status) }}
        </span>
        
        <div class="flex space-x-3">
          <button
            v-if="applicant.status !== 'reject'"
            @click="$emit('updateStatus', 'reject')"
            class="px-4 py-2 text-sm font-medium text-red-600 rounded-lg bg-red-50 hover:bg-red-100"
          >
            Rejeter
          </button>
         
          <button
            v-if="applyInfo.status !== 'approved'"
            @click="$emit('updateStatus', 'approved')"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Accepter
            
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, Mail, Phone, MapPin, Calendar,FileText,Languages } from "lucide-vue-next";

const props = defineProps({
  applicant: {
    type: Object,
    required: true
  },
  applyInfo:{
     type: Object,
    required: true
  }
});

defineEmits(['close', 'updateStatus']);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const activeUrl=`${window.location.origin}/portofolio/${props.applicant.cvProfiles.slug}`

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'reject':
      return 'bg-red-100 text-red-800';
    case 'interviewed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusDotClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-400';
    case 'approved':
      return 'bg-green-400';
    case 'reject':
      return 'bg-red-400';
    case 'interviewed':
      return 'bg-blue-400';
    default:
      return 'bg-gray-400';
  }
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "En attente",
    approved: "Accepté",
    reject: "Rejeté",
    interviewed: "Entretien"
  };
  return labels[status] || status;
};
</script>
