<template>
  <!-- XXX @click.native will stop working in Vue v3+ (Vue Router v4+), but @click should start working -->
  <nav class="element-table-paginator pagination is-centered" role="navigation" aria-label="pagination">
    <ElementLink class="button pagination-previous" @click.native="emitClick(pageData.number - 1)">
      <FontAwesomeIcon :icon="[ 'fas', 'caret-left' ]" />
    </ElementLink>
    <ul class="pagination-list">
      <template v-for="pageMeta in pagesMeta">
        <li v-if="!pageMeta.spacer" :key="`link-${pageMeta.pageIndex}`">
          <ElementLink class="button pagination-link" :class="isCurrent(pageMeta.pageIndex)" :to="linkTo(pageMeta.pageIndex)" @click.native="emitClick(pageMeta.pageIndex)">
            {{ $n(pageMeta.pageIndex + 1) }}
          </ElementLink>
        </li>
        <li v-else :key="`ellipsis-${pageMeta.pageIndex}`">
          <FontAwesomeIcon :icon="[ 'fas', 'ellipsis-h' ]" />
        </li>
      </template>
    </ul>
    <ElementLink class="button pagination-next" @click.native="emitClick(pageData.number + 1)">
      <FontAwesomeIcon :icon="[ 'fas', 'caret-right' ]" />
    </ElementLink>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { Location } from 'vue-router';
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
    /** Pass this to have paginator handle pagination via the given URL pattern, e.g. 'page/{}' makes ./page/1 */
    pageChangePathTemplate: {
      type: String,
      default: undefined,
    },
  },

  computed: {
    pagesMeta(): Array<PaginatorMeta> {
      const pages = new Set([ this.pageData.number - 1, this.pageData.number, this.pageData.number + 1, this.pageData.totalPages - 1 ]);
      return [ ...pages.values() ]
        // Exclude 0 because we always include 0 manually later
        .filter(a => a > 0 && a < this.pageData.totalPages)
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
    linkTo(pageNumber: number): undefined|Location {
      // Computers use 0-indexed, but humans like 1-indexed, so these all use 1-indexed
      pageNumber++;
      if (this.pageChangePathTemplate) {
        return { path: this.pageChangePathTemplate.replaceAll('{}', pageNumber.toString()) };
      }
    },
    emitClick(pageNumber: number) {
      this.$emit('pageChanged', pageNumber);
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
