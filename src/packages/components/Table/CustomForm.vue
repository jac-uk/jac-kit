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
          <CheckboxItem
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
    </div>
  </div>
</template>

<script>
import CheckboxGroup from '../../draftComponents/Form/CheckboxGroup.vue';
import TextField from '../../draftComponents/Form/TextField.vue';
import CheckboxItem from '../../draftComponents/Form/CheckboxItem.vue';
import DateInput from '../../draftComponents/Form/DateInput.vue';
import Checkbox from '../../draftComponents/Form/Checkbox.vue';
import RadioGroup from '../../draftComponents/Form/RadioGroup.vue';
import RadioItem from '../../draftComponents/Form/RadioItem.vue';
import Select from '../../draftComponents/Form/Select.vue';

export default {
  components: {
    CheckboxGroup,
    CheckboxItem,
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
  },
};
</script>
<style scoped>
  .custom-form-container > :not(:first-child) {
    margin-top: 20px;
  }
</style>
