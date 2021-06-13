<template>
  <div>
    <p>Oengus main page stub</p>
    <p>{{ $t('homepage.welcomeTitle') }}</p>
    <select @change="changeLocale">
      <option v-for="locale in locales" :key="locale.code" :value="locale.code">
        {{ locale.code }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    locales() {
      return this.$i18n.locales;
    },
  },
  methods: {
    changeLocale({ target }: { target: HTMLSelectElement }) {
      this.$i18n.setLocale(target.value);
    },
  },
});
</script>
