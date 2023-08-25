import * as helpers from '@/helpers/object';
import firebase from '@firebase/app';
const Timestamp = firebase.firestore.Timestamp;

const jsDate1 = new Date('2023-08-24');
const jsDate2 = new Date('2023-08-25');

const ts1 = Timestamp.fromDate(jsDate1);
const ts2 = Timestamp.fromDate(jsDate2);

describe('deepEqual()', () => {
  it('returns true when array with nested objects match but are in a different order', async () => { 
    const obj1 = {
      e: [1, 2, { f: 'hello' }],
    };
    const obj2 = {
      e: [2, { f: 'hello' }, 1],
    };
    const result = helpers.deepEqual(obj1, obj2);
    expect(result).toBe(true);
  });

  it('returns false when array with nested objects are different', async () => { 
    
    // Test cases
    const obj1 = {
      a: 1,
      e: [1, 2, { f: 'hello' }],
    };
    const obj2 = {
        a: 1,
        e: [2, { f: 'world' }, 1],
    };
    const result = helpers.deepEqual(obj1, obj2);    
    expect(result).toBe(false);
  });
  it('returns true when array with nested objects with datetime match but are in a different order', async () => { 
    const obj1 = {
      e: [1, 2, { f: new Date('2023-08-25') }],
    };
    const obj2 = {
      e: [2, { f: new Date('2023-08-25') }, 1],
    };
    const result = helpers.deepEqual(obj1, obj2);
    expect(result).toBe(true);
  });
  it('returns false when array with nested objects with datetime differ and are in a different order', async () => { 
    const obj1 = {
      e: [1, 2, { f: ts1 }],
    };
    const obj2 = {
      e: [2, { f: ts2 }, 1],
    };
    const result = helpers.deepEqual(obj1, obj2);
    expect(result).toBe(false);
  });

});

describe('deepKeysDiff()', () => {
  it('returns empty array with nested objects with js datetime match but are in a different order', async () => { 
    const obj1 = {
      e: [1, { f: jsDate1 }, 2],
    };
    const obj2 = {
      e: [1, 2, { f: jsDate1 }],
    };
    const result = helpers.deepKeysDiff(obj1, obj2);
    const expectedResults = [];
    expect(result).toStrictEqual(expectedResults);
  });

  it('returns difference when array with nested objects have different js date but ignore the one that has the same', async () => { 
    const obj1 = {
      a: [1, { f: jsDate1 }, 2],
      b: [1, 2, { f: jsDate2 }],
    };
    const obj2 = {
      a: [2, { f: jsDate2 }, 1],
      b: [2, { f: jsDate2 }, 1],
    };
    const result = helpers.deepKeysDiff(obj1, obj2);
    const expectedResults = ['a'];
    expect(result).toStrictEqual(expectedResults);
  });

  it('returns empty array with nested objects with timestamp match but are in a different order', async () => { 
    const obj1 = {
      e: [1, { f: ts1 }, 2],
    };
    const obj2 = {
      e: [1, 2, { f: ts1 }],
    };
    const result = helpers.deepKeysDiff(obj1, obj2);
    const expectedResults = [];
    expect(result).toStrictEqual(expectedResults);
  });

  it('returns difference when array with nested objects have different timestamp but ignore the one that has the same', async () => { 
    const obj1 = {
      a: [1, { f: ts1 }, 2],
      b: [1, 2, { f: ts2 }],
    };
    const obj2 = {
      a: [2, { f: ts2 }, 1],
      b: [2, { f: ts2 }, 1],
    };
    const result = helpers.deepKeysDiff(obj1, obj2);
    const expectedResults = ['a'];
    expect(result).toStrictEqual(expectedResults);
  });

  it('returns empty array when array with nested objects match but are in a different order', async () => { 
    const obj1 = {
      e: [1, 2, { f: 'hello' }],
    };
    const obj2 = {
        e: [2, { f: 'hello' }, 1],
    };
    const result = helpers.deepKeysDiff(obj1, obj2);
    const expectedResults = [];
    expect(result).toStrictEqual(expectedResults);
  });

  it('ignores keys that begin with an underscore', async () => { 
    const obj1 = {
      _a: 1, 
    };
    const obj2 = {
      _a: 1,
    };
    const result = helpers.deepKeysDiff(obj1, obj2);
    const expectedResults = [];
    expect(result).toStrictEqual(expectedResults);
  });

  it('ignores keys that are specified in the keysToIgnore array', async () => { 
    const obj1 = {
      a: 1, 
    };
    const obj2 = {
      a: 1,
    };
    const keysToIgnore = ['a'];
    const result = helpers.deepKeysDiff(obj1, obj2, keysToIgnore);
    const expectedResults = [];
    expect(result).toStrictEqual(expectedResults);
  });

});
