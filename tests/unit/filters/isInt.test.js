import { isInt } from '@/filters/filters';

describe('isInt', () => {
  it('isInt', () => {
    expect(isInt(100)).toEqual(true);
    expect(isInt(1000.9)).toEqual(false);
    expect(isInt(' 1 ')).toEqual(true);
    expect(isInt('0.123')).toEqual(false);
    expect(isInt(null)).toEqual(false);
    expect(isInt(undefined)).toEqual(false);
  });
});
