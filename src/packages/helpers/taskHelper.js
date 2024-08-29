/*eslint func-style: ["error", "declaration"]*/

import { DIVERSITY_CHARACTERISTICS, hasDiversityCharacteristic } from '@/helpers/diversityCharacteristics';
import { downloadXLSX } from './export.js';
import createTimeline from './Timeline/createTimeline.js';
import { convertToDate, calculateMean, calculateStandardDeviation } from './helpers.js';
import initExerciseTimeline from './Timeline/exerciseTimeline.js';

export default (config) => {
  const exerciseTimeline = initExerciseTimeline(config);
  const TASK_TYPE = config.TASK_TYPE;
  const SHORTLISTING_TASK_TYPES = config.SHORTLISTING_TASK_TYPES;
  const TASK_STATUS = config.TASK_STATUS;
  const APPLICATION_STATUS = config.APPLICATION.STATUS;

  const MARKING_TYPE = {
    GROUP: 'group',
    SCORE: 'score',
    NUMBER: 'number',
    GRADE: 'grade',
    BOOL: 'bool',
  };

  const GRADES = ['A', 'B', 'C', 'D'];

  const GRADE_VALUES = {
    'A': 4,
    'B': 3,
    'C': 2,
    'D': 1,
  };

  const DOWNLOAD_TYPES = {
    emp: {
      name: 'EMP data only (can be shared with Commissioners)',
      value: 'emp',
      sheetName: 'EMP data - for Commissioners',
    },
    full: {
      name: 'All data (internal use only)',
      value: 'full',
      sheetName: 'All data - staff only',
    },
  };

function getScoreSheetTotal(markingScheme, scoreSheet) {
  let score = 0;
  if (!markingScheme) return score;
  if (!scoreSheet) return score;
  markingScheme.forEach(item => {
    if (item.type === MARKING_TYPE.GROUP) {
      item.children.forEach(child => {
        score += getScoreSheetItemTotal(child, scoreSheet[item.ref]);
      });
    } else {
      score += getScoreSheetItemTotal(item, scoreSheet);
    }
  });
  return score;
}

function markingScheme2ScoreSheet(markingScheme) {
  /**
   * e.g.
   * markingScheme: [
   *  type: 'group'|'number'|'grade'
   *  ref: String
   *  children: []
   * ]
   */
  const scoreSheet = {};
  markingScheme.forEach(item => {
    if (item.type === 'group') {
      scoreSheet[item.ref] = {};
      item.children.forEach(child => {
        scoreSheet[item.ref][child.ref] = '';
      });
    } else {
      scoreSheet[item.ref] = '';
    }
  });
  return scoreSheet;
}

function isScoreSheetComplete(markingScheme, scoreSheet) {
  if (!markingScheme) return false;
  if (!scoreSheet) return false;
  let isComplete = true;
  markingScheme.forEach(item => {
    if (item.type === MARKING_TYPE.GROUP) {
      item.children.forEach(child => {
        if (!scoreSheet[item.ref][child.ref]) {
          isComplete = false;
        }
      });
    } else {
      if (!scoreSheet[item.ref]) {
        isComplete = false;
      }
    }
  });
  return isComplete;
}

function meritList(task) {
  if (!task.applications) return [];
  if (!task.finalScores) return [];
  const applicationData = {};
  task.applications.forEach(application => applicationData[application.id] = application);
  return task.finalScores.map(scoreData => {
    return {
      ...applicationData[scoreData.id],
      ...scoreData,
    };
  });
}

function downloadMeritList(didNotTake, failed, task, diversityData, type, fileName) {
  switch (type) {
  case DOWNLOAD_TYPES.full.value:
  case DOWNLOAD_TYPES.emp.value:
    downloadXLSX(
      xlsxData(didNotTake, failed, task, diversityData, type),
      {
        title: 'QT Merit List',
        sheetName: DOWNLOAD_TYPES[type].sheetName,
        fileName: `${fileName}.xlsx`,
      }
    );
    return true;
  default:
    return false;
  }
}

function xlsxData(didNotTake, failed, task, diversityData, type) {  // currently only for QTs
  const rows = [];
  const headers = [];
  headers.push('Ref');
  if (type === DOWNLOAD_TYPES.full.value) {
    headers.push('Full name');
    headers.push('Email');
    headers.push('SJT score');
    headers.push('SJT %');
    headers.push('CAT score');
    headers.push('CAT %');
    headers.push('Z_SJT');
    headers.push('Z_CAT');
  }
  headers.push('Z_Overall');
  headers.push('Rank');
  headers.push('Notes');
  headers.push('Outcome');
  headers.push('Female');
  headers.push('Ethnic minority');
  headers.push('Solicitor');
  headers.push('Disabled');
  rows.push(headers);
  meritList(task).forEach(item => {
    const row = [];
    row.push(item.ref);
    if (type === DOWNLOAD_TYPES.full.value) {
      row.push(item.fullName);
      row.push(item.email);
      row.push(item.scoreSheet.qualifyingTest.SJ.score);
      row.push(item.scoreSheet.qualifyingTest.SJ.percent);
      row.push(item.scoreSheet.qualifyingTest.CA.score);
      row.push(item.scoreSheet.qualifyingTest.CA.percent);
      row.push(item.scoreSheet.qualifyingTest.SJ.zScore);
      row.push(item.scoreSheet.qualifyingTest.CA.zScore);
    }
    row.push(item.zScore);
    row.push(''); // TODO rank
    row.push(''); // TODO notes
    row.push(''); // TODO outcome
    const ref = item.ref.split('-')[1];
    if (diversityData[ref]) {
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.GENDER_FEMALE));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.ETHNICITY_BAME));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.PROFESSION_SOLICITOR));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.DISABILITY_DISABLED));
    } else {
      row.push();
      row.push();
      row.push();
      row.push();
    }
    rows.push(row);
  });
  // add did not take
  didNotTake.forEach(item => {
    const row = [];
    row.push(item.ref);
    if (type === DOWNLOAD_TYPES.full.value) {
      row.push(item.fullName);
      row.push(item.email);
      row.push('');
      row.push('');
      row.push('');
      row.push('');
      row.push('');
      row.push('');
    }
    row.push('');
    row.push(''); // TODO rank
    row.push(''); // TODO notes
    row.push('noTestSubmitted');
    const ref = item.ref.split('-')[1];
    if (diversityData[ref]) {
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.GENDER_FEMALE));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.ETHNICITY_BAME));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.PROFESSION_SOLICITOR));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.DISABILITY_DISABLED));
    } else {
      row.push();
      row.push();
      row.push();
      row.push();
    }
    rows.push(row);
  });
  // add failed
  failed.forEach(item => {
    const row = [];
    row.push(item.ref);
    if (type === DOWNLOAD_TYPES.full.value) {
      row.push(item.fullName);
      row.push(item.email);
      row.push('');
      row.push('');
      row.push('');
      row.push('');
      row.push('');
      row.push('');
    }
    row.push('');
    row.push(''); // TODO rank
    row.push(''); // TODO notes
    row.push('failedFirstTest');
    const ref = item.ref.split('-')[1];
    if (diversityData[ref]) {
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.GENDER_FEMALE));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.ETHNICITY_BAME));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.PROFESSION_SOLICITOR));
      row.push(hasDiversityCharacteristic(diversityData[ref], DIVERSITY_CHARACTERISTICS.DISABILITY_DISABLED));
    } else {
      row.push();
      row.push();
      row.push();
      row.push();
    }
    rows.push(row);
  });
  return rows;
}

