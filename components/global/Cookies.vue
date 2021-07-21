<template>
  <div class="level box has-dark-background">
    <div class="level-left">
      {{ $t('navbar.privacyConsent') }}
    </div>
    <div class="buttons are-small level-right">
      <button class="button is-primary">
        {{ $t('action.accept') }}
      </button>
      <button class="button is-warning">
        {{ $t('action.decline') }}
      </button>
      <nuxt-link :to="localePath('/about')" class="button is-info">
        {{ $t('navbar.about') }}
      </nuxt-link>
    </div>
  </div>
</template>
