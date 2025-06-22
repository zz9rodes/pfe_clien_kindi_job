<template>
  <div class="container px-4 py-8 mx-auto mt-24">
    <AppInputFilterFreelancer/>
    <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- {{ listfreelancers }} -->
        <FreelancerCard  
            @view-profile="viewProfile(freelancer)"
            v-for="freelancer in listfreelancers" 
            :key="freelancer.id" 
            :freelancer="freelancer"
        />
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
const emit=defineEmits()
import AppInputFilterFreelancer from '@/components/AppInputFilterFreelancer.vue'
import FreelancerCard from '@/components/FreelancerCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter,useRoute } from 'vue-router'
import { Notyf } from "notyf";
import "notyf/notyf.min.css";


const auth=useAuthStore()
const router=useRouter()
const route=useRoute()
const notyf = new Notyf({ position: { x: "right", y: "top" }, duration: 3000 });


      const listfreelancers=ref([])
   const viewProfile=(freelancer) =>{
      console.log('Viewing profile for:', freelancer.cvProfiles);

      if(!freelancer.cvProfiles){

        notyf.error("He Did Not Complete the Portofolio")

        return
        
      }
      router.push({name:'portofolio',params:{cvId:freelancer.cvProfiles.slug}})
      
      return
    }


    const initFecthFreelancers= async()=>{
      const response=await auth.api('GET','/accounts/extern/all',null,false)

      console.log(response)

      if(response.success){
        console.log(response.data)
        listfreelancers.value=response.data
      }
    }

onMounted(()=>{
  initFecthFreelancers()
})
</script>

<style scoped>
.freelancer-card:hover .profile-image {
  transform: scale(1.1);
}

* {
  transition: all 0.2s ease;
}
</style>
