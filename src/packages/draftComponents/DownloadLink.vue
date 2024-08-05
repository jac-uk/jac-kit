<template>
  <div>
    <p class="govuk-visually-hidden">
      Checksum Valid: {{ checksumResult }}
    </p>

    <a
      v-if="fileName && isFileClean && linkHref"
      class="govuk-link govuk-body-m"
      :class="{'download-visited' : visited, 'govuk-button govuk-button--secondary': type === 'button' }"
      :download="fileName"
      :href="linkHref"
      @click.prevent="validateBeforeDownload"
    >
      {{ linkText }}
    </a>
    <span
      v-else
      class="govuk-body"
    >
      File not available
    </span>
  </div>
</template>

<script>
import { storage } from '@/firebase';
import { getDownloadURL, getMetadata, ref } from 'firebase/storage';
import { functions } from '@/firebase';
import { httpsCallable } from '@firebase/functions';

export default {
  name: 'DownloadLink',
  props: {
    fileName: {
      required: true,
      type: String,
      default: '',
    },
    filePath: {
      required: false,
      type: String,
      default: '',
    },
    exerciseId: {
      required: true,
      type: String,
      default: '',
    },
    applicationId: {
      required: false,
      type: String,
      default: '',
    },
    userId: {
      required: false,
      type: String,
      default: null,
    },
    assessorId: {
      required: false,
      type: String,
      default: '',
    },
    title: {
      required: false,
      type: String,
      default: '',
    },
    type: {
      required: false,
      type: String,
      default: 'link',
    },
  },
  data() {
    return {
      visited: false,
      linkHref: '',
      metadata: null,
      isFileClean: false,
      checksumResult: null, // To store the checksum validation result
    };
  },
  computed: {
    linkText() {
      return this.title ? this.title : this.fileName;
    },
    savePath() {
      let savePath = `exercise/${this.exerciseId}/`;
      if (this.applicationId) {
        savePath += `application/${this.applicationId}/`;
      }
      if (this.userId) {
        savePath += `user/${this.userId}/`;
      }
      if (this.assessorId) {
        savePath += `assessor/${this.assessorId}/`;
      }

      return savePath;
    },
    url() {
      return this.filePath ? this.filePath : this.savePath + this.fileName;
    },
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      // Check the metadata to determine if the file is safe for download
      this.metadata = await this.getMetadata();
      this.isFileClean = this.metadata?.customMetadata?.status === 'clean';

      // If the file is marked clean, generate the download URL
      if (this.isFileClean) {
        const downloadUrl = await this.getDownloadURL();
        if (downloadUrl) {
          this.linkHref = downloadUrl;
        }
      } else {
        console.error('File validation failed, download not allowed');
      }
    },
    async validateBeforeDownload(event) {
      // Perform the final checksum validation before download
      const isValid = await this.validateChecksum();

      if (isValid) {
        // If valid, trigger the download
        window.location.href = this.linkHref;
      } else {
        // If invalid, prevent the download and show an error message
        console.error('File checksum validation failed. Download aborted.');
        alert('This file is currently unavailable');
        event.preventDefault();
      }
    },
    async validateChecksum() {
      // Call the Cloud Function to validate the checksum
      const verifyFileChecksum = httpsCallable(functions, 'verifyFileChecksum');
      try {
        const result = await verifyFileChecksum({ filePath: this.url });

        this.checksumResult = result.data.valid; // Store the result
        return result.data.valid;
      } catch (error) {
        console.error('Checksum verification failed:', error);
        this.checksumResult = false; // Set as false if there's an error
        return false;
      }
    },
    async getMetadata() {
      try {
        const fileRef = ref(storage, this.url);
        return await getMetadata(fileRef);
      } catch (e) {
        return null;
      }
    },
    async getDownloadURL() {
      const fileRef = ref(storage, this.url);
      try {
        const downloadUrl = await getDownloadURL(fileRef);
        return downloadUrl;
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.download-visited {
  color: #4c2c92;
}
</style>
