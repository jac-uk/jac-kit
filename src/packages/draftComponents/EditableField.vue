<template>
  <div class="editable-field">
    <div
      v-if="!editField"
      class="non-editable"
    >
      <div
        v-if="value || (options && options.includes(value))"
        class="wrap"
      >
        <span v-if="isEmail">
          <a
            :href="`mailto:${value}`"
            class="govuk-link govuk-link--no-visited-state wrap"
            target="_blank"
          >
            {{ value }}
          </a>
        </span>

        <span v-if="isRoute">
          <RouterLink
            :to="{ ...routeTo }"
          >
            {{ value }}
          </RouterLink>
        </span>

        <p
          v-if="isText || isTextarea"
          class="wrap"
        >
          {{ value }}
        </p>

        <span
          v-if="isDate"
          class="wrap"
        >
          {{ value | formatDate }}
        </span>

        <span
          v-if="isSelection"
          class="wrap"
        >
          {{ value | lookup | toYesNo }}
        </span>

        <div
          v-if="isMultiSelection"
          class="wrap"
        >
          <p
            v-for="item in value" 
            :key="item"
          >
            {{ item | lookup | toYesNo }}
          </p>
        </div>
      </div>
      <div
        v-else
      >
        <span>
          {{ 'No ' + (filters.lookup(field)) + (extension ? ' ' + filters.lookup(extension) : '' ) + ' provided' }}
        </span> 
      </div>

      <a
        v-if="editMode"
        href="#"
        class="govuk-link change-link print-none"
        @click.prevent="btnClickEdit()"
      >
        {{ link }}
      </a>
    </div>

    <div
      v-if="editField"
      class="edit-field"
    >
      <TextField
        v-if="isText || isEmail || isRoute"
        :id="`editable-field-${id}`"
        v-model="localField"
      />
      <TextareaInput
        v-if="isTextarea"
        :id="`editable-field-${id}`"
        v-model="localField"
      />
      <DateInput
        v-if="isDate"
        :id="`data-of-birth-${id}`"
        v-model="localField"
        :value="localField"
      />

      <Select
        v-if="isSelection"
        :id="`selection-input-${id}`"
        v-model="localField"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
        >
          {{ option | lookup | toYesNo }}
        </option>
      </Select>

      <CheckboxGroup
        v-if="isMultiSelection"
        :id="`multi-selection-input-${id}`"
        v-model="localField"
      >
        <CheckboxItem
          v-for="option in options"
          :key="option"
          :value="option"
          :label="option | lookup"
        />
      </CheckboxGroup>

      <div class="change-link">
        <button
          class="govuk-button govuk-!-margin-right-3"
          @click="btnClickSubmit()"
        >
          Save
        </button>
        <button
          class="govuk-button govuk-button--warning"
          @click="cancelEdit()"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from './Form/TextField';
import TextareaInput from './Form/TextareaInput';
import DateInput from './Form/DateInput';
import formatEmail from '../helpers/Form/formatEmail';
import Select from './Form/Select.vue';
import CheckboxGroup from './Form/CheckboxGroup';
import CheckboxItem from './Form/CheckboxItem';
import * as filters from '../filters/filters';

export default {
  components: {
    TextField,
    TextareaInput,
    DateInput,
    Select,
    CheckboxGroup,
    CheckboxItem,
  },
  props: {
    editMode: {
      type: [Boolean, Function, Promise],
      required: true,
      default: () => false,
    },
    extension: {
      type: String,
      required: false,
      default: null,
    },
    index: {
      type: [Number, String],
      required: false,
      default: null,
    },
    field: {
      type: String,
      default: 'value',
    },
    value: {
      type: [String, Date, Number, Object, Array, Boolean],
      default: () => null,
    },
    type: {
      type: String,
      default: 'text',
    },
    link: {
      type: String,
      default: 'Change',
    },
    options: {
      type: Array,
      default: null,
    },
    routeTo: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localField: '',
      editField: false,
      id: null,
      filters: filters,
    };
  },
  computed: {
    isEmail() {
      return this.type === 'email';
    },
    isText() {
      return this.type === 'text';
    },
    isTextarea() {
      return this.type === 'textarea';
    },
    isRoute() {
      return this.type === 'route' && this.routeTo !== null;
    },
    isDate() {
      return this.type === 'date';
    },
    isSelection() {
      return this.type === 'selection';
    },
    isMultiSelection() {
      return this.type === 'multi-selection' && (this.value instanceof Array || !this.value);
    },
    valueToDate() {
      const newDate = this.isDate ? new Date(this.value) : null;
      return newDate;
    },
  },
  mounted () {
    this.id = this._uid;
  },
  methods: {
    cancelEdit() {
      this.editField = false;
    },
    btnClickEdit() {
      this.localField = this.value;
      this.editField = true;
    },
    btnClickSubmit() {
      let resultObj;
      if (this.isEmail) {
        const value = formatEmail(this.localField);
        this.localField = value;
      }
      if (this.index != undefined && this.extension) {
        resultObj = { 
          field: this.field,
          index: this.index,
          extension: this.extension,
          change: this.localField,
        };
      } else {
        resultObj = { [this.field]: this.localField };
      }

      this.$emit('changeField', resultObj);

      this.editField = false;
    },
  },
};
</script>

<style scoped>
  .non-editable {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .edit-field {
    width: 100%;
    /* display: inline-flex; */
  }

  .non-editable .change-link {
    margin-left: auto;
  }

  .wrap {
    overflow-wrap: anywhere;
  }
</style>
