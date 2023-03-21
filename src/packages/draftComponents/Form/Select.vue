<template>
  <div
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
  >
    <label
      v-if="label"
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
    <select
      :id="id"
      v-model="localModel"
      class="govuk-select"
      :class="{'govuk-input--error': hasError}"
      :required="required"
      @change="validate"
    >
      <slot />
    </select>
  </div>
</template>

<script>
import FormField from './FormField';
import FormFieldError from './FormFieldError';

export default {
  // Below needs to be included while using vue2 compat mode
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
      type: [String, Number, Boolean],
    },
    // value: {
    //   default: '',
    //   type: [String, Number, Boolean],
    // },
  },
  //emits: ['input'],
  emits: ['update:modelValue'],
  computed: {
    localModel: {
      get() {
        //return this.value;
        return this.modelValue;
      },
      set(val) {
        //this.$emit('input', val);
        this.$emit('update:modelValue', val);
      },
    },
  },
};
</script>
