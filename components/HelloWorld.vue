<script setup>
const props = defineProps({
    message: {
            type: String, 
            required: true,

    }
}) 

// const message = "hello world"
// const state = reactive({
//     message: "hello world"
// })
</script>

<template>
    {{ props.message }}
</template>

