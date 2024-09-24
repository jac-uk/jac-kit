<template>
  <div class="custom-form-container govuk-!-padding-top-4 govuk-!-padding-bottom-4 govuk-!-padding-left-2 govuk-!-padding-right-2">
    <div
      v-for="field in fields"
      :key="field.title"
    >
      <div v-if="field.type === 'checkbox'">
        <CheckboxGroup
          :id="`filter-${field.field}`"
          v-model="localData[`${field.field}`]"
          :label="field.title"
          hint="Select all that apply."
        >
          <Checkboxitem
            v-for="(option, i) in getOptions(field.options)"
            :key="i"
            :value="option.value"
            :label="option.label"
          />
        </CheckboxGroup>
      </div>
      <div v-if="field.type === 'singleCheckbox'">
        <Checkbox
          :id="`filter-${field.field}`"
          v-model="localData[`${field.field}`]"
          :label="field.title"
        >
          {{ field.inputLabel ? field.inputLabel: '' }}
        </Checkbox>
      </div>
      <div v-if="field.type === 'keyword'">
        <legend class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-margin-bottom-2">
          {{ field.title }}
        </legend>
        <TextField
          :id="`filter-${field.field}`"
          v-model="localData[`${field.field}`]"
        />
      </div>
      <div v-if="field.type === 'dateRange'">
        <fieldset>
          <legend>{{ field.title }}</legend>
          <DateInput
            :id="`filter-${field.field}-from`"
            v-model="localData[`${field.field}-from`]"
            label="from"
          />
          <DateInput
            :id="`filter-${field.field}-to`"
            v-model="localData[`${field.field}-to`]"
            label="to"
          />
        </fieldset>
      </div>
      <div v-if="field.type === 'customDateRange'">
        <fieldset>
          <legend>
            <select
              v-model="localData[`${field.ident}-field`]"
              class="govuk-select"
            >
              <option
                v-for="item in field.fields"
                :key="item.field"
                :value="item.field"
              >
                {{ item.title }}
              </option>
            </select>
          </legend>
          <DateInput
            :id="`filter-${field.ident}-from`"
            v-model="localData[`${field.ident}-from`]"
            label="from"
          />
          <DateInput
            :id="`filter-${field.field}-to`"
            v-model="localData[`${field.ident}-to`]"
            label="to"
          />
        </fieldset>
      </div>
      <div v-else-if="field.type === 'radio'">
        <RadioGroup
          :id="`filter-${field.field}`"
          v-model="localData[`${field.field}`]"
          :label="field.title"
          hint="Select one."
        >
          <RadioItem
            v-for="(option, i) in getOptions(field.options)"
            :key="i"
            :value="option.value"
            :label="option.label"
          />
        </RadioGroup>
      </div>
      <div v-if="field.type === 'option'">
        <Select
          :id="`filter-${field.field}`"
          v-model="localData[`${field.field}`]"
          :label="field.title"
          :hint="field.hint"
        >
          <option
            v-for="(option, i) in getOptions(field.options)"
            :key="i"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </Select>
      </div>
      <div v-if="field.type === 'groupOption'">
        <div v-for="(group, index) in field.groups" :key="index">
          <p v-if="index > 0" class="govuk-hint">OR</p>
          <Select
            :id="`filter-${group.field}`"
            :model-value="localGroupOptionData[`${group.field}`] || ''"
            @change="updateGroupOptionData(group.field, $event.target.value)"
            :label="group.title"
            :hint="group.hint"
          >
            <option
              v-for="(option, i) in getOptions(group.options)"
              :key="i"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckboxGroup from '../../draftComponents/Form/CheckboxGroup.vue';
import TextField from '../../draftComponents/Form/TextField.vue';
import Checkboxitem from '../../draftComponents/Form/Checkboxitem.vue';
import DateInput from '../../draftComponents/Form/DateInput.vue';
import Checkbox from '../../draftComponents/Form/Checkbox.vue';
import RadioGroup from '../../draftComponents/Form/RadioGroup.vue';
import RadioItem from '../../draftComponents/Form/RadioItem.vue';
import Select from '../../draftComponents/Form/Select.vue';

export default {
  components: {
    CheckboxGroup,
    Checkboxitem,
    TextField,
    DateInput,
    Checkbox,
    RadioGroup,
    RadioItem,
    Select,
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localGroupOptionData: {},
    };
  },
  emits: ['update:data'],
  computed: {
    localData: {
      get() {
        // TODO construct defaults based on `fields` then over-write with `data`
        return this.data;
      },
      set(value) {
        this.$emit('update:data', value);
      },
    },
  },
  mounted() {
    this.initLocalGroupOptionData();
  },
  methods: {
    getOptions(options) {
      return options.map((option) => {
        // check if option is an object with label and value
        if (typeof option === 'object'
          && option !== null
          && 'label' in option
          && 'value' in option
        ) {
          return option
        }
        return {
          label: this.$filters.lookup(option.toString()),
          value: option,
        }
      });
    },
    initLocalGroupOptionData() {
      const groupOptionFields = this.fields.filter((field) => field.type === 'groupOption');
      groupOptionFields.forEach((groupOptionField) => {
        groupOptionField.groups.forEach((group) => {
          if (group.field in this.data && !this.localGroupOptionData[group.field]) {
            this.localGroupOptionData[group.field] = this.data[group.field];
          }
        });
      });
    },
    updateGroupOptionData(field, value) {
      this.localGroupOptionData[field] = value;
      const groupOptionFields = this.fields.filter((field) => field.type === 'groupOption');
      groupOptionFields.forEach((groupOptionField) => {
        groupOptionField.groups.forEach((group) => {
          if (group.field !== field) {
            // exclude group if not selected
            delete this.localGroupOptionData[group.field];
            delete this.localData[group.field];
          }
        });
      });
      this.localData = { ...this.localData, ...this.localGroupOptionData };
    },
  },
};
</script>
<style scoped>
  .custom-form-container > :not(:first-child) {
    margin-top: 20px;
  }
</style>
