<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
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
    <textarea
      :id="id"
      v-model="value"
      class="govuk-textarea"
      :rows="rows"
      @input="validate"
    />
  </div>
</template>

<script>
import FormField from './FormField.vue';
import FormFieldError from './FormFieldError.vue';

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
    rows: {
      default: '5',
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
        this.$emit('update:modelValue', val);
      },
    },

  },
};
</script>
