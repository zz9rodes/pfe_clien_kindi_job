<template>
  <div class="w-full min-h-screen bg-gray-50">
    <div class="max-w-4xl p-6 mx-auto">
      <!-- Header with Save Button -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Create Your CV Profile</h1>
          <p class="mt-1 text-gray-600">Complete your professional profile</p>
        </div>
        <button
          @click="saveProfile"
          :disabled="isSaving"
          class="px-6 py-2 font-medium text-white transition-colors bg-[#e4097f] rounded-lg hover:bg-[#e4097f] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSaving ? 'Saving...' : 'Save' }}
        </button>
      </div>

      <div class="space-y-6">
        <!-- Bio Section -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <h2 class="mb-4 font-semibold text-gray-900 text-md sm:text-xl">Biography</h2>
          <textarea
            v-model="profile.bio"
            placeholder="Describe yourself in a few lines..."
            rows="4"
            class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
          ></textarea>
        </div>

        <!-- Skills Section -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-900 text-md sm:text-xl">Skills</h2>
            <button
              @click="addSkill"
              class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
            >
              <PlusIcon class="w-5 h-5"/>
              <span class="hidden sm:block">
                Add
              </span>
            </button>
          </div>
          <div class="space-y-3">
            <div
              v-for="(skill, index) in profile.skills"
              :key="index"
              class="flex items-center gap-3"
            >
              <input
                v-model="profile.skills[index]"
                type="text"
                placeholder="E.g., Vue.js, JavaScript, Design..."
                class="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
              />
              <button
                @click="removeSkill(index)"
                class="p-2 text-[#e4097f] hover:text-[#e4097f]"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Focus Points Section -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-900 text-md sm:text-xl">Interests</h2>
            <button
              @click="addFocusPoint"
              class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
            >
              <PlusIcon class="w-5 h-5"/>
              <span class="hidden sm:block">
                Add
              </span>
            </button>
          </div>
          <div class="space-y-3">
            <div
              v-for="(point, index) in profile.focusPoints"
              :key="index"
              class="flex items-center gap-3"
            >
              <input
                v-model="profile.focusPoints[index]"
                type="text"
                placeholder="E.g., Photography, Travel, Technology..."
                class="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
              />
              <button
                @click="removeFocusPoint(index)"
                class="p-2 text-[#e4097f] hover:text-[#e4097f]"
              >
                <XIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Social Links Section -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-900 text-md sm:text-xl">Social Media</h2>
            <button
              @click="addSocialLink"
              class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
            >
              <PlusIcon class="w-5 h-5"/>
              <span class="hidden sm:block">
                Add
              </span>
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="(link, index) in profile.socialLinks"
              :key="index"
              class="p-4 transition-colors border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium text-gray-900">Link {{ index + 1 }}</h3>
                <button
                  @click="removeSocialLink(index)"
                  class="p-1 text-[#e4097f] hover:text-[#e4097f]"
                >
                  <XIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Icon</label>
                  <select
                    v-model="link.icon"
                    class="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  >
                    <option value="">Choose an icon</option>
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="instagram">Instagram</option>
                    <option value="website">Website</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
                  <input
                    v-model="link.title"
                    type="text"
                    placeholder="E.g., My GitHub"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Link</label>
                  <input
                    v-model="link.href"
                    type="url"
                    placeholder="https://..."
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Education Section -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-900 text-md sm:text-xl">Education</h2>
            <button
              @click="addEducation"
              class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
            >
              <PlusIcon class="w-5 h-5"/>
              <span class="hidden sm:block">
                Add
              </span>
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="(education, index) in profile.education"
              :key="index"
              class="p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium text-gray-900">Education {{ index + 1 }}</h3>
                <button
                  @click="removeEducation(index)"
                  class="p-1 text-[#e4097f] hover:text-[#e4097f]"
                >
                  <XIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
                  <input
                    v-model="education.title"
                    type="text"
                    placeholder="E.g., Master's in Computer Science"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Institution</label>
                  <input
                    v-model="education.institution"
                    type="text"
                    placeholder="E.g., University of Paris"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Degree</label>
                  <input
                    v-model="education.degree"
                    type="text"
                    placeholder="E.g., Master's, Bachelor's, Associate's..."
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  />
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Year</label>
                  <input
                    v-model="education.year"
                    type="text"
                    placeholder="E.g., 2020-2022"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Work Experience Section -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-900 text-md sm:text-xl">Work Experience</h2>
            <button
              @click="addWorkExperience"
              class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
            >
              <PlusIcon class="w-5 h-5"/>
              <span class="hidden sm:block">
                Add
              </span>
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="(work, index) in profile.workExperience"
              :key="index"
              class="p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium text-gray-900">Experience {{ index + 1 }}</h3>
                <button
                  @click="removeWorkExperience(index)"
                  class="p-1 text-[#e4097f] hover:text-[#e4097f]"
                >
                  <XIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="space-y-3">
                <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Job Title</label>
                    <input
                      v-model="work.title"
                      type="text"
                      placeholder="E.g., Frontend Developer"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Company</label>
                    <input
                      v-model="work.companyName"
                      type="text"
                      placeholder="E.g., Tech Company"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Role</label>
                    <input
                      v-model="work.role"
                      type="text"
                      placeholder="E.g., Developer, Designer..."
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Period</label>
                    <input
                      v-model="work.period"
                      type="text"
                      placeholder="E.g., Jan 2022 - Present"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Website</label>
                    <input
                      v-model="work.website"
                      type="url"
                      placeholder="https://company.com"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Year</label>
                    <input
                      v-model="work.year"
                      type="text"
                      placeholder="E.g., 2022"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                    />
                  </div>
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    v-model="work.description"
                    placeholder="Describe your responsibilities and achievements..."
                    rows="3"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal Projects Section -->
        <div class="p-6 bg-white border border-gray-200 rounded-lg">
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-semibold text-gray-900 text-md sm:text-xl">Personal Projects</h2>
            <button
              @click="addPersonalProject"
              class="flex justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg item-center hover:bg-gray-200"
            >
              <PlusIcon class="w-5 h-5"/>
              <span class="hidden sm:block">
                Add
              </span>
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="(project, index) in profile.personalProjects"
              :key="index"
              class="p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-medium text-gray-900">Project {{ index + 1 }}</h3>
                <button
                  @click="removePersonalProject(index)"
                  class="p-1 text-[#e4097f] hover:text-[#e4097f]"
                >
                  <XIcon class="w-4 h-4" />
                </button>
              </div>
              <div class="space-y-3">
                <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Title</label>
                    <input
                      v-model="project.title"
                      type="text"
                      placeholder="E.g., Task Management Application"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                    />
                  </div>
                  <div>
                    <label class="block mb-1 text-sm font-medium text-gray-700">Website</label>
                    <input
                      v-model="project.website"
                      type="url"
                      placeholder="https://myproject.com"
                      class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                    />
                  </div>
                </div>
                <div>
                  <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    v-model="project.description"
                    placeholder="Describe your project, technologies used..."
                    rows="3"
                    class="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#e4097f] focus:border-[#e4097f]"
                  ></textarea>
                </div>
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
import { XIcon, PlusIcon } from 'lucide-vue-next'

