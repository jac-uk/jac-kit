const STATUS = {
  DRAFT: 'draft', 
  APPLIED: 'applied', 
  WITHDRAWN: 'withdrawn', 
  SELECTED: 'selected', 
  DELETED: 'deleted', 
};

const TASK_TYPE = {
  SIFT: 'sift',
  SCENARIO: 'scenarioTest',
  CRITICAL_ANALYSIS: 'criticalAnalysis',
  SITUATIONAL_JUDGEMENT: 'situationalJudgement',
  QUALIFYING_TEST: 'qualifyingTest',
  TELEPHONE_ASSESSMENT: 'telephoneAssessment',
  ELIGIBILITY_SCC: 'eligibilitySCC',
  CHARACTER_AND_SELECTION_SCC: 'characterAndSelectionSCC',
  STATUTORY_CONSULTATION: 'statutoryConsultation',
  SHORTLISTING_OUTCOME: 'shortlistingOutcome',
  WELSH_ASSESSMENT: 'welshAssessment',
  PRE_SELECTION_DAY_QUESTIONNAIRE: 'preSelectionDayQuestionnaire',
  SELECTION_DAY: 'selectionDay',
  SELECTION_OUTCOME: 'selectionOutcome',
  EMP_TIEBREAKER: 'empTiebreaker',
};

const SHORTLISTING_TASK_TYPES = [
  TASK_TYPE.TELEPHONE_ASSESSMENT,
  TASK_TYPE.SIFT,
  TASK_TYPE.CRITICAL_ANALYSIS,
  TASK_TYPE.SITUATIONAL_JUDGEMENT,
  TASK_TYPE.QUALIFYING_TEST,
  TASK_TYPE.SCENARIO,
];

const ASSESSMENT_METHOD = {
  SELF_ASSESSMENT_WITH_COMPETENCIES: 'selfAssessmentWithCompetencies',
  COVERING_LETTER: 'coveringLetter',
  CV: 'cv',
  STATEMENT_OF_SUITABILITY_WITH_COMPETENCIES: 'statementOfSuitabilityWithCompetencies',
  STATEMENT_OF_SUITABILITY_WITH_SKILLS_AND_ABILITIES: 'statementOfSuitabilityWithSkillsAndAbilities',
  STATEMENT_OF_ELIGIBILITY: 'statementOfEligibility',
  INDEPENDENT_ASSESSMENTS: 'independentAssessments',
  LEADERSHIP_JUDGE_ASSESSMENT: 'leadershipJudgeAssessment',
};

const EXERCISE_STAGE = {
  // v2
  SHORTLISTING: 'shortlisting',
  SELECTION: 'selection',
  SCC: 'scc',
  RECOMMENDATION: 'recommendation',

  // v1
  REVIEW: 'review', 
  SHORTLISTED: 'shortlisted', 
  SELECTED: 'selected', 
  RECOMMENDED: 'recommended', 
  HANDOVER: 'handover', 

  // v2 proposed but then removed
  APPLIED: 'applied', // to be removed
  SELECTABLE: 'selectable', // to be removed
};

const APPLICATION_FORM_PARTS = {
  PERSONAL_DETAILS: 'personalDetails',
  CHARACTER_INFORMATION: 'characterInformation',
  EQUALITY_AND_DIVERSITY_SURVEY: 'equalityAndDiversitySurvey',
  PART_TIME_WORKING_PREFERENCES: 'partTimeWorkingPreferences',
  LOCATION_PREFERENCES: 'locationPreferences',
  JURISDICTION_PREFERENCES: 'jurisdictionPreferences',
  ADDITIONAL_WORKING_PREFERENCES: 'additionalWorkingPreferences',
  WELSH_POSTS: 'welshPosts',
  RELEVANT_QUALIFICATIONS: 'relevantQualifications',
  RELEVANT_MEMBERSHIPS: 'relevantMemberships',
  POST_QUALIFICATION_WORK_EXPERIENCE: 'postQualificationWorkExperience',
  JUDICIAL_EXPERIENCE: 'judicialExperience',
  RELEVANT_EXPERIENCE: 'relevantExperience',
  EMPLOYMENT_GAPS: 'employmentGaps',
  REASONABLE_LENGTH_OF_SERVICE: 'reasonableLengthOfService',
  ASSESSORS_DETAILS: 'assessorsDetails',
  LEADERSHIP_JUDGE_DETAILS: 'leadershipJudgeDetails',
  STATEMENT_OF_SUITABILITY: 'statementOfSuitability',
  COVERING_LETTER: 'coveringLetter',
  CV: 'cv',
  STATEMENT_OF_ELIGIBILITY: 'statementOfEligibility',
  SELF_ASSESSMENT_COMPETENCIES: 'selfAssessmentCompetencies',
  ADDITIONAL_INFO: 'additionalInfo',
  CANDIDATE_AVAILABILITY: 'candidateAvailability',
  PANEL_CONFLICTS: 'panelConflicts',
  COMMISSIONER_CONFLICTS: 'commissionerConflicts',
  CHARACTER_CHECKS: 'characterChecks',
  REASONABLE_ADJUSTMENTS: 'reasonableAdjustments',
  WORKING_PREFERENCES: 'workingPreferences',
};

