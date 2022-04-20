<template>
  <div>
    <WidgetLoading :while="[ user ]" class="is-centered" />
    <ElementTable v-show="submissions" is-divided class="submission-table">
      <ElementTableCell is-header class="marathon">
        {{ $t('marathon.submissions.table.marathon') }}
      </ElementTableCell>
      <ElementTableCell is-header class="game">
        {{ $t('marathon.submissions.table.game') }}
      </ElementTableCell>
      <ElementTableCell is-header class="category">
        {{ $t('marathon.submissions.table.category') }}
      </ElementTableCell>
      <ElementTableCell is-header class="estimate">
        {{ $t('marathon.submissions.table.estimate') }}
      </ElementTableCell>
      <ElementTableCell is-header class="status">
        {{ $t('marathon.submissions.table.status') }}
      </ElementTableCell>

      <template v-for="(marathon, marathonIndex) in submissions">
        <ElementTableCell v-if="getCategories(marathon).length" :key="`marathon-${marathonIndex}`" class="marathon" :class="getCellColor(marathon)" :row-end="getSpan(marathon)">
          <ElementLink :to="`/marathon/${marathon.marathonId}`">{{ marathon.marathonName }}</ElementLink>
          (<ElementTemporalDistance :datetime="marathon.marathonStartDate" />)
        </ElementTableCell>

        <template v-for="(game, gameIndex) in marathon.games">
          <ElementTableCell v-if="getCategories(game).length" :key="`game-${marathonIndex}-${gameIndex}`" class="game" :class="getCellColor(game)" :row-end="getSpan(game)">
            {{ game.name }}
          </ElementTableCell>

          <template v-for="(category, categoryIndex) in game.categories">
            <ElementTableCell :key="`category-${marathonIndex}-${gameIndex}-${categoryIndex}`" class="category" :class="getCellColor(category)">
              {{ category.name }}
            </ElementTableCell>

            <ElementTableCell :key="`estimate-${marathonIndex}-${gameIndex}-${categoryIndex}`" class="estimate" :class="getCellColor(category)">
              <ElementTemporalDuration :duration="category.estimate" />
            </ElementTableCell>

            <ElementTableCell :key="`status-${marathonIndex}-${gameIndex}-${categoryIndex}`" class="status" :class="getCellColor(category)">
              {{ $t(`marathon.selection.status.${category.status}`) }}
            </ElementTableCell>
          </template>
        </template>
      </template>
    </ElementTable>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { RunStatus } from '~/types/api/enums/run';
import { History, HistoryGame, HistoryGameCategory } from '~/types/api/history';
import { User, UserState } from '~/types/api/user';

export default Vue.extend({
  props: {
    userId: {
      type: String,
      default: '',
    },
  },

  async fetch(): Promise<void> {
    await Promise.allSettled([
      this.getUser(this.userId),
    ]);
  },

  computed: {
    user(): User|undefined {
      return (this.$store.state.api.user as UserState).users[this.userId];
    },
    submissions(): Array<History>|undefined {
      return this.user?.history;
    },
  },

  methods: {
    getSpan(element: History|HistoryGame): string {
      return `span ${this.getCategories(element).length}`;
    },
    getCellColor(element: History|HistoryGame|HistoryGameCategory): { 'is-success': boolean, 'is-info': boolean, 'is-primary': boolean, 'is-warning': boolean } {
      const status = this.getCategories(element)
        .reduce((currentStatus, category) => Math.min(currentStatus, RunStatus[category.status]), Infinity);
      return {
        'is-info': status === RunStatus.VALIDATED,
        'is-primary': status === RunStatus.BONUS,
        'is-success': status === RunStatus.BACKUP,
        'is-warning': status === RunStatus.REJECTED,
      };
    },
    getCategories(element: History|HistoryGame|HistoryGameCategory): Array<HistoryGameCategory> {
      return this.isCategory(element)
        ? [ element ]
        : (
            this.isGame(element)
              ? element.categories
              : element.games.reduce((categories, game) => [ ...categories, ...game.categories ], [ ] as Array<HistoryGameCategory>)
          );
    },
    isMarathon(element: History|HistoryGame|HistoryGameCategory): element is History {
      return Object.prototype.hasOwnProperty.call(element, 'games');
    },
    isGame(element: History|HistoryGame|HistoryGameCategory): element is HistoryGame {
      return Object.prototype.hasOwnProperty.call(element, 'categories');
    },
    isCategory(element: History|HistoryGame|HistoryGameCategory): element is HistoryGameCategory {
      return Object.prototype.hasOwnProperty.call(element, 'status');
    },
    ...mapActions({
      getUser: 'api/user/get',
    }),
  },
});
</script>

<style lang="scss" scoped>
@use '~assets/table';

.submission-table {
  @include table.shrink($default-template-columns: 5, $shrinking-rules: (
    768px '.estimate' 4,
    600px '.status' 3,
  ));
}

@media (max-width: 500px) {
  // At really small sizes, long names can become problematic
  // this allows them to take scrollbars instead. We don't do this at every
  // size, since doing this forces scrolls when they aren't needed
  ::v-deep .element-table-cell {
    overflow-x: auto;
  }
}
</style>
