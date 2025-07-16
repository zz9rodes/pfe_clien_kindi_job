<template>
  <div class="w-full pt-6 bg-gray-50">
      <AppModal :isLoader="true" :isOpen="isOpenLoaderModale" />

    <main class="flex-1 bg-gray-50">
      <div class="container px-4 py-6 mx-auto">
        <h1 class="mb-10 text-4xl font-bold text-gray-900">
          <span class="text-[#e4097f]">Plateform</span> 
          <span class="text-[#00a3e0]"> Dashboard</span>
        </h1>

        <!-- <div v-if="stats"  class="grid grid-cols-1 gap-6 pt-8 mb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DashboardStatCard title="Total Jobs" :value="stats.jobs?.length || 0" icon="BriefcaseIcon" color="pink" />
          <DashboardStatCard title="Total Accounts" :value="stats.accounts?.length || 0" icon="UsersIcon" color="green" />
          <DashboardStatCard title="Total Companies" :value="stats.companies?.length || 0" icon="Building2Icon" color="teal" />
          
          <DashboardStatCard title="Total Jobs" :value="stats.jobs?.length || 0" icon="BriefcaseIcon" color="pink" />
          <DashboardStatCard title="Total Accounts" :value="stats.accounts?.length || 0" icon="UsersIcon" color="green" />
          <DashboardStatCard title="Total Companies" :value="stats.companies?.length || 0" icon="Building2Icon" color="teal" />

        </div> -->

         <div v-if="otherstats" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <!-- Stat Cards -->
        <DashboardStatCard title="Total Jobs" :value="otherstats.jobs" icon="BriefcaseIcon" color="pink" />
        <DashboardStatCard title="Total Projects" :value="otherstats.projects" icon="FolderIcon" color="blue" />
        <DashboardStatCard title="Total Accounts" :value="otherstats.accounts" icon="UsersIcon" color="green" />
        <DashboardStatCard title="User Requests" :value="otherstats.user_requests" icon="UserPlusIcon" color="purple" />
        <DashboardStatCard title="Company Requests" :value="otherstats.companies_request" icon="BuildingIcon" color="orange" />
        <DashboardStatCard title="Total Companies" :value="otherstats.companies" icon="Building2Icon" color="teal" />
        <DashboardStatCard title="Total Contracts" :value="otherstats.contracts" icon="FileTextIcon" color="red" />
        <DashboardStatCard title="Total Agreements" :value="otherstats.aggrements" icon="HandshakeIcon" color="yellow" />
      </div>

    <div v-if="jobsChartData.labels.length > 0" class="grid grid-cols-1 gap-6 mt-8 mb-10 lg:grid-cols-2">
          <!-- Job Type Distribution Pie Chart -->
          <div class="p-6 bg-white shadow-sm rounded-2xl">
            <h2 class="mb-4 text-xl font-bold text-gray-800">Job Type Distribution</h2>
            <JobTypePieChart :chartData="jobsChartData" />
          </div>

          <!-- Job Status Bar Chart -->
          <div class="p-6 bg-white shadow-sm rounded-2xl">
            <h2 class="mb-4 text-xl font-bold text-gray-800">Job Status Overview</h2>
            <JobStatusBarChart :chartData="jobStatusChartData" />
          </div> 
        </div>

        <div v-if="jobsByIndustryChartData.labels.length > 0" class="p-6 mb-10 bg-white shadow-sm rounded-2xl">
          <h2 class="mb-4 text-xl font-bold text-gray-800">Jobs by Industry</h2>
          <JobsByIndustryBarChart :chartData="jobsByIndustryChartData" />
        </div> 

        <div v-else-if="!isOpenLoaderModale" class="mt-8 text-center">
          <div class="flex flex-col items-center justify-center">
            <BarChartIcon class="lg:w-20 lg:h-20 sm:w-14 sm:h-14 text-[#e4097f]" />
            <div class="pt-8">
              <h2 class="text-2xl">No Data Available</h2>
              <p class="mb-4 text-gray-600">Could not load dashboard statistics. Please try again later.</p>
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
import JobTypePieChart from '@/components/charts/JobTypePieChart.vue';
import JobStatusBarChart from '@/components/charts/JobStatusBarChart.vue';
import JobsByIndustryBarChart from '@/components/charts/JobsByIndustryBarChart.vue';
import { BriefcaseIcon, FolderIcon, UsersIcon, UserPlusIcon, BuildingIcon, Building2Icon, FileTextIcon, HandshakeIcon, BarChartIcon } from 'lucide-vue-next';

