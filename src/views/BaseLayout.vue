<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue';
import AppHeaderSticky from '@/components/AppHeaderSticky.vue';
</script>

<template>
 <AppHeaderSticky/>
  <RouterView  />
  <AppFooter/> 
</template>
<style scoped></style>
