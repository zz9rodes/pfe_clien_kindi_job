<template>
  <div
    class="container p-8 px-4 mx-auto mt-16 bg-gray-50w rounded-3xl lg:p-12 bg-blue-50"
  >
    <div class="">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Rated Company</h2>
          <p class="mt-2 text-gray-600">
            Know your worth and find the job that qualify your life
          </p>
        </div>
        <a
          href="#"
          class="flex items-center font-medium text-gray-900 hover:text-gray-700"
        >
          Browse All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(job, index) in jobs"
          :key="index"
          class="relative p-6 transition duration-700 bg-white rounded-lg group 400 ease-in-ou hover:scale-105 hover:cursor-pointer hover:shadow-md"
        >
          <button class="absolute hidden group-hover:block right-1 top-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </button>
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <div
                :class="`w-12 h-12 rounded-full flex items-center justify-center `"
              >
                <img
                  :src="job.logo"
                  :alt="job.company"
                  class="p-[1px] border-gray-950 rounded-full"
                />
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ job.company }}
              </h3>
            </div>
          </div>

          <div
            class="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-500"
          >
            <div>{{ job.salary }}</div>
            <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>{{ job.duration }}</div>
            <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>{{ job.level }}</div>
            <div class="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div>{{ job.type }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const jobs = [
  {
    title: "Website Designer Required For Directory Theme",
    company: "Mailchimp",
    salary: "$125k-$135k Hourly",
    duration: "1-5 Days",
    level: "Expensive",
    type: "Remote",
    logo: "https://i.pinimg.com/736x/73/0e/23/730e232db653fb9ef0e18f2e54ad52ef.jpg",
    logoBackground: "bg-indigo-600",
  },
  {
    title: "Website Designer Required For Directory Theme",
    company: "Mailchimp",
    salary: "$125k-$135k Hourly",
    duration: "1-5 Days",
    level: "Expensive",
    type: "Remote",
    logo: "https://i.pinimg.com/736x/f6/92/36/f69236771830aa7665fd9062ac093d43.jpg",
    logoBackground: "bg-black",
  },
  {
    title: "Website Designer Required For Directory Theme",
    company: "Mailchimp",
    salary: "$125k-$135k Hourly",
    duration: "1-5 Days",
    level: "Expensive",
    type: "Remote",
    logo: "https://i.pinimg.com/736x/99/71/ef/9971ef6276673985849e59a5039dfcab.jpg",
    logoBackground: "bg-pink-600",
  },
  {
    title: "Website Designer Required For Directory Theme",
    company: "Mailchimp",
    salary: "$125k-$135k Hourly",
    duration: "1-5 Days",
    level: "Expensive",
    type: "Remote",
    logo: "https://i.pinimg.com/736x/eb/cc/7c/ebcc7ca29dd53a9b44133baf63cf6e44.jpg",
    logoBackground: "bg-pink-700",
  },
  {
    title: "Website Designer Required For Directory Theme",
    company: "Mailchimp",
    salary: "$125k-$135k Hourly",
    duration: "1-5 Days",
    level: "Expensive",
    type: "Remote",
    logo: "https://i.pinimg.com/736x/81/a7/31/81a731f7eea20863bfa66359f86adbdd.jpg",
    logoBackground: "bg-red-600",
  },
  {
    title: "Website Designer Required For Directory Theme",
    company: "Mailchimp",
    salary: "$125k-$135k Hourly",
    duration: "1-5 Days",
    level: "Expensive",
    type: "Remote",
    logo: "https://i.pinimg.com/736x/5e/d3/52/5ed3521ecf12797548de79892ec8b6da.jpg",
    logoBackground: "bg-amber-500",
  },
  {
    title: "Website Designer Required For Directory Theme",
    company: "Mailchimp",
    salary: "$125k-$135k Hourly",
    duration: "1-5 Days",
    level: "Expensive",
    type: "Remote",
    logo: "https://i.pinimg.com/736x/16/ea/7a/16ea7aad2eff61fd43a10f921babd2f2.jpg",
    logoBackground: "bg-red-500",
  },
  {
    title: "Website Designer Required For Directory Theme",
    company: "Mailchimp",
    salary: "$125k-$135k Hourly",
    duration: "1-5 Days",
    level: "Expensive",
    type: "Remote",
    logo: "https://i.pinimg.com/736x/0d/e6/ed/0de6edf9d6d844168f9e03f215faa80c.jpg",
    logoBackground: "bg-blue-900",
  },
];
</script>

<style scoped>
.custom-shadow {
  --tw-shadow: 0 2px 9px rgba(0, 0, 0, 0.08);
  --tw-shadow-colored: 0 2px 9px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>