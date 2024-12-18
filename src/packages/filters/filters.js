import { APPLICATION_STATUS, QUALIFYING_TEST, NOT_COMPLETE_PUPILLAGE_REASONS } from '../helpers/constants';

const formatDate = (value, type) => {
  if (value !== null && value !== undefined) {
    if (value._seconds) {
      value = new Date(1e3 * value._seconds + value._nanoseconds / 1e6);
    }
    if (value.seconds) {
      value = new Date(1e3 * value.seconds + value.nanoseconds / 1e6);
    }
    if (!isNaN(new Date(value).valueOf())) {
      if (!type) {
        value = new Date(value).toLocaleDateString('en-GB');
      } else {
        value = new Date(value);
        switch (type) {
          case 'month':
            value = `${value.toLocaleString('en-GB', { month: 'long' })} ${value.getUTCFullYear()}`;
            break;
          case 'datetime':
            value = value.toLocaleString('en-GB');
            break;
          case 'long':
            value = value.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
            break;
          case 'longdatetime':
            value = value.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            break;
          case 'DD.MM.YYYY':
            value = value.toLocaleDateString('en-GB').replace(/\//g, '.');
            break;
        }
      }
    }
  }
  return value;
};

const formatEstimatedDate = (value) => {
  if (value){
    if (value instanceof Date) {
      return formatDate(value, 'month');
    }
    const parts = value.split('-');
    if (!parts[2]) {
      return formatDate(value, 'month');
    }
    return formatDate(value);
  }
};

const formatNumber = (originalValue, decimalPlaces) => {
  let transformedValue = null;
  if (originalValue) {
    if (decimalPlaces > 0) {
      if (isInt(originalValue)) {
        transformedValue = originalValue;
      }
      else {
        transformedValue = Number(originalValue).toFixed(decimalPlaces);
      }
    } else {
      transformedValue = parseInt(originalValue);
    }
    return transformedValue.toLocaleString('en-GB');
  }
  return originalValue;
};

const isInt = (value) => {
  if (isNaN(value)) {
    return false;
  }
  const x = parseFloat(value);
  return (x | 0) === x;
};

const formatNIN = (value) => {
  return value ? value.toUpperCase() : '';
};

const formatCurrency = (value) => {
  let amount = parseFloat(value);
  if (isNaN(amount)) {
    amount = 0;
  }
  if (typeof amount === 'number') {
    amount = amount.toLocaleString('en-GB',
      { style: 'currency', currency: 'GBP' }
    );
  }
  return amount;
};

const toHumanCase = (value) => {
  if (value) {
    return value.replace(/([A-Z0-9])/g, ' $1');
  }
};

const toCSV = (value) => {
  if (value) {
    return value.join(', ');
  }
  return value;
};

const toYesNo = (value) => {
  // Only convert booleans, not all falsy values mean "no"
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value;
};

const heldFeePaidJudicialRole = (value) => {
  if (typeof value === 'string' && ['fee-paid-court-post', 'fee-paid-tribunal-post', 'other-fee-paid-judicial-office'].includes(value)) {
    value = 'Yes';
    return value;
  }

  if (typeof value === 'boolean' && value === false) {
    value = 'No';
    return value;
  }

  if (value === undefined || value === null || (typeof value === 'string' && value.length === 0)) {
    value = 'Unknown';
    return value;
  }

  value = 'Prefer not to say';
  return value;
};

const slugify = (text) => {
  if (!text) {
    return '';
  }
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const candidateHasIssues = row => {
  let flag = false;
  const flags = row.flags;
  if (flags.characterIssues || flags.eligibilityIssues) {
    flag = true;
  }

  return flag ? 'Yes' : 'No';
};

const showAlternative = (value, optional) => value || optional;

const lookup = (value) => {
  if (typeof value === 'string') {
    // @TODO: extract lookup values
    const lookup = {
      'academic': 'Academic',
      'acting-arbitrator': 'Acting as an arbitrator',
      'acting-mediator-in-resolving-issues-that-are-of-proceedings': 'Acting as mediator in connection with attempts to resolve issues that are, or if not resolved could be, the subject of proceedings',
      'administrative-appeals-chamber': 'Administrative Appeals Chamber',
      'advising-application-of-law': 'Advising on the application of the law',
      'advocate-scottish-bar': 'Advocate – enrolled with the Scottish bar',
      'advocate-scotland': 'Advocate - Scotland',
      'no-legal-qualification': 'None of the above',
      'african': 'African',
      'another-commonwealth-country': 'Another Commonwealth country',
      'approved': 'Approved',
      'assisting-in-proceedings-for-resolution-of-issues-under-law': 'Assisting persons involved in proceedings for the resolution of issues arising under the law',
      'applied': 'Applied',
      'athiest': 'Atheist',
      'atheist': 'Atheist',
      'arab': 'Arab',
      'bangladeshi': 'Bangladeshi',
      'barrister': 'Barrister',
      'bisexual': 'Bisexual',
      'both': 'Both',
      'buddhist': 'Buddhist',
      'caribbean': 'Caribbean',
      'character': 'Character',
      'chartered-association-of-building-engineers': 'Chartered Association of Building Engineers',
      'chartered-institute-of-building': 'Chartered Institute of Building',
      'chartered-institute-of-environmental-health': 'Chartered Institute of Environmental Health',
      'chinese': 'Chinese',
      'christian': 'Christian',
      'cilex': 'CILEx fellow (this might be called Fellow ILEX)',
      'CILEx': 'Fellow of the Chartered Institute of Legal Executives (CILEx)',
      'citizenship': 'Citizenship',
      'civil': 'Civil',
      'closed': 'Closed',
      'completed': 'Completed',
      'court': 'Court',
      'crime': 'Crime',
      'critical-analysis-qualifying-test': 'Critical analysis qualifying test (QT)',
      'devolution-questions': 'Devolution questions',
      'do-not-know': 'Do not know',
      'draft': 'Draft',
      'drafting-documents-that-affect-rights-obligations': 'Drafting documents intended to affect persons\' rights or obligations',
      'dry-run': 'Mock assessment',
      'employment-appeals-tribunal': 'Employment Appeals Tribunal',
      'employment-tribunal': 'Employment Tribunal',
      'england-wales': 'England and Wales',
      'true': 'Yes',
      'false': 'No',
      'family': 'Family',
      'fee-paid': 'Fee paid',
      'fee-paid-court-judge': 'Fee-paid court judge',
      'fee-paid-court-post': 'Fee-paid court post',
      'fee-paid-tribunal-judge': 'Fee-paid tribunal judge',
      'fee-paid-tribunal-post': 'Fee-paid tribunal post',
      'female': 'Female',
      'gay-man': 'Gay man',
      'gay-woman-lesbian': 'Gay woman or lesbian',
      'gender-neutral': 'Gender neutral',
      'general-medical-council': 'General Medical Council',
      'general-regulatory-chamber': 'General Regulatory Chamber',
      'group-1': 'Group 1 - £262,264',
      'group-1.1': 'Group 1.1 - £234,184',
      'group-2': 'Group 2 - £226,193',
      'group-3': 'Group 3 - £215,094',
      'group-4': 'Group 4 - £188,901',
      'group-5': 'Group 5 - £151,497',
      'group-5+': 'Group 5+ - £160,377',
      'group-6.1': 'Group 6.1 - £140,289',
      'group-6.2': 'Group 6.2 - £132,075',
      'group-7': 'Group 7 - £112,542',
      'group-8': 'Group 8 - £89,428',
      'gypsy-irish-traveller': 'Gypsy or Irish Traveller',
      'health-education-and-social-care-chamber': 'Health, Education and Social Care Chamber',
      'heterosexual-straight': 'Heterosexual or straight',
      'hindu': 'Hindu',
      'immigration-and-asylum-chamber': 'Immigration and Asylum Chamber',
      'indian': 'Indian',
      'irish': 'Irish',
      'jewish': 'Jewish',
      'judicial-functions': 'The carrying-out of judicial functions of any court or tribunal',
      'lands-chamber': 'Lands Chamber',
      'leadership-non-legal': 'Leadership - non legal',
      'leadership': 'Leadership',
      'legal': 'Legal',
      'lord-chancellor': 'Lord Chancellor',
      'lord-chief-justice': 'Lord Chief Justice',
      'male': 'Male',
      'mop-up': 'Mop up',
      'multiple-choice': 'Multiple choice',
      'muslim': 'Muslim',
      'name-blind-paper-sift': 'Name blind paper sift',
      'no': 'No',
      'no-religion': 'No religion',
      'none': 'None',
      'non-legal': 'Non legal',
      'non-uk-educated': 'I did not go to school in the UK',
      'non-university-educated': 'I did not go to university',
      'northern-ireland': 'Northern Ireland',
      'open': 'Open',
      'other': 'Other',
      'other-asian': 'Any other Asian background',
      'other-black': 'Any other Black/African/Caribbean background',
      'other-current-legal-role': 'Other',
      'other-ethnic-group': 'Other',
      'other-fee-paid-judicial-office': 'Other fee-paid Judicial Office',
      'other-fee-paid-judicial-office-holder': 'Other fee-paid judicial office holder',
      'other-gender': 'Other',
      'other-mixed': 'Any other mixed or multiple ethnic backgrounds',
      'other-professional-background': 'Other professional background',
      'other-religion': 'Other',
      'other-salaried-judicial-office-holder': 'Other salaried Judicial Office holder',
      'other-white': 'Any other White background',
      'other-sexual-orientation': 'Other',
      'paper-sift': 'Paper sift',
      'pakistani': 'Pakistani',
      'pending': 'Pending',
      'pqe': 'Post-qualification experience',
      'practice-or-employment-as-lawyer': 'Practice or employment as a lawyer',
      'pre-launch': 'Pre launch',
      'prefer-not-to-say': 'Prefer not to say',
      'property-chamber': 'Property Chamber',
      'ranked-choice': 'Ranked choice',
      'read': 'Read',
      'ready': 'Ready for approval',
      'rls': 'Reasonable length of service',
      'republic-of-ireland': 'Republic of Ireland',
      'royal-college-of-psychiatrists': 'Royal College of Psychiatrists',
      'royal-institute-of-british-architects': 'Royal Institute of British Architects',
      'royal-institution-of-chartered-surveyors': 'Royal Institution of Chartered Surveyors',
      'salaried': 'Salaried',
      'salaried-court-judge': 'Salaried court judge',
      'salaried-tribunal-judge': 'Salaried tribunal judge',
      'scenario-test-qualifying-test': 'Scenario test qualifying test (QT)',
      'schedule-23': 'Schedule 2(3)',
      'schedule-2d': 'Schedule 2(d)',
      'scotland': 'Scotland',
      'scottish-ministers': 'Scottish ministers',
      'second-tier-immigration-and-asylum-chamber': 'Immigration and Asylum Chamber (second-tier)',
      'self-assessment-with-competencies': 'Self Assessment with competencies',
      'self-assessment-with-competencies-and-cv': 'Self Assessment with competencies and CV',
      'self-assessment-with-competencies-and-covering-letter': 'Self Assessment with competencies and covering letter',
      'self-assessment-with-competencies-and-cv-and-covering-letter': 'Self Assessment with competencies and CV and covering letter',
      'senior-president-of-tribunals': 'Senior President of Tribunals (SPT)',
      'senior': 'Senior',
      'sikh': 'Sikh',
      'single-choice': 'Single choice',
      'situational-judgement-qualifying-test': 'Situational judgement qualifying test (QT)',
      'social-entitlement-chamber': 'Social Entitlement Chamber',
      'solicitor': 'Solicitor',
      'statement-of-eligibility': 'Statement of eligibility',
      'statement-of-suitability-with-competencies': 'Statement of Suitability with competencies',
      'statement-of-suitability-with-skills-and-abilities-and-cv': 'Statement of Suitability with skills and abilities and CV',
      'statement-of-suitability-with-skills-and-abilities': 'Statement of Suitability with skills and abilities',
      'statement-of-suitability-with-skills-and-abilities-and-covering-letter': 'Statement of Suitability with skills and abilities and covering letter',
      'statement-of-suitability-with-skills-and-abilities-and-cv-and-covering-letter': 'Statement of Suitability with skills and abilities and CV and covering letter',
      's9-1': 's9(1)',
      's9-4': 'Class 1 ticket',
      'tax-and-chancery': 'Tax and Chancery',
      'tax-chamber': 'Tax Chamber',
      'teaching-researching-law': 'Teaching or researching law',
      'telephone-assessment': 'Telephone assessment',
      'tribunal': 'Tribunal',
      'uk': 'UK',
      'uk-ethnic': 'English, Welsh, Scottish, Northern Ireland, British',
      'uk-independent-fee': 'UK independent or fee-paying school',
      'uk-independent-fee-with-bursary': 'UK independent or fee-paying school with financial assistance (bursary or means-tested scholarship)',
      'uk-state-non-selective': 'UK state school - non-selective',
      'uk-state-selective': 'UK state school - selective',
      'unpaid': 'Unpaid',
      'uploaded': 'Uploaded',
      'war-pension-and-armed-forces-compensation-chamber': 'War Pension and Armed Forces Compensation Chamber',
      'welsh-administration-questions': 'Welsh administration questions',
      'welsh-government': 'Welsh Government',
      'welsh-language': 'Welsh language',
      'welsh-reading-writing': 'Read and/or write Welsh',
      'welsh-speaking': 'Speak Welsh',
      'white-asian': 'White and Asian',
      'white-black-african': 'White and Black African',
      'white-black-caribbean': 'White and Black Caribbean',
      'withdrawn': 'Withdrawn',
      'write': 'Write',
      // personal details
      'title': 'Title',
      'firstName': 'First Name',
      'lastName': 'Last Name',
      'email': 'Email Address',
      'phone': 'Phone Number',
      'dateOfBirth': 'Date of Birth',
      'investigationConclusionDate': 'Investigation Conclusion Date',
      'nationalInsuranceNumber': 'National Insurance Number',
      'reasonableAdjustments': 'Reasonable Adjustments',
      'reasonableAdjustmentsDetails': 'Reasonable Adjustment Details',
      // Character information
      'criminalOffences': 'criminal offences',
      'nonMotoringFixedPenaltyNotices': 'non-motoring fixed penalty notices',
      'drivingDisqualificationDrinkDrugs': 'disqualified from driving, or convicted for driving under the influence of drink or drugs',
      'endorsementsOrMotoringFixedPenalties': 'endorsements on licence, or motoring fixed-penalty notices in the last 4 years',
      'declaredBankruptOrIVA': 'declared bankrupt or entered into an Individual Voluntary Agreement (IVA)',
      'lateTaxReturnOrFined': 'late tax returns or been fines by HMRC',
      'involvedInProfessionalMisconduct': 'professional misconduct, negligence, wrongful dismissal, discrimination or harassment proceedings',
      'diciplinaryActionOrAskedToResign': 'complaints, disciplinary action, or been asked to resign from a position',
      'otherCharacterIssues': 'other character issues',
      // Character information details
      'criminalConvictionDetails': 'Criminal Conviction',
      'criminalCautionDetails': 'Criminal Caution',
      'fixedPenaltyDetails': 'Fixed Penalty',
      'drivingDisqualificationDetails': 'Driving Disqualification',
      'recentDrivingConvictionDetails': 'Recent Driving Conviction',
      'bankruptcyDetails': 'Bankruptcy',
      'ivaDetails': 'IVA',
      'lateTaxReturnDetails': 'late tax return',
      'lateVatReturnDetails': 'late VAT return',
      'hmrcFineDetails': 'HMRC Fine',
      'subjectOfAllegationOrClaimOfNegligenceDetails': 'allegation or claim of negligence',
      'subjectOfAllegationOrClaimOfProfessionalMisconductDetails': 'allegation or claim of professional misconduct',
      'subjectOfAllegationOrClaimOfWrongfulDismissalDetails': 'allegation or claim of wrongful dismissal',
      'subjectOfAllegationOrClaimOfDiscriminationProceedingDetails': 'allegation or claim of discrimination proceedings',
      'subjectOfAllegationOrClaimOfHarassmentProceedingDetails': 'allegation or claim of harassment proceedings',
      'complaintOrDisciplinaryActionDetails': 'complaints or disciplinary action',
      'furtherInformationDetails': 'further information',
      'requestedToResignDetails': 'request to resign',
      'roma': 'Roma',
      'declaredBankruptOrIVADetails': 'declared bankrupt or IVA',
      'lateTaxReturnOrFinedDetails': 'late tax return or fined',
      'involvedInProfessionalMisconductDetails': 'involvement in professional misconduct',
      'diciplinaryActionOrAskedToResignDetails': 'diciplinary action or asked to resign',
      'otherCharacterIssuesDetails': 'other character issues',
      'nonMotoringFixedPenaltyNoticeDetails': 'non-motoring fixed penalty notice',
      // qualification schedule
      'schedule-2-d': 'Schedule 2(d)',
      'schedule-2-3': 'Schedule 3(d)',
      // 'xxx': 'xxx',
      'roma': 'Roma',
      'arab': 'Arab',
    };
    // STAGES
    lookup[APPLICATION_STATUS.PASSED_SIFT] = 'Passed Sift';
    lookup[APPLICATION_STATUS.FAILED_SIFT] = 'Failed Sift';
    lookup[APPLICATION_STATUS.SUBMITTED_FIRST_TEST] = 'Submitted first test';
    lookup[APPLICATION_STATUS.FAILED_FIRST_TEST] = 'Failed first test';
    lookup[APPLICATION_STATUS.SUBMITTED_SCENARIO_TEST] = 'Submitted scenario test';
    lookup[APPLICATION_STATUS.PASSED_FIRST_TEST] = 'Passed first test';
    lookup[APPLICATION_STATUS.FAILED_SCENARIO_TEST] = 'Failed scenario test';
    lookup[APPLICATION_STATUS.PASSED_SCENARIO_TEST] = 'Passed scenario test';
    lookup[APPLICATION_STATUS.FAILED_TELEPHONE_ASSESSMENT] = 'Failed telephone assessment';
    lookup[APPLICATION_STATUS.PASSED_TELEPHONE_ASSESSMENT] = 'Passed telephone assessment';
    lookup[APPLICATION_STATUS.NO_TEST_SUBMITTED] = 'No test Submitted';
    lookup[APPLICATION_STATUS.TEST_SUBMITTED_OVER_TIME] = 'Test submitted over time';
    lookup[APPLICATION_STATUS.WITHDREW_APPLICATION] = 'Withdrew application';
    lookup[APPLICATION_STATUS.REJECTED_AS_INELIGIBLE] = 'Rejected as ineligible';
    lookup[APPLICATION_STATUS.PASSED_SELECTION] = 'Passed Selection';
    lookup[APPLICATION_STATUS.FAILED_SELECTION] = 'Failed Selection';
    lookup[APPLICATION_STATUS.PASSED_BUT_NOT_RECOMMENDED] = 'Passed but not Recommended';
    lookup[APPLICATION_STATUS.REJECTED_BY_CHARACTER] = 'Rejected by character';
    lookup[APPLICATION_STATUS.APPROVED_FOR_IMMEDIATE_APPOINTMENT] = 'Approved for immediate appointment';
    lookup[APPLICATION_STATUS.APPROVED_FOR_FUTURE_APPOINTMENT] = 'Approved for future appointment';
    lookup[APPLICATION_STATUS.SCC_TO_RECONSIDER] = 'SCC to reconsider';
    lookup[APPLICATION_STATUS.INVITED_TO_SELECTION_DAY] = 'Invited To Selection Day';

    lookup[QUALIFYING_TEST.STATUS.CREATED] = 'Created';
    lookup[QUALIFYING_TEST.STATUS.SUBMITTED] = 'Submitted for approval';
    lookup[QUALIFYING_TEST.STATUS.APPROVED] = 'Approved';
    lookup[QUALIFYING_TEST.STATUS.INITIALISED] = 'Initialised';
    lookup[QUALIFYING_TEST.STATUS.ACTIVATED] = 'Activated';
    lookup[QUALIFYING_TEST.STATUS.COMPLETED] = 'Completed';
    lookup[QUALIFYING_TEST.STATUS.PAUSED] = 'Paused';
    lookup[QUALIFYING_TEST.STATUS.STARTED] = 'Started';
    lookup[QUALIFYING_TEST.STATUS.PROGRESS] = 'In Progess';

    lookup[QUALIFYING_TEST.TYPE.SCENARIO] = 'Scenario';
    lookup[QUALIFYING_TEST.TYPE.CRITICAL_ANALYSIS] = 'Critical analysis';
    lookup[QUALIFYING_TEST.TYPE.SITUATIONAL_JUDGEMENT] = 'Situational judgement';

    lookup[NOT_COMPLETE_PUPILLAGE_REASONS.TRANSFERRED] = 'Qualified solicitor, qualified lawyer from another jurisdiction, or a legal academic transferred to the Bar';
    lookup[NOT_COMPLETE_PUPILLAGE_REASONS.CALLED_PRE_2002] = 'Called to the Bar prior to 1 January 2002';

    // TODO add the missing ones from CONSTANTS

    // RETURN - END of LOOKUP
    return lookup[value] || value;
  }

  // Default for unanswered question
  if (typeof value === 'undefined' || value === null) {
    return 'Answer not supplied';
  }
  return value;
};

export {
  candidateHasIssues,
  formatCurrency,
  formatDate,
  formatEstimatedDate,
  formatNumber,
  formatNIN,
  heldFeePaidJudicialRole,
  slugify,
  toCSV,
  toHumanCase,
  toYesNo,
  showAlternative,
  lookup,
  isInt
};
