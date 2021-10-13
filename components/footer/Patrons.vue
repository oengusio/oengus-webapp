<template>
  <div>
    <div class="is-centered">
      <a href="https://www.patreon.com/oengusio" target="_blank" class="patreon-brand-container">
        <img src="/patreon/Digital-Patreon-Logo_FieryCoral.png" alt="Patreon Logo">
        <img src="/patreon/Digital-Patreon-Wordmark_White.png" alt="Patreon Wordmark">
      </a>
    </div>
    <i18n path="footer.patron.enjoyOengus" tag="p">
      <template #patronLink>
        <a href="https://www.patreon.com/oengusio" target="_blank">
          {{ $t('footer.patron.patronLink') }}
        </a>
      </template>
    </i18n>
    <p>
      {{ $t('footer.patron.list') }}
    </p>
    <PatronList />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:math' as math;
$logo-height: 40px;

.patreon-brand-container {
  display: flex;
  height: $logo-height;
  // The size of the "O" or the loop in the "P" logo is 2/3rds the height
  margin-block: math.div(4, 3) * $logo-height;
  gap: math.div(2, 3) * $logo-height;
  justify-content: center;
  align-items: center;

  img {
    height: $logo-height;
  }
}
</style>

<!-- Temporary language info to avoid having the i18n string -->
<i18n>
{
  "en-GB": {
    "footer": {
      "patron": {
        "enjoyOengus": "If you enjoy Oengus, please consider {patronLink}",
        "patronLink": "becoming a patron",
        "list": "Thank you to our patrons listed below whose contributions keep Oengus free for everyone"
      }
    }
  }
}
</i18n>