function getDownloadTypes(task) {
  if (!task) return [];
  return Object.values(DOWNLOAD_TYPES);
}

function taskStatuses(taskType) {
  let availableStatuses = [];
  switch (taskType) {
    case TASK_TYPE.CRITICAL_ANALYSIS:
    case TASK_TYPE.SITUATIONAL_JUDGEMENT:
      availableStatuses = [
        TASK_STATUS.TEST_INITIALISED,
        TASK_STATUS.TEST_ACTIVATED,
        TASK_STATUS.FINALISED,
        TASK_STATUS.COMPLETED,
      ];
      break;
    case TASK_TYPE.QUALIFYING_TEST:
      availableStatuses = [
        TASK_STATUS.FINALISED,
        TASK_STATUS.COMPLETED,
      ];
      break;
    case TASK_TYPE.SCENARIO:
    case TASK_TYPE.EMP_TIEBREAKER:
      availableStatuses = [
        TASK_STATUS.TEST_INITIALISED,
        TASK_STATUS.TEST_ACTIVATED,
        // TASK_STATUS.PANELS_INITIALISED,
        // TASK_STATUS.PANELS_ACTIVATED,
        TASK_STATUS.DATA_ACTIVATED,
        TASK_STATUS.FINALISED,
        TASK_STATUS.COMPLETED,
      ];
      break;
    case TASK_TYPE.TELEPHONE_ASSESSMENT:
    case TASK_TYPE.ELIGIBILITY_SCC:
    case TASK_TYPE.STATUTORY_CONSULTATION:
    case TASK_TYPE.CHARACTER_AND_SELECTION_SCC:
        availableStatuses = [
        TASK_STATUS.STATUS_CHANGES,
        TASK_STATUS.COMPLETED,
      ];
      break;
    case TASK_TYPE.PRE_SELECTION_DAY_QUESTIONNAIRE:
      availableStatuses = [
        TASK_STATUS.CANDIDATE_FORM_CONFIGURE,
        TASK_STATUS.CANDIDATE_FORM_MONITOR,
        TASK_STATUS.COMPLETED,
      ];
      break;
    case TASK_TYPE.SIFT:
    case TASK_TYPE.SELECTION_DAY:
      availableStatuses = [
        TASK_STATUS.DATA_INITIALISED,
        TASK_STATUS.DATA_ACTIVATED,
        // TASK_STATUS.PANELS_INITIALISED,
        // TASK_STATUS.PANELS_ACTIVATED,
        TASK_STATUS.FINALISED,
        TASK_STATUS.COMPLETED,
      ];
      break;
    case TASK_TYPE.SHORTLISTING_OUTCOME:
    case TASK_TYPE.SELECTION_OUTCOME:
      availableStatuses = [
        TASK_STATUS.STAGE_OUTCOME,
        TASK_STATUS.COMPLETED,
      ];
      break;
  }
  return availableStatuses;
}

