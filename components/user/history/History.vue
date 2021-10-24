<template>
  <div>
    <div class="tabs is-boxed">
      <ul>
        <li>
          <a>
            Submission History
          </a>
        </li>
        <li>
          <a>
            Moderated Marathons
          </a>
        </li>
      </ul>
    </div>
    <UserHistorySubmission :user-id="userId" />
    <UserHistoryModeration :user-id="userId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    userId: {
      type: String,
      default: '',
    },
  },
});
</script>
