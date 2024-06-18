<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <label
      :for="id"
      :class="labelHidden ? 'govuk-visually-hidden' : 'govuk-heading-m govuk-!-margin-bottom-2'"
    >
      {{ label }}
    </label>
    <CustomHTML
      v-if="hint"
      :value="hint"
      class="govuk-hint"
    />
    <FormFieldError
      :id="id"
      :error-message="errorMessage"
    />
    <textarea
      :id="id"
      v-model="text"
      class="govuk-textarea"
      :class="disabled ? 'disabled': ''"
      name="word-count"
      :rows="rows"
      :disabled="disabled"
      :style="style"
      @input="validate"
      @keydown="handleLimit($event)"
      @keyup="handleLimit($event)"
      @change="validate"
    />

    <div
      v-if="resolvedWordLimit"
      class="govuk-hint govuk-character-count__message"
    >
      <span
        :class="wordsTooMany > 0 ? 'govuk-error-message' : ''"
      >
        {{ wordLimitCount }}
      </span>
    </div>
  </div>
</template>

<script>

/**
 * @TODO: This component is more recent than TextareaInput and should replace it once it's established that it works ok
 */

import FormField from './FormField.vue';
import FormFieldError from './FormFieldError.vue';
import CustomHTML from '../../components/CustomHTML.vue';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  name: 'TextareaInput',
  components: {
    FormFieldError,
    CustomHTML,
  },
  extends: FormField,
  props: {
    modelValue: {
      default: '',
      type: String,
    },
    rows: {
      default: '5',
      type: String,
    },
    wordLimit: {
      required: false,
      default: 0,
      type: Number,
    },
    labelHidden: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    style: {
      default: () => {},
      type: Object,
    },
    hint: {
      type: String,
      required: false,
      default: () => '',
    },
    // Specify properties specific to the type of input (to assist with using the InformationReviewRenderer)
    typeProps: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  computed: {
    resolvedWordLimit() {
      // if the word limit is set in the typeProps then use this, else use the one passed directly to the component
      // this is to resolve difficulty passing the word limit down from the InformationReviewRenderer
      return this.typeProps?.wordLimit ?? this.wordLimit;
    },
    wordsTooMany() {
      return this.words.length - this.resolvedWordLimit;
    },
    wordLimitCount() {
      let result;
      const plural = Math.abs(this.wordsTooMany) > 1 ? 's' : '';
      if (this.words.length > this.resolvedWordLimit) {
        result = `You have ${this.wordsTooMany} word${plural} too many`;
      } else if (Math.floor(this.resolvedWordLimit * 0.20) > Math.abs(this.wordsTooMany)) {
        result = `You have ${Math.abs(this.wordsTooMany)} word${plural} remaining`;
      } else {
        result = `${this.words.length}/${this.resolvedWordLimit}`;
      }
      if (this.wordsTooMany == 0) {
        result = 'You have no words remaining';
      }
      return result;
    },
    text: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },

  methods: {
    handleLimit(e){
      if (this.resolvedWordLimit && [8, 46].indexOf(e.keyCode) === -1) {
        this.handleValidate();
      }
    },
  },
};
</script>
<style>
.disabled {
  background-color: darkgrey;
}
</style>
