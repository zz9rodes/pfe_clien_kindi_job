<template>
  <div class="w-full min-h-screen">
    <AppModal @closeModal="toggleOpenModal('close')" :isOpen="isModalOpen" :isLoader="false">
      <PostDetails v-if="isCommentList" :postId="2" @close="toggleOpenModal('close')" />
      <FormCreatePost  @close="toggleOpenModal('close')" v-if="isFormPost"/>
    </AppModal>
    <main class="max-w-xl pb-16 mx-auto">
      <div class="pt-8 space-y-4">
        <div @click="toggleOpenModal('form')" class="p-2 text-white bg-[#e4097f] text-center border btn-add-post cursor-pointer">
            <button>
                Nouvelle publication
            </button>
        </div>
        <article
          v-for="post in posts"
          :key="post.id"
          class="bg-white border border-gray-200"
        >
          <div class="flex items-center justify-between p-3">
            <div class="flex items-center gap-3">
              <img
                :src="post.user.avatar"
                :alt="post.user.username"
                class="object-cover w-8 h-8 rounded-full"
              />
              <div>
                <div class="flex items-center gap-1">
                  <p class="text-sm font-semibold">{{ post.user.username }}</p>
                  <span v-if="post.user.verified" class="text-blue-500">
                    <CheckCircleIcon class="w-3 h-3 fill-current" />
                  </span>
                </div>
                <p v-if="post.location" class="text-xs">{{ post.location }}</p>
              </div>
            </div>
            <button class="text-gray-800">
              <MoreHorizontalIcon class="w-5 h-5" />
            </button>
          </div>

          <div class="relative">
            <img
              v-if="post.mediaType === 'image'"
              :src="post.media"
              :alt="post.description"
              class="object-cover w-full"
              :style="{ maxHeight: '600px' }"
            />

            <div
              v-if="post.mediaType === 'video'"
              class="flex items-center justify-center w-full bg-black"
              style="aspect-ratio: 1/1"
            >
              <div class="relative w-full h-full">
                <img
                  :src="post.thumbnail"
                  :alt="post.description"
                  class="object-contain w-full h-full"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                  <button
                    class="flex items-center justify-center w-12 h-12 rounded-full bg-black/50"
                  >
                    <PlayIcon class="w-6 h-6 text-white" />
                  </button>
                </div>
                <div
                  class="absolute p-1 rounded-full bottom-2 right-2 bg-black/50"
                >
                  <VolumeXIcon class="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <!-- Post Actions -->
          <div class="p-3">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-4">
                <button
                  @click="toggleLike(post.id)"
                  :class="post.liked ? 'text-red-500' : 'text-gray-800'"
                >
                  <HeartIcon
                    :class="['w-6 h-6', post.liked ? 'fill-current' : '']"
                  />
                </button>
                <button class="text-gray-800 "  @click="toggleOpenModal('comment')">
                  <MessageCircleIcon class="w-6 h-6" />
                </button>
              </div>
              <button
                @click="toggleSave(post.id)"
                :class="post.saved ? 'text-black' : 'text-gray-800'"
              >
                <BookmarkIcon
                  :class="['w-6 h-6', post.saved ? 'fill-current' : '']"
                />
              </button>
            </div>

            <!-- Likes -->
            <p class="text-sm font-semibold">
              {{ post.likes.toLocaleString() }} J'aime
            </p>

            <!-- description -->
            <div class="mt-1 text-sm">
              <span class="font-semibold">{{ post.user.username }}</span>
              <span> {{ post.description }}</span>
              <span
                v-if="post.description.length > 100"
                class="text-gray-500 cursor-pointer"
              >
                ... plus</span
              >
            </div>

            <!-- Comments -->
            <button
                 @click="toggleOpenModal('comment')"
              v-if="post.commentCount > 0"
              class="mt-1 text-sm text-gray-500"
            >
              Voir les {{ post.commentCount }} commentaires
            </button>

            <!-- Top Comments -->
            <div
              v-if="post.topComments && post.topComments.length"
              class="mt-1"
            >
              <div
                v-for="comment in post.topComments"
                :key="comment.id"
                class="text-sm"
              >
                <span class="font-semibold">{{ comment.username }}</span>
                <span> {{ comment.text }}</span>
              </div>
            </div>

            <!-- Timestamp -->
            <p class="mt-1 text-xs text-gray-500">{{ post.timestamp }}</p>
          </div>

          <!-- Add Comment -->
          <div class="flex items-center px-3 py-2 border-t border-gray-200">
            <button class="mr-3 text-gray-800">
              <SmileIcon class="w-6 h-6" />
            </button>
            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              class="flex-1 text-sm border-none outline-none focus:ring-0"
            />
            <button @click="toggleOpenModal('comment')" class="text-sm font-semibold text-blue-500 opacity-150">
              Afficher
            </button>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  HeartIcon,
  BookmarkIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  SmileIcon,
  PlayIcon,
  CheckCircleIcon,
  XIcon,
  VolumeXIcon,
} from "lucide-vue-next";
import AppModal from "@/components/globales/AppModal.vue";
import PostDetails from "@/components/PostDetails.vue";
import FormCreatePost from "@/components/FormCreatePost.vue";



