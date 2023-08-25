/**
 * Replace characters in a string according to a map
 * @param String str 
 * @param String characterMap 
 * @returns 
 */
const replaceCharacters = (inputString, characterMap) => {
  // Convert the inputString to an array of characters
  const inputArray = inputString.split('');

  // Iterate through each character in the array
  for (let i = 0; i < inputArray.length; i++) {
    const char = inputArray[i];
    
    // Check if the character exists in the charMap
    if (Object.prototype.hasOwnProperty.call(characterMap, char)) {
      // Replace the character with its corresponding value from charMap
      inputArray[i] = characterMap[char];
    }
  }

  // Convert the modified array back to a string and return it
  return inputArray.join('');
};

/**
 * Firestore keys cannot contain certain (illegal) characters so replace them with an acceptable character
 * @param String str 
 */
const formatSearchTerm = (str) => {
  const characterMap = {
    '[': '-',
    ']': '-',
    '.': '-',
    '@': '-',
    '*': '-',
    '/': '-',
    '\\': '-',
  };
  return replaceCharacters(str, characterMap);
};

export {
  replaceCharacters,
  formatSearchTerm,
};
