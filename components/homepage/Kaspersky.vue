<template>
  <div class="box">
    <a href="https://www.kaspersky.com/?ref=oengus.io" target="_blank" class="image">
      <img src="/kaspersky_logo.png" alt="Kaspersky Logo">
    </a>
    <p v-html="$t('homepage.sponsors.kaspersky.box', { readMoreUrl: localePath('/news/kaspersky') })" />
  </div>
</template>

<style lang="scss" scoped>
  .image {
    display: flex;
    justify-content: center;

    > img {
      max-height: 60px;
      width: auto;
    }
  }
</style>
