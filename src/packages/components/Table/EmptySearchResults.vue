<template>
  <div
    class="govuk-grid-column-two-thirds govuk-!-padding-left-0"
    aria-label="Search results"
  >
    <div
      class="result-info"
    >
      <div class="govuk-grid-row">
        <h2
          class="govuk-heading-s govuk-!-margin-bottom-2 govuk-!-margin-left-3"
        >
          There are no matching results.
        </h2>
      </div>
      <div class="facet-tags__container">
        <span class="govuk-visually-hidden">
          0 results
        </span>
        <div class="facet-tags" />
      </div>
    </div>
    <div>
      <div class="govuk-body">
        <p>
          Increase your search results by:
        </p>
        <ul
          class="govuk-list govuk-list--bullet"
        >
          <li v-if="hasVisibleFields">
            Ensuring your search term matches one of the following fields:
            <ul class="govuk-!-padding-left-4">
              <li
                v-for="field in searchMap.tooltip.visible"
                :key="field"
              >
                {{ field }}
              </li>
            </ul>
          </li>
          <li>Removing filters</li>
          <li>Double-checking your spelling</li>
          <li>Using fewer keywords</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import searchMixin from '@/mixins/searchMixin';
export default {
  name: 'EmptySearchResults',
  mixins: [searchMixin],
  props: {
    searchMap: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>
<style lang="scss" scoped>
.result-info {
    margin: 0 0 20px 0;
    border-bottom: solid 1px #0b0c0c;
  }
  .facet-tags__container {
    display: none;
  }
  @media (min-width: 40.0625em) {
    .facet-tags__container {
        display:block;
    }
  }
  .facet-tags {
    padding-bottom: 5px;
  }
  .live-search-loading-message {
    margin-bottom: 20px;
    display: none;
  }
</style>
