<template>
    <div>
        <Teleport to="#modal">
            <Transition name="modal">
                <div class="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden" v-if="isOpen" @click.self="HandleOnClickOutSide">
                    <slot ></slot>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup>
import {  defineProps,defineEmits } from 'vue'


const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit=defineEmits(['closeModal'])

const HandleOnClickOutSide=()=>{
    
    if(!props.isLoader){
        emit('closeModal')
    }
}

// onClickOutside(modal,()=>(isopenModal.value=false))
</script>

<style scoped>
.bg-modal {
    cursor: pointer;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(223 214 214 / 59%);
    z-index: 500;
    @apply backdrop-blur-[1px] !important
}

/*  */

.modal-enter-active,
.modal-leave-active {
    transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
</style>