<template>
  <div
    class="govuk-form-group"
    :class="{ 'govuk-form-group--error' : hasError }"
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
    <span class="moj-label__currency">£</span>
    <input
      :id="id"
      v-model="currencyInput"
      class="govuk-input moj-input__currency govuk-!-width-one-third"
      type="number"
      step=".01"
      @change="validate"
    >
  </div>
</template>

<script>
import FormField from './FormField';
import FormFieldError from './FormFieldError';

export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    modelValue: {
      default: '',
      type: String,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    currencyInput: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
};
</script>

