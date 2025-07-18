```vue
<template>
  <div class="flex min-h-screen">
    <!-- Left Side - Brand Section -->
    <div
      class="relative hidden lg:flex lg:w-2/5 bg-gradient-to-br from-amber-50 to-orange-100"
    >
      <div class="flex flex-col justify-between w-full p-12">
        <!-- Logo -->

        <!-- Illustration and Content -->
        <div class="flex flex-col justify-center flex-1 space-y-8">
          <!-- Illustration -->
          <div class="flex justify-center">
            <div class="relative">
              <div class="relative w-80 h-80">
                <!-- Background -->
                <div
                  class="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 to-blue-100 opacity-20"
                ></div>
                <!-- Security elements -->
                <div
                  class="absolute flex items-center justify-center w-16 h-16 transform bg-white rounded-md shadow-lg top-8 left-8 rotate-12"
                >
                  <Shield class="w-8 h-8 text-green-600" />
                </div>
                <div
                  class="absolute flex items-center justify-center w-20 transform bg-white rounded-md shadow-lg top-16 right-12 h-14 -rotate-6"
                >
                  <Key class="w-8 h-8 text-purple-600" />
                </div>
                <div
                  class="absolute flex items-center justify-center transform bg-white rounded-md shadow-lg bottom-20 left-12 w-18 h-18 rotate-6"
                >
                  <Mail class="w-8 h-8 text-blue-600" />
                </div>
                <div
                  class="absolute flex items-center justify-center w-16 h-16 transform bg-white rounded-md shadow-lg bottom-8 right-8 -rotate-12"
                >
                  <RefreshCw class="w-8 h-8 text-amber-600" />
                </div>
                <!-- Central element -->
                <div
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#e4097f] rounded-full flex items-center justify-center shadow-xl"
                >
                  <Lock class="w-12 h-12 text-white" />
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
              {{ emailSent ? "Vérifiez votre e-mail" : "Récupération de mot de passe sécurisée" }}
            </h1>
            <p class="text-lg leading-relaxed text-gray-600">
              {{
                emailSent
                  ? "Nous avons envoyé des instructions de récupération à votre adresse e-mail."
                  : "Ne vous inquiétez pas ! Nous vous aiderons à retrouver l'accès à votre compte en toute sécurité."
              }}
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

    <!-- Right Side - Form -->
    <div class="flex items-center justify-center flex-1 p-8 bg-white">
      <div class="w-full max-w-md space-y-8">
        <!-- Email Sent Success State -->
        <div v-if="emailSent" class="space-y-8">
          <div class="space-y-4 text-center">
            <div
              class="flex items-center justify-center w-20 h-20 mx-auto bg-green-100 rounded-full"
            >
              <CheckCircle class="w-10 h-10 text-green-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900">E-mail envoyé !</h2>
            <p class="text-gray-600">Instructions de récupération envoyées</p>
          </div>

          <div class="space-y-6">
            <div class="p-6 border border-blue-200 rounded-md bg-blue-50">
              <div class="flex items-start space-x-4">
                <Mail class="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-blue-900">
                    Vérifiez votre boîte de réception
                  </p>
                  <p class="mt-1 text-sm text-blue-700">
                    Un e-mail a été envoyé à
                    <strong>{{ formData.email }}</strong> avec des instructions pour
                    réinitialiser votre mot de passe.
                  </p>
                </div>
              </div>
            </div>

            <div class="p-4 border rounded-md bg-amber-50">
              <h4 class="mb-2 text-sm font-medium text-amber-900">
                Vous ne trouvez pas l'e-mail ?
              </h4>
              <ul class="space-y-2 text-sm text-amber-700">
                <li class="flex items-start">
                  <span
                    class="bg-amber-200 text-amber-200 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                    >1</span
                  >
                  Vérifiez votre dossier spam ou courrier indésirable
                </li>
                <li class="flex items-start">
                  <span
                    class="bg-amber-200 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                    >2</span
                  >
                  Assurez-vous que l'adresse e-mail est correcte
                </li>
                <li class="flex items-start">
                  <span
                    class="bg-amber-200 text-amber-800 rounded-full w-5 h-5 rounded-full items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                    >3</span
                  >
                  L'e-mail peut prendre quelques minutes pour arriver
                </li>
              </ul>
            </div>

            <div class="space-y-4">
              <button
                @click="handleResend"
                :disabled="isLoading"
                class="w-full px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isLoading ? "Traitement..." : "Renvoyer l'e-mail" }}
              </button>

              <button
                type="button"
                @click="$emit('navigate', 'login')"
                class="flex items-center justify-center w-full px-4 py-2 text-gray-600 transition-colors hover:text-gray-800"
              >
                <router-link>
                  <ArrowLeft class="w-4 h-4 mr-2" />
                  Retour à la connexion
                </router-link>
              </button>
            </div>
          </div>
        </div>

        <!-- Initial Form State -->
        <div v-else class="space-y-8">
          <div class="space-y-2 text-center">
            <h2 class="text-3xl font-bold text-gray-900">Mot de passe oublié ?</h2>
            <p class="text-gray-600">
              Entrez votre e-mail professionnel pour recevoir les instructions de récupération
            </p>
          </div>

          <div class="space-y-6">
            <div class="relative space-y-2">
              <label
                for="email"
                class="block text-sm font-medium text-gray-700"
              >
                E-mail professionnel <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="john.doe@company.com"
                class="w-full px-4 py-2 transition-colors border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#e4097f]"
                required
              />
              <span class="absolute left-0 text-sm text-red-600 top-[90%]" v-if="formErrors.email">{{
                formErrors.email[0]
              }}</span>
            </div>

            <button
              @click="handleSubmit"
              :disabled="isLoading || !formData.email"
              class="w-full px-6 py-2 font-semibold text-white transition-colors rounded-md bg-[#e4097f] hover:bg-[#d10871] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? "Traitement..." : "Envoyer les instructions" }}
            </button>

            <div class="text-center">
              <button
                type="button"
                @click="$emit('navigate', 'login')"
                class="flex items-center justify-center mx-auto text-sm text-gray-600 transition-colors hover:text-gray-800"
              >
                <router-link
                  :to="{ name: 'login' }"
                  class="flex items-center gap-1"
                >
                  <ArrowLeft class="w-4 h-4 mr-2" />
                  Retour à la connexion
                </router-link>
              </button>
            </div>

            <div class="p-6 rounded-md bg-gray-50">
              <h4 class="mb-3 text-sm font-medium text-gray-900">
                Comment ça marche
              </h4>
              <ol class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start">
                  <span
                    class="bg-pink-100 text-[#e4097f] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                    >1</span
                  >
                  Entrez votre adresse e-mail professionnelle
                </li>
                <li class="flex items-start">
                  <span
                    class="bg-pink-100 text-[#e4097f] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                    >2</span
                  >
                  Cliquez sur "Envoyer les instructions"
                </li>
                <li class="flex items-start">
                  <span
                    class="bg-pink-100 text-[#e4097f] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                    >3</span
                  >
                  Vérifiez votre boîte de réception
                </li>
                <li class="flex items-start">
                  <span
                    class="bg-pink-100 text-[#e4097f] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                    >4</span
                  >
                  Suivez le lien sécurisé dans l'e-mail
                </li>
                <li class="flex items-start">
                  <span
                    class="bg-pink-100 text-[#e4097f] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0"
                    >5</span
                  >
                  Créez votre nouveau mot de passe
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import {
  Briefcase,
  Mail,
  ArrowLeft,
  CheckCircle,
  Globe,
  ChevronDown,
  Shield,
  Key,
  Lock,
  RefreshCw,
} from "lucide-vue-next";
import { validateEmail } from "@/vineValidation/authForm";

// Reactive data
const formData = ref({
  email: "",
});
const isLoading = ref(false);
const emailSent = ref(false);
const formErrors = ref({
  email: [],
});

// Emits
const emit = defineEmits(["navigate"]);

// Methods
const handleSubmit = async () => {
  isLoading.value = true;
  formErrors.value.email = [];

  // Validate email
  const validationResult = await validateEmail({
    email: formData.value.email,
  });

  if (!validationResult.isValid) {
    formErrors.value.email = validationResult.errors.email || [];
    setTimeout(() => {
      formErrors.value.email = [];
    }, 2000);
    isLoading.value = false;
    return;
  }

  // Simulate API call
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    emailSent.value = true;
  } catch (error) {
    formErrors.value.email = ["Failed to send email. Please try again."];
    setTimeout(() => {
      formErrors.value.email = [];
    }, 2000);
  } finally {
    isLoading.value = false;
  }
};

const handleResend = async () => {
  isLoading.value = true;
  formErrors.value.email = [];

  // Simulate API call
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (error) {
    formErrors.value.email = ["Failed to resend email. Please try again."];
    setTimeout(() => {
      formErrors.value.email = [];
    }, 2000);
  } finally {
    isLoading.value = false;
  }
};
</script>
```