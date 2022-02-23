<template>
  <nav class="element-table-paginator pagination is-centered" role="navigation" aria-label="pagination">
    <ElementLink class="pagination-previous">
      <FontAwesomeIcon :icon="[ 'fas', 'caret-left' ]" />
    </ElementLink>
    <ul class="pagination-list">
      <template v-for="pageMeta in pagesMeta">
        <li v-if="!pageMeta.spacer" :key="`link-${pageMeta.pageIndex}`">
          <ElementLink class="pagination-link" :class="isCurrent(pageMeta.pageIndex)">
              {{ $n(pageMeta.pageIndex + 1) }}
          </ElementLink>
        </li>
        <li v-else :key="`ellipsis-${pageMeta.pageIndex}`">
          <FontAwesomeIcon :icon="[ 'fas', 'ellipsis-h' ]" />
        </li>
      </template>
    </ul>
    <ElementLink class="pagination-next">
      <FontAwesomeIcon :icon="[ 'fas', 'caret-right' ]" />
    </ElementLink>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { OengusPagination } from '~/types/api/oengus-api';

interface PaginatorMeta {
  pageIndex: number;
  spacer: boolean;
}

export default Vue.extend({
  props: {
    pageData: {
      type: Object as () => OengusPagination<any>,
      default: undefined,
    },
  },

  computed: {
    pagesMeta(): Array<PaginatorMeta> {
      let pages = new Set([ this.pageData.number - 1, this.pageData.number, this.pageData.number + 1, this.pageData.totalPages - 1 ]);
      return [ ...pages.values() ]
        .filter(a => a > 0)
        .sort((a, b) => a - b)
        .reduce((pagesMeta, pageIndex) => {
          if (pagesMeta[pagesMeta.length - 1].pageIndex + 1 < pageIndex) {
            pagesMeta.push({ pageIndex, spacer: true });
          }
          pagesMeta.push({ pageIndex, spacer: false });
          return pagesMeta;
        }, [ { pageIndex: 0, spacer: false } ] as Array<PaginatorMeta>);
    },
  },

  methods: {
    isCurrent(pageIndex: number): { 'is-current': boolean } {
      return {
        'is-current': pageIndex === this.pageData.number,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.element-table-paginator {
  grid-column: 1/-1;
  display: flex;
  justify-content: flex-end;
  justify-content: end;

  > * {
    flex: none;
  }
}
</style>
