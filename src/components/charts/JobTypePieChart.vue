<template>
    <div class="">
          <Pie :data="chartData" :options="chartOptions" />

    </div>
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { defineProps, ref } from 'vue'

ChartJS.register(ArcElement, Tooltip, Legend)

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
      position: 'right',
      labels: {
        color: '#4B5563', // gray-600
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed !== null) {
            label += context.parsed;
          }
          return label;
        }
      }
    }
  },
});
</script>

<style scoped>
/* Add any specific styles for the chart here */
</style>
