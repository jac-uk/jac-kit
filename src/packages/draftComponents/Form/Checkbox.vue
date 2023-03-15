<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <label
      :for="id"
      class="govuk-heading-m govuk-!-margin-bottom-2"
    >
      {{ label ? label : '' }}
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
    <div class="govuk-checkboxes">
      <div class="govuk-checkboxes__item">
        <input
          :id="id"
          v-model="localValue"
          class="govuk-checkboxes__input"
          :class="[inputClass, {'govuk-input--error': hasError}]"
          type="checkbox"
        >
        <label
          class="govuk-label govuk-checkboxes__label"
          :for="id"
        >
          <slot />
        </label>
      </div>
    </div>
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
    inputClass: {
      default: '',
      type: String,
    },
    modelValue: {
      default: '',
      type: [String, Number, Boolean],
    },
  },
  emits: ['update:modelValue'],
  computed: {
    localValue: {
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
