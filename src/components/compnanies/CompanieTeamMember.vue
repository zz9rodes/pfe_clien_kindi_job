<template>
  <div class="w-full mx-auto">
    <AppModal @closeModal="toggleOpenModal" :isOpen="isModalOpen" :isLoader="false">
        <FormInviteUserToCompanie @close="toggleOpenModal()" />
    </AppModal>
    <!-- Tabs -->
    <div class="flex gap-4 px-4 mb-4 border-b ">
      <button
        v-for="tab in statuses"
        :key="tab"
        @click="activeTab = tab"
        :class="[
          'py-2 px-4 text-sm font-medium border-b-2',
          activeTab === tab
            ? 'border-[#db147f] text-[#db147f]'
            : 'border-transparent text-gray-500 hover:text-gray-700',
        ]"
      >
        {{ tabLabels[tab] }}
      </button>
    </div>

    <div class="grid grid-cols-1 gap-6 px-4 mt-8 md:grid-cols-2 lg:grid-cols-4">
      <TeamMemberCard
        v-for="member in filteredMembers"
        :key="member.name"
        :member="member"
      />

      <div
        v-if="activeTab == statuses[0]"
         @click="toggleOpenModal()"
        class="flex items-center justify-center p-2 text-center border-2 border-dashed rounded-lg cursor-pointer"
      >
        <div
          class="relative flex p-2 rounded-sm overflow-hidden transition duration-700 ease-in-out bg-[#db147f] text-white group hover:cursor-pointer"
        >
          <Plus />
          Add New
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TeamMemberCard from "../TeamMemberCard.vue";
import AppModal from "../globales/AppModal.vue";
const statuses = ["send", "accepted"];
import { Plus } from "lucide-vue-next";
import FormInviteUserToCompanie from "../authFom/FormInviteUserToCompanie.vue";

const tabLabels = {
  send: "Sent Invitations",
  accepted: "Accepted Members",
};

const activeTab = ref("send");

// Fake data for demonstration
const allMembers = ref([
  {
    name: "Alice Martin",
    position: "Frontend Developer",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/100?u=alice",
    status: "send",
  },
  {
    name: "John Doe",
    position: "Product Manager",
    department: "Product",
    avatar: "",
    status: "accepted",
  },
  {
    name: "Sara Lee",
    position: "Backend Developer",
    department: "Engineering",
    avatar: "https://i.pravatar.cc/100?u=sara",
    status: "accepted",
  },
]);

const filteredMembers = computed(() =>
  allMembers.value.filter((member) => member.status === activeTab.value)
);

const isModalOpen = ref(false);

const toggleOpenModal = () => {
  isModalOpen.value = !isModalOpen.value;
};


</script>