function taskNextStatus(taskType, currentStatus) {
  const availableStatuses = taskStatuses(taskType);
  let nextStatus = '';
  if (!availableStatuses.length) return nextStatus;
  if (!currentStatus) return availableStatuses[0];
  const currentIndex = availableStatuses.indexOf(currentStatus);
  if (currentIndex >= 0) {
    if (currentIndex + 1 < availableStatuses.length) {
      nextStatus = availableStatuses[currentIndex + 1];
    } else {
      nextStatus = availableStatuses[currentIndex];
    }
  }
  return nextStatus;
}

function getApplicationPassStatus(exercise, task) {
  // TODO the following overrides can be removed when we move to new stages & statuses
  if (
    [
      TASK_TYPE.CRITICAL_ANALYSIS,
      TASK_TYPE.SITUATIONAL_JUDGEMENT,
      TASK_TYPE.QUALIFYING_TEST,
      TASK_TYPE.SCENARIO,
    ].indexOf(task.type) >= 0
  ) {
    if ([TASK_TYPE.CRITICAL_ANALYSIS, TASK_TYPE.SITUATIONAL_JUDGEMENT].indexOf(task.type) >= 0) {
      if (!hasQualifyingTest(exercise, task)) return 'passedFirstTest';
    }
    if (task.type === TASK_TYPE.QUALIFYING_TEST) {
      return 'passedFirstTest';
    }
    if (task.type === TASK_TYPE.SCENARIO) {
      return 'passedScenarioTest';
    }
  }
  // end
  return `${task.type}Passed`;
}

function getApplicationDidNotParticipateStatus(exercise, task) {
  switch (task.type) {
  case TASK_TYPE.CRITICAL_ANALYSIS:
  case TASK_TYPE.SITUATIONAL_JUDGEMENT:
  case TASK_TYPE.QUALIFYING_TEST:
    return 'noTestSubmitted';
  case TASK_TYPE.SCENARIO:
    return 'noScenarioTestSubmitted';
  // case TASK_TYPE.PRE_SELECTION_DAY_QUESTIONNAIRE:
  //   return 'noSelectionDayQuestionnaireSubmitted';
  default:
    return null;
  }
}

