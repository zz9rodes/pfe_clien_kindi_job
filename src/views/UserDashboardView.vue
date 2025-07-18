<template>
  <div class="w-full min-h-screen pt-6 bg-gray-50">
      <AppModal :isLoader="true" :isOpen="isOpenLoaderModale" />

    <main class="flex-1 bg-gray-50">
      <div class="container px-4 py-6 mx-auto">
        <!-- <h1 class="mb-10 text-4xl font-bold text-center text-gray-900">
          <span class="text-[#e4097f]">Your</span> 
          <span class="text-[#00a3e0]">Personal Dashboard</span>
        </h1> -->

        <div v-if="accountStats" class="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <!-- Personal Stats -->
          <DashboardStatCard title="Total Applies" :value="accountStats.applies" icon="FileCheckIcon" color="pink" />
          <DashboardStatCard title="Accepted Applies" :value="accountStats.accept" icon="CheckCircleIcon" color="green" />
          <DashboardStatCard title="Total Agreements" :value="accountStats.agreements" icon="HandshakeIcon" color="blue" />
        </div>

        <!-- Charts for personal applies/accept -->
        <div v-if="appliesAcceptChartData.labels.length > 0 && accountStats.applies" class="grid grid-cols-1 gap-6 mb-10 lg:grid-cols-2">
          <div class="p-6 bg-white shadow-sm rounded-2xl">
            <h2 class="mb-4 text-xl font-bold text-gray-800">Applies vs. Accepted</h2>
            <AppliesAcceptPieChart :chartData="appliesAcceptChartData" />
          </div>
        </div>

        <div v-if="accountStats?.company" class="mb-10">
          <h2 class="mb-6 text-3xl font-bold text-center text-gray-900 lg:text-left">
            <span class="text-[#e4097f]">Company</span> 
            <span class="text-[#00a3e0]"> Statistics</span>
          </h2>
          <div class="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <!-- Company Stats -->
            <DashboardStatCard title="Company Jobs" :value="accountStats.company.jobs?.length || 0" icon="BriefcaseIcon" color="green" />
            <DashboardStatCard title="Company Projects" :value="accountStats.company.projects?.length || 0" icon="FolderIcon" color="purple" />
            <DashboardStatCard title="Company Contracts" :value="accountStats.company.contracts?.length || 0" icon="FileTextIcon" color="orange" />
            <DashboardStatCard title="Company Agreements" :value="accountStats.company.agreements || 0" icon="HandshakeIcon" color="teal" />
            <DashboardStatCard title="Team Member" :value="accountStats.company.guests?.length || 0" icon="UsersIcon" color="red" />
          </div>

          <!-- Charts for company data -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div v-if="companyJobsAppliesChartData.labels.length > 0" class="p-6 bg-white shadow-sm rounded-2xl">
              <h2 class="mb-4 text-xl font-bold text-gray-800">Applies per Job</h2>
              <CompanyJobsAppliesBarChart :chartData="companyJobsAppliesChartData" />
            </div>
            <div v-if="companyProjectsTasksChartData.labels.length > 0" class="p-6 bg-white shadow-sm rounded-2xl">
              <h2 class="mb-4 text-xl font-bold text-gray-800">Tasks per Project</h2>
              <CompanyProjectsTasksBarChart :chartData="companyProjectsTasksChartData" />
            </div>
          </div>
        </div>

        <div v-else-if="!isOpenLoaderModale && accountStats==null" class="mt-8 text-center">
          <div class="flex flex-col items-center justify-center">
            <BarChartIcon class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
            <div class="pt-8">
              <h2 class="text-2xl">No Data Available</h2>
              <p class="mb-4 text-gray-600">Could not load your account statistics. Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AppModal from '@/components/globales/AppModal.vue';
import DashboardStatCard from '@/components/DashboardStatCard.vue';
import AppliesAcceptPieChart from '@/components/AppliesAcceptPieChart.vue';
import CompanyJobsAppliesBarChart from '@/components/CompanyJobsAppliesBarChart.vue';
import CompanyProjectsTasksBarChart from '@/components/CompanyProjectsTasksBarChart.vue';
import { FileCheckIcon, HandshakeIcon, BriefcaseIcon, FolderIcon, FileTextIcon, UsersIcon, BarChartIcon, CheckCircleIcon } from 'lucide-vue-next';

const auth = useAuthStore();
const accountStats = ref(null);
const isOpenLoaderModale = ref(false);

const fetchAccountStats = async () => {
  isOpenLoaderModale.value = true;
  try {
    const response = await auth.api('GET', '/accounts-stats', null, false);
    if (response.success) {
      accountStats.value = response.data;
    } else {
      console.error('Failed to fetch account stats:', response.message);
    }
  } catch (error) {
    console.error('Error fetching account stats:', error);
  } finally {
    isOpenLoaderModale.value = false;
  }
};

// Computed property for Applies vs. Accepted Pie Chart data
const appliesAcceptChartData = computed(() => {
  if (!accountStats.value) return { labels: [], datasets: [] };

  const totalApplies = accountStats.value.applies || 0;
  const acceptedApplies = accountStats.value.accept || 0;
  const rejectedApplies = totalApplies - acceptedApplies; // Assuming rejected = total - accepted

  return {
    labels: ['Accepted Applies', 'Pending/Rejected Applies'],
    datasets: [
      {
        backgroundColor: ['#4CAF50', '#e4097f'], // Green for accepted, Pink for others
        data: [acceptedApplies, rejectedApplies],
      },
    ],
  };
});

// Computed property for Company Jobs Applies Bar Chart data
const companyJobsAppliesChartData = computed(() => {
  if (!accountStats.value?.company?.jobs) return { labels: [], datasets: [] };

  const labels = accountStats.value.company.jobs.map(job => job.title || `Job ${job.id}`);
  const data = accountStats.value.company.jobs.map(job => job.applies?.length || 0);
  const backgroundColors = [
    '#e4097f', '#00a3e0', '#FFC107', '#4CAF50', '#9C27B0', '#FF5722', '#795548', '#607D8B'
  ];

  return {
    labels: labels,
    datasets: [
      {
        label: 'Number of Applies',
        backgroundColor: labels.map((_, i) => backgroundColors[i % backgroundColors.length]),
        data: data,
      },
    ],
  };
});

// Computed property for Company Projects Tasks Bar Chart data
const companyProjectsTasksChartData = computed(() => {
  if (!accountStats.value?.company?.projects) return { labels: [], datasets: [] };

  const labels = accountStats.value.company.projects.map(project => project.name || `Project ${project.id}`); // Assuming no project title
  const data = accountStats.value.company.projects.map(project => project.tasks?.length || 0);
  const backgroundColors = [
    '#00a3e0', '#e4097f', '#4CAF50', '#FFC107', '#9C27B0', '#607D8B', '#FF5722', '#795548'
  ];

  return {
    labels: labels,
    datasets: [
      {
        label: 'Number of Tasks',
        backgroundColor: labels.map((_, i) => backgroundColors[i % backgroundColors.length]),
        data: data,
      },
    ],
  };
});

onMounted(() => {
  fetchAccountStats();
});
</script>

<style scoped>
/* Add any specific styles for the user dashboard view here */
</style>
