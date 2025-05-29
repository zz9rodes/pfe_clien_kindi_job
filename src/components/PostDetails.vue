<template>
  <div class="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
    <div class="flex">
      <div class="flex flex-col w-96">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <button class="text-gray-500 hover:text-gray-700">
              <MoreHorizontalIcon class="w-5 h-5" />
            </button>
          </div>
        </div>

              <div class="flex-1 overflow-y-auto max-h-96">
          <div 
            v-for="comment in comments" 
            :key="comment.id"
            class="p-4 border-b border-gray-100 hover:bg-gray-50"
          >
            <div class="flex items-start gap-3">
              <img 
                :src="comment.author.avatar" 
                :alt="comment.author.username" 
                class="object-cover w-8 h-8 rounded-full"
              />
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-semibold">{{ comment.author.username }}</span>
                  <span class="text-xs text-gray-500">{{ comment.timestamp }}</span>
                </div>
                <p class="mb-2 text-sm text-gray-800">{{ comment.text }}</p>
              </div>
            </div>
          </div>
        </div>

             <div class="p-4 border-t border-gray-200">
          <div class="flex items-center gap-3">
            <button class="text-gray-500">
              <SmileIcon class="w-6 h-6" />
            </button>
            <input 
              v-model="newComment"
              type="text" 
              placeholder="Ajouter un commentaire..." 
              class="flex-1 text-sm border-none outline-none focus:ring-0"
              @keyup.enter="addComment"
            />
            <button 
              v-if="newComment.trim()"
              @click="addComment"
              class="text-sm font-semibold text-blue-500 hover:text-blue-600"
            >
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  SmileIcon,
  MoreHorizontalIcon
} from 'lucide-vue-next'

const props = defineProps({
  postId: {
    type: [String, Number],
    required: true
  }
})

const comments = ref([])
const newComment = ref('')


const sampleComments = [
  {
    id: 1,
    author: {
      username: 'shafikulislam07',
      avatar: 'https://i.pinimg.com/736x/02/c6/7f/02c67fbd8225c6678b07b3def5e2772e.jpg'
    },
    text: 'You should make an app for mobile phones. I have created an account yesterday. It takes so time to approve the gigs. I hope I can earn money by selling my services',
    timestamp: '1 j',
    likes: 2,
    replies: 4,
    liked: false
  },
  {
    id: 2,
    author: {
      username: 'developer_jane',
      avatar: 'https://i.pinimg.com/736x/ef/b0/db/efb0db6aae20ad69407f5b486d0a9ce7.jpg'
    },
    text: 'Great platform! I\'ve been using it for 3 months and the quality of clients is amazing.',
    timestamp: '2 j',
    likes: 5,
    replies: 0,
    liked: true
  },
  {
    id: 3,
    author: {
      username: 'business_owner',
      avatar: 'https://i.pinimg.com/736x/94/82/b7/9482b738d6a85356f7536b752149489b.jpg'
    },
    text: 'The 5% commission is really competitive compared to other platforms. Highly recommend!',
    timestamp: '3 j',
    likes: 8,
    replies: 2,
    liked: false
  }
]

const fetchComments = async (postId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  comments.value = sampleComments
}

const addComment = () => {
  if (newComment.value.trim()) {
    const comment = {
      id: Date.now(),
      author: {
        username: 'current_user',
        avatar: '/placeholder.svg?height=32&width=32'
      },
      text: newComment.value,
      timestamp: 'maintenant',
      likes: 0,
      replies: 0,
      liked: false
    }
    comments.value.unshift(comment)
    newComment.value = ''
  }
}

// 
onMounted(() => {
  fetchComments(props.postId)
})
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth transitions */
button {
  transition: all 0.2s ease;
}
</style>