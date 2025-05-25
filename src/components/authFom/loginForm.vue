<template>
  <div class="flex min-h-screen">
    <!-- Left Side - Brand Section -->
    <div
      class="relative hidden lg:flex lg:w-2/5 bg-gradient-to-br from-amber-50 to-orange-100"
    >
      <div class="flex flex-col justify-between w-full p-12">
        <!-- Illustration and Content -->
        <div class="flex flex-col justify-center flex-1 space-y-8">
          <!-- Illustration -->
          <div class="flex justify-center">
            <div class="relative">
              <!-- Main illustration container -->
              <div class="relative w-80 h-80">
                <!-- Background elements -->
                <div
                  class="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 opacity-20"
                ></div>

                <!-- Job search elements -->
                <div
                  class="absolute flex items-center justify-center w-16 h-16 transform bg-white rounded-md shadow-lg top-8 left-8 rotate-12"
                >
                  <Search class="w-8 h-8 text-purple-600" />
                </div>

                <div
                  class="absolute flex items-center justify-center w-20 transform bg-white rounded-md shadow-lg top-16 right-12 h-14 -rotate-6"
                >
                  <Users class="w-8 h-8 text-blue-600" />
                </div>

                <div
                  class="absolute flex items-center justify-center transform bg-white rounded-md shadow-lg bottom-20 left-12 w-18 h-18 rotate-6"
                >
                  <Target class="w-8 h-8 text-green-600" />
                </div>

                <div
                  class="absolute flex items-center justify-center w-16 h-16 transform bg-white rounded-md shadow-lg bottom-8 right-8 -rotate-12"
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
              Find your dream job and boost your professional career
            </h1>
            <p class="text-lg leading-relaxed text-gray-600">
              We connect talent with the best opportunities, providing a modern
              and personalized job search experience for candidates and.
            </p>
          </div>
        </div>

        <!-- Footer Links -->
        <div class="flex space-x-6 text-sm">
          <a
            href="#"
            class="text-gray-600 transition-colors hover:text-gray-900"
            >Privacy Policy</a
          >
          <span class="text-gray-400">•</span>
          <a
            href="#"
            class="text-gray-600 transition-colors hover:text-gray-900"
            >Terms of Use</a
          >
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex items-center justify-center flex-1 p-8 bg-white">
      <div class="w-full max-w-md space-y-8">
        <!-- Header -->
        <div class="space-y-2 text-center">
          <h2 class="text-3xl font-bold text-gray-900">Hello !</h2>
          <p class="text-gray-600">Log in to continue</p>
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
              Password <span class="text-red-500">*</span>
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
                class="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
              >
                <EyeOff v-if="showPassword" class="w-5 h-5" />
                <Eye v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="text-right">

            <router-link :to="{name:'password_forgot'}" class="text-sm font-medium hover:text-[#e4097f]">
                            Forgot your password ?
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
              <span class="ml-3 text-sm text-gray-700"> Remember me </span>
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
            <span class="text-gray-600">don't have an account ? </span>
             <router-link :to="{name:'register'}"  class="p-1 font-medium text-[#e4097f] hover:bg-[#e4097f] hover:text-white">
                            Sing Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Briefcase,
  Eye,
  EyeOff,
  Globe,
  ChevronDown,
  Search,
  Users,
  Target,
  TrendingUp,
} from "lucide-vue-next";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);

const emit = defineEmits(["navigate"]);

const handleSubmit = async () => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    console.log("Login attempt:", {
      email: email.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });
  }, 2000);
};
</script>