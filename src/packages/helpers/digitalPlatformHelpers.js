const lookup = require('./lookup');

const firebase = require('firebase-admin');
const Timestamp = firebase.firestore.Timestamp;

const addField = (array, label, value, lineBreak = false) => {
  if (value === undefined || value === null || value === '') {
    return;
  }
  if (typeof (value) === 'boolean') {
    value = toYesNo(value);
  }
  array.push({ value: value, label: label, lineBreak: lineBreak });
};

const toYesNo = (value) => {
  // Only convert booleans, not all falsy values mean "no"
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return value;
};


const toDateString = (date) => {
  const dateParts = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split('T')[0]
    .split('-');
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};

const formatDate = (value) => {
  if (value && (value.seconds !== undefined || value._seconds !== undefined)) { // convert firestore timestamp to date
    const seconds = value.seconds || value._seconds;
    const nanoseconds = value.nanoseconds || value._nanoseconds;
    value = new Timestamp(seconds, nanoseconds);
    value = value.toDate();
  }
  if (!isNaN(new Date(value).valueOf()) && value !== null) {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    value = toDateString(value);
  }
  return value ? value : '';
};

const formatNIN = (value) => {
  return value ? value.toUpperCase() : '';
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

const flattenCurrentLegalRole = (equalityAndDiversitySurvey) => {
  if (!(equalityAndDiversitySurvey && equalityAndDiversitySurvey.currentLegalRole)) {
    return '';
  }

  const roles = [];
  equalityAndDiversitySurvey.currentLegalRole.forEach((role) => {
    if (role === 'other-fee-paid-judicial-office-holder') {
      roles.push(`other: ${ equalityAndDiversitySurvey.otherCurrentFeePaidJudicialOfficeHolderDetails }`);
    } else if (role === 'other-salaried-judicial-office-holder') {
      roles.push(`other: ${ equalityAndDiversitySurvey.otherCurrentSalariedJudicialOfficeHolderDetails}`);
    } else if (role === 'other-current-legal-role') {
      roles.push(`Other: ${ equalityAndDiversitySurvey.otherCurrentLegalRoleDetails }`);
    } else {
      roles.push(lookup(role));
    }
  });

  return roles.join('\n');
};

const flattenProfessionalBackground = (equalityAndDiversitySurvey) => {
  if (!(equalityAndDiversitySurvey && equalityAndDiversitySurvey.professionalBackground)) {
    return '';
  }
  const roles = [];
  equalityAndDiversitySurvey.professionalBackground.forEach((role) => {
    if (role === 'other-professional-background') {
      roles.push(`Other: ${ equalityAndDiversitySurvey.otherProfessionalBackgroundDetails }`);
    } else {
      roles.push(lookup(role));
    }
  });
  return roles.join('\n');
};

const attendedUKStateSchool = (equalityAndDiversitySurvey, exercise) => {
  // Add checks for different fields after 01-04-2023
  if (applicationOpenDatePost01042023(exercise)) {
    if (!(equalityAndDiversitySurvey && equalityAndDiversitySurvey.stateOrFeeSchool16)) {
      return '';
    }
    return toYesNo(['uk-state-selective', 'uk-state-non-selective'].indexOf(equalityAndDiversitySurvey.stateOrFeeSchool16) >= 0);
  }
  else {
    if (!(equalityAndDiversitySurvey && equalityAndDiversitySurvey.stateOrFeeSchool)) {
      return '';
    }
    return toYesNo(['uk-state-selective', 'uk-state-non-selective'].indexOf(equalityAndDiversitySurvey.stateOrFeeSchool) >= 0);
  }
};

const applicationOpenDatePost01042023 = (exercise) => {
  return Object.prototype.hasOwnProperty.call(exercise, 'applicationOpenDate') && exercise.applicationOpenDate.toDate() > new Date('2023-04-01');
};

function calculateMean(numArray) {
  let total = 0;
  numArray.forEach(num => total += num);
  const mean = total / numArray.length;
  return mean;
}

function calculateStandardDeviation(numArray) {
  const mean = calculateMean(numArray);
  let total = 0;
  numArray.forEach(num => total += Math.pow((num - mean), 2) );
  const variance = total / numArray.length;
  return Math.sqrt(variance);
}

function normaliseNINs(nins) {
  return nins.map(nin => normaliseNIN(nin));
}

function normaliseNIN(nin) {
  return nin ? nin.trim().replace(/-|\s/g,'').toLowerCase() : ''; //replace hyphens and spaces inside and on the outer side and makes lower case
}

function reviver(key, value) {
  // TODO remove this first block of code checking for `.seconds` rather than `._seconds`, when we're sure Timestamps no longer come through like this
  if (value && typeof value === 'object' && typeof value.seconds === 'number' && typeof value.nanoseconds === 'number') {
    value = new Timestamp(value.seconds, value.nanoseconds).toDate();
  }
  if (value && typeof value === 'object' && typeof value._seconds === 'number' && typeof value._nanoseconds === 'number') {
    value = new Timestamp(value._seconds, value._nanoseconds).toDate();
  }
  return value;
}

function convertFirestoreTimestampsToDates(data) {
  // Return non-object values untouched
  if (typeof data !== 'object' || data === null) return data;
  const json = JSON.stringify(data);
  return JSON.parse(json, reviver);
}

async function getDocument(query, convertTimestamps) {
  const doc = await query.get();
  if (doc.exists) {
    const document = doc.data();
    document.id = doc.id;
    document.ref = doc.ref;
    if (convertTimestamps) {
      return convertFirestoreTimestampsToDates(document);
    } else {
      return document;
    }
  }
  return false;
}

async function getDocuments(query) {
  const documents = [];
  const snapshot = await query.get();
  snapshot.forEach((doc) => {
    const document = doc.data();
    document.id = doc.id;
    document.ref = doc.ref;
    documents.push(document);
  });
  return documents;
}

async function getDocumentsFromQueries(queries) {
  const documents = [];
  const querySnapshots = await Promise.all(queries.map(query => query.get()));
  querySnapshots.forEach((snapshot) => {
    snapshot.forEach(doc => {
    const document = doc.data();
    document.id = doc.id;
    document.ref = doc.ref;
    documents.push(document);
    });
  });
  return documents;
}

async function getAllDocuments(db, references) {
  const documents = [];
  if (references.length) {
    const snapshot = await db.getAll(...references);
    snapshot.forEach((doc) => {
      const document = { ...doc.data() };
      document.id = doc.id;
      document.ref = doc.ref;
      documents.push(document);
    });
  }
  return documents;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

async function applyUpdates(db, commands) {
  const BATCH_SIZE = 200;
  if (commands.length) {
    if (commands.length < BATCH_SIZE) {
      try {
        const batch = db.batch();
        for (let i = 0, len = commands.length; i < len; ++i) {
          switch (commands[i].command) {
          case 'set':
              batch.set(commands[i].ref, commands[i].data, { merge: true });
            break;
          default:
              batch[commands[i].command](commands[i].ref, commands[i].data);
          }
        }
        await batch.commit();
        return commands.length;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else { // process in batches of 199
      let totalCommandsExecuted = 0;
      const chunkedCommands = chunkArray(commands, BATCH_SIZE - 1);
      for (let i = 0, len = chunkedCommands.length; i < len; ++i) {
        const result = await applyUpdates(db, chunkedCommands[i]);
        if (result) { totalCommandsExecuted += result; }
      }
      return totalCommandsExecuted;
    }
  }
  return false;
}

function chunkArray(arr, size) {
  var myArray = [];
  for (var i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}

function checkArguments(definitions, data) {
  // check data only contains defined props
  const allowedKeys = Object.keys(definitions);
  const providedKeys = Object.keys(data);
  for (let i = 0, len = providedKeys.length; i < len; ++i) {
    if (allowedKeys.indexOf(providedKeys[i]) < 0) {
      // console.log('data contains non-defined props');
      return false;
    }
  }

  // check data contains required definitions
  const requiredKeys = [];
  for (key in definitions) {
    if (definitions[key].required) { requiredKeys.push(key); }
  }
  for (let i = 0, len = requiredKeys.length; i < len; ++i) {
    if (providedKeys.indexOf(requiredKeys[i]) < 0) {
      // console.log('data does not contain required props');
      return false;
    }
    // check required props have a value
    if (data[requiredKeys[i]].length === 0) {
      return false;
    }
  }
  // @TODO perhaps make this return richer information like `{ isOK: Boolean, message: String }`
  return true;
}

function isDate(date) {
  return date instanceof Date;
}

function isDateInPast(date) {
  const dateToCompare = new Date(date);
  const today = new Date();
  return dateToCompare < today;
}

function getDate(value) {
  let returnValue;
  if (value && (value.seconds || value._seconds)) { // convert firestore timestamp to date
    const seconds = value.seconds || value._seconds;
    const nanoseconds = value.nanoseconds || value._nanoseconds;
    returnValue = new Timestamp(seconds, nanoseconds);
    returnValue = returnValue.toDate();
  } else if (value && !isNaN(new Date(value).valueOf())) {
    returnValue = new Date(value);
  } else {
    returnValue = new Date(); // NOTE: returns today's date by default
  }
  return returnValue;
}

function toDateString(date) {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split('T')[0];
}

function toTimeString(date) {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split('T')[1];
}

function formatDate(value, type) {
  value = convertToDate(value);
  if (value) {
    const time = value.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute:'2-digit',
      hour12: false,
      timeZone: 'Europe/London',
    });

    switch (type) {
      case 'time':
        value = toTimeString(value);
        break;
      case 'DD/MM/YYYY':
        // e.g. 30/11/2022 (ref: https://momentjs.com/docs/#/displaying/format/)
        value = value.toLocaleDateString();
        break;
      case 'date-hour-minute':
        // e.g. Wednesday, 30 November, 2022 at 13:00
        value = `${value.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${time}`;
        break;
      default:
        value = toDateString(value);
    }
  }
  return value ? value : '';
}

function convertToDate(value) {
  if (value && (value.seconds !== undefined || value._seconds !== undefined)) { // convert firestore timestamp to date
    const seconds = value.seconds || value._seconds;
    const nanoseconds = value.nanoseconds || value._nanoseconds;
    value = new Timestamp(seconds, nanoseconds);
    value = value.toDate();
  }
  if (!isNaN(new Date(value).valueOf()) && value !== null) {
    if (!(value instanceof Date)) {
      return new Date(value);
    }
  }
  return value;
}

function getEarliestDate(arrDates) {
  const sortedDates = arrDates.sort((a, b) => timeDifference(a, b));
  return sortedDates[0];
}

function getLatestDate(arrDates) {
  const sortedDates = arrDates.sort((a, b) => timeDifference(a, b));
  return sortedDates[sortedDates.length - 1];
}

function timeDifference(date1, date2) {
  date1 = convertToDate(date1);
  date2 = convertToDate(date2);
  if (date1 && date2) {
    const timestamp1 = date1.getTime();
    const timestamp2 = date2.getTime();
    return timestamp1 - timestamp2;
  } else {
    return 0;
  }
}

function convertStringToSearchParts(value, delimiter) {
  const wordDelimiter = delimiter ? delimiter : ' ';
  const words = value.toLowerCase().split(wordDelimiter);
  const search = [];
  for (let j = 0, lenJ = words.length; j < lenJ; ++j) {
    // add previous word with word delimiter
    for (let k = 0; k < j; ++k) {
      const previousWords = words.slice(k, j).join(wordDelimiter);
      search.push(`${previousWords}${wordDelimiter}`);
    }
    // add letters from word
    for (let k = 0, lenK = words[j].length; k < lenK; ++k) {
      const letters = words[j].substr(0, k + 1);
      search.push(letters);
      // add letters to previous word(s)
      for (let l = 0; l < j; ++l) {
        const previousWords = words.slice(l, j).join(wordDelimiter);
        search.push(`${previousWords}${wordDelimiter}${letters}`);
      }
    }
  }
  return search;
}

function isProduction() {
  const projectId = firebase.instanceId().app.options.projectId;
  return projectId.includes('production');
}

function removeHtml(str) {
  return str.replace(/(<([^>]+)>)/gi, '');
}

module.exports = {
  addField,
  toYesNo,
  formatDate,
  toDateString,
  formatNIN,
  heldFeePaidJudicialRole,
  flattenCurrentLegalRole,
  flattenProfessionalBackground,
  attendedUKStateSchool,
  applicationOpenDatePost01042023,
  getDocument,
  getDocuments,
  getDocumentsFromQueries,
  getAllDocuments,  // @TODO consider names used here
  isEmpty,
  applyUpdates,
  checkArguments,
  isDate,
  isDateInPast, // @TODO we want one set of date & exercise helpers (see actions/shared/converters)
  formatDate,
  getDate,
  convertToDate,
  timeDifference,
  getEarliestDate,
  getLatestDate,
  convertStringToSearchParts,
  isProduction,
  removeHtml,
  normaliseNINs,
  normaliseNIN,
  calculateMean,
  calculateStandardDeviation,
};