function getApplicationFailStatus(exercise, task) {
  // TODO the following overrides can be removed when we move to new stages & statuses
  if (
    [
      TASK_TYPE.CRITICAL_ANALYSIS,
      TASK_TYPE.SITUATIONAL_JUDGEMENT,
      TASK_TYPE.QUALIFYING_TEST,
      TASK_TYPE.SCENARIO,
    ].indexOf(task.type) >= 0
  ) {
    if ([TASK_TYPE.CRITICAL_ANALYSIS, TASK_TYPE.SITUATIONAL_JUDGEMENT].indexOf(task.type) >= 0) {
      if (!hasQualifyingTest(exercise, task)) return 'failedFirstTest';
    }
    if (task.type === TASK_TYPE.QUALIFYING_TEST) {
      return 'failedFirstTest';
    }
    if (task.type === TASK_TYPE.SCENARIO) {
      return 'failedScenarioTest';
    }
  }
  // end
  return `${task.type}Failed`;
}

function hasQualifyingTest(exercise) {
  const hasCA = Boolean(exercise.shortlistingMethods.indexOf(config.SHORTLISTING.CRITICAL_ANALYSIS_QUALIFYING_TEST) >= 0 && exercise.criticalAnalysisTestDate);
  const hasSJ = Boolean(exercise.shortlistingMethods.indexOf(config.SHORTLISTING.SITUATIONAL_JUDGEMENT_QUALIFYING_TEST) >= 0 && exercise.situationalJudgementTestDate);
  return hasCA && hasSJ;
}

function getApplicationPassStatuses(taskType) {
  const statuses = [];
  switch (taskType) {
  // customise task types here
  default:
    statuses.push(`${taskType}Passed`);
  }
  return statuses;
}

function getApplicationFailStatuses(taskType) {
  const statuses = [];
  switch (taskType) {
  // customise task types here
  case config.TASK_TYPE.ELIGIBILITY_SCC:
    statuses.push(config.APPLICATION.STATUS.REJECTED_INELIGIBLE_STATUTORY);
    statuses.push(config.APPLICATION.STATUS.REJECTED_INELIGIBLE_ADDITIONAL);
    break;
  default:
    statuses.push(`${taskType}Failed`);
  }
  return statuses;
}

function scoreSheet({ type, exercise }) {
  let scoreSheet = {};
  switch (type) {
    case config.TASK_TYPE.SIFT:
      scoreSheet[type] = exercise.capabilities.reduce((acc, curr) => (acc[curr] = '', acc), {});
      break;
    case config.TASK_TYPE.SELECTION_DAY:
      exercise.selectionCategories.forEach(category => {
        scoreSheet[category] = exercise.capabilities.reduce((acc, curr) => (acc[curr] = '', acc), {});
      });
      break;
    case config.TASK_TYPE.SCENARIO:
      // TODO scenario
      scoreSheet = exercise.capabilities.reduce((acc, curr) => (acc[curr] = '', acc), {});
      break;
  }
  return scoreSheet;
}

function getTimelineDate(exercise, taskType, dateType) {
  let datetime;

  if (!exercise.shortlistingMethods) {
    return datetime;
  }

  let fieldName;
  if (taskType === config.TASK_TYPE.SCENARIO && exercise.shortlistingMethods.includes(config.SHORTLISTING.SCENARIO_TEST_QUALIFYING_TEST)) {
    fieldName = 'scenarioTest';
  }
  if (taskType === config.TASK_TYPE.SITUATIONAL_JUDGEMENT && exercise.shortlistingMethods.includes(config.SHORTLISTING.SITUATIONAL_JUDGEMENT_QUALIFYING_TEST)) {
    fieldName = 'situationalJudgementTest';
  }
  if (taskType === config.TASK_TYPE.CRITICAL_ANALYSIS && exercise.shortlistingMethods.includes(config.SHORTLISTING.CRITICAL_ANALYSIS_QUALIFYING_TEST)) {
    fieldName = 'criticalAnalysisTest';
  }

  const date = convertToDate(exercise[`${fieldName}Date`]);
  const time = convertToDate(exercise[`${fieldName}${dateType}Time`]);

  if (date instanceof Date) {
    datetime = new Date(date.getTime());
  }
  if (time instanceof Date) {
    datetime.setHours(time.getHours());
    datetime.setMinutes(time.getMinutes());
  }

  return datetime;
}

