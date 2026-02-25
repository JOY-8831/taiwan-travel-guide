<template>
  <div id="about_us" class="page-layout bg-start">
    <main class="frame">
      <QuestionBox
        title="👋 Who We Are"
        description="We are Kathleen and Joy, your adventure guides in Taiwan!"
      />

      <section class="options">
        <OptionSingle
          text="› Back to Menu"
          @click="navigateTo('/menu')"
        />
      </section>
    </main>
  </div>
</template>