const auth = useAuthStore();
const stats = ref(null); // This will now hold the full data from /specifics
const otherstats = ref(null); // This will now hold the full data from /specifics
const isOpenLoaderModale = ref(false);

const fetchPecificStats = async () => {
  isOpenLoaderModale.value = true;
  try {
    const response = await auth.api('GET', '/specifics', null, false);
    if (response.success) {
      stats.value = response.data;
    } else {
      console.error('Failed to fetch specifics data:', response.message);
    }
  } catch (error) {
    console.error('Error fetching specifics data:', error);
  } finally {
    isOpenLoaderModale.value = false;
  }
};

const fetchStats = async () => {
  isOpenLoaderModale.value = true;
  try {
    const response = await auth.api('GET', '/stats', null, false);
    if (response.success) {
      otherstats.value = response.data;
    } else {
      console.error('Failed to fetch specifics data:', response.message);
    }
  } catch (error) {
    console.error('Error fetching specifics data:', error);
  } finally {
    isOpenLoaderModale.value = false;
  }
};

// Computed property for Job Type Pie Chart data
const jobsChartData = computed(() => {
  if (!stats.value?.jobs) return { labels: [], datasets: [] };

  const jobTypes = {};
  stats.value.jobs.forEach(job => {
    jobTypes[job.jobType] = (jobTypes[job.jobType] || 0) + 1;
  });

  const labels = Object.keys(jobTypes);
  const data = Object.values(jobTypes);
  const backgroundColors = [
    '#e4097f', '#00a3e0', '#FFC107', '#4CAF50', '#9C27B0', '#FF5722', '#795548', '#607D8B'
  ]; // Custom colors

  return {
    labels: labels,
    datasets: [
      {
        backgroundColor: labels.map((_, i) => backgroundColors[i % backgroundColors.length]),
        data: data,
      },
    ],
  };
});

// Computed property for Job Status Bar Chart data
const jobStatusChartData = computed(() => {
  if (!stats.value?.jobs) return { labels: [], datasets: [] };

  const jobStatuses = {};
  stats.value.jobs.forEach(job => {
    jobStatuses[job.status] = (jobStatuses[job.status] || 0) + 1;
  });

  const labels = Object.keys(jobStatuses);
  const data = Object.values(jobStatuses);
  const backgroundColors = [
    '#e4097f', '#00a3e0', '#FFC107', '#4CAF50', '#9C27B0', '#FF5722', '#795548', '#607D8B'
  ]; // Custom colors

  return {
    labels: labels,
    datasets: [
      {
        label: 'Number of Jobs',
        backgroundColor: labels.map((_, i) => backgroundColors[i % backgroundColors.length]),
        data: data,
      },
    ],
  };
});

// Computed property for Jobs by Industry Bar Chart data
const jobsByIndustryChartData = computed(() => {
  if (!stats.value?.jobs) return { labels: [], datasets: [] };

  const industries = {};
  stats.value.jobs.forEach(job => {
    industries[job.industries] = (industries[job.industries] || 0) + 1;
  });

  const labels = Object.keys(industries);
  const data = Object.values(industries);
  const backgroundColors = [
    '#e4097f', '#00a3e0', '#FFC107', '#4CAF50', '#9C27B0', '#FF5722', '#795548', '#607D8B'
  ]; // Custom colors

  return {
    labels: labels,
    datasets: [
      {
        label: 'Number of Jobs',
        backgroundColor: labels.map((_, i) => backgroundColors[i % backgroundColors.length]),
        data: data,
      },
    ],
  };
});

onMounted(() => {
  fetchPecificStats();
  fetchStats()
});
</script>

<style scoped>
/* Add any specific styles for the dashboard view here */
</style>
