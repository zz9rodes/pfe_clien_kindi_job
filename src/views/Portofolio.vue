<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <header class="py-16 bg-white">
      <div class="max-w-4xl px-6 mx-auto text-center">
        <!-- Profile Image -->
        <div class="relative inline-block mb-6">
          <img :src="profile.avatar || '/placeholder.svg?height=120&width=120'" :alt="profile.name"
            class="object-cover mx-auto border-4 border-white rounded-full shadow-lg h-28 w-28" />
          <button
            class="absolute flex items-center justify-center w-6 h-6 text-gray-500 bg-gray-200 rounded-full top-2 right-2 hover:bg-gray-300">
            <!-- <XIcon class="w-3 h-3" /> -->
          </button>
        </div>

        <!-- Name and Title -->
        <h1 class="mb-2 text-4xl font-bold text-gray-900">{{ profile.name }}</h1>
        <h1 class="mb-2 text-xl font-bold text-gray-900">{{ profile.age }} Years Old</h1>
        <h1 class="flex justify-center gap-2 mb-2 text-xl font-bold text-gray-900">
          <GlobeIcon />
          <span>
            {{ profile.address }}
          </span>
        </h1>
        <p class="max-w-2xl mx-auto mb-6 text-gray-600">{{ profile.bio }}</p>

        <!-- Status Badge -->
        <div
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full rotate-[-3deg] cursor-pointer">
          <div class="w-2 h-2 mr-2 bg-green-400 rounded-full"></div>
          Available For Work
        </div>
      </div>
    </header>

    <!-- Portfolio Gallery -->
    <section v-if="profile.portfolioImages && profile.portfolioImages.length" class="py-12">
      <div class="max-w-4xl px-6 mx-auto">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <img v-for="(image, index) in profile.portfolioImages" :key="index" :src="image.url" :alt="image.alt"
            class="object-cover w-full h-48 transition-shadow rounded-lg shadow-sm cursor-pointer hover:shadow-md" />
        </div>
      </div>
    </section>

    <div class="max-w-4xl px-6 pb-16 mx-auto">
      <!-- Experience Section -->
      <section v-if="profile.workExperience && profile.workExperience.length" class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Experience</h2>
        <div class="space-y-8">
          <div v-for="(work, index) in profile.workExperience" :key="index" class="flex gap-4">
            <!-- Timeline Icon -->
            <div class="flex flex-col items-center">
              <div :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold',
                getCompanyColor(index)
              ]">
                {{ work.companyName.charAt(0) }}
              </div>
              <div v-if="index < profile.workExperience.length - 1" class="w-0.5 h-16 bg-gray-200 mt-2"></div>
            </div>

            <!-- Content -->
            <div class="flex-1 pb-8">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-sm text-gray-500">{{ work.period || work.year }}</span>
                <span class="text-sm text-gray-400">•</span>
                <span class="text-sm text-gray-500">{{ work.role }}</span>
              </div>
              <h3 class="mb-2 text-lg font-semibold text-gray-900">{{ work.title }}</h3>
              <p class="mb-2 text-sm text-gray-500">{{ work.companyName }}</p>
              <p class="leading-relaxed text-gray-700">{{ work.description }}</p>
              <a v-if="work.website" :href="work.website" target="_blank"
                class="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700">
                Visit Website →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section v-if="profile.skills && profile.skills.length" class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Skills</h2>
        <div class="flex flex-wrap gap-3">
          <span v-for="skill in profile.skills" :key="skill"
            class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
            {{ skill }}
          </span>
        </div>
      </section>

      <!-- Personal Projects Section -->
      <section v-if="profile.personalProjects && profile.personalProjects.length" class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Projects</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div v-for="(project, index) in profile.personalProjects" :key="index"
            class="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md">
            <div class="flex items-center justify-center h-32 bg-gradient-to-br from-blue-500 to-purple-600">
              <h3 class="text-lg font-bold text-white">{{ project.title }}</h3>
            </div>
            <div class="p-4">
              <p class="mb-3 text-sm text-gray-700">{{ project.description }}</p>
              <a v-if="project.website" :href="project.website" target="_blank"
                class="text-sm font-medium text-blue-600 hover:text-blue-700">
                View Project →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section v-if="profile.education && profile.education.length" class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Education</h2>
        <div class="space-y-6">
          <div v-for="(edu, index) in profile.education" :key="index"
            class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="mb-1 text-lg font-semibold text-gray-900">{{ edu.title }}</h3>
                <p class="mb-1 text-gray-600">{{ edu.institution }}</p>
                <p class="text-sm text-gray-500">{{ edu.degree }}</p>
              </div>
              <span class="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">{{ edu.year }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Interests Section -->
      <section v-if="profile.focusPoints && profile.focusPoints.length" class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Interests</h2>
        <div class="flex flex-wrap gap-3">
          <span v-for="interest in profile.focusPoints" :key="interest"
            class="px-4 py-2 text-sm font-medium text-blue-700 rounded-full bg-blue-50">
            {{ interest }}
          </span>
        </div>
      </section>

      <!-- Social Links Section -->
      <section v-if="profile.socialLinks && profile.socialLinks.length" class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Connect</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <a v-for="(link, index) in profile.socialLinks" :key="index" :href="link.href" target="_blank"
            class="flex items-center gap-4 p-4 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-md">
            <div :class="[
              'w-10 h-10 rounded-lg flex items-center justify-center text-white',
              getSocialColor(link.icon)
            ]">
              <component :is="getSocialIcon(link.icon)" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900">{{ link.title }}</h3>
              <p class="text-sm text-gray-500">{{ link.href }}</p>
            </div>
          </a>
        </div>
      </section>

      <!-- Recommendations Section -->
      <section class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">Recommendations</h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div v-for="recommendation in sampleRecommendations" :key="recommendation.id"
            class="p-6 bg-white border border-gray-200 rounded-lg">
            <div class="flex items-center gap-3 mb-4">
              <img :src="recommendation.avatar" :alt="recommendation.name"
                class="object-cover w-10 h-10 rounded-full" />
              <div>
                <h3 class="font-semibold text-gray-900">{{ recommendation.name }}</h3>
                <p class="text-sm text-gray-500">{{ recommendation.title }}</p>
              </div>
            </div>
            <p class="italic text-gray-700">"{{ recommendation.text }}"</p>
          </div>
        </div>
      </section>


    </div>

    <!-- Footer -->
    <footer class="py-8 bg-white border-t border-gray-200">
      <div class="max-w-4xl px-6 mx-auto">
        <!-- Signature -->
        <div class="mb-6 text-center">
          <div class="mb-4 text-4xl font-bold text-gray-900">{{ getInitials(profile.name) }}</div>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center gap-4 mb-6">
          <a v-for="social in profile.socialLinks?.slice(0, 3)" :key="social.title" :href="social.href" target="_blank"
            class="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
            <component :is="getSocialIcon(social.icon)" class="w-5 h-5" />
          </a>
        </div>

        <!-- Copyright -->
        <p class="text-sm text-center text-gray-500">
          © {{ profile.name }}. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  XIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  GlobeIcon,
  MailIcon
} from 'lucide-vue-next'

