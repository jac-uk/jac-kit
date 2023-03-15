<template>
  <div
    v-if="hasData"
    class="govuk-!-margin-top-9 "
  >
    <h2 class="govuk-heading-l">
      Personal details
      <span class="govuk-hint">
        Any changes made here will not update the details on the most recent application.
        Please go to the Personal Details section to make the change.
      </span>
    </h2>
    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Title
        </dt>
        <dd class="govuk-summary-list__value">
          <EditableField
            :value="title"
            field="title"
            @change-field="changeUserDetails"
          />
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          First name
        </dt>
        <dd class="govuk-summary-list__value">
          <EditableField
            :value="firstName"
            field="firstName"
            @change-field="changeUserDetails"
          />
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Last name
        </dt>
        <dd class="govuk-summary-list__value">
          <EditableField
            :value="lastName"
            field="lastName"
            @change-field="changeUserDetails"
          />
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Email address
        </dt>
        <dd class="govuk-summary-list__value">
          <EditableField
            :value="candidate.email"
            field="email"
            type="email"
            @change-field="changeUserDetails"
          />
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Phone number
        </dt>
        <dd class="govuk-summary-list__value">
          <EditableField
            :value="candidate.phone"
            field="phone"
            @change-field="changeUserDetails"
          />
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Date of birth
        </dt>
        <dd class="govuk-summary-list__value">
          <EditableField
            :value="candidate.dateOfBirth"
            field="dateOfBirth"
            type="date"
            @change-field="changeUserDetails"
          />
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          NI Number
        </dt>
        <dd class="govuk-summary-list__value">
          <EditableField
            :value="$filters.formatNIN(candidate.nationalInsuranceNumber)"
            field="nationalInsuranceNumber"
            @change-field="changeUserDetails"
          />
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Citizenship
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.lookup(candidate.citizenship) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Reasonable adjustments
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(candidate.reasonableAdjustments) }}
          <ul
            v-if="candidate.reasonableAdjustmentsDetails"
            class="govuk-list govuk-!-margin-top-1"
          >
            <li>
              {{ candidate.reasonableAdjustmentsDetails }}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import EditableField from '../EditableField';
import splitFullName from '@jac-uk/jac-kit/helpers/splitFullName';

export default {
  components: {
    EditableField,
  },
  props: {
    candidate: {
      type: Object,
      default: null,
      required: true,
    },
  },
  emits: ['changedetails'],
  computed: {
    hasData() {
      return Object.keys(this.candidate).length > 0;
    },
    title() {
      let title = this.candidate.title;
      if (!title) {
        title = '';
      }
      return title;
    },
    firstName() {
      let firstName = this.candidate.firstName;
      const fullName = this.candidate.fullName;
      if (!firstName) {
        if (fullName) {
          const result = splitFullName(fullName);
          firstName = result[0];
        } else {
          firstName = '';
        }
      }
      return firstName;
    },
    lastName() {
      let lastName = this.candidate.lastName;
      const fullName = this.candidate.fullName;
      if (!lastName) {
        if (fullName) {
          const result = splitFullName(fullName);
          lastName = result[1];
        } else {
          lastName = '';
        }
      }
      return lastName;
    },
  },
  methods: {
    changeUserDetails(personalDetails) {
      this.$emit('changedetails', { ...personalDetails });
    },
  },
};
</script>

<style>
  .editable-field {
    display: flex;
    flex-direction: row;
  }

  .editable-field .change-link {
    margin-left: auto;
  }
</style>
