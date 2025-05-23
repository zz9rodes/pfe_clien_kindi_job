<template>
  <div class="flex flex-col min-h-screen bg-white">
    <AppInputFilter @filter="HandleFilterJobs" @searchvalue-changed="handleSearchValueChange" :show-title="false" />
    <div class="container flex flex-1 px-4 mx-auto mt-8">
      <div class=" filter-bar">
        <JobFilter :initialActiveFilters="savedFilters" @filters-changed="handleFiltersChange" />
      </div>
      <main class="flex-1 bg-gray-50">
        <div class="container px-4 py-6 mx-auto">
          <!-- Recommended Section -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-bold text-gray-700 uppercase">Recommended for you</h2>
            <div class="flex items-center">
              <h2 class="mr-4 text-lg font-bold text-gray-700 uppercase">Category</h2>
              <div class="flex space-x-2">
                <button class="bg-[#e4097f] text-white px-3 py-1 rounded-full text-xs font-medium">
                  All
                </button>
                <button
                  class="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-full">
                  Products
                </button>
                <button
                  class="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-full">
                  Media
                </button>
                <button
                  class="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-full">
                  Podcasts
                </button>
              </div>
            </div>
          </div>

          <!-- Recommended Articles -->
          <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
            <div class="flex overflow-hidden bg-white rounded-lg shadow-sm">
              <div class="flex-1 p-4">
                <div class="text-xs text-[#e4097f] font-medium mb-1">HINTS, TIPS & STORIES</div>
                <h3 class="mb-2 text-lg font-bold">Win a Nature Play Kitchen</h3>
                <p class="mb-2 text-sm text-gray-600">Thanks to our friends at KindiCare, one KindiCare reader will win
                  a Hape Outdoor Kitchen, worth $399.95!</p>
                <p class="text-xs text-gray-500">Posted 12 June 2023, and if you're reading it today, KindiCare, you're
                  welcome to enter too! Good luck everyone.</p>
              </div>
              <div class="w-1/3">
                <img src="https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg"
                  alt="Nature Play Kitchen" class="object-cover w-full h-full" />
              </div>
            </div>

            <div class="flex overflow-hidden bg-white rounded-lg shadow-sm">
              <div class="flex-1 p-4">
                <div class="text-xs text-[#e4097f] font-medium mb-1">HEALTH</div>
                <h3 class="mb-2 text-lg font-bold">Injuries at Childcare</h3>
                <p class="mb-2 text-sm text-gray-600">What to do if your child suffers a bump, bruise or something worse
                  during childcare.</p>
                <p class="text-xs text-gray-500">What to do if your child suffers a bump, bruise or something worse
                  during childcare and what to expect from a KINDICARE centre if it does happen to see the best care...
                </p>
              </div>
              <div class="w-1/3">
                <img src="https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg"
                  alt="Injuries at Childcare" class="object-cover w-full h-full" />
              </div>
            </div>
          </div>



          <div class="mb-10">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-700 uppercase">Media</h2>
              <a href="#" class="text-[#e4097f] text-sm font-medium">View all</a>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg"
                  alt="New Cabinet Announced" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">MEDIA</div>
                  <h3 class="mb-2 text-lg font-bold">New Cabinet Announced</h3>
                  <p class="text-sm text-gray-600">See what's in it for new Ministers...</p>
                </div>
              </div>
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg"
                  alt="Trouble Ahead for Childcare" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">MEDIA</div>
                  <h3 class="mb-2 text-lg font-bold">Trouble Ahead for Childcare</h3>
                  <p class="text-sm text-gray-600">Published December 21st 2022</p>
                </div>
              </div>
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/66/48/88/66488884b59ad0f601763ce6bfdeb599.jpg"
                  alt="Safety Checks for Childcare" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">MEDIA</div>
                  <h3 class="mb-2 text-lg font-bold">Safety Checks for Childcare</h3>
                  <p class="text-sm text-gray-600">Is Safety First in Childcare?</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Life Stages Section -->
          <div class="mb-10">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-700 uppercase">Life Stages</h2>
              <a href="#" class="text-[#e4097f] text-sm font-medium">View all</a>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/c6/0f/4d/c60f4d70aa51f7eb8bab3fc47e6735b8.jpg"
                  alt="Baby Sleep Advice" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">LIFE STAGES</div>
                  <h3 class="mb-2 text-lg font-bold">Baby Sleep Advice</h3>
                  <p class="text-sm text-gray-600">Expert tips for better sleep...</p>
                </div>
              </div>
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/03/79/ff/0379ff163827fd605d0c522f2cf585ac.jpg"
                  alt="Black & White Baby Books" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">LIFE STAGES</div>
                  <h3 class="mb-2 text-lg font-bold">Black & White Baby Books</h3>
                  <p class="text-sm text-gray-600">Why they're so important...</p>
                </div>
              </div>
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/03/79/ff/0379ff163827fd605d0c522f2cf585ac.jpg"
                  alt="Getting Back to Work Soon?" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">LIFE STAGES</div>
                  <h3 class="mb-2 text-lg font-bold">Getting Back to Work Soon?</h3>
                  <p class="text-sm text-gray-600">What you need to know...</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Hints, Tips & Stories Section -->
          <div class="mb-10">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-700 uppercase">Hints, Tips & Stories</h2>
              <a href="#" class="text-[#e4097f] text-sm font-medium">View all</a>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/03/79/ff/0379ff163827fd605d0c522f2cf585ac.jpg"
                  alt="Win a Nature Play Kitchen" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">HINTS, TIPS & STORIES</div>
                  <h3 class="mb-2 text-lg font-bold">Win a Nature Play Kitchen</h3>
                  <p class="text-sm text-gray-600">Thanks to our friends at Kindi...</p>
                </div>
              </div>
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/03/79/ff/0379ff163827fd605d0c522f2cf585ac.jpg"
                  alt="An Unmissable Event!" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">HINTS, TIPS & STORIES</div>
                  <h3 class="mb-2 text-lg font-bold">An Unmissable Event!</h3>
                  <p class="text-sm text-gray-600">Parent Day is happening on 21...</p>
                </div>
              </div>
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg"
                  alt="Reasons to Send MG year" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">HINTS, TIPS & STORIES</div>
                  <h3 class="mb-2 text-lg font-bold">Reasons to Send MG year</h3>
                  <p class="text-sm text-gray-600">Although lots of families begin...</p>
                </div>
              </div>
            </div>
          </div>

          <!-- More Sections (Parenting, Lifestyle, Health, Education, Finance) -->
          <!-- I'm showing just one more as example, but you can repeat this pattern for all sections -->
          <div class="mb-10">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-700 uppercase">Parenting</h2>
              <a href="#" class="text-[#e4097f] text-sm font-medium">View all</a>
            </div>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg"
                  alt="Walk Safely to Childcare" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">PARENTING</div>
                  <h3 class="mb-2 text-lg font-bold">Walk Safely to Childcare</h3>
                  <p class="text-sm text-gray-600">5 ways to teach your kids road safety...</p>
                </div>
              </div>
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/16/6e/5c/166e5cbf71048415677d780b8670e725.jpg"
                  alt="Screen Time Done Right" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">PARENTING</div>
                  <h3 class="mb-2 text-lg font-bold">Screen Time Done Right</h3>
                  <p class="text-sm text-gray-600">6 ways to make screen time productive...</p>
                </div>
              </div>
              <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                <img src="https://i.pinimg.com/736x/6d/bc/f2/6dbcf228e2028f1bbff57c01f0ea9c27.jpg"
                  alt="Grandparent Care Tips" class="object-cover w-full h-40" />
                <div class="p-4">
                  <div class="text-xs text-[#e4097f] font-medium mb-1">PARENTING</div>
                  <h3 class="mb-2 text-lg font-bold">Grandparent Care Tips</h3>
                  <p class="text-sm text-gray-600">If you have a grandparent who cares for...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import JobFilter from '@/components/globales/JobFilter.vue';
import AppInputFilter from '@/components/AppInputFilter.vue';

const savedFilters = ref({
  location: ['paris', 'london'],
  category: ['childcare'],
  salary: {
    min: 40000,
    max: 80000,
    isFiltered: true
  },
  jobType: ['fulltime'],
  gender: [],
  levelExperience: [],
  searchQuery: 'childcare'
})

const handleFiltersChange = (filters) => {
  console.log('Filtres modifiés:', filters)
  // Mettre à jour les résultats de recherche
  // Sauvegarder les filtres si nécessaire
  savedFilters.value = filters
}

const handleSearchValueChange=(searchQuery)=>{
  savedFilters.value.searchQuery=searchQuery
}

const HandleFilterJobs=()=>{
  
  console.log(savedFilters.value);
  
}
</script>