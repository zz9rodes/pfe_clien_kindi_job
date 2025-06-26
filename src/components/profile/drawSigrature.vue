<template>
  <AppModal @closeModal="toggleOpenLoaderModal" :isOpen="isLoading" :isLoader="true" />
  <div class="px-6 pt-6 mx-auto w-[98%]">
    <!-- Section des signatures existantes -->
    <div v-if="!showCreateForm" class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-semibold text-gray-900">Mes signatures</h2>
        <button @click="showCreateForm = true" 
        
          :disabled="signatures.length>=3 ? true : false"
          :class="signatures.length>=3 ? ' bg-pink-300 cursor-not-allowed':'bg-[#e4097f]  hover:bg-[#c01370]'"
          class="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg ">
          <PlusIcon class="w-4 h-4" />
          <span>Créer une signature</span>
        </button>
      </div>

      <div v-if="signatures.length === 0" class="p-8 text-center bg-white border rounded-lg">
        <PenToolIcon class="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 class="mb-2 text-xl font-medium text-gray-700">Aucune signature trouvée</h3>
        <p class="mb-6 text-gray-500">Vous n'avez pas encore créé de signature digitale</p>
        <button @click="showCreateForm = true" 
          class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors">
          Créer ma première signature
        </button>
      </div>

      <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(signature, index) in signatures" :key="index" class="relative group">
          <SignatureCard 
            :text="signature.text" 
            :font="signature.font" 
          />
          <div class="absolute inset-0 flex items-center justify-center transition-all bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-10 rounded-xl group-hover:opacity-100">
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire de création de signature -->
    <div v-if="showCreateForm" class="p-8 bg-white border rounded-lg">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <button @click="showCreateForm = false" class="p-2 text-gray-500 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon class="w-5 h-5" />
          </button>
          <h2 class="text-2xl font-semibold text-gray-900">Créer une signature</h2>
        </div>
      </div>

    
      <form @submit.prevent="saveSignature" class="space-y-6">
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700">Full Name *</label>
          <input type="text" v-model="signatureForm.name"
            class="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] focus:border-transparent"
            placeholder="Enter your full name" required />
        </div>

        <div>
          <div class="flex items-center justify-between header-section">
            <label class="block mb-4 text-sm font-medium text-gray-700">Type Your Signature *</label>
            <div>
              <select v-model="signatureForm.font"
                class="w-full px-4 outline-none py-1 mb-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] focus:border-transparent">
                <option v-for="font in ListFont" :key="font.value" :value="font.value">
                  {{ font.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="p-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
            <div class="bg-white rounded-lg border-2 border-gray-200 p-1 min-h-[80px] flex items-center justify-center">
              <input type="text" v-model="signatureForm.text" :style="{ fontFamily: signatureForm.font }"
                class="w-full text-4xl text-center bg-transparent border-none outline-none"
                placeholder="Type your signature here" required />
            </div>

            <p class="mt-4 text-xs text-center text-gray-500">
              carries the same legal weight as a handwritten signature
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end pt-6 space-x-4">
          <button type="button" @click="showCreateForm = false" class="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
            <X class="w-5 h-5 sm:hidden" />
            <span class="hidden sm:block"> Cancel </span>
          </button>
          <button type="submit" class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors">
            <Save class="w-5 h-5 sm:hidden" />
            <span class="hidden sm:block"> Save Changes </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { X, Save, PenTool as PenToolIcon, Plus as PlusIcon, ArrowLeft as ArrowLeftIcon, Trash as TrashIcon } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import AppModal from "../globales/AppModal.vue";
import SignatureCard from '@/components/Contract/SignatureCard.vue';
import { ListFont } from "@/helpers/font";

const signatureForm = ref({
  name: "",
  font: "cursive",
  text: "",
});

const isLoading = ref(false);
const signatures = ref([]);
const showCreateForm = ref(false);
const auth = useAuthStore();

const toggleOpenLoaderModal = () => {
  isLoading.value = !isLoading.value;
};

const fetchSignatures = async () => {
  toggleOpenLoaderModal();
  try {
    const response = await auth.api('GET', '/accounts/signatures', null, false);
    signatures.value = response.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des signatures:", error);
  } finally {
    toggleOpenLoaderModal();
  }
};

// Initialisation des données au chargement du composant
onMounted(() => {
  fetchSignatures();
});



const saveSignature = async () => {
  toggleOpenLoaderModal();
  try {
    await auth.api('POST', '/accounts/signatures/create', signatureForm.value, true);
    // Réinitialiser le formulaire
    signatureForm.value = {
      name: "",
      font: "cursive",
      text: "",
    };
    // Rafraîchir la liste des signatures
    await fetchSignatures();
    // Revenir à la liste des signatures
    showCreateForm.value = false;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la signature:", error);
  } finally {
    toggleOpenLoaderModal();
  }
};

</script>

<style scoped>
/* Styles personnalisés pour les transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>