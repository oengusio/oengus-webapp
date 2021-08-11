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

    <br>

    <h3 class="title">
      {{ $t('homepage.plannedFeatures.title') }}
    </h3>
    <ul>
      <li v-for="feature in plannedFeatures" :key="feature.key">
        <span>
          {{ $t(`homepage.plannedFeatures.${feature.key}`) }}
        </span>
        <FontAwesomeIcon v-if="feature.complete" :icon="[ 'fas', 'check' ]" class="icon is-small" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
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
});
</script>

<style lang="scss" scoped>
  .is-centered {
    display: flex;
    justify-content: center;
  }

  ul {
    list-style: disc;
    padding-inline-start: 20px;
  }
</style>
