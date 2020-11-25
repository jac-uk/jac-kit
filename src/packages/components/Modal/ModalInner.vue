<template>
  <div>
    <div class="modal__title govuk-!-padding-2 govuk-heading-m">
      {{ title }}
    </div>
    <div class="modal__content govuk-!-padding-4">
      <p class="modal__message govuk-body-l">
        {{ message }}
      </p>

      <span v-show="cancelable">
        <button
          class="govuk-button govuk-button--secondary govuk-!-margin-right-3 deny info-btn--modal--cancel"
          @click="closeModal"
        >
          Cancel
        </button>
      </span>
      <button class="govuk-button govuk-button--success info-btn--modal--success" @click="confirmModal">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalInner",
  props: {
    cancelable: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'Are you sure?',
    },
    buttonText: {
      type: String,
      default: 'Accept',
    },
    message: {
      type: String,
      default: 'Please Confirm',
    },
  },
  methods: {
    closeModal() {
      this.$emit('closed');
    },
    confirmModal() {
      this.$emit('confirmed');
    },
  },
};
</script>

<style lang="css" scoped>
.modal__title {
  text-align: center;
  vertical-align: middle;
  border: solid 2px #1d70b8;
  background-color: #1d70b8;
  color: white;
}
.modal__message {
  vertical-align: middle;
}
.deny {
  background-color: #f3f2f1;
}
</style>
