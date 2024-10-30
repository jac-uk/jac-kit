<template>
  <div />
</template>
<script>
import { splitWords } from '../../helpers/splitWords';
import { isValidUKMobile } from '../../helpers/Form/validatePhone';
export default {
  props: {
    id: {
      required: true,
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    label: {
      default: '',
      type: String,
    },
    hint: {
      default: '',
      type: String,
    },
    messages: {
      type: Object,
      default: () => {
        return {};
      },
    },
    required: {
      type: Boolean,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    maxLength: {
      type: Number,
      default: 0,
    },
    minDate: {
      type: Date,
      default: null,
    },
    maxDate: {
      type: Date,
      default: null,
    },
    pattern: {
      type: Object,
      default: () => {
        return {
          match: /^/,
          message: '',
        };
      },
    },
  },
  //emits: ['handle-error'],
  data() {
    return {
      errorMessage: '',
      checkErrors: false,
      regex: {
        // eslint-disable-next-line
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        tel: /(^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?#(\d{4}|\d{3}))?$)|(^\+?[1-9]\d{1,14}$)/,
      },
    };
  },
  computed: {
    hasError() {
      return this.errorMessage ? true :  false;
    },
    words() {
      const value = this.modelValue;
      const result = value ? value : '';
      return splitWords(result);
    },
  },
  mounted: function () {
    this.emitter.on('validate', this.handleValidate);
  },
  beforeUnmount: function() {
    this.setError('');
    this.emitter.off('validate', this.handleValidate);
  },
  methods: {
    setError(message) {
      this.errorMessage = message;
      this.emitter.emit('handle-error', { id: this.id, message: this.errorMessage });
    },
    handleValidate() {
      this.checkErrors = true;
      this.validate();
    },
    validate(event) {
      this.setError('');
      if (this.checkErrors) {
        let value = this.modelValue;
        if (event && event.target) {
          value = event.target.value;
        }
        const isNull = (value === null);
        const isUndefined = (value === undefined);
        const isEmpty = (value !== null && Array.isArray(value) && value.length === 0);
        const isEmptyString = (typeof value === 'string' && value.replace(/\s/g, '').length === 0);
        if (!this.required && ((isNull || isUndefined || isEmpty) || isEmptyString)) {
          return;
        }
        else if (this.required && ((isNull || isUndefined || isEmpty) || isEmptyString)) {
          if (this.messages && this.messages.required) {
            this.setError(this.messages.required);
          } else {
            this.setError(`Please enter a value for ${this.label}`);
          }
        }
        else if (this.type && !['date', 'text'].includes(this.type)) {
          // This block is for specialised inputs so we ignore date and text fields (so they hit the main validation block below)

          if (this.type === 'email') {
            if (value) {
              value = value.trim().toLowerCase();
            }
            this.text = value;
            if (!this.regex.email.test(value)) {
              this.setError(`Enter a valid email address for ${this.label}`);
            }
          }

          if (this.type === 'tel') {
            if (!this.regex.tel.test(value.replace(/ /g,''))) {
              this.setError(`Enter a valid phone number for ${this.label}`);
            }
          }

          if (this.type === 'mobile') {
            if (!isValidUKMobile(value)) {
              //this.setError(`Enter a valid mobile number for ${this.label}`);
              this.setError('Enter a valid UK mobile number');
            }
          }

          if (this.type && this.type === 'number' && this.numMax) {
            if (value > this.numMax) {
              this.setError(`Please enter a number lower than ${this.numMax}`);
            }
          }

        }
        else {
          if (this.minLength) {
            if (value.length + 1 <= this.minLength) {
              this.setError(`${this.label} should have ${this.minLength} or more characters`);
            }
          }

          if (this.maxLength) {
            if (value.length > this.maxLength) {
              this.setError(`${this.label} should have ${this.maxLength} or fewer characters`);
            }
          }

          if (this.pattern) {
            if (!this.pattern.match.test(value)) {
              this.setError(this.pattern.message);
            }
          }

          if (this.resolvedWordLimit) {
            if (this.words.length > this.resolvedWordLimit) {
              this.setError(`Answer must be ${this.resolvedWordLimit} words or fewer`);
            }
            else {
              this.setError('');
            }
          }
          if (this.minDate) {
            // we are only interested in the date portion
            if (this.atMidnight(value) < this.atMidnight(this.minDate)) {
              this.setError(`${this.label} cannot be before ${this.dateToDMY(this.minDate)}`);
            }
          }
          if (this.maxDate) {
            // we are only interested in the date portion
            if (this.atMidnight(value) > this.atMidnight(this.maxDate)) {
              this.setError(`${this.label} cannot be after ${this.dateToDMY(this.maxDate)}`);
            }
          }
        }

      }
    },
    atMidnight(date) {
      return new Date(date.getYear(),date. getMonth(), date.getDate());
    },
    dateToDMY(date) {
      const d = date.getDate();
      const m = date.getMonth() + 1; // because getMonth() is zero-based
      const y = date.getFullYear();
      return `${d.toString().padStart(2, '0')}/${m.toString().padStart(2, '0')}/${y.toString()}`; // dd/mm/yyyy format
    },
  },
};
</script>
