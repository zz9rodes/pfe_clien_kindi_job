<template>
  <div class="w-full min-h-screen mx-auto bg-gray-50">
    <AppModal :isOpen="isLoading" :isLoader="true"></AppModal>

    <AppModal
      @closeModal="toggleOpenModal"
      :isOpen="isModalOpen"
      :isLoader="false"
    >
      <FormInviteUserToCompanie       
      @submitform="HandleSendInviation"
      @close="toggleOpenModal" />
    </AppModal>

    <!-- Header avec titre -->
    <div class="px-6 py-4 bg-white border-b border-gray-200">
      <h1 class="text-2xl font-bold text-gray-900">Équipe</h1>
      <p class="mt-1 text-gray-600">Gérez les membres de votre équipe</p>
    </div>

    <!-- Tabs simplifiés -->
    <div class="bg-white border-b border-gray-200">
      <div class="flex gap-0 ">
        <button
          v-for="tab in statuses"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'py-2 px-4 text-sm font-medium border-b-2',
            activeTab === tab
              ? 'border-[#db147f] text-[#db147f]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tabLabels[tab] }}
          
        </button>
      </div>
    </div>
    
    <!-- Contenu principal -->
    <div class="p-6">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <!-- Cartes des membres -->
         <div 
          v-for="member in filteredMembers"
          :key="member.name"
          class="p-4 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md"
        >
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <img
                v-if="member.avatar"
                :src="member.avatar"
                :alt="member.name"
                class="object-cover w-12 h-12 border-2 border-gray-100 rounded-full"
              />
              <div
                v-else
                class="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full"
              >
                <span class="text-sm font-medium text-gray-600">
                  {{ member.name.split(' ').map(n => n[0]).join('') }}
                </span>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-medium text-gray-900 truncate">
                {{ member.name }}
              </h3>
              <p class="text-sm text-gray-500 truncate">
                {{ member.position }}
              </p>
              <div class="mt-2">
                <span 
                  :class="[
                    'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
                    member.status === 'accepted' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  <div 
                    :class="[
                      'w-1.5 h-1.5 rounded-full mr-1.5',
                      member.status === 'accepted' ? 'bg-green-400' : 'bg-yellow-400'
                    ]"
                  ></div>
                  {{ member.status === 'accepted' ? 'Actif' : 'En attente' }}
                </span>
              </div>
            </div>
          </div>
        </div> 



        <!-- Bouton d'ajout -->
        <div
          v-if="activeTab === statuses[0]"
          @click="toggleOpenModal()"
          class="flex flex-col items-center justify-center p-3 transition-colors bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 group"
        >
          <div class="flex items-center justify-center w-8 h-8 mb-3 transition-colors bg-[#db147f] rounded-full ">
            <Plus class="w-6 h-6 text-white" />
          </div>
          <span class="text-sm font-medium text-gray-600 group-hover:text-gray-700">
            Inviter un membre
          </span>
        </div>
      </div>

      <!-- État vide -->
      <div 
        v-if="filteredMembers.length === 0" 
        class="py-12 text-center"
      >
        <h3 class="mb-2 text-lg font-medium text-gray-900">
          {{ activeTab === 'send' ? 'Aucune invitation envoyée' : 'Aucun membre actif' }}
        </h3>
       
        <button
          v-if="activeTab === 'send'"
          @click="toggleOpenModal()"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-[#db147f] rounded-lg "
        >
          <Plus class="w-4 h-4 mr-2" />
          Inviter un membre
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AppModal from "../globales/AppModal.vue";
import { Plus } from "lucide-vue-next";
import FormInviteUserToCompanie from "../authFom/FormInviteUserToCompanie.vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";

const auth=useAuthStore()
const route=useRoute()

const tabLabels = {
  send: "Sent Invitations",
  accepted: "Approved Members",
};

const statuses = ["send", "accepted"];


const activeTab = ref("send");


const companieMembers=ref([])

const filteredMembers = computed(() =>
  companieMembers.value.filter((member) => member.status === activeTab.value)
);

const isModalOpen = ref(false);

const isLoading = ref(false);

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const toggleOpenLoaderModal = () => {
  isLoading.value = !isLoading.value;
};

const HandleSendInviation = async (payload) => {
  isModalOpen.value=false
  toggleOpenLoaderModal()
  try {
    const response = await auth.api(
      "POST",
      `/companies/${route.params.companyId}/guests/create`,
      payload,
      true
    );

    if (response.success) {
      console.log(response.data);
    }
    
  } catch (error) {
    console.error(error);
  }
  toggleOpenLoaderModal()
};


const InitFeactTeamMember=async ()=>{

  toggleOpenLoaderModal()

  const companyId=route.params.companyId

  try {
      const response=await auth.api('GET',`/companies/${companyId}/guests`,null,false)
      console.log(response.data)

      if(response.success){
        companieMembers.value = []; 
        
        response.data?.forEach((member) => {
          companieMembers.value.push({
            name: `${member.account.firstName} ${member.account.lastName}`,
            avatar: member.account.avatarUrl,
            firstLanguage: member.account.firstLanguage,
            position: member.role,
            status: member.accept ? 'accepted':'send'
          });
        });
      }
  } catch (error) {
    console.log(error)
  }
  toggleOpenLoaderModal() 
}

onMounted( async()=>{
  await InitFeactTeamMember()
})
</script>