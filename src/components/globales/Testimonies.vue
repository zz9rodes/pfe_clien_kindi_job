<template>
  <div class="container px-4 mx-auto mt-16 mb-16">
    <div class="p-8 text-gray-600 rounded-3xl lg:p-12">
      <h2 class="mb-12 text-3xl font-bold text-center text-">Ce que disent nos clients à propos de KindiJob</h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index" 
          class="relative transition duration-300 ease-in-out bg-gray-800 border border-gray-700 delay-2300 rounded-2xl hover:rotate-3 duration-3000 hover:-translate-y-1 hover:scale-110 "
        >
          <div class="absolute p-6 top-4 left-4">
            <svg class="w-8 h-8 text-[#e4097f] opacity-50" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>
          
          <div class="p-6 mt-8 mb-6">
            <p class="text-sm italic leading-relaxed text-gray-300">
              "{{ testimonial.quote }}"
            </p>
          </div>
          
          <div class="flex items-center p-2 cursor-pointer bg-black/95 rounded-2xl">
            <div class="w-12 h-12 mr-4 overflow-hidden rounded-full border-2 border-[#00a3e0]">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name" 
                class="object-cover w-full h-full" 
              />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-white">{{ testimonial.name }}</h3>
              <p class="text-[#00a3e0] text-xs">{{ testimonial.role }}</p>            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


   const   testimonials=ref( [
        {
          name: 'Sarah Johnson',
          role: 'PDG',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          quote: 'KindiJob a rendu la recherche du centre d\'emploi idéal pour mon enfant si facile. L\'application est intuitive et les informations fournies sont complètes. J\'ai trouvé un excellent emploi en quelques jours !',
        },
        {
          name: 'Michael Chen',
          role: 'Ingénieur logiciel',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          quote: 'La gestion de la liste d\'attente est une révolution. Je suis immédiatement notifié lorsque des places se libèrent dans mes centres préférés. Plus besoin d\'appeler partout !',
        },
        {
          name: 'Emma Rodriguez',
          role: 'Freelance',
          avatar: 'https://i.pinimg.com/736x/3b/37/69/3b3769f1be8b2a41f7f02eabdbba4916.jpg',
          quote: 'En tant que parent isolé, le simulateur d\'aides m\'a permis de comprendre exactement ce que je pouvais me permettre. Les visites virtuelles m\'ont fait gagner un temps précieux. Je recommande vivement !',
        }
      ])
   
</script>

<style scoped>
/* Additional custom styles if needed */
.testimonial-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
</style>
