
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
      'african': 'African',
      'another-commonwealth-country': 'Another Commonwealth country',
      'approved': 'Approved',
      'assisting-in-proceedings-for-resolution-of-issues-under-law': 'Assisting persons involved in proceedings for the resolution of issues arising under the law',
      'athiest': 'Atheist',
      'atheist': 'Atheist',
      'bangladeshi': 'Bangladeshi',
      'barrister': 'Barrister',
      'bisexual': 'Bisexual',
      'both': 'Both',
      'buddhist': 'Buddhist',
      'caribbean': 'Caribbean',
      'chartered-association-of-building-engineers': 'Chartered Association of Building Engineers',
      'chartered-institute-of-building': 'Chartered Institute of Building',
      'chartered-institute-of-environmental-health': 'Chartered Institute of Environmental Health',
      'chinese': 'Chinese',
      'christian': 'Christian',
      'cilex': 'CILEx fellow (this might be called Fellow ILEX)',
      'CILEx': 'Fellow of the Chartered Institute of Legal Executives (CILEx)',
      'civil': 'Civil',
      'closed': 'Closed',
      'court': 'Court',
      'crime': 'Crime',
      'critical-analysis-qualifying-test': 'Critical analysis qualifying test (QT)',
      'devolution-questions': 'Devolution questions',
      'draft': 'Draft',
      'drafting-documents-that-affect-rights-obligations': 'Drafting documents intended to affect persons\' rights or obligations',
      'employment-appeals-tribunal': 'Employment Appeals Tribunal',
      'employment-tribunal': 'Employment Tribunal',
      'england-wales': 'England and Wales',
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
      'jac-website': 'JAC Website',
      'jewish': 'Jewish',
      'judicial-office-extranet': 'Judicial Office Extranet',
      'judicial-functions': 'The carrying-out of judicial functions of any court or tribunal',
      'judging-your-future-newsletter': 'Judging Your Future Newsletter',
      'lands-chamber': 'Lands Chamber',
      'leadership-non-legal': 'Leadership - non legal',
      'leadership': 'Leadership',
      'legal': 'Legal',
      'linked-in': 'LinkedIn',
      'lord-chancellor': 'Lord Chancellor',
      'lady-chief-justice': 'Lady Chief Justice',
      'lord-chief-justice': 'Lady Chief Justice',
      'male': 'Male',
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
      'practice-or-employment-as-lawyer': 'Practice or employment as a lawyer',
      'pre-launch': 'Pre launch',
      'prefer-not-to-say': 'Prefer not to say',
      'professional-body-website-or-email': 'Professional body website or email (eg The Law Society)',
      'professional-body-magazine': 'Professional body magazine',
      'property-chamber': 'Property Chamber',
      'ranked-choice': 'Ranked choice',
      'read': 'Read',
      'ready': 'Ready for approval',
      'republic-of-ireland': 'Republic of Ireland',
      'royal-college-of-psychiatrists': 'Royal College of Psychiatrists',
      'royal-institute-of-british-architects': 'Royal Institute of British Architects',
      'royal-institution-of-chartered-surveyors': 'Royal Institution of Chartered Surveyors',
      'salaried': 'Salaried',
      'salaried-court-judge': 'Salaried court judge',
      'salaried-tribunal-judge': 'Salaried tribunal judge',
      'scenario-test-qualifying-test': 'Scenario test qualifying test (QT)',
      'schedule-23': 'Schedule 3(d)',
      'schedule-2d': 'Schedule 2(d)',
      'scotland': 'Scotland',
      'scottish-ministers': 'Scottish ministers',
      'second-tier-immigration-and-asylum-chamber': 'Immigration and Asylum Chamber (second-tier)',
      'self-assessment-with-competencies': 'Self Assessment with competencies',
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
      's9-1': 's9(1)',
      's9-4': 's9(4)',
      'tax-and-chancery': 'Tax and Chancery',
      'tax-chamber': 'Tax Chamber',
      'teaching-researching-law': 'Teaching or researching law',
      'telephone-assessment': 'Telephone assessment',
      'tribunal': 'Tribunal',
      'twitter': 'Twitter',
      'uk': 'UK',
      'uk-ethnic': 'English, Welsh, Scottish, Northern Ireland, British',
      'uk-independent-fee': 'UK independent or fee-paying school',
      'uk-independent-fee-with-bursary': 'UK independent or fee-paying school with financial assistance (bursary or means-tested scholarship)',
      'uk-state-non-selective': 'UK state school - non-selective',
      'uk-state-selective': 'UK state school - selective',
      'unpaid': 'Unpaid',
      'war-pension-and-armed-forces-compensation-chamber': 'War Pension and Armed Forces Compensation Chamber',
      'welsh-administration-questions': 'Welsh administration questions',
      'welsh-government': 'Welsh Government',
      'welsh-language': 'Welsh language',
      'welsh-reading-writing': 'Read and/or write Welsh',
      'welsh-speaking': 'Speak Welsh',
      'word-of-mouth': 'Word of mouth',
      'white-asian': 'White and Asian',
      'white-black-african': 'White and Black African',
      'white-black-caribbean': 'White and Black Caribbean',
      'write': 'Write',
      'schedule-2-d': 'Schedule 2(d)',
      'schedule-2-3': 'Schedule 3(d)',
      /* Exercise stages: start */
      'review': 'Review',
      'shortlisted': 'Shortlisted',
      'selected': 'Selected',
      'selectable': 'Selectable',
      'recommended': 'Recommended',
      'handover': 'Handover',
      /* Exercise stages: end */
      /* ApplicationRecord statuses: start */
      passedSift: 'Passed Sift',
      failedSift: 'Failed Sift',
      submittedFirstTest: 'Submitted first test',
      failedFirstTest: 'Failed First test',
      submittedScenarioTest: 'Submitted scenario test',
      passedFirstTest: 'Passed first test',
      failedScenarioTest: 'Failed scenario test',
      passedScenarioTest: 'Passed scenario test',
      failedTelephoneAssessment: 'Failed telephone assessment',
      passedTelephoneAssessment: 'Passed telephone assessment',
      noTestSubmitted: 'No test Submitted',
      testSubmittedOverTime: 'Test submitted over time',
      withdrewApplication: 'Withdrew application',
      rejectedAsIneligible: 'Rejected as ineligible',
      passedSelection: 'Passed Selection',
      failedSelection: 'Failed Selection',
      passedButNotRecommended: 'Passed but not Recommended',
      rejectedByCharacter: 'Rejected by character',
      approvedForImmediateAppointment: 'Approved for immediate appointment',
      approvedForFutureAppointment: 'Approved for future appointment',
      sccToReconsider: 'SCC to reconsider',
      invitedToSelectionDay: 'Invited To Selection Day',
      /* ApplicationRecords statuses: end */
      NiNumber: 'National Insurance Number',
      'transferred': 'Qualified solicitor, qualified lawyer from another jurisdiction, or a legal academic transferred to the Bar',
      'called-pre-2002': 'Called to the Bar prior to 1 January 2002',
      // 'xxx': 'xxx',`

      // post-qualification experience
      'full-time': 'Full-time',
      'salaried-part-time': 'Salaried part-time',
      'voluntary': 'Voluntary',
      'judicial-post': 'Judicial',
      'quasi-judicial-post': 'Quasi-judicial',

      // Qualifying Tests
      'scenarioTest': 'Scenario Test',
      'criticalAnalysis': 'Critical Analysis Test',
      'situationalJudgement': 'Situational Judgement Test',
      'empTiebreaker': 'EMP Tie-breaker',

      // character issues status
      'proceed': 'Proceed',
      'reject': 'Reject',
      'reject-non-declaration': 'Reject Non-Declaration',
      'discuss': 'Discuss',

      // character issues offence category
      'singleMotoringOffence': 'Single motoring offence',
      'multipleMotoringOffences': 'Multiple motoring offences',
      'singlePenaltyNotice': 'Single Fixed Penalty Notices & Penalty Charge Notices',
      'multiplePenaltyNotices': 'Multiple Fixed Penalty Notices & Penalty Charge Notices',
      'singleCriminalOffence': 'Single criminal offence',
      'multipleCriminalOffences': 'Multiple criminal offences',
      'singleFinancialOffence': 'Single financial issue',
      'multipleFinancialOffences': 'Multiple financial issues',
      'singleProfessionalConduct': 'Single professional conduct matter',
      'multipleProfessionalConducts': 'Multiple professional conduct matters',
      'singleOtherMatter': 'Single other matter',
      'multipleOtherMatters': 'Multiple other matters',
      'mixed': 'Mixed',

      // character issues guidance reference
      'criminalOffences': 'Criminal offences: paras 21-24',
      'moteringOffences': 'Motoring offences: paras 25-30',
      'fixedPenaltyNotices': 'Fixed penalty notices: paras 31-34',
      'financialInsolvencyDebt': 'Financial insolvency and debt: paras 35-38',
      'financialVatTax': 'Financial VAT and Tax: paras 39-43',
      'professionalConduct': 'Professional conduct: paras 44-57',
      'furtherDisclosures': 'Further disclosures: paras 58-65',
    };

    return lookup[value] || value;
  }
  // Default for unanswered question
  if (typeof value === 'undefined' || value === null) {
    return 'Answer not supplied';
  }
  return value;
};

export default lookup;