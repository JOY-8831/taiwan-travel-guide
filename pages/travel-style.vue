<template>
  <div id="travel-style" class="page-layout">
    <ButtonBack />

    <main class="frame">
      <QuestionBox
        title="🎒 What's your vibe today?"
        description="Select the styles you're interested in, and we'll recommend the best tours for you!"
        note="You can select multiple styles."
      />
      
      <section class="options">
        <OptionMulti
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :selected="selectedInterests.has(option.value)"
          @toggle="toggleInterest(option.value)"
        />

        <ButtonOk
          :text="canContinue ? 'Find My Tours!' : `Select at least one`"
          type="ok"
          :disabled="!canContinue"
          @click="handleContinue" 
        /> 
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const options = [
  { label: 'City Explorer 🏙️', value: 'C' },
  { label: 'Nature Adventurer 🌿', value: 'N' },
  { label: 'History & Museum 🏛️', value: 'M' },
  { label: 'Relaxing Stroller ☕', value: 'R' }
]

const selectedInterests = ref(new Set<string>())

onMounted(() => {
  const saved = localStorage.getItem('userTravelStyles');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        selectedInterests.value = new Set(parsed);
      }
    } catch {
      localStorage.removeItem('userTravelStyles');
    }
  }
});

const canContinue = computed(() => selectedInterests.value.size > 0);

const toggleInterest = (value: string) => {
  if (selectedInterests.value.has(value)) {
    selectedInterests.value.delete(value);
  } else {
    selectedInterests.value.add(value);
  }
  selectedInterests.value = new Set(selectedInterests.value);
}

const handleContinue = () => {
  if (selectedInterests.value.size === 0) return;

  const selectedArray = Array.from(selectedInterests.value);
  
  localStorage.setItem('userTravelStyles', JSON.stringify(selectedArray));

  router.push('/tours'); 
};
</script>

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
</style>