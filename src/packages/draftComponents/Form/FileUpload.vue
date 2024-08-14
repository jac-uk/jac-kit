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
    <p
      v-if="haveFile && !isReplacing && !file"
      class="govuk-body-m"
    >
      Your file has been received.
      <a
        href="javascript:void(0)"
        class="govuk-link"
        @click.prevent="replaceFile"
      >Replace</a>
    </p>
    <p v-else-if="isUploading">
      Uploading...
    </p>
    <input
      v-else
      :id="id"
      ref="file"
      type="file"
      :accept="fileExtensions"
      class="govuk-file-upload"
      :class="{'govuk-input--error': hasError}"
      @change="fileSelected"
    >
    <span
      :if="!haveFile || (isReplacing && file)"
      class="govuk-hint"
    >
      Please ensure your file is in {{ formattedTypesWithOr }} format and is less than {{ sizeLimit }}MB
    </span>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from '@firebase/storage';
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
    path: {
      type: String,
      required: true,
      default: '',
    },
    modelValue: {
      default: '',
      type: String,
    },
    // value: {
    //   default: '',
    //   type: String,
    // },
    name: {
      type: String,
      required: true,
      default: '',
    },
    messages: {
      type: Object,
      default: () => {
        return {
          required: 'Please choose a file to upload',
        };
      },
    },
    types: {
      type: [Array, String],
      required: false,
      default: () => {
        return ['.pdf','.docx','.doc','.odt','.txt','.fodt'];
      },
    },
    enableDelete: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      file: '',
      isReplacing: false,
      isUploading: false,
      sizeLimit: 2,
    };
  },
  computed: {
    haveFile() {
      return this.modelValue ? true : false;
    },
    fileName: {
      get() {
        return this.modelValue;
      },
      set(val) {
        if (val) {
          this.$emit('update:modelValue', val);
        }
      },
    },
    formattedTypesWithOr() {
      return this.$props.types.length ? `${this.$props.types.join(', ')  } or ${  this.$props.types[this.$props.types.length - 1]}` : this.$props.types;
    },
    fileExtensions() {
      return this.$props.types.length ? this.$props.types.join(',') : this.$props.types;
    },
  },
  async mounted () {
    if (typeof this.fileName === 'string' && this.fileName.length) {
      const isUploaded = await this.verifyFile(this.fileName);

      if (!isUploaded) {
        this.fileName = '';
        this.resetFile();
      }
    }
  },
  methods: {
    replaceFile() {
      this.isReplacing = true;
    },
    fileSelected() {
      const file = this.$refs.file.files[0];
      this.setError('');
      return this.upload(file);
    },
    generateFileName(originalName) {
      // Ensure the filename is unique (this is beneficial for reactivity in other components)
      const parts = originalName.split('.');
      if ( parts.length === 1 || ( parts[0] === '' && parts.length === 2 )) {
        return this.getNumericalFileName(this.name);
      }
      return [this.getNumericalFileName(this.name), parts.pop()].join('.');
    },
    validFileExtension(originalName){
      const parts = originalName.split('.');
      if (parts.length < 2){
        return false;
      }
      const fileExtension = parts.pop();

      if (this.$props.types) {
        if (this.$props.types.includes(`.${fileExtension}`)) {
          return true;
        }
      }
      return false;
    },
    fileIsEmpty(size){
      return size <= 0;
    },
    fileIsTooBig(size){
      const megabyteSize = size / 1024 / 1024; // in MB
      return megabyteSize > this.sizeLimit;
    },
    resetFile() {
      this.isUploading = false;
    },
    async upload(file) {
      // @todo return more useful error messages
      if (!file) {
        this.setError('File upload failed, please try again [1]');
        return false;
      }
      if (!this.validFileExtension(file.name)) {
        this.setError(`Invalid file type. Please ensure the file is in ${this.formattedTypesWithOr} format`);
        return false;
      }
      if (this.fileIsEmpty(file.size)){
        this.setError('File is empty.');
        return false;
      }
      if (this.fileIsTooBig(file.size)){
        this.setError(`File is too large. Limit: ${this.sizeLimit}MB`);
        return false;
      }

      this.isUploading = true;
      const fileName = this.generateFileName(file.name);

      /**
       * @see https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_blob_or_file
       */
      const storage = getStorage();
      const uploadRef = ref(storage ,`${this.path}/${fileName}`);

      // Delete the current file in file storage
      if (this.haveFile && this.enableDelete) {
        this.deleteFile(this.path, this.modelValue);
      }

      try {
        await uploadBytes(uploadRef, file);
        this.isReplacing = false;
        this.fileName = fileName;

        return true;
      } catch (e) {
        this.setError('File upload failed, please try again [3]');

        return false;
      } finally {
        this.resetFile();
      }
    },
    async verifyFile(fileName) {
      if (!fileName) {
        return false;
      }

      const storage = getStorage();
      const fileRef = ref(storage, `${this.path}/${fileName}`);

      // Check if file exists in storage
      try {
        const downloadUrl = await getDownloadURL(fileRef);

        if (typeof downloadUrl === 'string' && downloadUrl.length) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    },
    getNumericalFileName(name) {
      const dateNow = new Date();
      const dateToNumber = `${dateNow.getFullYear()}${dateNow.getMonth() + 1}${dateNow.getUTCDate()}${dateNow.getHours()}${dateNow.getMinutes()}${dateNow.getSeconds()}`;
      return `${name} - ${dateToNumber}`;
    },
    deleteFile(path, filename) {
      /**
       * @see https://firebase.google.com/docs/storage/web/delete-files
       */
      const storage = getStorage();
      const deleteRef = ref(storage, `${path}/${filename}`);
      try {
        deleteObject(deleteRef);
      }
      catch (error) {
        // Uh-oh, an error occurred!
        // eslint-disable-next-line no-console
        console.log('error deleting a file:', error);

      }
    },
  },
};
</script>
