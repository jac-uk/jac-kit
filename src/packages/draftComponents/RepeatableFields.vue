<template>
  <div>
    <div
      v-for="(row, index) in rows"
      :key="index"
      ref="repeatableField"
      class="repeatableField"
    >
      <component
        :is="component"
        :id="ident"
        :ref="`${ident}-${index}`"
        :row="row"
        :index="index"
        :path="path"
        :type="type"
        :label="typeName"
      >
        <template v-slot:removeButton>
          <button
            v-if="allowEmpty || rows.length > 1"
            ref="removeFieldButton"
            type="button"
            class="jac-add-another__remove-button govuk-button govuk-button--warning govuk-!-margin-bottom-2 "
            @click.prevent="removeRow(index)"
          >
            Remove
          </button>
        </template>
      </component>
    </div>
    <button
      v-if="canAddRow"
      type="button"
      class="govuk-button govuk-button--secondary govuk-!-margin-bottom-6"
      @click.prevent="addRow"
    >
      {{ addLabel }} {{ typeName }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'RepeatableFields',
  props: {
    value: {
      validator: (value) => (value instanceof Array || value === null || value === undefined),
      required: true,
    },
    component: {
      required: true,
      type: Object,
    },
    allowEmpty: {
      required: false,
      default: false,
      type: Boolean,
    },
    max: {
      required: false,
      default: false,
      type: [Number, Boolean],
    },
    ident: {
      required: false,
      type: String,
      default: null,
    },
    path: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
    typeName: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      rows: [],
    };
  },
  computed: {
    canAddRow() {
      if (this.max) {
        return this.rows.length < this.max;
      } else {
        return true;
      }
    },
    addLabel() {
      if (this.rows.length > 0) {
        return 'Add another';
      }
      return 'Add';
    },
  },
  created() {
    if (this.value instanceof Array) {
      this.rows = this.value;
    } else {
      this.$emit('input', this.rows);
    }

    if (!this.allowEmpty && this.rows.length === 0) {
      this.addRow();
    }
  },
  methods: {
    addRow() {
      if (this.canAddRow) {
        this.rows.push({});
      }
    },
    removeRow(index) {
      this.rows.splice(index, 1);
    },
    async callComponentMethod(methodName) {
      for (let i = 0, len = this.rows.length; i < len; ++i) {
        const isOk = await this.$refs[`${this.ident}-${i}`][0][methodName]();
        if (!isOk) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
.repeatableField {
  position: relative;

  .jac-add-another__remove-button {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
