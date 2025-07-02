<template>
  <div class="w-full min-h-screen mx-auto bg-gray-50">
    <!-- Modal de chargement -->
    <AppModal :isOpen="isLoading" :isLoader="true"></AppModal>


    <!-- Modal pour voir les détails du contrat -->


        <AppModal
      @closeModal="closeAgreementModal"
      :isOpen="isAgreementModalOpen"
      :isLoader="false"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Détails du Contrat</h2>
            <button @click="closeAgreementModal" class="text-gray-400 hover:text-gray-600">
              <X class="w-6 h-6" />
            </button>
          </div>
          
          <div v-if="selectedAgreement" class="space-y-6">
            <!-- Informations générales -->
            <div class="grid grid-cols-1 gap-4 p-4 rounded-lg md:grid-cols-2 bg-gray-50">
              <div>
                <span class="font-medium text-gray-700">Référence:</span>
                <span class="ml-2 text-gray-900">{{ selectedAgreement.reference }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Date de signature:</span>
                <span class="ml-2 text-gray-900">{{ formatDate(selectedAgreement.createdAt) }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Titre du contrat:</span>
                <span class="ml-2 text-gray-900">{{ selectedAgreement.contract.title }}</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Statut:</span>
                <span class="ml-2 font-medium text-green-600">Signé et Actif</span>
              </div>
            </div>

            <!-- Description du contrat -->
            <div>
              <h4 class="mb-2 font-medium">Description du contrat</h4>
              <div class="p-4 rounded-lg bg-gray-50">
                <p class="text-gray-700 whitespace-pre-wrap">{{ selectedAgreement.contract.textDescription }}</p>
              </div>
            </div>

            <!-- Articles et clauses -->
            <div v-if="selectedAgreement.contract.articlesAndClauses?.length > 0">
              <h4 class="mb-3 font-medium">Articles et Clauses ({{ selectedAgreement.contract.articlesAndClauses.length }})</h4>
              <div class="space-y-3">
                <div 
                  v-for="(clause, index) in selectedAgreement.contract.articlesAndClauses" 
                  :key="index"
                  class="py-2 pl-4 border-l-4 border-[#db147f]"
                >
                  <h5 class="font-medium text-gray-900">Article {{ index + 1 }} - {{ clause.title }}</h5>
                  <p class="mt-1 text-sm text-gray-600">{{ clause.text.substring(0, 150) }}...</p>
                  <span v-if="clause.items?.length > 0" class="text-xs text-[#db147f]">
                    {{ clause.items.length }} élément(s) supplémentaire(s)
                  </span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end pt-4 space-x-3 border-t">

              <button
                @click="viewFullContract(selectedAgreement)"
                class="flex items-center px-4 py-2 text-white bg-[#db147f] rounded-md hover:bg-[#db147f]"
              >
                <FileText class="w-4 h-4 mr-2" />
                Voir le contrat complet
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppModal>

    <!-- Header avec statistiques -->
    <div class="px-6 py-6 bg-white border-b border-gray-200">
      <div class="mb-6">
        <h1 class="mb-2 text-3xl font-bold text-gray-900">Mes Contrats Signés</h1>
        <p class="text-gray-600">Gérez et consultez tous vos contrats et accords signés</p>
      </div>


    </div>

    <!-- Filtres et recherche -->
    <div class="px-6 py-4 bg-white border-b border-gray-200">
      <div class="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <Search class="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un contrat..."
              class="py-1 pl-10 pr-4 border rounded-md outline-none border-gray-400-300 focus:ring-2 focus:ring-[#db147f] focus:border-transparent"
            />
          </div>
        
        </div>
      </div>
    </div>
    
    <!-- Contenu principal -->
    <div class="p-6">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Cartes des contrats -->
        <div 
          v-for="agreement in filteredAgreements"
          :key="agreement.id"
          class="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg"
          @click.stop="viewAgreementDetails(agreement)"
        >
          <!-- En-tête du contrat -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3 ">

              <div class="flex-1 min-w-0">
                <h3 class="mb-3 text-lg font-semibold text-gray-900 truncate">
                  {{ agreement.contract.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  Réf: {{ agreement.reference }}
                </p>
              </div>
            </div>
            <span class="inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
              <CheckCircle class="w-3 h-3 mr-1" />
              Signé
            </span>
          </div>

          <!-- Informations du contrat -->
          <div class="mb-4 space-y-2 ">
            <div class="flex items-center text-sm text-gray-600">
              <Calendar class="w-4 h-4 mr-2" />
              Signé le {{ formatDate(agreement.createdAt) }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <FileText class="w-4 h-4 mr-2" />
              {{ agreement.contract.articlesAndClauses?.length || 0 }} article(s)
            </div>
           
          </div>

          <!-- Description courte -->
          <div class="mt-12 mb-4">
            <p class="text-sm text-gray-700 line-clamp-3">
              {{ agreement.contract.textDescription }}
            </p>
          </div>

          <!-- Actions rapides -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="flex items-center space-x-2">
              <button
                @click.stop="viewOriginaleContractDetails(agreement)"
                class="flex items-center px-3 py-1 text-xs text-[#db147f] border border-pink-200 rounded hover:bg-pink-50"
              >
                <Eye class="w-3 h-3 mr-1" />
                Originales
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- État vide -->
      <div 
        v-if="filteredAgreements.length === 0 && !isLoading" 
        class="py-12 text-center"
      >
        <div class="flex flex-col items-center">
          <div class="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
            <FileText class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="mb-2 text-lg font-medium text-gray-900">
            {{ searchQuery ? 'Aucun contrat trouvé' : 'Aucun contrat signé' }}
          </h3>
          <p class="text-gray-500">
            {{ searchQuery ? 'Essayez de modifier votre recherche.' : 'Vos contrats signés apparaîtront ici.' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  PenTool, 
  Search, 
  Eye, 
  Download, 
  Building2,
  X
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import AppModal from "@/components/globales/AppModal.vue";

// Composables
const auth = useAuthStore();

// Reactive data
const isLoading = ref(false);
const isAgreementModalOpen = ref(false);
const selectedAgreement = ref(null);
const searchQuery = ref('');
const sortBy = ref('newest');

// Données des contrats signés
const agreements = ref([]);

// Computed properties
const filteredAgreements = computed(() => {
  let filtered = agreements.value;

  // Filtrage par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(agreement => 
      agreement.contract.title.toLowerCase().includes(query) ||
      agreement.reference.toLowerCase().includes(query) ||
      agreement.contract.textDescription.toLowerCase().includes(query)
    );
  }

  // Tri
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'title':
        return a.contract.title.localeCompare(b.contract.title);
      default:
        return 0;
    }
  });

  return filtered;
});

// Methods
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};


// Actions
const viewAgreementDetails = (agreement) => {
  selectedAgreement.value = agreement;
  isAgreementModalOpen.value = true;
};

const viewOriginaleContractDetails=(agreement)=>{
window.open(`${window.location.origin}/contracts/${agreement.contract.slug}/preview`, '_blank')

}

const closeAgreementModal = () => {
  isAgreementModalOpen.value = false;
  selectedAgreement.value = null;
};

const viewFullContract = (agreement) => {
    window.open(`${window.location.origin}/app/agrements/${agreement.id}/preview`, '_blank')
};

const downloadContract = async (agreement) => {
  try {
    console.log('Téléchargement du contrat:', agreement.reference);
    // Implémenter la logique de téléchargement PDF
    alert(`Téléchargement du contrat ${agreement.reference} commencé !`);
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
    alert('Erreur lors du téléchargement du contrat');
  }
};

// API Methods
const fetchAgreements = async () => {
  isLoading.value = true;
  
  try {
    const response = await auth.api('GET', '/agreements/account', null, false);
    
    if (response.success) {
      agreements.value = response.data;
      console.log('Contrats chargés:', agreements.value);
    } else {
      console.error('Erreur API:', response.message);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des contrats:', error);
    
    // Données mockées pour la démonstration
    agreements.value = [
      {
        id: 1,
        accountId: 14,
        contractId: 6,
        createdAt: "2025-07-01T21:06:02.000+00:00",
        updatedAt: "2025-07-01T21:06:02.000+00:00",
        reference: "CTR-2025-07-P23RG9",
        signatureId: 9,
        contract: {
          id: 6,
          jobId: 3,
          companyId: 16,
          textDescription: "Le flux actuel repose sur un processus lent, avec contrôle visuel et contact manuel de l'administration. Le flux proposé implique un accès direct à une base centralisée via un outil numérique (app, QR code, portail), offrant une réponse immédiate.",
          title: "Contract de Stage",
          articlesAndClauses: [
            {
              title: "Style Vestimentaire",
              text: "Le flux actuel repose sur un processus lent, avec contrôle visuel et contact manuel de l'administration.\n✅ Le flux proposé implique un accès direct à une base centralisée via un outil numérique (app, QR code, portail), offrant une réponse immédiate.",
              items: []
            },
            {
              title: "Heure De Debut",
              text: "Le flux actuel repose sur un processus lent, avec contrôle visuel et contact manuel de l'administration.\n✅ Le flux proposé implique un accès direct à une base centralisée via un outil numérique (app, QR code, portail), offrant une réponse immédiate.",
              items: [
                "montrable à un vrai commerçant pour feedback ou démo.",
                "Intégration d'un mini dashboard pour voir les meilleurs clients ou produits",
                "Option pro : service de maintenance ou formation locale pour l'utiliser"
              ]
            }
          ],
          requiredField: ["UserEmail", "AccountFirstName"],
          isPublish: 0,
          createdAt: "2025-06-17T22:24:01.000+00:00",
          updatedAt: "2025-07-01T12:30:32.000+00:00",
          slug: "34450649-441b-4b41-aab6-ecbde2162044"
        }
      }
    ];
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(async () => {
  await fetchAgreements();
});
</script>

<style scoped>
/* Animations pour les transitions */
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

/* Hover effects */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
</style>