function getExerciseCapabilities(exercise) {  // returns display order
  if (!exercise) return [];
  return config.CAPABILITIES.filter(cap => exercise.capabilities.indexOf(cap) >= 0);
}

function getExerciseSelectionCategories(exercise) {  // returns display order
  if (!exercise) return [];
  return config.SELECTION_CATEGORIES.filter(cap => exercise.selectionCategories.indexOf(cap) >= 0);
}

function createMarkingScheme(exercise, taskType) {
  // console.log('createMarkingScheme', exercise, taskType);
  const markingScheme = [];
  switch (taskType) {
  case config.TASK_TYPE.SIFT:
    console.log('sift', getExerciseCapabilities(exercise));
    markingScheme.push(createMarkingSchemeGroup(taskType, getExerciseCapabilities(exercise)));
    break;
  case config.TASK_TYPE.SELECTION_DAY:
    getExerciseSelectionCategories(exercise).forEach(cat => {
      markingScheme.push(createMarkingSchemeGroup(cat, getExerciseCapabilities(exercise)));
    });
    break;
  default:
    markingScheme.push(createMarkingSchemeGroup(taskType, []));
  }
  return markingScheme;
}

function createMarkingSchemeGroup(ref, childRefs) {
  return {
    ref: ref,
    type: 'group',
    children: childRefs.map(childRef => {
      const item = {
        ref: childRef,
        type: 'grade',
      };
      if (childRef === 'OVERALL') item.excludeFromScore = true;
      return item;
    }),
  };
}

function getTimelineTasks(exercise, taskType) {
  const timeline = createTimeline(exerciseTimeline(exercise));
  let timelineTasks = timeline.filter(item => item.taskType && (!taskType || item.taskType === taskType));
  let supportedTaskTypes = [];
  if (exercise._processingVersion >= 3) {
    supportedTaskTypes = [
      TASK_TYPE.TELEPHONE_ASSESSMENT,
      TASK_TYPE.SIFT,
      TASK_TYPE.CRITICAL_ANALYSIS,
      TASK_TYPE.SITUATIONAL_JUDGEMENT,
      TASK_TYPE.QUALIFYING_TEST,
      TASK_TYPE.SCENARIO,
      // TASK_TYPE.SHORTLISTING_OUTCOME,
      // TASK_TYPE.ELIGIBILITY_SCC,
      // TASK_TYPE.STATUTORY_CONSULTATION,
      // TASK_TYPE.CHARACTER_AND_SELECTION_SCC,
      TASK_TYPE.EMP_TIEBREAKER,
      // TASK_TYPE.PRE_SELECTION_DAY_QUESTIONNAIRE,
      TASK_TYPE.SELECTION_DAY,
    ];
  } else {
    supportedTaskTypes = [
      TASK_TYPE.CRITICAL_ANALYSIS,
      TASK_TYPE.SITUATIONAL_JUDGEMENT,
      TASK_TYPE.QUALIFYING_TEST,
      TASK_TYPE.SCENARIO,
      TASK_TYPE.EMP_TIEBREAKER,
    ];
  }
  timelineTasks = timelineTasks.filter(task => supportedTaskTypes.indexOf(task.taskType) >= 0);
  if (timelineTasks.find((item) => item.taskType === TASK_TYPE.SHORTLISTING_OUTCOME)) {  // ensure shortlisting outcome comes after shortlisting methods!
    let shortlistingOutcomeIndex = -1;
    let lastShortlistingMethodIndex = -1;
    timelineTasks.forEach((item, index) => {
      if (item.taskType === TASK_TYPE.SHORTLISTING_OUTCOME) shortlistingOutcomeIndex = index;
      if (
        (SHORTLISTING_TASK_TYPES.indexOf(item.taskType) >= 0)
        && index > lastShortlistingMethodIndex
      ) {
        lastShortlistingMethodIndex = index;
      }
    });
    if (lastShortlistingMethodIndex > shortlistingOutcomeIndex) {
      timelineTasks.splice(lastShortlistingMethodIndex, 0, timelineTasks.splice(shortlistingOutcomeIndex, 1)[0]);
    }
  }
  return timelineTasks;
}

