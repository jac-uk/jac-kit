import { formatNumber } from '@/filters/filters';

describe('formatNumber', () => {
  it('returns a number', () => {
    expect(formatNumber('124000')).toBe('124,000');
  });
});
