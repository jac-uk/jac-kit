<template>
  <div
    v-if="shouldRenderQuestion"
    class="govuk-summary-list__row"
  >
    <dt class="govuk-summary-list__key">
      {{ currentItem.hasOwnProperty('topic') ? currentItem.topic : '' }}
      <br>
      {{ currentItem.question }}
    </dt>
    <dd
      v-if="currentItem.questionType === 'multiple-choice'"
      class="govuk-summary-list__value"
    >
      <!-- Render multiple-choice answers -->
      <p
        v-for="answer in application[section][currentItem.id]"
        :key="answer"
        class="govuk-body"
      >
        <template v-if="currentItem.groupAnswers">
          <strong>
            {{ findGroupByAnswer(currentItem.answers, answer) + ' - ' }}
          </strong>
          <span>
            {{ findGroupAnswer(currentItem.answers, answer) }}
          </span>
        </template>
        <template v-else>
          {{ findAnswer(currentItem.answers, answer) }}
        </template>
      </p>
    </dd>
    <template v-else-if="currentItem.questionType === 'ranked-choice'">
      <dd
        v-if="!currentItem.allowEqualRanking"
        class="govuk-summary-list__value"
      >
        <!-- Render ranked-choice answers without equal ranking -->
        <p
          v-for="(answerIndex, answer) in sortRankedSelection(application[section][currentItem.id])"
          :key="answer"
          class="govuk-body"
        >
          <strong>
            {{ answerIndex }}:
          </strong>
          <template v-if="currentItem.groupAnswers">
            <strong>
              {{ findGroupByAnswer(currentItem.answers, answer) + ' - ' }}
            </strong>
            <span>
              {{ findGroupAnswer(currentItem.answers, answer) }}
            </span>
          </template>
          <template v-else>
            {{ findAnswer(currentItem.answers, answer) }}
          </template>
        </p>
      </dd>
      <dd
        v-else-if="currentItem.allowEqualRanking"
        class="govuk-summary-list__value"
      >
        <!-- Render ranked-choice answers with equal ranking -->
        <p
          v-for="sortedAnswers in sortEqualRankedSelection(application[section][currentItem.id])"
          :key="sortedAnswers.rank"
          class="govuk-body"
        >
          <strong>
            {{ sortedAnswers.rank }}:
          </strong>
          <span
            v-for="(answer, sortedAnswerIndex) in sortedAnswers.answers"
            :key="answer"
          >
            {{ `${findAnswer(currentItem.answers, answer)}${(sortedAnswerIndex + 1 < sortedAnswers.answers.length) ? ', ' : ''}` }}
          </span>
        </p>
      </dd>
    </template>
    <dd
      v-else-if="currentItem.questionType === 'single-choice'"
      class="govuk-summary-list__value"
    >
      <!-- Render single-choice answer -->
      {{ currentItem.answers.find(item => item.id === application[section][currentItem.id]).answer }}
    </dd>
  </div>
</template>

<script>
export default {
  name: 'QuestionRenderer',
  props: {
    section: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    application: {
      type: Object,
      required: true,
    },
    vacancy: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentItem() {
      return this.vacancy[this.section][this.index];
    },
    shouldRenderQuestion() {
      // If there's a linked question and its answer doesn't match this question's linked answer, do not render the question
      if (this.currentItem.linkedQuestion && this.currentItem.linkedAnswer) {
        return this.isLinkedByAnswer;
      }

      // If there's no linked question, render the question
      return true;
    },
    isLinkedByAnswer() {
      // find the linked question
      const linkedQuestion = Object.keys(this.application[this.section]).find(question => question === this.currentItem.linkedQuestion);
      if (linkedQuestion) {
        // check if the answer given for the linked question matches this questions linked answer
        const linkedAnswer = this.application[this.section][linkedQuestion];
        return linkedAnswer === this.currentItem.linkedAnswer;
      } else {
        return false;
      }
    },
  },
  methods: {
    sortRankedSelection(dataset) {
      return Object.fromEntries(Object.entries(dataset).sort((a, b) => a[1] - b[1]));
    },
    sortEqualRankedSelection(dataset) {
      const groups = {};
      Object.entries(dataset).forEach(([answer, rank]) => {
        if (!groups[rank]) {
          groups[rank] = [];
        }
        groups[rank].push(answer);
      });
      return Object.entries(groups).map(([rank, answers]) => ({ rank, answers }));
    },
    findGroupByAnswer(dataset, targetAnswer) {
      for (const question of dataset) {

        if (question.answers.some(answerObj => answerObj.id === targetAnswer)) {
          return question.group;
        }
      }
      return null; // Return null if the answer is not found in any group
    },
    findGroupAnswer(groupAnswers, targetAnswer) {
      if (this.currentItem.answerSource === 'jurisdictions') {
        return this.$filters.lookup(targetAnswer);
      }

      for (const groupAnswer of groupAnswers) {
        const match = groupAnswer.answers.find(item => item.id === targetAnswer);
        if (match) return match.answer;
      }
      return null;
    },
    findAnswer(answers, targetAnswer) {
      if (this.currentItem.answerSource === 'jurisdictions') {
        return this.$filters.lookup(targetAnswer);
      }
      if (!Array.isArray(answers)) return null;
      const match = answers.find(item => item.id === targetAnswer);
      return match ? match.answer : null;
    }
  },
};
</script>

<style lang="scss" scoped>
  .govuk-summary-list__value,
  .govuk-summary-list__value:last-child,
  .govuk-summary-list__key {
    @include govuk-media-query($from: tablet) {
      width: auto;
    }
  }
</style>
