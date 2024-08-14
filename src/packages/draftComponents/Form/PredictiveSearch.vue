<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <h1 class="govuk-label-wrapper">
      <label
        class="govuk-label govuk-label--l"
        :for="id"
      >
        {{ label }}
      </label>
    </h1>
    <span
      v-if="hint"
      class="govuk-hint"
    >
      {{ hint }}
    </span>
    <FormFieldError
      :id="id"
      :error-message="errorMessage"
    />
    <div class="autocomplete-container">
      <input
        :id="id"
        v-model="searchTerm"
        class="govuk-input"
        :class="{'govuk-input--error': hasError}"
        :required="required"
        aria-autocomplete="list"
        aria-controls="autocomplete-list"
        @input="onInput"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
      >
      <ul
        v-if="filteredResults.length"
        id="autocomplete-list"
        class="govuk-list govuk-list--unstyled autocomplete-list"
      >
        <li
          v-for="(result, index) in filteredResults"
          :key="result.id"
          :class="{'govuk-list__item--highlighted': highlightedIndex === index}"
          @mousedown="onSelect(result)"
          @mouseover="highlightedIndex = index"
        >
          {{ result.name }} - {{ result.referenceNumber }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FormField from '.FormField.vue';
import FormFieldError from './FormFieldError.vue';

export default {
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    modelValue: {
      default: '',
      type: [Object, String, Number, Boolean],
    },
    data: {
      type: Array,
      default: () => [],
    },
    searchFields: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
    label: String,
    hint: String,
    required: Boolean,
    errorMessage: String,
  },
  data() {
    return {
      searchTerm: '',
      filteredResults: [],
      highlightedIndex: -1,
    };
  },
  computed: {
    hasError() {
      return !!this.errorMessage;
    },
  },
  methods: {
    filterResults() {
      if (!this.searchTerm) {
        this.filteredResults = [];
        return;
      }

      const searchTerm = this.searchTerm.toLowerCase();
      this.filteredResults = this.data.filter(item => {
        return this.searchFields.some(field =>
          item[field].toLowerCase().includes(searchTerm)
        );
      });
    },
    onInput() {
      this.filterResults();
    },
    onArrowDown() {
      if (this.highlightedIndex < this.filteredResults.length - 1) {
        this.highlightedIndex += 1;
      }
    },
    onArrowUp() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex -= 1;
      }
    },
    onEnter() {
      if (this.highlightedIndex >= 0 && this.filteredResults[this.highlightedIndex]) {
        this.onSelect(this.filteredResults[this.highlightedIndex]);
      }
    },
    onSelect(result) {
      this.searchTerm = result.name; // or however you want to display the result
      this.$emit('update:modelValue', result);
      this.filteredResults = [];
      this.highlightedIndex = -1;
    },
  },
};
</script>

<style scoped>
.autocomplete-container {
  position: relative;
}

.autocomplete-list {
  position: absolute;
  width: 100%; /* Match the width of the input */
  border: 1px solid #b3b3b3;
  border-top: none;
  background: #fff;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.govuk-list__item {
  padding: 8px;
  cursor: pointer;
}

.govuk-list__item--highlighted {
  background-color: #b3d4fc;
}

.govuk-input--error {
  border-color: #d4351c;
  box-shadow: 0 0 0 2px rgba(211, 53, 28, 0.2);
}
</style>
