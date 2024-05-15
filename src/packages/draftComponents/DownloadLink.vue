<template>
  <a
    v-if="fileName && isFileClean && linkHref"
    class="govuk-link govuk-body-m"
    :class="{'download-visited' : visited, 'govuk-button govuk-button--secondary': type === 'button' }"
    :download="fileName"
    :href="linkHref"
  >
    {{ linkText }}
  </a>
  <span
    v-else
    class="govuk-body"
  >
    File not available
  </span>
</template>

<script>
import { storage } from '@/firebase'
import { getDownloadURL, getMetadata, ref } from 'firebase/storage'

export default {
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
  data () {
    return {
      visited: false,
      linkHref: '',
      metadata: null,
      isFileClean: false,
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
  watch: {
    async fileName() {
      // When the filename changes update the download link (so download links are not reactive unless the filename changes!)
      await this.init();
    },
  },
  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      this.metadata = await this.getMetadata();
      this.isFileClean = this.metadata?.customMetadata?.status === 'clean';
      if (this.isFileClean) {
        const downloadUrl = await this.getDownloadURL();
        if (downloadUrl) {
          this.linkHref = downloadUrl;
        }
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
      /**
       * @see https://firebase.google.com/docs/storage/web/download-files#download_data_via_url
       */
      const fileRef = ref(storage, this.url);
      try {
        const downloadUrl = await getDownloadURL(fileRef);

        if (typeof downloadUrl === 'string' && downloadUrl.length) {
          return downloadUrl;
        }
        return false;
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
