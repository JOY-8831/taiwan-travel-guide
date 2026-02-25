<template>
  <div id="email-page" class="page-layout">
    <ButtonBack @click="router.push('/end')" />

    <main class="frame">
      <header class="header-section">
        <h1 class="title">💌 Stay in Touch</h1>
        <p class="subtitle">Get a custom PDF guide and help us improve!</p>
      </header>

      <section class="form-section">
        <!-- Email Input -->
        <div class="input-group">
          <label for="email" class="input-label">Your Email Address</label>
          <input 
            id="email"
            v-model="email" 
            type="email" 
            placeholder="example@email.com"
            class="custom-input"
          >
        </div>

        <!-- Feedback Input -->
        <div class="input-group">
          <label for="feedback" class="input-label">Suggestions or Feedback</label>
          <textarea 
            id="feedback"
            v-model="feedback" 
            placeholder="Tell us what you think about this trip planner..."
            class="custom-textarea"
          ></textarea>
        </div>

        <div class="promo-box">
          <p class="promo-text">
            🌟 **Bonus:** If you leave your email, we'll send you a **free PDF travel guide** 
            including detailed maps and exclusive tips!
          </p>
        </div>
      </section>

      <div class="button-container">
        <ButtonOk
          :text="isSubmitting ? 'Sending...' : 'Submit & Finish'"
          type="ok"
          :disabled="isSubmitting"
          @click="handleSubmit"
        />
      </div>
    </main>

    <!-- Simple Success Modal -->
    <div v-if="submitted" class="success-overlay">
      <div class="success-card">
        <h2>Thanks for playing!</h2>
        <p>Your journey is just beginning. See you in Taiwan!</p>
        <button class="home-btn" @click="router.push('/')">Back to Home</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFavorites } from '~/composables/useFavorites'
import { tours as allTours } from '~/assets/data/data.js'

const router = useRouter()
const { getMustSeeList, getMustEatList, loadData, favoriteIds } = useFavorites()

const email = ref('')
const feedback = ref('')
const isSubmitting = ref(false)
const submitted = ref(false)

// We'll gather travel data to send along with the email
const travelData = ref({
  tours: '',
  spots: '',
  food: ''
})

onMounted(async () => {
  await loadData()
  
  // Prepare travel data for submission
  const savedTours = localStorage.getItem('selectedTours')
  let selectedToursNames: string[] = []
  if (savedTours) {
    const ids = JSON.parse(savedTours) as string[]
    selectedToursNames = allTours.filter(t => ids.includes(t.id)).map(t => t.title)
  }

  const favoriteSpotsNames = getMustSeeList.value
    .filter(item => favoriteIds.value.includes(item.Code))
    .map(item => item.Name_EN || item.Name_CH)

  const favoriteFoodNames = getMustEatList.value
    .filter(item => favoriteIds.value.includes(item.Code))
    .map(item => item.Name_EN || item.Name_CH)

  travelData.value = {
    tours: selectedToursNames.join(', '),
    spots: favoriteSpotsNames.join(', '),
    food: favoriteFoodNames.join(', ')
  }
})

const handleSubmit = async () => {
  if (!email.value && !feedback.value) {
    alert('Please enter your email or feedback!')
    return
  }

  isSubmitting.value = true
  
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbyyj1I90GMZ8n6EXvTo6c9J7_6ECZSOfWNrKV3AOu6DaNckLg93s-txliMYmWA99Aw1/exec'
  
  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        email: email.value,
        feedback: feedback.value,
        tours: travelData.value.tours,
        spots: travelData.value.spots,
        food: travelData.value.food
      }),
    })

    // with no-cors, we can't check response.ok, so we assume success if no error is thrown
    submitted.value = true
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Something went wrong. Please try again later.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
#email-page {
  background-color: #f9f7f2;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 15px; /* 🎯 Tightened from 30px */
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px; /* 🎯 Tightened from 10px */
}

.input-label {
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.5rem;
  color: var(--dark_blue);
}

.custom-input, .custom-textarea {
  padding: 10px 15px; /* 🎯 Reduced vertical padding */
  border-radius: 12px;
  border: 2px solid var(--dark_blue);
  font-size: 1.1rem;
  font-family: inherit;
  background: white;
  box-shadow: 4px 4px 0px rgba(0,0,0,0.05);
}

.custom-textarea {
  min-height: 120px;
  resize: vertical;
}

.promo-box {
  background: #fff0f5;
  padding: 20px;
  border-radius: 12px;
  border: 2px dashed var(--pink);
}

.promo-text {
  color: #a04060;
  line-height: 1.6;
  font-size: 1.1rem;
  margin: 0;
}



/* Success Modal */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.success-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  border: 4px solid var(--pink);
}

.success-card h2 {
  font-family: 'Jersey 15', sans-serif;
  font-size: 2.5rem;
  color: var(--dark_blue);
  margin-bottom: 15px;
}

.home-btn {
  margin-top: 5px;
  padding: 12px 30px;
  background: var(--dark_blue);
  color: white;
  border: none;
  border-radius: 10px;
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
