<template>
  <div>
    <div
      v-if="!loadFailed"
      style="display: flex; align-items: center; gap: 8px;"
    >
      <Spinner />
      Loading...
    </div>
    <div
      v-else
      ref="errorMessage"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1>Something went wrong</h1>
          <p>Reload the page and try again</p>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- todo: remove this note (here re:change detection) -->
<script>
import Spinner from './Spinner.vue';
export default {
  components: {
    Spinner,
  },
  props: {
    loadFailed: Boolean,
  },
};
</script>
