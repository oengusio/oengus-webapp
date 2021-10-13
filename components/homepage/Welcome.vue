<template>
  <div class="box" :class="isOpenFoldClass">
    <h1 class="title">
      {{ $t('homepage.welcomeTitle') }}
    </h1>
    <p v-html="$t('homepage.welcomeText.par1')" />
    <p>
      {{ $t('homepage.welcomeText.par3') }}
    </p>
    <div class="is-centered">
      <WidgetSignInPicker />
      <WidgetV1Redirect />
    </div>
    <p v-html="$t('homepage.welcomeText.par4.prod')" />

    <br>

    <h3 class="title is-3 below-the-fold">
      {{ $t('homepage.plannedFeatures.title') }}
    </h3>
    <ul class="below-the-fold">
      <li v-for="feature in plannedFeatures" :key="feature.key">
        <span>
          {{ $t(`homepage.plannedFeatures.${feature.key}`) }}
        </span>
        <FontAwesomeIcon v-if="feature.complete" :icon="[ 'fas', 'check' ]" class="icon is-small" />
      </li>
    </ul>

    <div class="is-centered is-fold-trigger">
      <button class="button" @click="openFold">
        <span>
          {{ $t('homepage.plannedFeatures.title') }}
        </span>
        <FontAwesomeIcon :icon="[ 'fas', 'angle-down' ]" class="icon" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      isFoldOpen: false,
      plannedFeatures: [
        { key: '1', complete: true },
        { key: '2', complete: false },
        { key: '3', complete: true },
        { key: '4', complete: false },
        { key: '5', complete: true },
        { key: '6', complete: false },
        { key: '7', complete: true },
        { key: 'volunteerManager', complete: false },
      ],
    };
  },
  computed: {
    isOpenFoldClass(): { 'is-open-fold': boolean } {
      return { 'is-open-fold': this.isFoldOpen };
    },
  },
  methods: {
    openFold(): void {
      this.isFoldOpen = true;
    },
  },
});
</script>

<style lang="scss" scoped>
  ul {
    list-style: disc;
    padding-inline-start: 20px;
  }

  .is-fold-trigger {
    display: none;
  }

  @media (max-width: 1023px) {
    .is-fold-trigger {
      display: flex;

      .is-open-fold & {
        display: none;
      }
    }

    .below-the-fold {
      display: none;

      .is-open-fold & {
        display: inherit;
      }
    }
  }
</style>