// Reactive data
const isSaving = ref(false)

const profile = ref({
  bio: '',
  skills: [''],
  focusPoints: [''],
  socialLinks: [],
  education: [],
  workExperience: [],
  personalProjects: []
})

// Skills methods
const addSkill = () => {
  profile.value.skills.push('')
}

const removeSkill = (index) => {
  profile.value.skills.splice(index, 1)
}

// Focus points methods
const addFocusPoint = () => {
  profile.value.focusPoints.push('')
}

const removeFocusPoint = (index) => {
  profile.value.focusPoints.splice(index, 1)
}

// Social links methods
const addSocialLink = () => {
  profile.value.socialLinks.push({
    icon: '',
    title: '',
    href: ''
  })
}

const removeSocialLink = (index) => {
  profile.value.socialLinks.splice(index, 1)
}

// Education methods
const addEducation = () => {
  profile.value.education.push({
    title: '',
    institution: '',
    degree: '',
    year: ''
  })
}

const removeEducation = (index) => {
  profile.value.education.splice(index, 1)
}

// Work experience methods
const addWorkExperience = () => {
  profile.value.workExperience.push({
    title: '',
    description: '',
    companyName: '',
    role: '',
    period: '',
    website: '',
    year: ''
  })
}

const removeWorkExperience = (index) => {
  profile.value.workExperience.splice(index, 1)
}

// Personal projects methods
const addPersonalProject = () => {
  profile.value.personalProjects.push({
    title: '',
    description: '',
    website: ''
  })
}

const removePersonalProject = (index) => {
  profile.value.personalProjects.splice(index, 1)
}

// Save profile
const saveProfile = async () => {
  isSaving.value = true
  
  try {
    // Filter out empty values
    const cleanedProfile = {
      ...profile.value,
      skills: profile.value.skills.filter(skill => skill.trim()),
      focusPoints: profile.value.focusPoints.filter(point => point.trim()),
      socialLinks: profile.value.socialLinks.filter(link => link.title && link.href),
      education: profile.value.education.filter(edu => edu.title || edu.institution),
      workExperience: profile.value.workExperience.filter(work => work.title || work.companyName),
      personalProjects: profile.value.personalProjects.filter(project => project.title)
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Profile saved:', cleanedProfile)
    
    // Show success message (you can replace with a toast notification)
    alert('Profile saved successfully!')
    
  } catch (error) {
    console.error('Error saving profile:', error)
    alert('Error saving profile')
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>