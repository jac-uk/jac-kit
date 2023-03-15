<template>
  <div
    :id="id"
    class="govuk-form-group"
    :class="{ 'govuk-form-group--error': hasError }"
  >
    <fieldset
      class="govuk-fieldset"
      :aria-describedby="hint ? hintId : null"
    >
      <legend
        v-if="label"
        class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-2"
      >
        {{ label }}
      </legend>
      <span
        v-if="hint"
        :id="hintId"
        class="govuk-hint"
      >
        {{ hint }}
      </span>
      <FormFieldError
        :id="id"
        :error-message="errorMessage"
      />
      <div class="govuk-checkboxes">
        <slot v-if="inputValue instanceof Array" />
      </div>
    </fieldset>
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
  name: 'CheckboxGroup',
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    // value: {
    //   required: true,
    //   validator: value => value instanceof Array || value === null || value === undefined,
    // },
    modelValue: {
      required: true,
      validator: value => value instanceof Array || value === null || value === undefined,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
    hintId() {
      return `${this.id}__hint`;
    },
  },
  created() {
    if (!(this.value instanceof Array)) {
      //this.$emit('input', []);
      this.$emit('update:modelValue', []);
    }
  },
};
</script>
