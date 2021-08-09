<template>
  <div class="box">
    <h1 class="title">
      {{ $t('homepage.welcomeTitle') }}
    </h1>
    <p v-html="$t('homepage.welcomeText.par1')" />
    <p>
      {{ $t('homepage.welcomeText.par3') }}
    </p>
    <div class="is-centered">
      <WidgetSignInPicker />
    </div>
    <p v-html="$t('homepage.welcomeText.par4.prod')" />
  </div>
</template>

<style lang="scss" scoped>
  .is-centered {
    display: flex;
    justify-content: center;
  }
</style>
