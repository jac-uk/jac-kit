import { toCSV } from '@/filters/filters';

describe('toCSV', () => {
  it('returns comma separated values', () => {
    expect(toCSV([1, 1])).toBe('1, 1');
  });
});
