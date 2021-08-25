<template>
  <!-- Use v-show over v-if since ssr cannot detect this property properly -->
  <div v-show="showConsentPrompt" class="level-wrap box has-dark-background">
    <div>
      {{ $t('navbar.privacyConsent') }}
    </div>
    <div class="buttons are-small">
      <button class="button is-primary" @click="setCookies(true)">
        {{ $t('action.accept') }}
      </button>
      <button class="button is-warning" @click="setCookies(false)">
        {{ $t('action.decline') }}
      </button>
      <NuxtLink :to="localePath('/about')" class="button is-info">
        {{ $t('navbar.about') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getGTagIds } from '~/configs/googe-gtag.config';

export default Vue.extend({
  data() {
    return {
      showConsentPrompt: false,
    };
  },
  beforeMount(): void {
    let showConsentPrompt: boolean = true;
    // doNotTrack is deprecated, let's not break if it gets removed
    showConsentPrompt &&= navigator?.doNotTrack !== '1';
    showConsentPrompt &&= localStorage.getItem('consent') === null;
    this.showConsentPrompt = showConsentPrompt;
  },
  methods: {
    setCookies(consent: boolean): void {
      // We invert for these, because these are DISABLE flags. Consent: yes; disable: no
      getGTagIds().forEach(id => (window as any)[`ga-disable-${id}`] = !consent);

      localStorage.setItem('consent', consent.toString());

      this.showConsentPrompt = false;
    },
  },
});
</script>

<style lang="scss" scoped>
  .level-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5em;
  }
</style>