const APPLICATION_STATUS = {
  // v2
  CRITICAL_ANALYSIS_PASSED: 'criticalAnalysisPassed',
  CRITICAL_ANALYSIS_FAILED: 'criticalAnalysisFailed',
  SITUATIONAL_JUDGEMENT_PASSED: 'situationalJudgementPassed',
  SITUATIONAL_JUDGEMENT_FAILED: 'situationalJudgementFailed',
  QUALIFYING_TEST_PASSED: 'qualifyingTestPassed',
  QUALIFYING_TEST_FAILED: 'qualifyingTestFailed',
  QUALIFYING_TEST_NOT_SUBMITTED: 'noTestSubmitted',
  SCENARIO_TEST_PASSED: 'scenarioTestPassed',
  SCENARIO_TEST_FAILED: 'scenarioTestFailed',
  SCENARIO_TEST_NOT_SUBMITTED: 'noScenarioTestSubmitted',
  SIFT_PASSED: 'siftPassed',
  SIFT_FAILED: 'siftFailed',
  TELEPHONE_ASSESSMENT_PASSED: 'telephoneAssessmentPassed',
  TELEPHONE_ASSESSMENT_FAILED: 'telephoneAssessmentFailed',
  SHORTLISTING_PASSED: 'shortlistingOutcomePassed',
  SHORTLISTING_FAILED: 'shortlistingOutcomeFailed',
  FULL_APPLICATION_NOT_SUBMITTED: 'fullApplicationNotSubmitted',
  ELIGIBILITY_SCC_PASSED: 'eligibilitySCCPassed',
  ELIGIBILITY_SCC_FAILED: 'eligibilitySCCFailed',
  CHARACTER_AND_SELECTION_SCC_PASSED: 'characterAndSelectionSCCPassed',
  CHARACTER_AND_SELECTION_SCC_FAILED: 'characterAndSelectionSCCFailed',
  STATUTORY_CONSULTATION_PASSED: 'statutoryConsultationPassed',
  STATUTORY_CONSULTATION_FAILED: 'statutoryConsultationFailed',
  SELECTION_INVITED: 'selectionInvited',
  REJECTED_INELIGIBLE_STATUTORY: 'rejectedIneligibleStatutory',
  REJECTED_INELIGIBLE_ADDITIONAL: 'rejectedIneligibleAdditional',
  REJECTED_CHARACTER: 'rejectedCharacter',
  REJECTED_MERIT: 'rejectedMerit',
  SELECTION_DAY_PASSED: 'selectionDayPassed',
  SELECTION_DAY_FAILED: 'selectionDayFailed',
  SELECTION_PASSED: 'selectionOutcomePassed',
  SELECTION_FAILED: 'selectionOutcomeFailed',
  SELECTION_OUTCOME_PASSED: 'selectionOutcomePassed',
  SELECTION_OUTCOME_FAILED: 'selectionOutcomeFailed',
  PASSED_RECOMMENDED: 'passedRecommended',
  PASSED_NOT_RECOMMENDED: 'passedNotRecommended',
  RECOMMENDED_IMMEDIATE: 'recommendedImmediate',
  RECOMMENDED_FUTURE: 'recommendedFuture',
  RECONSIDER: 'reconsider',
  SECOND_STAGE_INVITED: 'secondStageInvited',
  SECOND_STAGE_PASSED: 'empTiebreakerPassed',
  SECOND_STAGE_FAILED: 'empTiebreakerFailed',
  APPROVED_IMMEDIATE: 'approvedImmediate',
  APPROVED_FUTURE: 'approvedFuture',
  WITHDRAWN: 'withdrawn', 
  OTHER_PASSED: 'otherPassed',
  OTHER_FAILED: 'otherFailed',

  // v1 REVIEW
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
  INVITED_TO_SELECTION_DAY: 'invitedToSelectionDay',
  PASSED_SELECTION: 'passedSelection',
  FAILED_SELECTION: 'failedSelection',
  PASSED_BUT_NOT_RECOMMENDED: 'passedButNotRecommended',
  REJECTED_BY_CHARACTER: 'rejectedByCharacter',
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

const ADVERT_TYPES = {
  LISTING: 'listing',
  BASIC: 'basic',
  FULL: 'full',
  LINK: 'link',
};

const ASSESSOR_TYPES = {
  PROFESSIONAL: 'professional',
  JUDICIAL: 'judicial',
  PERSONAL: 'personal',
};

const SORT = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
};

