<template>
  <div class="advertisement-container">
    <AdsByGoogle v-if="showAdvertisement" ad-slot="5905320802" ad-format="" class="advertisement" :class="advertisementType" />
    <div class="spacer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    showAdvertisement: {
      type: Boolean,
      default: false,
    },
    isHorizontal: {
      type: Boolean,
      default: false,
    },
    isVertical: {
      type: Boolean,
      default: false,
    },
    shouldReload: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    advertisementType(): { 'is-horizontal': boolean, 'is-vertical': boolean } {
      return {
        'is-horizontal': this.isHorizontal && !this.isVertical,
        'is-vertical': !this.isHorizontal && this.isVertical,
      };
    },
  },

  watch: {
    shouldReload(): void {
      // console.log(arguments);
    },
  },
});
</script>

<style lang="scss" scoped>
.spacer {
  height: 50px;
}

.advertisement {
  // Dynamic logic lets AdSense pick from more advertisement options
  height: 100%;
  min-height: 50px;
  max-height: 100px;
  width: 100%;
  min-width: 300px;
  max-width: 728px;

  + .spacer {
    display: none;
  }

  @media (max-width: 1023px) {
    & {
      max-width: 320px;
    }
  }

  &[data-ad-status="unfilled"] {
    display: none !important;

    + .spacer {
      display: block;
    }
  }
}
</style>
