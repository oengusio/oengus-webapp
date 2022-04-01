<template>
  <ElementTableRow v-if="submission">
    <ElementTableCell class="user" column-start="1" column-end="-1">
      <User :user="submission.user" />
    </ElementTableCell>

    <ElementTableCell class="runner-spacer" :row-end="runnerSpan" />
    <template v-for="game in submission.games">
      <ElementTableCell :key="`game-${game.id}`" class="game" column-start="2" column-end="-2">
        {{ game.name }}
      </ElementTableCell>
      <ElementTableCell :key="`console-${game.id}`" class="console">
        <ElementConsole :console="game.console" :is-emulated="game.emulated" />
      </ElementTableCell>

      <ElementTableCell :key="`game-spacer-${game.id}`" class="game-spacer" :row-end="gameSpan(game)" />
      <template v-for="category in game.categories">
        <ElementTableRow :key="`category-row-${category.id}`" :class="categoryClass(category.id)">
          <ElementTableCell :key="`category-${category.id}`" class="category">
            {{ category.name }}
          </ElementTableCell>
          <ElementTableCell :key="`run-type-${category.id}`" class="run-type">
            {{ $t(`marathon.schedule.type.${category.type}`) }}
          </ElementTableCell>
          <ElementTableCell :key="`estimate-${category.id}`" class="estimate">
            <ElementTemporalDuration :duration="category.estimate" />
          </ElementTableCell>
          <ElementTableCell :key="`video-${category.id}`" class="video">
            <a :href="category.video">
              <FontAwesomeIcon :icon="[ 'fas', 'film' ]" />
            </a>
          </ElementTableCell>
        </ElementTableRow>
      </template>
    </template>
  </ElementTableRow>
</template>

<script lang="ts">
import Vue from 'vue';
import { RunStatus } from '~/types/api/enums/run';
import { Selections } from '~/types/api/selection';
import { Submission, SubmissionGame } from '~/types/api/submission';

export default Vue.extend({
  props: {
    submission: {
      type: Object as () => Submission,
      default: undefined,
    },
    selections: {
      type: Object as () => Selections,
      // An empty object
      default: () => ({ }),
    },
  },

  computed: {
    runnerSpan(): string {
      return `span ${this.submission.games.reduce((count, game) => count + game.categories.length + 1, 0)}`;
    },
  },

  methods: {
    gameSpan(game: SubmissionGame): string {
      return `span ${game.categories.length}`;
    },
    categoryClass(categoryId: number): { 'is-success': boolean, 'is-info': boolean, 'is-primary': boolean, 'is-warning': boolean } {
      const status = this.selections[categoryId]?.status;
      return {
        'is-info': RunStatus[status] === RunStatus.VALIDATED,
        'is-primary': RunStatus[status] === RunStatus.BONUS,
        'is-success': RunStatus[status] === RunStatus.BACKUP,
        'is-warning': RunStatus[status] === RunStatus.REJECTED,
      };
    },
  },
});
</script>