function getTaskTypes(exercise, stage) {
  let taskTypes = getTimelineTasks(exercise).map(item => item.taskType).filter((value, index, thisArray) => thisArray.indexOf(value) === index);
  if (stage) {
    taskTypes = taskTypes.filter(taskType => STAGE_TASKS[stage].indexOf(taskType) >= 0);
  }
  const indexCA = taskTypes.indexOf(TASK_TYPE.CRITICAL_ANALYSIS);
  const indexSJ = taskTypes.indexOf(TASK_TYPE.SITUATIONAL_JUDGEMENT);
  if (indexCA >= 0 && indexSJ >= 0) {
    const indexQT = Math.max(indexCA, indexSJ);
    taskTypes.splice(indexQT + 1, 0, TASK_TYPE.QUALIFYING_TEST);
  }
  return taskTypes;
}

function previousTaskType(exercise, type) {
  let prevTaskType = '';
  if (!exercise) return prevTaskType;
  const taskTypes = getTaskTypes(exercise);
  const currentIndex = taskTypes.indexOf(type);
  if (currentIndex > 0) {
    if ([config.TASK_TYPE.CRITICAL_ANALYSIS, config.TASK_TYPE.SITUATIONAL_JUDGEMENT, config.TASK_TYPE.QUALIFYING_TEST].indexOf(type) >= 0) {
      for (let i = currentIndex; i >= 0; --i) {
        if ([config.TASK_TYPE.CRITICAL_ANALYSIS, config.TASK_TYPE.SITUATIONAL_JUDGEMENT, config.TASK_TYPE.QUALIFYING_TEST].indexOf(taskTypes[i]) < 0) {
          prevTaskType = taskTypes[i];
          break;
        }
      }
    } else {
      prevTaskType = taskTypes[currentIndex - 1];
    }
  }
  return prevTaskType;
}

function taskApplicationsEntryStatus(exercise, type) {
  let status = '';
  if (!exercise) return status;
  if (type === TASK_TYPE.EMP_TIEBREAKER) return APPLICATION_STATUS.SCC_TO_RECONSIDER;  // TODO: remove this eventually: override entry status for EMP tie-breakers
  const prevTaskType = previousTaskType(exercise, type);
  if (prevTaskType) {
    console.log('previousTaskType', prevTaskType);
    switch (prevTaskType) {
    case TASK_TYPE.CRITICAL_ANALYSIS:
    case TASK_TYPE.SITUATIONAL_JUDGEMENT:
    case TASK_TYPE.QUALIFYING_TEST:
      status = APPLICATION_STATUS.QUALIFYING_TEST_PASSED;
      break;
    case TASK_TYPE.SCENARIO:
      status = APPLICATION_STATUS.SCENARIO_TEST_PASSED;
      break;
    default:
      status = `${prevTaskType}Passed`;
    }
  }
  return status;
}

function finaliseScoreSheet(markingScheme, scoreSheet) {
  if (!scoreSheet) return {};
  if (!markingScheme) return scoreSheet;
  delete scoreSheet.flagForModeration;  //  removing `flagForModeration` flag in order to reduce object size
  markingScheme.forEach(item => {
    if (item.type === config.MARKING_TYPE.GROUP) {
      scoreSheet[item.ref].score = 0;
      item.children.forEach(child => {
        scoreSheet[item.ref].score += getScoreSheetItemTotal(child, scoreSheet[item.ref]);
      });
    }
  });
  return scoreSheet;
}

function getScoreSheetItemTotal(item, scoreSheet) {
  if (!item.excludeFromScore) {
    switch (item.type) {
    case config.MARKING_TYPE.GRADE:
      if (scoreSheet[item.ref] && config.GRADE_VALUES[scoreSheet[item.ref]]) {
        return config.GRADE_VALUES[scoreSheet[item.ref]];
      }
      break;
    case config.MARKING_TYPE.NUMBER:
      if (scoreSheet[item.ref]) {
        return parseFloat(scoreSheet[item.ref]);
      }
      break;
    }
  }
  return 0;
}

