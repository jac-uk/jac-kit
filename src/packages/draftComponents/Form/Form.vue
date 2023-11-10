<template>
  <div />
</template>

<script>
import { nextTick } from 'vue';
export default {
  data() {
    return {
      errorObject: {},
      errors: [],
    };
  },
  mounted: function () {
    this.emitter.on('handle-error', this.handleError);
  },
  beforeUnmount: function() {
    this.emitter.off('handle-error', this.handleError);
  },
  methods: {
    async validate() {
      this.emitter.emit('validate');
    },
    handleError(payload) {
      this.errorObject[payload.id] = payload.message;
      this.errors = []; // re-populate errors
      for (const item in this.errorObject) {
        if (this.errorObject[item]) {
          this.errors.push({ id: item, message: this.errorObject[item] });
        }
      }
      if (this.errors.length) {
        this.$nextTick(() => {  // Use nextTick as the error summary isn't displayed until after render
          this.scrollToErrorSummary();
        });
      }
    },
    scrollToErrorSummary(){
      if (document.getElementById('error-summary')) {
        document.getElementById('error-summary').scrollIntoView(); 
      }
    },
    isValid() {
      return this.errors.length === 0;
    },
    async validateAndSave() {
      this.validate();
      if (this.isValid()) {
        this.save(true);
      }
    },
  },
};
</script>