// Props
const props = defineProps({
  profileData: {
    type: Object,
    default: () => ({})
  }
})

// Sample profile data (normally would come from props or API)
const profile = ref({
  name: 'Jordan Walker',
  age: 34,
  address: ' Yaounde , Biyem Assi ',
  bio: 'Frontend developer and community builder from NYC 🗽',
  bio: 'Frontend developer and community builder from NYC 🗽',
  avatar: 'https://i.pinimg.com/736x/ed/93/78/ed9378ae8b2aa5895486fa41652829de.jpg',
  skills: ['Vue.js', 'React', 'TypeScript', 'Node.js', 'Design Systems'],
  focusPoints: ['Web Development', 'UI/UX Design', 'Open Source'],
  workExperience: [
    {
      title: 'Senior Developer and VP of Product',
      companyName: 'Qonto',
      role: 'Senior Developer',
      period: '2021 - Today',
      year: '2021',
      description: 'Setting vision, leadership, processes while directly participating in communications with clients such as eBay, Amazon, X, Twitch, Instagram, and many others.',
      website: 'https://qonto.com'
    },
    {
      title: 'Fullstack Developer',
      companyName: 'Medium Inc.',
      role: 'Fullstack Developer',
      period: '2019 - 2021',
      year: '2019',
      description: 'Setting vision, leadership, processes while directly participating in communications with clients such as eBay, Amazon, X, Twitch, Instagram, and many others.',
      website: 'https://medium.com'
    },
    {
      title: 'System Engineer and Web Developer',
      companyName: 'Vimeo',
      role: 'System Engineer',
      period: '2017 - 2019',
      year: '2017',
      description: 'Setting vision, leadership, processes while directly participating in communications with clients such as eBay, Amazon, X, Twitch, Instagram, and many others.',
      website: 'https://vimeo.com'
    }
  ],
  personalProjects: [
    {
      title: 'Task Management App',
      description: 'A modern task management application built with Vue.js and Node.js',
      website: 'https://taskapp.com'
    },
    {
      title: 'Design System Library',
      description: 'A comprehensive design system for modern web applications',
      website: 'https://designsystem.com'
    }
  ],
  education: [
    {
      title: 'Computer Science',
      institution: 'New York University',
      degree: 'Bachelor of Science',
      year: '2015-2019'
    }
  ],
  socialLinks: [
    { icon: 'github', title: 'GitHub', href: 'https://github.com/jordanwalker' },
    { icon: 'linkedin', title: 'LinkedIn', href: 'https://linkedin.com/in/jordanwalker' },
    { icon: 'twitter', title: 'Twitter', href: 'https://twitter.com/jordanwalker' }
  ],
  portfolioImages: [
    { url: 'https://i.pinimg.com/736x/4b/e8/90/4be890bf75c8e5ff3123267ddaae1685.jpg', alt: 'Project 1' },
    { url: 'https://i.pinimg.com/736x/ce/a8/5c/cea85c14580cc2ed88f07b437034dcf5.jpg', alt: 'Project 2' },
    { url: 'https://i.pinimg.com/736x/b6/dc/11/b6dc114edf31a5e8939a2ac05f7ace67.jpg', alt: 'Project 3' }
  ]
})

