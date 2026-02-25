<template>
  <h2 class="section_title">{{ title }}</h2>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>