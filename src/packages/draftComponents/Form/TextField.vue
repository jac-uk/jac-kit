<template>
  <div
    class="govuk-form-group"
    :class="{ 'govuk-form-group--error': hasError }"
  >
    <label
      :for="id"
      class="govuk-heading-m govuk-!-margin-bottom-2"
    >
      {{ label }}
    </label>
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
    <input
      :id="id"
      v-model="value"
      class="govuk-input"
      :class="[inputClass, { 'govuk-input--error': hasError }]"
      :type="fieldType"
      :autocomplete="localAutocomplete"
      @input="validate"
    >
  </div>
</template>

<script>
import FormField from './FormField';
import FormFieldError from './FormFieldError';
export default {
  // Below needs to be included while using vue2 compat mode else get warnings - check if it actually does get rid of the warnings!!
  compatConfig: {
    MODE: 3,
  },
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    inputClass: {
      default: '',
      type: String,
    },
    modelValue: {
      default: '',
      type: [String, Number],
    },
    type: {
      default: 'text',
      type: String,
    },
    autocomplete: {
      default: 'on',
      type: String,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(val) {
        val = val.trim();
        switch (this.type) {
        case 'number':
          this.$emit('update:modelValue', val ? parseFloat(val) : '');
          break;
        default:
          this.$emit('update:modelValue', val);
        }
      },
    },
    localAutocomplete() {
      if (this.autocomplete === 'off') {
        return 'new-password';  // To force prevent autofill!
      }
      switch (this.type) {
      case 'tel':
      case 'email':
        return this.type;
      default:
        return null;
      }
    },

    fieldType() {
      switch (this.type) {
      case 'text':
      case 'email':
        return 'text'; // we are using custom email validation, so don't use html5 input types
      default:
        return this.type;
      }
    },
  },
};
</script>
