<template>
  <div class="editable-field">
    <div
      v-if="!editField"
      class="non-editable"
    >
      <div
        v-if="value == undefined || value == null || value === '' || (Array.isArray(value) && !value.length)"
      >
        <span>
          No answer provided
        </span> 
      </div>

      <span v-else-if="isEmail">
        <a
          :href="`mailto:${value}`"
          class="govuk-link govuk-link--no-visited-state wrap"
          target="_blank"
        >
          {{ value }}
        </a>
      </span>

      <span v-else-if="isRoute">
        <RouterLink
          :to="{ ...routeTo }"
        >
          {{ value }}
        </RouterLink>
      </span>

      <span
        v-else-if="isText"
        class="wrap"
      >
        {{ value }} 
      </span>

      <span
        v-else-if="isTextarea"
        class="wrap"
      >
        {{ value }} 
      </span>

      <span
        v-else-if="isDate"
        class="wrap"
      >
        {{ formattedDate }}
      </span>

      <span
        v-else-if="isSelection"
        class="wrap"
      >
        {{ value | lookup | toYesNo }}
      </span>
      
      <div
        v-else-if="isMultiSelection"
        class="wrap"
      >
        <div
          v-if="(value instanceof Array)"
          class="wrap"
        >
          <li
            v-for="item in value" 
            :key="item"
          >
            {{ item | lookup | toYesNo }}
          </li>
        </div>
      </div>

      <div
        v-else-if="isRankedSelection"
        class="wrap"
      >
        <li
          v-for="(item, i) in value" 
          :key="item"
        >
          <strong> {{ i + 1 }}: </strong>
          {{ item }}
        </li>
      </div>

      <div
        v-else
        class="wrap"
      >
        {{ value }}
      </div>

      <br>

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
        v-if="isEmail"
        :id="`editable-field-${id}`"
        v-model="localField"
        type="email"
      />
      
      <TextField
        v-if="isText || isRoute"
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
        :type="(displayMonthYearOnly ? 'month' : 'date')"
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

      <div 
        v-if="isRankedSelection"
        class="govuk-checkboxes"
      >
        <div
          v-for="(answer, i) in options"
          :key="i"
          class="govuk-checkboxes__item"
        >
          <div
            style="display: inline-flex"
          >
            <input
              v-model="localField"
              :value="answer"
              type="checkbox"
              class="govuk-checkboxes__input"
              @change="updateRanking"
            >
            <label
              :for="`${id}-answer-${i}`"
              class="govuk-label govuk-checkboxes__label"
            >
              {{ answer }}
            </label>

            <Select 
              v-if="localField"
              :id="answer"
              v-model="ranking[answer]"
              @input="updateRanking"
            >
              <option
                v-for="score in localField.length"
                :key="score"
                :value="score"
              >
                {{ score }}
              </option>
            </Select>
          </div>
        </div>
      </div>

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
import Form from './Form/Form';

export default {
  components: {
    TextField,
    TextareaInput,
    DateInput,
    Select,
    CheckboxGroup,
    CheckboxItem,
  },
  extends: Form,
  props: {
    editMode: {
      type: [Boolean, Function, Promise],
      required: false,
      default: () => false,
    },
    extension: {
      type: [String, Array],
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
    displayMonthYearOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localField: '',
      editField: false,
      id: null,
      filters: filters,
      ranking: {},
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
    isRankedSelection() {
      return this.type === 'ranked-selection';
    },
    isMultiSelection() {
      return this.type === 'multi-selection';
    },
    valueToDate() {
      const newDate = this.isDate ? new Date(this.value) : null;
      return newDate;
    },
    formattedDate() {
      return filters.formatDate(this.value, (this.displayMonthYearOnly ? 'month' : ''));
    },
  },
  watch: { 
    editMode: function() {
      if (this.editField && !this.editMode) {
        this.cancelEdit();
      }
    },
  },
  mounted () {
    this.id = this._uid;
  },
  methods: {
    updateRanking() {
      const rankedSelection = [];
      const cleanedRanking = {};
      for (let i = 0, len = this.localField.length; i < len; ++i) {
        if (!this.ranking[this.localField[i]]) { this.ranking[this.localField[i]] = this.localField.length; }
        rankedSelection.push({ answer: this.localField[i], rank: this.ranking[this.localField[i]] });
        cleanedRanking[this.localField[i]] = this.ranking[this.localField[i]];
      }
      this.ranking = cleanedRanking;
      this.localField = rankedSelection.sort(( item1, item2 ) => {
        if (item1.rank < item2.rank) {
          return -1;
        } else if (item1.rank > item2.rank) {
          return 1;
        } else {
          return 0;
        }
      }).map((item) => {
        return item.answer;
      });
    },
    cancelEdit() {
      this.editField = false;
    },
    btnClickEdit() {
      this.localField = this.value;
      this.editField = true;
    },
    btnClickSubmit() {
      let resultObj;
      this.validate();
      if (this.isValid()) {

        if (this.isEmail) {
          const value = formatEmail(this.localField);
          this.localField = value;
        }

        if (this.index != undefined || this.extension != undefined) { // is nested or indexed item
          resultObj = { 
            field: this.field,
            change: this.localField,
          };
          if (this.index != undefined) { // is indexed item
            resultObj = {
              ...resultObj,
              index: this.index,
            };
          } 
          if (this.extension != undefined) { // is nested item
            resultObj = {
              ...resultObj,
              extension: this.extension,
            };
          } 
        } else {
          resultObj = { [this.field]: this.localField }; // else
        }

        this.$emit('changeField', resultObj);

        this.editField = false;
      }
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
