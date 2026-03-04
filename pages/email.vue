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
  background-color: #171717; /* Dark Grey (BG) */
  min-height: 100vh;
  color: #F3D5BA; /* Vanila */
  font-family: 'Jersey 15', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  overflow-x: hidden;
}

.header-section {
  padding: 0 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-family: 'Jersey 15', sans-serif;
  font-size: 3rem;
  line-height: 1.1;
  margin: 0;
  font-weight: normal;
}

.subtitle {
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #D6D6D6; /* Light Grey */
  margin: 0;
}

.form-section {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.8rem;
  color: #F3D5BA;
  font-weight: normal;
}

.custom-input, .custom-textarea {
  padding: 12px 16px;
  border-radius: 12px;
  border: 4px solid #001D62; /* Dark Blue border */
  font-size: 1.1rem;
  font-family: inherit;
  background: #C3DFF1; /* Light Blue for contrast */
  color: #001D62;
  box-shadow: 4px 4px 0px rgba(0,0,0,0.1);
}

.custom-input::placeholder, .custom-textarea::placeholder {
  color: rgba(0, 29, 98, 0.5);
}

.custom-textarea {
  min-height: 120px;
  resize: vertical;
}

.promo-box {
  background: rgba(209, 143, 161, 0.1); /* Subtle pink background */
  padding: 20px;
  border-radius: 12px;
  border: 4px dashed #D18FA1; /* Pink dashed border */
}

.promo-text {
  color: #D18FA1;
  line-height: 1.4;
  font-size: 1.2rem;
  margin: 0;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  padding: 0 24px;
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
  background: #171717;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  border: 8px solid #001D62;
  color: #F3D5BA;
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
}

.success-card h2 {
  font-family: 'Jersey 15', sans-serif;
  font-size: 2.5rem;
  color: #F3D5BA;
  margin-bottom: 24px;
  font-weight: normal;
}

.success-card p {
  font-size: 1.4rem;
  margin-bottom: 24px;
}

.home-btn {
  padding: 12px 32px;
  background: #F3D5BA;
  color: #171717;
  border: none;
  font-family: 'Jersey 15', sans-serif;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.home-btn:hover {
  transform: scale(1.1);
}
</style>
