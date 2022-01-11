<template>
  <div class="homepage-grid">
    <HomepageWelcome class="welcome" />
    <HomepageMarathons class="marathons" />
    <div class="extra">
      <!-- So, you've come here to add stuff to the homepage. Make a component, put it here -->
      <HomepageKaspersky />
      <HomepageSponsors />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homepage-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto 1fr;
  gap: var(--spacing);
  grid-template-areas:
    'welcome marathons'
    'extra   marathons';
  align-items: start;

  > * {
    margin: 0;
  }

  .welcome {
    grid-area: welcome;
    order: 1;
  }

  .marathons {
    grid-area: marathons;
    order: 2;
  }

  .extra {
    grid-area: extra;
    order: 3;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing);

    > * {
      margin: 0;
    }
  }
}

@media (max-width: 1023px) {
  // When stuff starts to get cramped, give the elements some breathing room
  .homepage-grid {
    display: flex;
    flex-direction: column;
  }
}
</style>
