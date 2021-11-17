<!--
  Adapted from https://github.com/tobiasahlin/SpinKit
-->
<template>
  <div v-show="isLoading" class="sk-cube-grid">
    <div class="sk-cube sk-cube1" />
    <div class="sk-cube sk-cube2" />
    <div class="sk-cube sk-cube3" />
    <div class="sk-cube sk-cube4" />
    <div class="sk-cube sk-cube5" />
    <div class="sk-cube sk-cube6" />
    <div class="sk-cube sk-cube7" />
    <div class="sk-cube sk-cube8" />
    <div class="sk-cube sk-cube9" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { OengusStateValue } from '~/types/api/oengus-api';

export default Vue.extend({
  props: {
    while: {
      type: Array as () => Array<OengusStateValue<any>>,
      default: () => [ ],
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.isLoading = this.while.reduce((isLoading, value: OengusStateValue<any>) => {
      return isLoading || (value?._fetching ?? false);
    }, false);
    if (this.isLoading) {
      Promise.allSettled(this.while.map(value => value?._promise))
        .then(() => {
          this.isLoading = false;
          this.$emit('done');
        });
    } else {
      this.$emit('done');
    }
  },
});
</script>

<style lang="scss" scoped>
.sk-cube-grid {
  width: 40px;
  height: 40px;
  margin: 10px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);

  .sk-cube {
    background-color: rgba(128, 128, 128, 0.5);
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  }

  .sk-cube1 {
    animation-delay: 0.2s;
  }

  .sk-cube2 {
    animation-delay: 0.3s;
  }

  .sk-cube3 {
    animation-delay: 0.4s;
  }

  .sk-cube4 {
    animation-delay: 0.1s;
  }

  .sk-cube5 {
    animation-delay: 0.2s;
  }

  .sk-cube6 {
    animation-delay: 0.3s;
  }

  .sk-cube7 {
    animation-delay: 0s;
  }

  .sk-cube8 {
    animation-delay: 0.1s;
  }

  .sk-cube9 {
    animation-delay: 0.2s;
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    transform: scale3d(1, 1, 1);
  }

  35% {
    transform: scale3d(0, 0, 1);
  }
}
</style>
