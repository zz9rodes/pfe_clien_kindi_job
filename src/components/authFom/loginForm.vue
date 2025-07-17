<template>
      <AppModal  :isOpen="isModalOpen" :isLoader="true">
  </AppModal>
  <div class="flex min-h-screen">
    <!-- Left Side - Brand Section -->
    <div
      class="hidden relative bg-gradient-to-br from-amber-50 to-orange-100 lg:flex lg:w-2/5"
    >
      <div class="flex flex-col justify-between p-12 w-full">
        <!-- Illustration and Content -->
        <div class="flex flex-col flex-1 justify-center space-y-8">
          <!-- Illustration -->
          <div class="flex justify-center">
            <div class="relative">
              <!-- Main illustration container -->
              <div class="relative w-80 h-80">
                <!-- Background elements -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-20"
                ></div>

                <!-- Job search elements -->
                <div
                  class="flex absolute top-8 left-8 justify-center items-center w-16 h-16 bg-white rounded-md shadow-lg transform rotate-12"
                >
                  <Search class="w-8 h-8 text-purple-600" />
                </div>

                <div
                  class="flex absolute right-12 top-16 justify-center items-center w-20 h-14 bg-white rounded-md shadow-lg transform -rotate-6"
                >
                  <Users class="w-8 h-8 text-blue-600" />
                </div>

                <div
                  class="flex absolute left-12 bottom-20 justify-center items-center bg-white rounded-md shadow-lg transform rotate-6 w-18 h-18"
                >
                  <Target class="w-8 h-8 text-green-600" />
                </div>

                <div
                  class="flex absolute right-8 bottom-8 justify-center items-center w-16 h-16 bg-white rounded-md shadow-lg transform -rotate-12"
                >
                  <TrendingUp class="w-8 h-8 text-orange-600" />
                </div>

                <!-- Central element -->
                <div
                  class="absolute flex items-center justify-center w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 rounded-full shadow-xl bg-[#e4097f] top-1/2 left-1/2"
                >
                  <Briefcase class="w-12 h-12 text-white" />
                </div>

                <!-- Connecting lines -->
                <svg
                  class="absolute inset-0 w-full h-full"
                  viewBox="0 0 320 320"
                >
                  <path
                    d="M80 80 L160 160 M240 80 L160 160 M80 240 L160 160 M240 240 L160 160"
                    stroke="#e5e7eb"
                    stroke-width="2"
                    stroke-dasharray="5,5"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          <!-- Text Content -->
          <div class="space-y-4">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">
              Trouvez votre emploi de rêve et développez votre carrière professionnelle
            </h1>
            <p class="text-lg leading-relaxed text-gray-600">
              Nous connectons les talents aux meilleures opportunités, offrant une expérience de recherche d'emploi moderne et personnalisée pour les candidats et.
            </p>
          </div>
        </div>

        <!-- Footer Links -->
        <div class="flex space-x-6 text-sm">
          <a
            href="#"
            class="text-gray-600 transition-colors hover:text-gray-900"
            >Politique de confidentialité</a
          >
          <span class="text-gray-400">•</span>
          <a
            href="#"
            class="text-gray-600 transition-colors hover:text-gray-900"
            >Conditions d'utilisation</a
          >
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex flex-1 justify-center items-center p-8 bg-white">
      <div class="space-y-8 w-full max-w-md">
        <!-- Header -->
        <div class="space-y-2 text-center">
          <h2 class="text-3xl font-bold text-gray-900">Bonjour !</h2>
          <p class="text-gray-600">Connectez-vous pour continuer</p>
        </div>

        <!-- Form -->
        <div class="space-y-6">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="example-mail@demo.com"
              class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e4097f] outline-none"
              required
            />
          </div>

          <div class="space-y-2">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Mot de passe <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••••••"
                class="w-full px-4 py-2 pr-12 transition-colors border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e4097f] outline-none"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 text-gray-400 transform -translate-y-1/2 hover:text-gray-600"
              >
                <EyeOff v-if="showPassword" class="w-5 h-5" />
                <Eye v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="text-right">

            <router-link :to="{name:'password_forgot'}" class="text-sm font-medium hover:text-[#e4097f]">
                            Mot de passe oublié ?
            </router-link>
          </div>

          <div class="flex items-center group">
            <input
              type="checkbox"
              id="remember"
              v-model="rememberMe"
              class="sr-only"
            />
            <label for="remember" class="flex items-center cursor-pointer">
              <div
                class="w-4 h-4 border border-gray-300 rounded-md flex items-center justify-center transition-all group-hover:border-[#e4097f]"
                :class="{ 'bg-[#e4097f] border-[#e4097f]': rememberMe }"
              >
                <svg
                  v-if="rememberMe"
                  class="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span class="ml-3 text-sm text-gray-700"> Se souvenir de moi </span>
            </label>
          </div>

          <button
            @click="handleSubmit"
            :disabled="isLoading"
            class="w-full px-4 py-2 font-semibold text-white transition-colors rounded-md bg-[#e4097f] hover:bg-[#e4097f] focus:ring-2 focus:ring-[#e4097f] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? "Connexion..." : "Se connecter" }}
          </button>

          <div class="text-sm text-start">
            <span class="text-gray-600">Vous n'avez pas de compte ? </span>
             <router-link :to="{name:'home'}"  class="p-1 font-medium text-[#e4097f] hover:bg-[#e4097f] hover:text-white">
                            Accueil
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore()

import {
  Briefcase,
  Eye,
  EyeOff,
  Search,
  Users,
  Target,
  TrendingUp,
} from "lucide-vue-next";

const router=useRouter()

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);


const emit = defineEmits(["navigate"]);

const isModalOpen = ref(false);

  const toggleOpenModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

const handleSubmit = async () => {
  toggleOpenModal()


  const payloadData={
      email:email.value,
      password:password.value
  }

  const data = await auth.login(payloadData)
  
  toggleOpenModal()
  
  if (data?.success) {
    // Vérifie si l'utilisateur est admin
    const user = data.data?.user || auth.user;
    if (user && user.isAdmin) {
      router.push({ name: 'admin_profile' }); // Redirige vers la page admin
    } else {
      router.push({ name: 'profile' }); // Redirige vers la page utilisateur classique
    }
  }

}
</script>