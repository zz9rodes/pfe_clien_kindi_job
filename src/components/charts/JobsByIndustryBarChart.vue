<template>
    <div>
  <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { defineProps, ref } from 'vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Hide legend for single dataset
    },
    title: {
      display: false,
      text: 'Emplois par secteur',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }
          return label;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#4B5563', // gray-600
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#4B5563', // gray-600
        precision: 0, // Ensure whole numbers for counts
      },
      grid: {
        color: '#E5E7EB', // gray-200
      },
    },
  },
});
</script>

<style scoped>
/* Add any specific styles for the chart here */
</style>
