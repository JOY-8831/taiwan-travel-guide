<template>
  <div id="diet" class="page-layout">
    <ButtonBack />

    <main class="frame">
      <QuestionBox
        title="🍚 What do you want to taste more?"
        description="Select your dietary preferences, and we'll show you the best dishes matching your taste!"
        note="You can select multiple options."
      />
      
      <section class="options">
        <OptionMulti
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :selected="selectedDiets.has(option.value)"
          @toggle="toggleDiet(option.value)"
        />

        <ButtonOk
          :text="canContinue ? 'Find My Food!' : `Select at least one`"
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
  { label: 'Give me more meat!!! 🍖', value: 'C' },
  { label: 'Some vegan/vegetarian options 🥗', value: 'V' },
  { label: 'I’m a seafood lover 🐟', value: 'S' },
  { label: 'I’m Muslim, halal food please ☪️', value: 'M' }
]

const selectedDiets = ref(new Set<string>())

onMounted(() => {
  // Load previous selection
  const saved = localStorage.getItem('userDietStyles');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        selectedDiets.value = new Set(parsed);
      }
    } catch {
      localStorage.removeItem('userDietStyles');
    }
  }
});

const canContinue = computed(() => selectedDiets.value.size > 0);

const toggleDiet = (value: string) => {
  if (selectedDiets.value.has(value)) {
    selectedDiets.value.delete(value);
  } else {
    selectedDiets.value.add(value);
  }
  selectedDiets.value = new Set(selectedDiets.value);
}

const handleContinue = () => {
  if (selectedDiets.value.size === 0) return;

  const selectedArray = Array.from(selectedDiets.value);
  
  // Save selection
  localStorage.setItem('userDietStyles', JSON.stringify(selectedArray));

  // Determine the first page to visit based on order ['C', 'V', 'S', 'M']
  const dietOrder = ['C', 'V', 'S', 'M'];
  const routeMap: Record<string, string> = {
    'C': '/meat',
    'V': '/veggie',
    'S': '/seafood',
    'M': '/halalfood'
  };

  for (const diet of dietOrder) {
    if (selectedDiets.value.has(diet)) {
      const targetRoute = routeMap[diet];
      if (targetRoute) {
        router.push(targetRoute);
        return;
      }
    }
  }
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
