<template>
  <div class="p-8">e
    <h1 class="mb-6 text-2xl font-bold">Exemple d'utilisation du Modal Utilisateurs</h1>
    
    <div class="space-y-4">
      <button
        @click="openUserModal"
        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Ouvrir la liste des utilisateurs
      </button>
    </div>

    <!-- Modal -->
    <UserListModal
      :isOpen="isModalOpen"
      :users="mockUsers"
      :isLoading="isLoading"
      :allowMultipleSelection="allowMultiple"
      :selectButtonText="allowMultiple ? 'Ajouter' : 'Sélectionner'"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserListModal from "./UserListModal.vue";

const isModalOpen = ref(false);
const isLoading = ref(false);
const allowMultiple = ref(false);

const mockUsers = ref([
  {
    id: 14,
    slug: "7a396c27-ed03-483b-af21-af8fb3bfe418",
    firstName: "Neymar",
    lastName: "Junior Santos",
    phoneNumber: "657883392",
    dob: "2005-06-14T00:00:00.000Z",
    address: {
      title: "maneres baoybde",
      lat: 0,
      long: 0
    },
    accountType: "personnal",
    country: "Cameroun",
    city: "Douala",
    avatarUrl: null,
    firstLangage: "Japonais",
    secondLangage: "Français",
    frontIdCard: "",
    backIdCard: "",
    createdAt: "2025-06-05T18:13:30.000+00:00",
    updatedAt: "2025-06-05T18:13:30.000+00:00",
    userId: 20
  },
  {
    id: 15,
    slug: "8b497d38-fe04-594c-bg32-bg9gc4cge529",
    firstName: "Marie",
    lastName: "Dubois",
    phoneNumber: "698765432",
    dob: "1990-03-22T00:00:00.000Z",
    address: {
      title: "123 rue de la Paix",
      lat: 0,
      long: 0
    },
    accountType: "business",
    country: "France",
    city: "Paris",
    avatarUrl: "/placeholder.svg?height=48&width=48",
    firstLangage: "Français",
    secondLangage: "Anglais",
    frontIdCard: "",
    backIdCard: "",
    createdAt: "2025-06-10T14:20:15.000+00:00",
    updatedAt: "2025-06-10T14:20:15.000+00:00",
    userId: 21
  },
  // Ajoutez plus d'utilisateurs mockés si nécessaire
]);

const openUserModal = () => {
  allowMultiple.value = false;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>