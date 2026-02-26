<!-- pages/menu.vue -->
<template>
  <div id= "menu" class="page-layout">
    <main class="frame">
      <QuestionBox
        title="Build your Taiwan itinerary"
        description="Dear adventurer, this game helps you know quickly 
        the must-go and must-eat in Taiwan 
        based on your itinerary and preferences. Ready to go?"
      />
      
      <OptionSingle 
      text="> Let's Gooooo!" @select="navigateTo('/must-see')" 
      /> 

      <OptionSingle 
          text="> About Taiwan" @select="navigateTo('/about-taiwan')"
      />

      <OptionSingle 
          text="> About us and references" @select="navigateTo('/about-us-ref')"
      />

    </main>
  </div>
</template>