const isModalOpen = ref(false);
const isCommentList = ref(false);
const isFormPost = ref(false);


const toggleOpenModal = (reason='comment') => {
    isModalOpen.value = !isModalOpen.value;

    console.log(reason);
    
    if(reason=='form'){
        isCommentList.value=false
        isFormPost.value=true
    }
    
    if(reason=='comment')
    {
        isFormPost.value=false
        isCommentList.value=true
    }

     
    if(reason=='close')
    {
        isFormPost.value=false
        isCommentList.value=false
    }
};



// Reactive state
const showSuggestions = ref(true);

const posts = ref([
  {
    id: 1,
    user: {
      username: "tech_company",
      avatar:
        "https://i.pinimg.com/736x/c4/c8/6d/c4c86dc78eddf19f03f196f5586b47a5.jpg",
      verified: true,
    },
    mediaType: "image",
    media:
      "https://i.pinimg.com/736x/20/a9/3b/20a93bcbe375c925079013c4648b57c5.jpg",
    description:
      "Nous recherchons des développeurs Vue.js passionnés pour rejoindre notre équipe ! #recrutement #vuejs #jobs",
    likes: 1245,
    commentCount: 32,
    timestamp: "il y a 2 heures",
    liked: false,
    saved: false,
    location: "Paris, France",
    topComments: [
      { id: 1, username: "dev_sarah", text: "Super opportunité ! 🚀" },
      {
        id: 2,
        username: "js_master",
        text: "Je suis intéressé, comment postuler ?",
      },
    ],
  },
  {
    id: 2,
    user: {
      username: "aivisionary.hub",
      avatar:
        "https://i.pinimg.com/736x/aa/2e/0b/aa2e0b37d0c2edd08b68565c7acf70f0.jpg",
      verified: false,
    },
    mediaType: "video",
    media: "blob:https://de.pinterest.com/7d52a240-d79c-4df1-bee2-70292d8aba8e",
    thumbnail:
      "https://cdn.dribbble.com/userupload/27836491/file/original-622e234cc240b24f9c3f1f787d72a3b3.jpg?resize=1024x683&vertical=center",
    description:
      "Can you believe these stunning visuals were created with AI? Our new tool allows developers to generate custom UI components in seconds!",
    likes: 5396,
    commentCount: 18,
    timestamp: "il y a 1 sem",
    liked: true,
    saved: true,
    topComments: [
      { id: 1, username: "ui_designer", text: "C'est incroyable ! 😍" },
    ],
  },
  {
    id: 3,
    user: {
      username: "nbaticks.et.nba",
      avatar:
        "https://i.pinimg.com/736x/6d/d9/c7/6dd9c7a0e64aaef1f3521a0e2067ca6f.jpg",
      verified: true,
    },
    mediaType: "image",
    media:
      "https://i.pinimg.com/736x/c4/c8/6d/c4c86dc78eddf19f03f196f5586b47a5.jpg",
    description:
      "Les dernières actualités du monde tech et des opportunités d'emploi #tech #emploi",
    likes: 876,
    commentCount: 5,
    timestamp: "il y a 5 h",
    liked: false,
    saved: false,
    topComments: [],
  },
]);

// Methods
const toggleLike = (postId) => {
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }
};

const toggleSave = (postId) => {
  const post = posts.value.find((p) => p.id === postId);
  if (post) {
    post.saved = !post.saved;
  }
};
</script>

<style scoped>
/* Custom scrollbar for stories */
.overflow-x-auto {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  overflow-x: scroll;
  white-space: nowrap;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Smooth transitions */
button {
  transition: all 0.2s ease;
}
</style>
