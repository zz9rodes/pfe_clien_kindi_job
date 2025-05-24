<template>
  <div class="container px-4 mx-auto mt-16 mb-16">
    <div class="bg-[#86B5E4]/5 rounded-3xl p-8 lg:p-12">
      <div class="p-8">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-1/2 md:pr-12">
            <div>
              <h2 class="mt-2 mb-4 text-3xl font-bold">Select your KindiJob plan</h2>
            </div>
            <h3 class="my-2 text-2xl ">{{ selectedPlan.name }} ( {{ selectedPlan.price }} - {{ selectedPlan.currency }})</h3>
            <span>
              {{ selectedPlan.description }}
            </span>
           
            <ul >
                <li v-for="feature in selectedPlan.features" :key="feature" class="mt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-check-icon lucide-badge-check fill-[#00a3e0] stroke-white"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
                      <div class="ml-6" >
                  {{feature}}
                </div>
                </li>
            </ul>
           
          </div>

          <div class="mt-8 md:w-1/2 md:mt-0">
            <div class="space-y-4">
              <div
                v-for="plan in plans"
                :key="plan.id"
                class="overflow-hidden bg-white border rounded-lg hover:cursor-pointer"
                :class="{
                  'border-[#e4097f]': selectedPlan.id === plan.id,
                  'border-gray-200': selectedPlan.id !== plan.id,
                }"
                @click="togglePlan(plan.id)"
              >
                <div class="p-4">
                  <div class="flex items-start">
                    <div class="flex items-center h-5 mt-1">
                      <input
                        type="radio"
                        :id="plan.id"
                        name="plan"
                        :value="plan.id"
                        v-model="selectedPlan.id"
                        class="h-4 w-4 text-[#e4097f] border-gray-300 focus:ring-[#e4097f]"
                      />
                    </div>
                    <div class="flex-1 ml-3">
                      <div class="flex justify-between">
                        <div>
                          <label :for="plan.id" class="font-medium text-gray-900">{{
                            plan.name
                          }}</label>
                          <p class="mt-1 text-sm text-gray-500">
                            {{ plan.description }}
                          </p>
                        </div>
                        <div class="text-right">
                          <span class="block font-medium"
                            >{{ plan.currency }} {{ plan.price }}
                            <span class="text-sm text-gray-500"
                              >/{{ plan.duration }}</span
                            ></span
                          >
                          <span
                            v-if="plan.originalPrice"
                            class="text-xs text-gray-500 line-through"
                            >${{ plan.originalPrice }}/mo.</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <button
                  class="w-full group bg-[#e4097f] text-white py-2 rounded-lg font-medium hover:bg-[#e4097f]/90 transition-colors flex justify-center"
                >
                <span>
                      Start Now
                </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden lucide lucide-arrow-right-icon lucide-arrow-right group-hover:block"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const plans = ref([
  {
    id: "basic",
    name: "Free",
    price: "0",
    currency: "XAF",
    duration: "mo.",
    description: "A starter plan for freelancers to begin applying for jobs and receiving payments.",
    isActive: false,
    features: [
      "Apply for job offers",
      "Receive payments via Mobile Money",
      "Manage CV profile",
      "One electronic signature included",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "5,000",
    currency: "XAF",
    duration: "mo.",
    description: "Designed for small businesses or occasional recruiters who need more control and reach.",
    isActive: false,
    features: [
      "All features from Free",
      "Create up to 10 job announcements",
      "Manage up to 7 active projects",
      "Access to community resources",
      "Up to 25 tasks per project",
      "Standard email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "15,000",
    currency: "XAF",
    duration: "mo.",
    description: "A full-featured plan for active companies or HR agencies managing multiple teams and workflows.",
    isActive: true,
    features: [
      "All features from Standard",
      "Unlimited job announcements",
      "Unlimited projects and tasks",
      "Multiple electronic signatures",
      "Data export in PDF and CSV formats",
      "Priority 24/7 customer support",
    ],
  },
])


const selectedPlan = ref(plans.value[0]);

const togglePlan = (planId) => {
  selectedPlan.value = plans.value.find((plan) => plan.id === planId);
};

const openFaq = ref(null);

const toggleFaq = (faqId) => {
  openFaq.value = openFaq.value === faqId ? null : faqId;
};
</script>
<style>
/* Custom radio button styling */
input[type="radio"] {
  appearance: none;
  width: 1rem;
  height: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  outline: none;
  transition: all 0.2s ease;
}

input[type="radio"]:checked {
  border-color: #e4097f;
  background-color: white;
  box-shadow: inset 0 0 0 3px #e4097f;
}

input[type="radio"]:focus {
  box-shadow: 0 0 0 2px rgba(228, 9, 127, 0.2), inset 0 0 0 3px #e4097f;
}
</style>