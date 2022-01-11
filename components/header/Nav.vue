<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <ElementLink to="/" class="navbar-item icon-text">
        <img src="~assets/oengus.svg" class="icon" alt="Oengus logo">
        <span>
          Oengus
        </span>
      </ElementLink>
      <button class="button navbar-burger" :class="isActiveClass" @click="toggleNavbarActive">
        <span />
        <span />
        <span />
      </button>
    </div>

    <div class="navbar-menu" :class="isActiveClass">
      <div class="navbar-start">
        <div class="navbar-item field is-grouped">
          <a href="https://discord.gg/ZZFS8YT" class="navbar-item" target="_blank">
            <FontAwesomeIcon :icon="[ 'fab', 'discord' ]" class="icon" />
          </a>
          <a href="https://twitter.com/OengusIO" class="navbar-item" target="_blank">
            <FontAwesomeIcon :icon="[ 'fab', 'twitter' ]" class="icon" />
          </a>
          <a href="https://github.com/esamarathon/oengusio" class="navbar-item" target="_blank">
            <FontAwesomeIcon :icon="[ 'fab', 'github' ]" class="icon" />
          </a>
          <a href="https://github.com/esamarathon/oengusio/issues" class="navbar-item" target="_blank">
            <FontAwesomeIcon :icon="[ 'fas', 'bug' ]" class="icon" />
          </a>
          <a href="https://hosted.weblate.org/projects/oengusio/site/" class="navbar-item" target="_blank">
            <FontAwesomeIcon :icon="[ 'fas', 'language' ]" class="icon" />
          </a>
          <a href="https://www.patreon.com/oengusio" class="navbar-item" target="_blank">
            <FontAwesomeIcon :icon="[ 'fab', 'patreon' ]" class="icon" />
          </a>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <WidgetV1Redirect />
        </div>
        <ElementLink to="/about" class="navbar-item">
          {{ $t('navbar.about') }}
        </ElementLink>
        <WidgetLanguagePicker />
        <WidgetSignInPicker type="navbar" is-right />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { IsActive } from '~/types/components/is-active';

export default Vue.extend({
  data() {
    return {
      isNavbarActive: false,
    };
  },

  computed: {
    isActiveClass(): IsActive {
      return {
        'is-active': this.isNavbarActive,
      };
    },
  },

  methods: {
    toggleNavbarActive(): void {
      this.isNavbarActive = !this.isNavbarActive;
    },
  },
});
</script>
