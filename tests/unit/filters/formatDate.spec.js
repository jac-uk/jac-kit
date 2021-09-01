import { formatDate } from '@/filters/filters';

describe('Format Date', () => {
  describe('valid date', () => {
    const dateToday = new Date();
    const validTypes = [
      [dateToday, dateToday.toLocaleDateString('en-GB')],
      [[1,1,2003], new Date([1,1,2003]).toLocaleDateString('en-GB')],
      [1600000000000, new Date(1600000000000).toLocaleDateString('en-GB')], // epoch/UTC time gives number
    ];

    it.each(validTypes)('when given %s returns %o', async (value, result) => {
      expect(formatDate(value)).toBe(result);
    });
  });
  describe('valid date and type', () => {
    const validTypes = [
      [[1,1,2003], 'month', 'January 2003'],
      [[1,1,2003], 'datetime', '01/01/2003, 00:00:00'],
      [[1,1,2003], 'long', '1 January 2003'],
      [[1,1,2003], 'longdatetime', '1 January 2003, 00:00'],
      [[1,1,2003], null , '01/01/2003'],
    ];

    it.each(validTypes)('when given %s with type %s returns %o', async (value, type, result) => {
      expect(formatDate(value, type)).toBe(result);
    });
  });
  describe('invalid date', () => {

    const invalidTypes = [
      ['string', 'string'],
      [null, null],
      [undefined, undefined],
      [[], []],
    ];

    it.each(invalidTypes)('when given %o', (value, result) => {
      expect(formatDate(value)).toEqual(result);
    });
  });

});