// Sample recommendations
const sampleRecommendations = ref([
  {
    id: 1,
    name: 'John Kusac',
    title: 'Senior Marketing Lead',
    avatar: '/placeholder.svg?height=40&width=40',
    text: 'If there\'s one investment that\'s really paid off, it\'s hiring a professional developer. I love the results I get every day.'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    title: 'Product Manager',
    avatar: '/placeholder.svg?height=40&width=40',
    text: 'Thanks to Jordan\'s expertise, our company frontend has never looked better.'
  }
])

// Helper functions
const getCompanyColor = (index) => {
  const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500']
  return colors[index % colors.length]
}

const getSocialColor = (icon) => {
  const colors = {
    github: 'bg-gray-900',
    linkedin: 'bg-blue-600',
    twitter: 'bg-blue-400',
    instagram: 'bg-pink-500',
    website: 'bg-green-500',
    email: 'bg-red-500'
  }
  return colors[icon] || 'bg-gray-500'
}

const getSocialIcon = (icon) => {
  const icons = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    website: GlobeIcon,
    email: MailIcon
  }
  return icons[icon] || GlobeIcon
}

const getInitials = (name) => {
  if (!name) return 'JW'
  return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()
}

// Merge with provided profile data
if (props.profileData && Object.keys(props.profileData).length > 0) {
  profile.value = { ...profile.value, ...props.profileData }
}
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom gradient for project cards */
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>