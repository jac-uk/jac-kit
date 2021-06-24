<template>
  <div>
    <div class="modal__title govuk-!-padding-2 govuk-heading-m">
      {{ title }}
    </div>
    <p class="modal__message govuk-body-l">
      {{ message }}
    </p>
    <div class="modal__content govuk-!-margin-6">
      <div class="govuk-grid-row">
        <form
          ref="formRef"
        >
          <span v-show="cancelable">
            <button
              class="govuk-button govuk-button--secondary govuk-!-margin-right-3 deny info-btn--modal--cancel"
              @click.prevent="closeModal"
            >
              Cancel
            </button>
          </span>
          <button
            class="govuk-button govuk-button--success info-btn--modal--success"
            @click.prevent="confirmModal"
          >
            {{ buttonText }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalInner',
  props: {
    cancelable: {
      type: Boolean,
      default: true,
    },
    index: {
      type: Number,
      default: NaN,
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
      this.$emit('close', this.index);
    },
    confirmModal() {
      this.$emit('confirmed', this.index);
    },
  },
};
</script>

<style lang="css" scoped>
.modal {
  text-align: center;
}
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
