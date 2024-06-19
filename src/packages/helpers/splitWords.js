const splitWords = (textStr) => {
  return [].concat(...textStr
    .split(/[^a-z'-]/i) //split into array at every occurance of a character which is NOT: a-z or ' or -
    .filter(item => item != '') // remove any empty items from array
    .filter(item => item != '\'') // remove any items which are just a apostrophe
    .filter(item => item != '-') // remove any items which are just a hyphen
    .map((item, i) => {                                           // with the above array
      if (i, item.replace(/[^-]/g, '').length >= 4) {             // find any items containing more than or equal to 4 hyphens (4 allows for a trailing hyphen which is not counted in next set)
        item = item.match(/((?:[^-]*?-){3}[^-]*?)-|([\S\s]+)/g);  // if an 'offending' item occurs, group every 4 words, ignoring the hyphen between groups [ie. 'one-one-one-one-two-two-two-two' (eight words, seven hyphens) 'one-one-one-one-' 'two-two-two-two']
      }
      return item; // add array in position of word
    })); // flatten array
};

export {
  splitWords
};
