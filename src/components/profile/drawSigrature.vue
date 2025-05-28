<template>
  <div class="max-w-4xl mx-auto">
    <div class="p-8 bg-white border rounded-lg">
      <div class="mb-8 text-center">
        <PenToolIcon class="w-12 h-12 text-[#db147f] mx-auto mb-4" />
        <h2 class="mb-2 text-2xl font-semibold text-gray-900">
          Digital Signature
        </h2>
        <p class="text-gray-600">
          Please provide your name and signature below
        </p>
      </div>

      <form @submit.prevent="saveSignature" class="space-y-6">
        <!-- Name Input -->
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-700"
            >Full Name *</label
          >
          <input
            type="text"
            v-model="signatureForm.name"
            class="w-full outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] focus:border-transparent"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <div class="flex items-center justify-between header-section">
            <label class="block mb-4 text-sm font-medium text-gray-700"
              >Type Your Signature *</label
            >

            <div>
              <select
                v-model="signatureForm.font"
                class="w-full px-4 outline-none py-1 mb-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#db147f] focus:border-transparent"
              >
                <option value="cursive">Cursive</option>
                <option value="'Brush Script MT', cursive">Brush Script</option>
                <option value="'Lucida Handwriting', cursive">
                  Lucida Handwriting
                </option>
                <option value="'Dancing Script', cursive">
                  Dancing Script
                </option>
                <option value="'Great Vibes', cursive">Great Vibes</option>
                <option value="'Allura', cursive">Allura</option>
                <option value="'Pacifico', cursive">Pacifico</option>
              </select>
            </div>
          </div>

          <div
            class="p-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50"
          >
            <div
              class="bg-white rounded-lg border-2 border-gray-200 p-1 min-h-[80px] flex items-center justify-center"
            >
              <input
                type="text"
                v-model="signatureForm.typedSignature"
                :style="{ fontFamily: signatureForm.font }"
                class="w-full text-4xl text-center bg-transparent border-none outline-none"
                placeholder="Type your signature here"
                required
              />
            </div>

            <p class="mt-4 text-xs text-center text-gray-500">
              carries the same legal weight as a handwritten signature
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end pt-6 space-x-4">
          <button
            class="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <X class="w-5 h-5 sm:hidden" /> 
            <span class="hidden sm:block"> Cancel </span>
          </button>
          <button
            class="bg-[#db147f] text-white px-6 py-2 rounded-lg hover:bg-[#c01370] transition-colors"
          >
            <Save class="w-5 h-5 sm:hidden" />
            <span class="hidden sm:block"> Save Changes </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { X, Save } from "lucide-vue-next";

const selectedFont = ref("cursive");

const signatureForm = ref({
  name: "",
  font: "cursive",
  typedSignature: "",
});

const saveSignature = () => {
  console.log("Saving signature:", {
    name: signatureForm.value.name,
    signature: signatureForm.typedSignature,
    font: selectedFont.value,
    agreed: signatureForm.value.agreed,
  });
  // Logique de sauvegarde ici
};
</script>

<style scoped>
/* Styles personnalisés pour les transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>