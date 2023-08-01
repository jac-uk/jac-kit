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
        0 results
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
        <p class="govuk-!-font-weight-bold">
          There are no matching results.
        </p>
        <p>
          Improve your search results by:
        </p>
        <ul class="govuk-list govuk-list--bullet">
          <li>removing filters</li>
          <li>double-checking your spelling</li>
          <li>using fewer keywords</li>
          <li>searching for something less specific</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmptySearchResults',
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
