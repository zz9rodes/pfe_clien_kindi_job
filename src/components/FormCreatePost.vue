<template>
  <div class="max-w-4xl overflow-hidden bg-[#1a1a1a] text-white rounded-lg shadow-xl">
    <div class="flex">
      <div class="flex flex-col w-96">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-700">
          <span class="text-sm font-semibold">Create New Post</span>
          <button @click="handleCloseModal()" class="text-gray-400 hover:text-white">
            <XIcon class="w-5 h-5" />
          </button>
        </div>


        <!-- New comment input -->
        <div class="p-4 border-t border-gray-700">
          <div class="flex flex-col gap-3">
            <textarea :v-model="formData.description" rows="3" placeholder="Ajouter un commentaire..."
              class="w-full text-sm text-white bg-[#2a2a2a] border border-gray-600 rounded p-2 resize-none outline-none focus:ring-2 focus:ring-blue-500"
              @keyup.enter="addComment">
            </textarea>

            <!-- Image upload -->
            <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-white">
              📷 Ajouter une image
              <input type="file" accept="image/*"  class="hidden" @change="handleImageUpload" />
            </label>

            <!-- Image preview -->
            <div v-if="previewImage" class="mt-2">
              <img :src="previewImage" class="border-gray-600 rounded max-h-32" />
            </div>

            <!-- Send button -->
            <button @click="savePoste"
              :class="!formData.description.trim() ? 'disabled bg-red-200   cursor-not-allowed' : 'bg-[#e4097f] cursor-pointer'"
              class="self-end px-3 py-2 text-sm font-semibold text-white rounded">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,defineEmits } from "vue";
import { MoreHorizontalIcon, XIcon } from "lucide-vue-next";

 const emit=defineEmits()

const props = defineProps({
  postId: {
    type: [String, Number],
    required: true,
  },
});

const previewImage = ref(null);

const formData=ref({
  description:"",
  files:[]
})


const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewImage.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleCloseModal=()=>{
  console.log("ici");
  
  emit('close')
}

</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #1f2937;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

button {
  transition: all 0.2s ease;
}
</style>
