<template>
  <!-- Use v-show over v-if since ssr cannot detect this property properly -->
  <div class="level box has-dark-background" v-show="showConsentPrompt">
    <div class="level-left">
      {{ $t('navbar.privacyConsent') }}
    </div>
    <div class="buttons are-small level-right">
      <button class="button is-primary" @click="setCookies(true)">
        {{ $t('action.accept') }}
      </button>
      <button class="button is-warning" @click="setCookies(false)">
        {{ $t('action.decline') }}
      </button>
      <nuxt-link :to="localePath('/about')" class="button is-info">
        {{ $t('navbar.about') }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

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
      // Add any other tracking schemes here. Hopefully I can find a simple way to iterate all of them.
      // We invert for these, because this are DISABLE flags. Consent: yes; disable: no
      (window as any)['ga-disable-G-26CN947SSZ'] = !consent;
      (window as any)['ga-disable-UA-153189507-4'] = !consent;

      localStorage.setItem('consent', consent.toString());

      this.showConsentPrompt = false;
    },
  },
});
</script>
