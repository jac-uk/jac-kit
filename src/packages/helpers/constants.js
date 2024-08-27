const STATUS = {
  DRAFT: 'draft',
  APPLIED: 'applied',
  WITHDRAWN: 'withdrawn',
  SELECTED: 'selected',
  DELETED: 'deleted',
};

const EXERCISE_STAGE = {
  REVIEW: 'review',
  SHORTLISTED: 'shortlisted',
  SELECTED: 'selected',
  RECOMMENDED: 'recommended',
  HANDOVER: 'handover',
};

const APPLICATION_STATUS = {
// ###  REVIEW
  PASSED_SIFT: 'passedSift',
  FAILED_SIFT: 'failedSift',
  SUBMITTED_FIRST_TEST: 'submittedFirstTest',
  FAILED_FIRST_TEST: 'failedFirstTest',
  SUBMITTED_SCENARIO_TEST: 'submittedScenarioTest',
  PASSED_FIRST_TEST: 'passedFirstTest',
  FAILED_SCENARIO_TEST: 'failedScenarioTest',
  PASSED_SCENARIO_TEST: 'passedScenarioTest',
  FAILED_TELEPHONE_ASSESSMENT: 'failedTelephoneAssessment',
  PASSED_TELEPHONE_ASSESSMENT: 'passedTelephoneAssessment',
  NO_TEST_SUBMITTED: 'noTestSubmitted',
  TEST_SUBMITTED_OVER_TIME: 'testSubmittedOverTime',
  WITHDREW_APPLICATION: 'withdrewApplication',
  REJECTED_AS_INELIGIBLE: 'rejectedAsIneligible',
// ###  SHORTLISTED
  INVITED_TO_SELECTION_DAY: 'invitedToSelectionDay',
  // REJECTED_AS_INELIGIBLE: '',
  // WITHDREW_APPLICATION: '',
// ###  SELECTED
  PASSED_SELECTION: 'passedSelection',
  FAILED_SELECTION: 'failedSelection',
  PASSED_BUT_NOT_RECOMMENDED: 'passedButNotRecommended',
// ###  RECOMMENDED
  REJECTED_BY_CHARACTER: 'rejectedByCharacter',
  // REJECTED_AS_INELIGIBLE: '',
  APPROVED_FOR_IMMEDIATE_APPOINTMENT: 'approvedForImmediateAppointment',
  APPROVED_FOR_FUTURE_APPOINTMENT: 'approvedForFutureAppointment',
  SCC_TO_RECONSIDER: 'sccToReconsider',
};

const SHORTLISTING = {
  TELEPHONE_ASSESSMENT: 'telephone-assessment',
  SITUATIONAL_JUDGEMENT_QUALIFYING_TEST: 'situational-judgement-qualifying-test',
  CRITICAL_ANALYSIS_QUALIFYING_TEST: 'critical-analysis-qualifying-test',
  SCENARIO_TEST_QUALIFYING_TEST: 'scenario-test-qualifying-test',
  NAME_BLIND_PAPER_SIFT: 'name-blind-paper-sift',
  PAPER_SIFT: 'paper-sift',
  OTHER: 'other',
};

const QUALIFYING_TEST = {
  TYPE: {
    SCENARIO: 'scenario',
    CRITICAL_ANALYSIS: 'critical-analysis',
    SITUATIONAL_JUDGEMENT: 'situational-judgement',
  },
  MODE: {
    DRY_RUN: 'dry-run',
    MOP_UP: 'mop-up',
  },
  STATUS: {
    CREATED: 'created',
    SUBMITTED: 'submitted-for-approval',
    APPROVED: 'approved',
    INITIALISED: 'initialised',
    ACTIVATED: 'activated',
    PAUSED: 'paused',
    STARTED: 'started',
    PROGRESS: 'in-progress',
    COMPLETED: 'completed',
  },
};

const QUALIFYING_TEST_RESPONSE = {
  STATUS: {
    CREATED: 'created',
    ACTIVATED: 'activated',
    STARTED: 'started',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    DELETED: 'deleted',
  },
};

const DEFAULT = {
  YES: 'Yes',
  NO: 'No',
};

const NOT_COMPLETE_PUPILLAGE_REASONS = {
  TRANSFERRED: 'transferred ',
  CALLED_PRE_2002: 'called-pre-2002',
  OTHER: 'other',
};

const DIVERSITY_CHARACTERISTICS = {
  DISABILITY_DISABLED: 'd',
  DISABILITY_NOT_SAY: 'dx',
  ETHNICITY_WHITE: 'w',
  ETHNICITY_BAME: 'b',
  ETHNICITY_OTHER: 'eo',
  ETHNICITY_NOT_SAY: 'ex',
  GENDER_MALE: 'm',
  GENDER_FEMALE: 'f',
  GENDER_NEUTRAL: 'gn',
  GENDER_OTHER: 'go',
  GENDER_NOT_SAY: 'gx',
  PARENTS_ATTENDED_UNIVERSITY: 'pau',
  PROFESSION_BARRISTER: 'pb',
  PROFESSION_CILEX: 'pc',
  PROFESSION_SOLICITOR: 'ps',
  PROFESSION_OTHER: 'po',
  PROFESSION_NOT_SAY: 'px',
  UK_STATE_SCHOOL: 'ss',
  UK_STATE_SCHOOL_16: 'ss16',
  FIRST_GENERATION_UNIVERSITY: 'u1',
};

export {
  STATUS,
  EXERCISE_STAGE,
  APPLICATION_STATUS,
  SHORTLISTING,
  QUALIFYING_TEST,
  QUALIFYING_TEST_RESPONSE,
  DEFAULT,
  NOT_COMPLETE_PUPILLAGE_REASONS,
  DIVERSITY_CHARACTERISTICS
};
