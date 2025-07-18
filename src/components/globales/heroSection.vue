<template>
  <div class="relative py-16 overflow-hidden">
    <!-- Background Gradient Effects -->
    <div 
      aria-hidden="true" 
      class="absolute inset-0 grid w-full grid-cols-2 m-auto h-max -space-x-52 opacity-40 dark:opacity-20"
    >
      <div class="blur-[106px] h-56 bg-gradient-to-br from-[#e4097f] to-purple-400 dark:from-blue-700"></div>
      <div class="blur-[106px] h-32 bg-gradient-to-r from-[#00a3e0] to-sky-300 dark:to-indigo-600"></div>
    </div>

    <div class="px-6 mx-auto max-w-7xl md:px-12">
      <div class="relative">
        <!-- Avatar Stack -->
        <div class="flex items-center justify-center mb-8 -space-x-2">
          <img 
            v-for="(avatar, index) in avatars" 
            :key="index"
            loading="lazy" 
            :width="avatar.width" 
            :height="avatar.height" 
            :src="avatar.src" 
            :alt="avatar.alt"
            :class="[
              'rounded-full object-cover transition-transform duration-300 hover:scale-110',
              avatar.size,
              avatar.zIndex
            ]"
          />
        </div>

        <!-- Main Content -->
        <div class="m-auto mt-6 space-y-6 md:w-8/12 lg:w-7/12">
          <!-- Main Title -->
          <h1 class="text-4xl font-bold text-center text-gray-800 dark:text-white md:text-5xl lg:text-6xl">
            {{ heroData.title }}
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl leading-relaxed text-center text-gray-600 dark:text-gray-300">
            {{ heroData.subtitle }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap justify-center gap-6 pt-4">
            <!-- Primary Button -->
            <button
              @click="handlePrimaryAction"
              class="group relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-[#e4097f] before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max transform transition-transform duration-200 hover:scale-105"
            >
              <span class="relative flex items-center gap-2 text-base font-semibold text-white">
                {{ heroData.primaryButton.text }}
                <svg 
                  class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <!-- Secondary Button -->
            <button
              @click="handleSecondaryAction"
              class="group relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-[#e4097f]/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max transform transition-transform duration-200 hover:scale-105"
            >
              <span class="relative text-base font-semibold text-[#e4097f] dark:text-white flex items-center gap-2">
                {{ heroData.secondaryButton.text }}
                <svg 
                  class="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>

          <!-- Stats Section (Optional) -->
          <div class="flex flex-wrap justify-center gap-8 pt-8 text-center">
            <div 
              v-for="(stat, index) in stats" 
              :key="index"
              class="cursor-pointer group"
            >
              <div class="text-2xl font-bold text-[#e4097f] dark:text-[#00a3e0] transition-colors duration-300 group-hover:text-[#00a3e0] dark:group-hover:text-[#e4097f]">
                {{ stat.number }}
              </div>
              <div class="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router=useRouter()
// Hero content data
const heroData = ref({
  title: "Trouvez l'emploi de vos rêves dès aujourd'hui",
  subtitle: "Rejoignez des millions de professionnels dans le monde qui utilisent KINDIJOB pour découvrir des opportunités de carrière exceptionnelles et se connecter avec les meilleures entreprises.",
  primaryButton: {
    text: "Commencer",
    action: "login"
  },
  secondaryButton: {
    text: "Voir les offres",
    action: "about"
  }
})

// Avatar data
const avatars = ref([
  {
    src: "https://i.pinimg.com/736x/b0/19/d6/b019d6fbcbfdd3fdfd26743e64b55b66.jpg",
    alt: "User avatar 1",
    width: "200",
    height: "200",
    size: "h-8 w-8",
    zIndex: ""
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    alt: "User avatar 2",
    width: "200",
    height: "200",
    size: "h-12 w-12",
    zIndex: ""
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    alt: "User avatar 3",
    width: "200",
    height: "200",
    size: "h-16 w-16",
    zIndex: "z-10"
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    alt: "User avatar 4",
    width: "200",
    height: "200",
    size: "h-12 w-12",
    zIndex: "relative"
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    alt: "User avatar 5",
    width: "200",
    height: "200",
    size: "h-8 w-8",
    zIndex: ""
  }
])

// Stats data
const stats = ref([
  { number: "50K+", label: "Utilisateurs actifs" },
  { number: "1K+", label: "Entreprises" },
  { number: "10K+", label: "Offres publiées" },
  { number: "95%", label: "Taux de réussite" }
])

// Event handlers
const handlePrimaryAction = () => {
  console.log('Primary action clicked: Get Started')
   router.push({name:'login'})
}

const handleSecondaryAction = () => {
  console.log('Secondary action clicked: Learn More')
  // Add your navigation logic here
   router.push({name:'jobs'})
}

// Emit events for parent component
const emit = defineEmits(['primary-action', 'secondary-action'])

const handlePrimaryActionEmit = () => {
  emit('primary-action')
}

const handleSecondaryActionEmit = () => {
  emit('secondary-action')
}
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #e4097f 0%, #00a3e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Custom button hover effects */
.btn-primary {
  background: linear-gradient(135deg, #e4097f 0%, #c8076f 100%);
  box-shadow: 0 4px 15px 0 rgba(228, 9, 127, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 8px 25px 0 rgba(228, 9, 127, 0.4);
  transform: translateY(-2px);
}

/* Blur background effects */
.blur-bg {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
