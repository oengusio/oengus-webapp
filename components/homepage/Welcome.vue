<template>
  <div class="box">
    <h1 class="title">
      {{ $t('homepage.welcomeTitle') }}
    </h1>
    <p v-html="$t('homepage.welcomeText.par1')" />
    <p>
      {{ $t('homepage.welcomeText.par3') }}
    </p>
    <WidgetSignInPicker />
    <p v-html="$t('homepage.welcomeText.par4.prod')" />
  </div>
</template>
