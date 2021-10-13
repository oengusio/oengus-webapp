<template>
  <div class="box">
    <h3 class="title is-3">
      {{ $t('patrons.title') }}
    </h3>
    <p>{{ $t('patrons.par1') }}</p>
    <p v-html="$t('patrons.par2')" />
    <br>
    <PatronList />
  </div>
</template>
