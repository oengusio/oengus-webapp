<template>
  <div class="marathon-container">
    <MarathonSidebar class="marathon-sidebar" />
    <NuxtChild class="marathon-view" />
  </div>
</template>

<style lang="scss" scoped>
  .marathon-container {
    display: flex;
    gap: var(--spacing);
  }

  .marathon-sidebar {
    width: 350px;
  }

  @media (max-width: 1023px) {
    .marathon-container {
      flex-direction: column;
    }

    .marathon-sidebar {
      width: 100%;
    }
  }
</style>
