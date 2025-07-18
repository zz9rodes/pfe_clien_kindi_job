<template>
    <div class="w-full max-w-md mx-3 overflow-hidden bg-white rounded-xl">
        <div class="flex justify-center w-full">
            <img src="/src/assets/image.png" alt="Child pointing at map" class="" />
        </div>
        <div class="p-6">
            <h2 class="mb-4 text-xl font-bold text-center">
                Permettre l'utilisation de votre localisation par "KindiJob" ?
            </h2>
            <p class="mb-6 text-center text-gray-600">
                "KindiJob" souhaite utiliser votre localisation pour vous montrer des rêves d'entreprises
                 et des centres d'emploi dans votre région.
            </p>

            <div class="flex gap-4 ">
                <button @click="HandlecloseLocationDialog"
                    class="flex-1 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded hover:bg-gray-100">
                    Annuler
                </button>
                <button @click="HandleAcceptUseLocationDialog"
                    class="flex-1 bg-[#e4097f] hover:bg-[#c8076f] text-white py-2 px-4 rounded">
                    Autoriser
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit=defineEmits(['close-modal','accept'])

const HandlecloseLocationDialog=()=>{
    
    emit('close-modal')
}


const HandleAcceptUseLocationDialog=()=>{
    
    emit('accept')
}

</script>

<style></style>