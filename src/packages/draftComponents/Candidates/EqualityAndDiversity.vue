<template>
  <div
    v-if="hasData"
    class="govuk-!-margin-top-9"
  >
    <h2
      class="govuk-heading-l"
    >
      Equality and diversity information
    </h2>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Agreed to share data
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo(data.shareData) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Professional background
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          <span
            v-if="preferNotToSay(data.professionalBackground)"
          >
            Prefer not to say
          </span>
          <ul
            v-else
            class="govuk-list"
          >
            <li
              v-for="item in data.professionalBackground"
              :key="item.name"
            >
              <p
                v-if="item == 'other-professional-background'"
                class="govuk-body govuk-!-margin-bottom-0"
              >
                <span>{{ $filters.lookup(item) }}</span>
                {{ data.otherProfessionalBackgroundDetails }}
              </p>
              <span v-else>{{ $filters.lookup(item) }}</span>
            </li>
          </ul>
        </dd>
      </div>

      <div
        v-if="isLegal"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Current legal role
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          <span
            v-if="preferNotToSay(data.currentLegalRole)"
          >
            Prefer not to say
          </span>
          <ul
            v-else
            class="govuk-list"
          >
            <li
              v-for="item in data.currentLegalRole"
              :key="item.name"
            >
              <p class="govuk-body govuk-!-margin-bottom-0">
                {{ $filters.lookup(item) }}
              </p>
              <p
                v-if="item == 'other-fee-paid-judicial-office-holder'"
                class="govuk-body govuk-!-margin-bottom-0"
              >
                {{ data.otherCurrentFeePaidJudicialOfficeHolderDetails }}
              </p>

              <p
                v-else-if="item == 'other-salaried-judicial-office-holder'"
                class="govuk-body govuk-!-margin-bottom-0"
              >
                {{ data.otherCurrentSalariedJudicialOfficeHolderDetails }}
              </p>

              <p
                v-else-if="item == 'other-current-legal-role'"
                class="govuk-body govuk-!-margin-bottom-0"
              >
                {{ data.otherCurrentLegalRoleDetails }}
              </p>
            </li>
          </ul>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Held fee-paid judicial role
        </dt>
        <dd class="govuk-summary-list__value">
          <p class="govuk-body">
            {{ $filters.toYesNo($filters.lookup(data.feePaidJudicialRole)) }}
          </p>
          <p
            v-if="data.feePaidJudicialRole == 'other-fee-paid-judicial-office'"
            class="govuk-body govuk-!-margin-bottom-0"
          >
            {{ data.otherFeePaidJudicialRoleDetails }}
          </p>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Attended state or fee-paying school
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.lookup(data.stateOrFeeSchool) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Attended Oxbridge universities
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo($filters.lookup(data.oxbridgeUni)) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          First generation to go to university
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo($filters.lookup(data.firstGenerationStudent)) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Ethnic group
        </dt>
        <dd class="govuk-summary-list__value">
          <p class="govuk-body govuk-!-margin-bottom-0">
            {{ $filters.lookup(data.ethnicGroup) }}
          </p>
          <p
            v-if="hasEthnicGroupDetails"
            class="govuk-body govuk-!-margin-bottom-0"
          >
            {{ ethnicGroupDetails }}
          </p>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Sex
        </dt>
        <dd class="govuk-summary-list__value">
          <p class="govuk-body govuk-!-margin-bottom-0">
            {{ $filters.lookup(data.gender) }}
          </p>
          <p
            v-if="data.gender == 'other-gender'"
            class="govuk-body govuk-!-margin-bottom-0"
          >
            {{ data.otherGenderDetails }}
          </p>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Gender indentity same as sex registered at birth?
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo($filters.lookup(data.changedGender)) }}
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Sexual orientation
        </dt>
        <dd class="govuk-summary-list__value">
          <p class="govuk-body govuk-!-margin-bottom-0">
            {{ $filters.lookup(data.sexualOrientation) }}
          </p>
          <p
            v-if="data.sexualOrientation == 'other-sexual-orientation'"
            class="govuk-body govuk-!-margin-bottom-0"
          >
            {{ data.otherSexualOrientationDetails }}
          </p>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Disability
        </dt>
        <dd class="govuk-summary-list__value">
          <p class="govuk-body govuk-!-margin-bottom-0">
            {{ $filters.toYesNo($filters.lookup(data.disability)) }}
          </p>
          <p
            v-if="data.disability === true"
            class="govuk-body govuk-!-margin-bottom-0"
          >
            <span
              v-if="data.disabilityDetails"
            >
              {{ data.disabilityDetails }}
            </span>
            <span
              v-else
            >
              No details provided.
            </span>
          </p>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Religion or faith
        </dt>
        <dd class="govuk-summary-list__value">
          <p class="govuk-body govuk-!-margin-bottom-0">
            {{ $filters.lookup(data.religionFaith) }}
          </p>
          <p
            v-if="data.religionFaith == 'other-religion'"
            class="govuk-body govuk-!-margin-bottom-0"
          >
            {{ data.otherReligionDetails }}
          </p>
        </dd>
      </div>

      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Attended Outreach events
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo($filters.lookup(data.attendedOutreachEvents)) }}
        </dd>
      </div>

      <div
        v-if="isLegal"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Participated in a Judicial Workshadowing Scheme
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo($filters.lookup(data.participatedInJudicialWorkshadowingScheme)) }}
        </dd>
      </div>

      <div
        v-if="isLegal"
        class="govuk-summary-list__row"
      >
        <dt class="govuk-summary-list__key">
          Participated in Pre-Application Judicial Education Programme
        </dt>
        <dd class="govuk-summary-list__value">
          {{ $filters.toYesNo($filters.lookup(data.hasTakenPAJE)) }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    hasEthnicGroupDetails() {
      return this.data.ethnicGroup &&
        this.data.ethnicGroup.startsWith('other-');
    },
    hasData() {
      return Object.keys(this.data).length > 0;
    },
    ethnicGroupDetails() {
      switch (this.data.ethnicGroup) {
      case 'other-asian':
        return this.data.otherEthnicGroupAsianDetails;
      case 'other-white':
        return this.data.otherEthnicGroupWhiteDetails;
      case 'other-black':
        return this.data.otherEthnicGroupBlackDetails;
      case 'other-mixed':
        return this.data.otherEthnicGroupMixedDetails;
      default:
        return this.data.otherEthnicGroupDetails;
      }
    },
  },
  methods: {
    preferNotToSay(field) {
      const val = 'prefer-not-to-say';
      if (field === val) {
        return true;
      }
      if (Array.isArray(field) && field.includes(val)) {
        return true;
      }
      return false;
    },
    isLegal () {
      // TODO add this functionality
      // return this.exercise.typeOfExercise === 'legal';
      return true;
    },
  },
};
</script>
