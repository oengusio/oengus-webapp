<template>
  <div class="advertisement-container" :class="advertisementType">
    <AdsByGoogle v-if="showAdvertisement" ad-slot="5905320802" ad-format="" class="advertisement" :class="advertisementType" />
    <div :class="spacerClass" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    /**
     * Sometimes you need to insert elements that won't have advertisements
     * if this is false, no advertisement will attempt to load.
     */
    showAdvertisement: {
      type: Boolean,
      default: false,
    },
    /**
     * Shows a small "space" that persists even if the advertisement is not shown
     * A "not shown" advertisement can occur due showAdvertisement being false or it not being fulfilled
     * If the advertisement is fulfilled, there will always be spacers
     */
    showSpacer: {
      type: Boolean,
      default: false,
    },
    /**
     * Causes the advertisement to be wider than it is tall
     * You must set one, and only one, of isHorizontal and isVertical
     */
    isHorizontal: {
      type: Boolean,
      default: false,
    },
    /**
     * Causes the advertisement to be taller than it is wide
     * You must set one, and only one, of isHorizontal and isVertical
     */
    isVertical: {
      type: Boolean,
      default: false,
    },
    /**
     * Flag that is listened to. When it becomes true, a reload will be triggered.
     * To trigger additional reloads, it must stop being true before becoming true again.
     * XXX Corrently does not reload anything
     */
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
    spacerClass(): { spacer: boolean } {
      return {
        spacer: this.showSpacer,
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
.advertisement-container {
  display: flex;
  align-items: center;

  &.is-horizontal {
    flex-direction: column;
  }

  &.is-vertical {
    flex-direction: row;
  }
}

.spacer {
  height: calc(5 * var(--spacing) / 2);
  width: calc(5 * var(--spacing) / 2);
}

.advertisement {
  // Dynamic logic lets AdSense pick from more advertisement options
  height: 100%;
  min-height: 50px;
  max-height: 100px;
  width: 100%;
  min-width: 300px;
  max-width: 728px;

  &.is-horizontal {
    margin-block: var(--spacing);
  }

  &.is-vertical {
    margin-inline: var(--spacing);
  }

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
