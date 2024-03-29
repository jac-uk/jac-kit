<template>
  <div
    v-if="hasData"
    class="govuk-!-margin-top-9"
  >
    <h2 class="govuk-heading-l">
      Character information
    </h2>

    <dl class="govuk-summary-list">
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has been cautioned or convicted of a criminal offence
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(data.criminalOffences) }}
          <EventRenderer
            v-if="data.criminalOffences"
            :events="data.criminalOffenceDetails"
          />
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has received a non-motoring penalty notice in the last 4 years
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(data.nonMotoringFixedPenaltyNotices) }}
          <EventRenderer
            v-if="data.nonMotoringFixedPenaltyNotices"
            :events="data.nonMotoringFixedPenaltyNoticesDetails"
          />
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has been disqualified from driving, or convicted for driving under the influence of drink or drugs
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(data.drivingDisqualificationDrinkDrugs) }}
          <EventRenderer
            v-if="data.drivingDisqualificationDrinkDrugs"
            :events="data.drivingDisqualificationDrinkDrugsDetails"
          />
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has endorsements on licence, or received any motoring fixed-penalty notices in the last 4 years
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(data.endorsementsOrMotoringFixedPenalties) }}
          <EventRenderer
            v-if="data.endorsementsOrMotoringFixedPenalties"
            :events="data.endorsementsOrMotoringFixedPenaltiesDetails"
          />
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has been declared bankrupt or entered into an Individual Voluntary Agreement (IVA)
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(data.declaredBankruptOrIVA) }}
          <EventRenderer
            v-if="data.declaredBankruptOrIVA"
            :events="data.declaredBankruptOrIVADetails"
          />
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has filed late tax returns or been fined by HMRC
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(ata.lateTaxReturnOrFined) }}
          <EventRenderer
            v-if="data.lateTaxReturnOrFined"
            :events="data.lateTaxReturnOrFinedDetails"
          />
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has ever been, or is currently, subject to professional misconduct, negligence, wrongful dismissal, discrimination or harassment proceedings
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(data.involvedInProfessionalMisconduct) }}
          <EventRenderer
            v-if="data.involvedInProfessionalMisconduct"
            :events="data.involvedInProfessionalMisconductDetails"
          />
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has ever been subject to complaints or disciplinary action, or been asked to resign from a position
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(data.diciplinaryActionOrAskedToResign) }}
          <EventRenderer
            v-if="data.diciplinaryActionOrAskedToResign"
            :events="data.diciplinaryActionOrAskedToResignDetails"
          />
        </dd>
      </div>
      <div class="govuk-summary-list__row">
        <dt class="govuk-summary-list__key">
          Has any other character issues
        </dt>
        <dd
          class="govuk-summary-list__value"
        >
          {{ $filters.toYesNo(data.otherCharacterIssues) }}
          <EventRenderer
            v-if="data.otherCharacterIssues"
            :events="data.otherCharacterIssuesDetails"
          />
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import EventRenderer from '../EventRenderer.vue';

export default {
  components: {
    EventRenderer,
  },
  props: {
    data: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    hasData() {
      return Object.keys(this.data).length > 0;
    },
  },
};
</script>
