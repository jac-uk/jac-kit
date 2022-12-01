<template>
  <div class="govuk-!-padding-top-4 govuk-!-padding-bottom-4 govuk-!-padding-left-2 govuk-!-padding-right-2">
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
            v-for="(option, i) in field.options"
            :key="i"
            :value="option"
            :label="option.toString() | lookup"
          />
        </CheckboxGroup>
      </div>
      <div v-if="field.type === 'singleCheckbox'">
          <Checkbox
            :id="`filter-${field.field}`"
            v-model="localData[`${field.field}`]"
            :label="field.title"
          >{{ field.inputLabel ? field.inputLabel: '' }}</Checkbox>
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
    </div>
  </div>
</template>

<script>
import CheckboxGroup from '../../draftComponents/Form/CheckboxGroup';
import TextField from '../../draftComponents/Form/TextField';
import CheckboxItem from '../../draftComponents/Form/CheckboxItem';
import DateInput from '../../draftComponents/Form/DateInput';
import Checkbox from '../../draftComponents/Form/Checkbox';

export default {
  components: {
    CheckboxGroup,
    CheckboxItem,
    TextField,
    DateInput,
    Checkbox,
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
};
</script>
