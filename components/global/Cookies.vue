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
      <button class="button is-info">
        <nuxt-link :to="localePath('/about')">
          {{ $t('navbar.about') }}
        </nuxt-link>
      </button>
    </div>
  </div>
</template>
