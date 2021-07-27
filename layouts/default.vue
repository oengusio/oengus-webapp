<template>
  <div id="default-layout-wrapper">
    <SiteHeader id="header" />
    <Nuxt id="nuxt" />
    <SiteFooter id="footer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MetaInfo } from 'vue-meta';

export default Vue.extend({
  head(): Required<Pick<MetaInfo, "htmlAttrs" | "link" | "meta">> {
    return this.$nuxtI18nHead({ addSeoAttributes: true });
  },
  mounted(): void {
    // Provide calls to this.$gtag here to update Analytics
  },
});
</script>

<style lang="scss">
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

#default-layout-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  overflow-y: auto;

  > * {
    width: 100%;
  }

  #header,
  #footer {
    flex: 0;
  }

  #nuxt {
    flex: 1;
  }
}
</style>
