<template>
  <div class="box">
    <h1 class="title">
      {{ $t('homepage.welcomeTitle') }}
    </h1>
    <p v-html="$t('homepage.welcomeText.par1')"></p>
    <p v-html="$t('homepage.welcomeText.par3')"></p>
    <p v-html="$t('homepage.welcomeText.par4.prod')"></p>
    <p v-html="$t('homepage.sponsors.kaspersky.box', { readMoreUrl: localePath('/marathon/test') })"></p>
  </div>
</template>
