<template>
  <div />
</template>
<script>
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
      const value = this.value;
      const result = value ? value : '';
      return [].concat(...result
        .split(/[^a-z'-]/i) //split into array at every occurance of a character which is NOT: a-z or ' or -
        .filter(item => item != '') // remove any empty items from array
        .filter(item => item != '\'') // remove any items which are just a apostrophe
        .filter(item => item != '-') // remove any items which are just a hyphen
        .map((item, i) => {                                           // with the above array
          if (i, item.replace(/[^-]/g, '').length >= 4) {             // find any items containing more than or equal to 4 hyphens (4 allows for a trailing hyphen which is not counted in next set)
            item = item.match(/((?:[^-]*?-){3}[^-]*?)-|([\S\s]+)/g);  // if an 'offending' item occurs, group every 4 words, ignoring the hyphen between groups [ie. 'one-one-one-one-two-two-two-two' (eight words, seven hyphens) 'one-one-one-one-' 'two-two-two-two']
          }
          return item; // add array in position of word
        })); // flatten array
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
        let value = this.value;
        if (event && event.target) {
          value = event.target.value;
        }

        if (this.type) {
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

          if (this.type && this.type === 'number' && this.numMax) {
            if (value > this.numMax) {
              this.setError(`Please enter a number lower than ${this.numMax}`);
            }
          }
        } else {
          if (this.required && ((value === null || value === undefined || value.length === 0) || (typeof value === 'string' && value.replace(/\s/g, '').length === 0))) {
            if (this.messages && this.messages.required) {
              this.setError(this.messages.required);
            } else {
              this.setError(`Please enter a value for ${this.label}`);
            }
          }

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

          if (this.wordLimit) {
            if (this.words.length > this.wordLimit) {
              this.setError(`Answer must be ${this.wordLimit} words or fewer`);
            } else {
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
