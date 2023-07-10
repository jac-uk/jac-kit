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

    <ckeditor
      :id="id"
      v-model="text"
      class="govuk-textarea"
      :editor="editor"
      :config="editorConfig"
      @change="validate"
    />
  </div>
</template>

<script>
import FormField from './FormField';
import FormFieldError from './FormFieldError';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
// Test
export default {
  compatConfig: {
    COMPONENT_V_MODEL: false,
    // or, for full vue 3 compat in this component:
    //MODE: 3,
  },
  components: {
    FormFieldError,
    ckeditor: CKEditor.component,
  },
  extends: FormField,
  props: {
    modelValue: {
      default: '',
      type: String,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList'],
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'govuk-body' },
            { model: 'heading1', view: 'h2', title: 'Heading', class: 'govuk-heading-m' },
          ],
        },
        link: {
          addTargetToExternalLinks: true,
        },
      },
    };
  },
  computed: {
    text: {
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

<style lang="scss">

:root {
  --ck-font-size-base: 19px;
}

.ck-editor {
  .ck-editor__top {
    border: 2px solid black;
    .ck-toolbar {
      background-color: transparent;
    }
  }
  .ck-editor__main {
    border: 2px solid black;
    border-top: none;
  }
}

</style>
