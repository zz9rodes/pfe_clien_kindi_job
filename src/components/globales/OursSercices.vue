<template>
  <div class="container px-4 mx-auto mt-16">
    <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Nos Services</h2>

    <div class="grid overflow-hidden text-gray-600 border border-gray-100 divide-x divide-y divide-gray-100 dark:divide-gray-700 rounded-3xl dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
      <div 
        v-for="(service, index) in services" 
        :key="index"
        class="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10"
        :class="index === services.length - 1 ? 'bg-gray-50 dark:bg-gray-900' : ''"
      >
        <div 
          class="relative p-8 py-12 space-y-8 transition duration-300"
          :class="index === services.length - 1 ? 'group-hover:bg-white dark:group-hover:bg-gray-800' : ''"
        >
          <!-- Icon/Image -->
          <div class="w-12 h-12">
            <img 
              :src="service.image" 
              :alt="service.title + ' illustration'"
              class="object-contain w-12 h-12"
            />
          </div>

          <!-- Content -->
          <div class="space-y-2">
            <h5 class="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-[#e4097f]">
              {{ service.title }}
            </h5>
            <p class="text-gray-600 dark:text-gray-300">
              {{ service.description }}
            </p>
          </div>

          <!-- Read More Link with Animated Arrow -->
          <div
            class="flex cursor-pointer items-center justify-between group-hover:text-[#e4097f] transition-colors duration-300"
            @click.prevent="handleReadMore(service)"
          >
            <span class="text-sm font-medium">commencer</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              class="w-5 h-5 text-2xl transition duration-300 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            >
              <path 
                fill-rule="evenodd" 
                d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" 
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  {
    title: 'Trouvez votre emploi',
    description: 'Découvrez des opportunités d\'emploi près de chez vous avec des offres détaillées et un accès rapide aux candidatures.',
    image: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png'
  },
  {
    title: 'Signature électronique de contrat',
    description: 'Signez vos contrats en ligne de manière sécurisée et instantanée, avec une pleine validité légale.',
    image: 'https://cdn-icons-png.flaticon.com/512/4341/4341134.png'
  },
  {
    title: 'Gestion de projets et de tâches',
    description: 'Planifiez, assignez et suivez tous vos projets et tâches sur un tableau de bord collaboratif unique.',
    image: 'https://cdn-icons-png.flaticon.com/512/4341/4341160.png'
  },
  {
    title: 'Système de recrutement (RH)',
    description: 'Gérez le recrutement, le suivi des candidats et l\'intégration facilement dans une solution intégrée.',
    image: 'https://cdn-icons-png.flaticon.com/512/4341/4341025.png'
  }
]

const handleReadMore = (service) => {
  console.log('Read more clicked for:', service.title)
  // Add your navigation logic here
}
</script>

<style scoped>
/* Custom styles for better dark mode support */
.group:hover .group-hover\:text-secondary {
  color: #e4097f;
}

/* Ensure smooth transitions for all elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom shadow for hover effect */
.hover\:shadow-2xl:hover {
  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

/* Dark mode shadow */
.dark .hover\:shadow-gray-600\/10:hover {
  --tw-shadow-color: rgb(75 85 99 / 0.1);
  --tw-shadow: var(--tw-shadow-colored);
}
</style>
