import firebase from '@firebase/app';

/**
 * Deep compare two objects and return an array of the top level keys that have differences
 * Ignore keys that begin with an underscore
 * Ignore keys passed in the keysToIgnore array
 * @param {*} obj1 
 * @param {*} obj2 
 * @param {*} keysToIgnore 
 * @returns 
 */
const deepKeysDiff = (obj1, obj2, keysToIgnore = []) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const diffKeys = [];
  for (const key of keys1) {
    if (keysToIgnore.includes(key) || key.charAt(0) === '_') {
      // If the key is in the keysToIgnore array or begins with an underscore, skip the comparison
      continue;
    }
    if (!keys2.includes(key)) {
      diffKeys.push(key);
    } else if (!deepEqual(obj1[key], obj2[key])) {
      diffKeys.push(key);
    }
  }
  for (const key of keys2) {
    if (!keys1.includes(key) && !diffKeys.includes(key)) {
      diffKeys.push(key);
    }
  }
  return diffKeys;
};

const isFirebaseTimestamp = (input) => {
  return input instanceof firebase.firestore.Timestamp;
};

/**
 * Deep compare two values
 * Includes nested structures by using recursion
 * Does not include js dates
 * (Deliberately) Ignores the order of values in an array!!
 * @param {*} val1 
 * @param {*} val2 
 * @returns 
 */
const deepEqual = (val1, val2) => {
  if (val1 === val2) {
    return true;
  }
  if ((isFirebaseTimestamp(val1) && isFirebaseTimestamp(val2)) && val1 === val2) {
    return true;
  }
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) {
      return false;
    }
    const sorted1 = [...val1].sort();
    const sorted2 = [...val2].sort();
    return sorted1.every((item, index) => deepEqual(item, sorted2[index]));
  }
  if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keys1.every(key => deepEqual(val1[key], val2[key]));
  }
  return false;
};

export {
  deepEqual,
  deepKeysDiff,
};
