<template>
  <div
    :id="id"
    class="govuk-form-group"
    :class="{'govuk-form-group--error': hasError}"
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
      <div class="govuk-radios" :class="{'govuk-radios--inline': inline}">
        <slot />
      </div>
    </fieldset>
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
  name: 'RadioGroup',
  components: {
    FormFieldError,
  },
  extends: FormField,
  props: {
    modelValue: {
      required: true,
      validator: () => true,
    },
    inline: { // If true then make the radio buttons inline (ie horizontal alignment)
      type: Boolean,
      required: false,
      default: false,
    }
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
};
</script>
