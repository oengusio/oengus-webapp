<template>
  <div class="box">
    <h3 class="title is-3">
      {{ $t('homepage.sponsors.title') }}
    </h3>
    <p class="icon-text">
      <img src="~/assets/ESA-Logo.svg" alt="European Speedrunner Assembly Logo" class="icon">
      <span v-html="$t('homepage.sponsors.esa')" />
    </p>
  </div>
</template>
