<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <NuxtLink :to="localePath('/')" class="navbar-item icon-text">
        <img src="~assets/oengus.svg" class="icon" alt="Oengus logo">
        <span>
          Oengus
        </span>
      </NuxtLink>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
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
      <div class="navbar-end">
        <NuxtLink :to="localePath('/about')" class="navbar-item">
          {{ $t('navbar.about') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/patrons')" class="navbar-item">
          {{ $t('navbar.patrons') }}
        </NuxtLink>
        <WidgetLanguagePicker class="navbar-item has-dropdown" />
        <WidgetSignInPicker class="navbar-item has-dropdown" />
      </div>
    </div>
  </nav>
</template>
