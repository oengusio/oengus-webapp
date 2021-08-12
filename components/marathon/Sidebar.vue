<template>
  <nav class="menu box">
    <h4 class="title is-4">
      {{ marathon }}
    </h4>

    <p class="menu-label">
      {{ $t('marathon.menu.overview') }}
    </p>
    <ul class="menu-list">
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}`)">
          <FontAwesomeIcon :icon="[ 'fas', 'home' ]" />
          <span>
            {{ $t('marathon.menu.home') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/schedule`)">
          <FontAwesomeIcon :icon="[ 'fas', 'calendar' ]" />
          <span>
            {{ $t('marathon.menu.schedule') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/submissions`)">
          <FontAwesomeIcon :icon="[ 'fas', 'book' ]" />
          <span>
            {{ $t('marathon.menu.viewSubmissions') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/submit`)">
          <FontAwesomeIcon :icon="[ 'fas', 'paper-plane' ]" />
          <span>
            {{ $t('marathon.menu.submitRuns') }}
          </span>
        </NuxtLink>
      </li>
    </ul>

    <p class="menu-label">
      {{ $t('marathon.menu.tracker') }}
    </p>
    <ul class="menu-list">
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/donate`)">
          <FontAwesomeIcon :icon="[ 'fas', 'donate' ]" />
          <span>
            {{ $t('marathon.menu.donate') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/donations`)">
          <FontAwesomeIcon :icon="[ 'fas', 'money-bill' ]" />
          <span>
            {{ $t('marathon.menu.donations') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/incentives`)">
          <FontAwesomeIcon :icon="[ 'fas', 'bullseye' ]" />
          <span>
            {{ $t('marathon.menu.incentives') }}
          </span>
        </NuxtLink>
      </li>
    </ul>

    <p class="menu-label">
      {{ $t('marathon.menu.admin') }}
    </p>
    <ul class="menu-list">
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/settings`)">
          <FontAwesomeIcon :icon="[ 'fas', 'cogs' ]" />
          <span>
            {{ $t('marathon.menu.settings') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/selection`)">
          <FontAwesomeIcon :icon="[ 'fas', 'check-square' ]" />
          <span>
            {{ $t('marathon.menu.selectRuns') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/schedule/manage`)">
          <FontAwesomeIcon :icon="[ 'fas', 'calendar-check' ]" />
          <span>
            {{ $t('marathon.menu.manageSchedule') }}
          </span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath(`/marathon/${marathon}/incentives/manage`)">
          <FontAwesomeIcon :icon="[ 'fas', 'dot-circle' ]" />
          <span>
            {{ $t('marathon.menu.manageIncentives') }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      marathon: this.$route.params.marathon,
    };
  },
});
</script>
