<template>
    <div class="">
             <FormUpdateProfile  v-if="accountProfile" @close="HadleCancelForm" :isLogin="false" :accountProfile="accountProfile" />
            <AppModal v-else :isLoader="true" :isOpen="true"></AppModal>
    </div>
   
</template>

<script setup>
import FormUpdateProfile from '@/components/profile/FormUpdateProfile.vue';
import AppModal from '@/components/globales/AppModal.vue';
import {ref,onMounted} from 'vue'
import { useAuthStore } from '@/stores/auth';
import {useRouter} from 'vue-router'

const auth=useAuthStore()
const router=useRouter()


const accountProfile=ref(null)

const HadleCancelForm=async ()=>{

    await auth.logout()

    router.push({name:"login"})
}


onMounted(()=>{

    accountProfile.value=auth.user
})
</script>