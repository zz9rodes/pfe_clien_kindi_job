<template>
    <div class="flex items-center mt-8">
      <div class="flex -space-x-2">
        <div v-for="i in 5" :key="i" class="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
          <img :src="`https://i.pinimg.com/736x/4d/c6/46/4dc64668a60210112a43de8649881b5d.jpg?height=32&width=32`" :alt="`User ${i}`" class="w-full h-full object-cover" />
        </div>
      </div>
      <div class="ml-4">
        <span class="font-semibold">9.5k+</span>
        
      </div>
    </div>
    <p class="text-sm text-gray-600">More than 9.5k users are connected with us</p>

    
  </template>