const NOTIFICATIONS = {
  APPOINTMENT: 'appointment',
  SHORTLISTING: 'shortlisting',
  FINAL_SELECTION: 'finalSelection',
};

const WORKING_BASIS = {
  FULL_TIME: 'full-time',
  SALARIED_PART_TIME: 'salaried-part-time',
  FEE_PAID: 'fee-paid',
  VOLUNTARY: 'voluntary',
};

const TASK_QT_MAP = {};
TASK_QT_MAP[TASK_TYPE.CRITICAL_ANALYSIS] = QUALIFYING_TEST.TYPE.CRITICAL_ANALYSIS;
TASK_QT_MAP[TASK_TYPE.SITUATIONAL_JUDGEMENT] = QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT;
TASK_QT_MAP[TASK_TYPE.SCENARIO] = QUALIFYING_TEST.TYPE.SCENARIO;

const INDEPENDENT_ASSESSMENTS_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DECLINED: 'declined',
  DELETED: 'deleted',
};

const OFFENCE_CATEGORY = {
  SINGLE_MOTORING_OFFENCE: 'singleMotoringOffence',
  MULTIPLE_MOTORING_OFFENCES: 'multipleMotoringOffences',
  SINGLE_PENALTY_NOTICE: 'singlePenaltyNotice',
  MULTIPLE_PENALTY_NOTICES: 'multiplePenaltyNotices',
  SINGLE_CRIMINAL_OFFENCE: 'singleCriminalOffence',
  MULTIPLE_CRIMINAL_OFFENCES: 'multipleCriminalOffences',
  SINGLE_FINANCIAL_OFFENCE: 'singleFinancialOffence',
  MULTIPLE_FINANCIAL_OFFENCES: 'multipleFinancialOffences',
  SINGLE_PROFESSIONAL_CONDUCT: 'singleProfessionalConduct',
  MULTIPLE_PROFESSIONAL_CONDUCTS: 'multipleProfessionalConducts',
  SINGLE_OTHER_MATTER: 'singleOtherMatter',
  MULTIPLE_OTHER_MATTERS: 'multipleOtherMatters',
  MIXED: 'mixed',
};

const GUIDANCE_REFERENCE = {
  CRIMINAL_OFFENCES: 'criminalOffences',
  MOTERING_OFFENCES: 'moteringOffences',
  FIXED_PENALTY_NOTICES: 'fixedPenaltyNotices',
  FINANCIAL_INSOLVENCY_DEBT: 'financialInsolvencyDebt',
  FINANCIAL_VAT_TAX: 'financialVatTax',
  PROFESSIONAL_CONDUCT: 'professionalConduct',
  FURTHER_DISCLOSURES: 'furtherDisclosures',
};

const DEFAULT_WORD_COUNT = {
  ADDITIONAL_SELECTION_CRITERIA: 250,
};

const SELF_ASSESSMENT_COMPETENCIES_QUESTIONS = [
  'Exercising Judgement',
  'Possessing and Building Knowledge',
  'Assimilating and Clarifying Information',
  'Working and Communicating with Others',
  'Managing Work Efficiently',
  'Leadership',
  'Legal and judicial skills',
  'Personal qualities',
  'Working Effectively',
  'Career Highlights',
];

const LANGUAGES = {
  ENGLISH: 'eng',
  WELSH: 'cym',
};

export {
  ADVERT_TYPES,
  APPLICATION_FORM_PARTS,
  APPLICATION_STATUS,
  ASSESSMENT_METHOD,
  ASSESSOR_TYPES,
  DEFAULT,
  DEFAULT_WORD_COUNT,
  DIVERSITY_CHARACTERISTICS,
  EXERCISE_STAGE,
  GUIDANCE_REFERENCE,
  INDEPENDENT_ASSESSMENTS_STATUS,
  LANGUAGES,
  NOT_COMPLETE_PUPILLAGE_REASONS,
  NOTIFICATIONS,
  OFFENCE_CATEGORY,
  QUALIFYING_TEST,
  QUALIFYING_TEST_RESPONSE,
  SELF_ASSESSMENT_COMPETENCIES_QUESTIONS,
  SHORTLISTING,
  SHORTLISTING_TASK_TYPES,
  SORT,
  STATUS,
  TASK_QT_MAP,
  TASK_TYPE,
  WORKING_BASIS  
};
