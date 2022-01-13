<template>
  <article class="box">
    <h3 class="title is-3">
      {{ $t('aboutPage.privacy.title') }}
    </h3>
    <i18n path="aboutPage.privacy.par1" tag="p">
      <template #oengus-link>
        <a href="https://oengus.io">https://oengus.io</a>
      </template>
    </i18n>
    <p>{{ $t('aboutPage.privacy.par2') }}</p>
    <p>{{ $t('aboutPage.privacy.par3') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.log.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.log.par1') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.cookies.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.cookies.par1') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.thirdParty.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.thirdParty.par1') }}</p>
    <p>{{ $t('aboutPage.privacy.thirdParty.par2') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.children.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.children.par1') }}</p>
    <p>{{ $t('aboutPage.privacy.children.par2') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.online.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.online.par1') }}</p>
    <br>
    <h4 class="title is-4">
      {{ $t('aboutPage.privacy.consent.title') }}
    </h4>
    <p>{{ $t('aboutPage.privacy.consent.par1') }}</p>
  </article>
</template>
