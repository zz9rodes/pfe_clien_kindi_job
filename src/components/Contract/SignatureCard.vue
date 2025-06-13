<template>
  <div class="signature-card">
    <div class="card-content" :style="{ fontFamily: font }">
      <h3 class="signature-title">Signature</h3>
      <div class="signature-text">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
// Props definition
const props = defineProps({
  // Le texte à afficher dans la carte
  text: {
    type: String,
    default: 'John Doe'
  },
  // La police à utiliser pour le texte
  font: {
    type: String,
    default: 'Arial, sans-serif'
  }
});
</script>

<style scoped>
.signature-card {
  @apply bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm border border-gray-100 transition-all hover:shadow-lg;
}

.card-content {
  @apply p-6;
}

.signature-title {
  @apply text-sm text-gray-500 uppercase tracking-wider mb-2;
}

.signature-text {
  @apply text-2xl text-gray-800;
}
</style>