<template>
    <div 
                        class="group flex flex-col overflow-hidden relative transition duration-700 rounded-[2px] ease-in-out bg-white border border-gray-300 shadow-sm hover:shadow-md hover:cursor-pointer"
                      >
                        <ExternalLinkIcon
                            class="absolute z-10 hidden w-5 h-5 text-gray-600 group-hover:block right-2 top-2" />

                        <div class="relative h-32 overflow-hidden">
                            <img :src="company.image" :alt="company.name" class="object-cover w-full h-full" />

                        </div>
                        <div class="relative h-16 p-1 bg-white rounded ">
                            <img style="border-color: rgb(222, 222, 222) !important;" :src="company.logo"
                                :alt="`${company.name} logo`"
                                class="w-16 h-16 top-[-25px] border-gray-50 border rounded-sm left-[20px] absolute " />
                        </div>
                        <div class="flex-1 p-4">
                            <div class="text-xs text-[#e4097f] font-medium mb-1">
                                {{ company.category.toUpperCase() }}
                            </div>
                            <h3 class="mb-2 text-lg font-bold">
                                {{ company.name }}
                            </h3>
                            <p class="mb-3 text-sm text-gray-600 line-clamp-2">
                                {{ company.industry }}
                            </p>

                            <div class="mb-3 space-y-1">
                                <div class="flex items-center text-xs text-gray-500">
                                    <UsersIcon class="w-3 h-3 mr-2" />
                                    {{ company.employeeCount }}
                                </div>
                                <div v-if="company.location" class="flex items-center text-xs text-gray-500">
                                    <MapPinIcon class="w-3 h-3 mr-2" />
                                    {{ company.location }}
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="text-sm font-medium text-gray-900">
                                    {{ company.jobsCount }}
                                </div>
                                <button  :class="[
                                    'px-3 py-1 text-xs font-medium rounded transition-colors duration-200',
                                    company.isFollowed
                                        ? 'bg-[#e4097f] text-white hover:bg-[#c4087a]'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                ]">
                                    {{ company.isFollowed ? 'Following' : 'Follow' }}
                                </button>
                            </div>
                        </div>
                    </div>
</template>

<script setup>
import { ExternalLinkIcon, MapPinIcon, UsersIcon } from 'lucide-vue-next'
import { defineProps } from 'vue';

const props=defineProps({
    company:{
        type:Object,
        required:true
    }
})
</script>