<template>
  <div />
</template>

<script>
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
        this.scrollToErrorSummary();
      }
    },
    scrollToErrorSummary(){
      //This is just scrolling to top of page
      this.$el.scrollIntoView();
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
