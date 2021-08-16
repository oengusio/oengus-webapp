<template>
  <div class="marathon-container">
    <MarathonSidebar class="marathon-sidebar" />
    <NuxtChild class="marathon-view" />
  </div>
</template>

<style lang="scss" scoped>
  .marathon-container {
    width: 100%;
    display: flex;
    gap: var(--spacing);
  }

  .marathon-sidebar {
    width: 350px;
    flex-grow: 1;
  }

  .marathon-view {
    width: 100%;
    flex-grow: 5;
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
