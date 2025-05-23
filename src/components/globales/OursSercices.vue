<template>
  <div class="container px-4 mx-auto mt-16">

            <h2 class="mb-6 text-2xl font-bold">Ours Ressources</h2>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div 
        v-for="(service, index) in services" 
        :key="index"
        class="p-6 text-center bg-white border border-gray-100 rounded-xl transition-all duration-300 hover:translate-y-[-5px] custom-shadow hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
      >
        <div :class="`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`">
          <svg :class="`h-8 w-8 ${service.iconColor}`" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.iconPath" />
          </svg>
        </div>
        <h3 class="mb-2 text-lg font-semibold">{{ service.title }}</h3>
        <p class="text-sm text-gray-600">{{ service.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

const services= [
        {
          title: 'Find Childcare',
          description: 'Search for childcare centers near you with detailed information.',
          bgColor: 'bg-[#e4097f]/10',
          iconColor: 'text-[#e4097f]',
          iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
        },
        {
          title: 'Calculate Subsidy',
          description: 'Estimate your childcare subsidy with our easy-to-use calculator.',
          bgColor: 'bg-[#00a3e0]/10',
          iconColor: 'text-[#00a3e0]',
          iconPath: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
        },
        {
          title: 'Waitlist Updates',
          description: 'Get notified when spots become available at your preferred centers.',
          bgColor: 'bg-[#e4097f]/10',
          iconColor: 'text-[#e4097f]',
          iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        },
        {
          title: 'Book Tours',
          description: 'Schedule visits to childcare centers directly through the app.',
          bgColor: 'bg-[#00a3e0]/10',
          iconColor: 'text-[#00a3e0]',
          iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
        }
      ]

</script>

<style scoped>
.custom-shadow {
  --tw-shadow: 0 2px 9px rgba(0, 0, 0, 0.08);
  --tw-shadow-colored: 0 2px 9px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
