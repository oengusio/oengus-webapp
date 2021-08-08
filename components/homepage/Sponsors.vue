<template>
  <div class="box">
    <h5 class="title">
      {{ $t('homepage.sponsors.title') }}
    </h5>
    <p class="icon-text">
      <img src="~/assets/ESA-Logo.svg" alt="European Speedrunner Assembly Logo" class="icon">
      <span v-html="$t('homepage.sponsors.esa')" />
    </p>
  </div>
</template>
