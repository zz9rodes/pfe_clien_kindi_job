<template>
  <div class="w-full min-h-screen">
    <div class="h-full">
      <div class="h-full rounded-lg">
        <div class="flex flex-col h-full lg:flex-row">
          <!-- Sidebar avec onglets -->
          <div class="lg:w-80 lg:border-r lg:border-b-0">
            <div class="p-4 h-auto bg-gray-50 rounded-md lg:p-6">
              <h2
                class="mb-4 text-lg text-gray-800 fonht-semibold lg:mb-6 lg:text-xl"
              >
                Account Settings
              </h2>
              <nav
                class="flex overflow-x-auto flex-row space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 lg:overflow-x-visible"
              >
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="ToogleActiveTab(tab.id)"
                  :class="[
                    'flex-shrink-0 lg:w-full flex flex-1 flex-col lg:flex-row items-center px-3 lg:px-4 py-2 lg:py-3 text-center lg:text-left rounded-lg transition-all duration-200 min-w-max lg:min-w-0',
                    activeTab === tab.id
                      ? 'bg-[#fff0fb] text-[#db147f] shadow-sm '
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
                  ]"
                >
                  <component
                    :is="tab.icon"
                    class="mb-1 w-4 h-4 lg:w-5 lg:h-5 lg:mb-0 lg:mr-3"
                  />
                  <span
                    class="hidden text-xs font-medium md:block lg:text-sm"
                    >{{ tab.name }}</span
                  >
                </button>
              </nav>
            </div>
          </div>

          <RouterView class="flex-[1] lg:pb-8  overflow-auto  "> </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
import {
  UserIcon,
  UsersIcon,
  Plus,
  PenToolIcon,
  FileUserIcon,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

const activeTab =
  route?.params?.tab == "companies" ? ref(route?.params?.tab) : ref("admin_profile_details");

const tabs = [
  {
    id: "admin_profile_details",
    name: "Profile",
    icon: UserIcon,
    route: "admin_profile_details",
  },
  {
    id: "admin_signature",
    name: "Sign Agreement",
    icon: PenToolIcon,
    route: "admin_signature",
  },
  {
    id: "cv_profile",
    name: "Cv Profile",
    icon: FileUserIcon,
    route: "cv_profile",
  },
];


const ToogleActiveTab = (tabId) => {
  activeTab.value = tabId;
  route.params.tab = tabId;
  const t = tabs.filter((tab) => {
    return tab.id === activeTab.value;
  });
  router.push({ name: t[0].route });
};

const validTabs = [
  "admin_profile_details",
  "admin_signature",
  "cv_profile",
];

onMounted(() => {
  console.log(route);
  const tabParam = route.name;
  activeTab.value = validTabs.includes(tabParam) ? tabParam : "admin_profile_details";
});
</script>

<style scoped>
/* Styles personnalisés pour les transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