function getEmptyScoreSheet(arrData) {
  const returnObject = {};
  arrData.forEach(item => {
    if (item.indexOf('.') >= 0) {
      const parts = item.split('.');
      if (!returnObject[parts[0]]) returnObject[parts[0]] = {};
      returnObject[parts[0]][parts[1]] = '';
    } else {
      returnObject[item] = '';
    }
  });
  return returnObject;
}

function scoreSheet2MarkingScheme(scoreSheet) {
  const markingScheme = [];
  Object.keys(scoreSheet).forEach(key => {
    if (typeof scoreSheet[key] === 'object') {
      const children = [];
      Object.keys(scoreSheet[key]).forEach(childKey => {
        children.push({
          ref: childKey,
          type: 'number',
        });
      });
      markingScheme.push({
        ref: key,
        type: 'group',
        children: children,
      });
    } else {
      markingScheme.push({
        ref: key,
        type: 'number',
      });
    }
  });
  return markingScheme;
}

/**
 * includeZScores
 * Calculates z score for each item provided in the 'finalScores' param
 * * @param {*} `finalScores` array of objects where each object has the following shape:
 ```
 {
  score: Number,
  percent: Number,
  scoreSheet: {
    qualifyingTest: {
      CA: {
        score: Number,
        percent: Number,
      },
      SJ: {
        score: Number,
        percent: Number,
      },
      score: Number,
      percent: Number,
    },
  },
}
```
 * @returns Provided `finalScores` array decorated with new `zScore` properties
 * Note: zScore = ((% Score – Mean(All % Scores))/SD(All % Scores))
 * Note: combined zScore has a weighting of 40% of CAT zScore plus 60% of SJT zScore
 **/
function includeZScores(finalScores) {
  if (!finalScores) return [];
  if (!finalScores.length) return [];
  const CApercents = [];
  const SJpercents = [];
  try {
    finalScores.forEach(item => {
      CApercents.push(item.scoreSheet.qualifyingTest.CA.percent);
      SJpercents.push(item.scoreSheet.qualifyingTest.SJ.percent);
    });
    const CAmean = calculateMean(CApercents);
    const SJmean = calculateMean(SJpercents);
    const CAstdev = calculateStandardDeviation(CApercents);
    const SJstdev = calculateStandardDeviation(SJpercents);
    finalScores.forEach(item => {
      item.scoreSheet.qualifyingTest.CA.zScore = CAstdev ? (item.scoreSheet.qualifyingTest.CA.percent - CAmean) / CAstdev : 0;
      item.scoreSheet.qualifyingTest.SJ.zScore = SJstdev ? (item.scoreSheet.qualifyingTest.SJ.percent - SJmean) / SJstdev : 0;
    });
    finalScores.forEach(item => {
      let zScore = (0.4 * item.scoreSheet.qualifyingTest.CA.zScore) + (0.6 * item.scoreSheet.qualifyingTest.SJ.zScore);
      zScore = parseFloat(zScore.toFixed(2));
      if (zScore === 0) zScore = 0;
      item.zScore = zScore;
      item.scoreSheet.qualifyingTest.zScore = zScore;
    });
  } catch (e) {
    return finalScores;
  }
  return finalScores;
}
  return {
    MARKING_TYPE,
    GRADES,
    GRADE_VALUES,
    DOWNLOAD_TYPES,
    scoreSheet,
    getTimelineDate,
    getTimelineTasks,
    createMarkingScheme,
    taskStatuses,
    taskNextStatus,
    taskApplicationsEntryStatus,
    finaliseScoreSheet,
    getScoreSheetTotal,
    getEmptyScoreSheet,
    scoreSheet2MarkingScheme,
    hasQualifyingTest,
    getApplicationPassStatus,
    getApplicationFailStatus,
    getApplicationDidNotParticipateStatus,
    getApplicationPassStatuses,
    getApplicationFailStatuses,
    includeZScores,
    markingScheme2ScoreSheet,
    isScoreSheetComplete,
    meritList,
    downloadMeritList,
    getDownloadTypes,
  };
};
