<template>
  <article class="box">
    <h3 class="title is-3">
      {{ $t('aboutPage.about.title') }}
    </h3>
    <p>{{ $t('aboutPage.about.par1') }}</p>
    <p v-html="$t('aboutPage.about.par2')" />
    <p v-html="$t('aboutPage.about.par3')" />
    <br>
    <p v-html="$t('aboutPage.about.par4')" />
    <p v-html="$t('aboutPage.about.par5')" />
    <br>
    <p>{{ $t('aboutPage.about.par6') }}</p>
  </article>
</template>
